const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const dbconfig = require("../config/database");
const connection = mysql.createConnection(dbconfig);
const app = express();
const router = express.Router();
//이거를 달아줘야 타입에러 안남
app.use(express.json());
app.use(cors());

// app.use((req, res, next)=> {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

// configuration =========================
app.set("port", process.env.PORT || 4000);

app.get("/", (req, res) => {
  res.send("Root");
});

//비회원 카페 리스트
app.get("/cafe", (req, res) => {
  connection.query(
    "SELECT cafe_name, cafe_addr, table_a, table_b FROM cafe",
    (error, results, fields) => {
      if (error) {
        console.log("Error getting data from database:", error);
        res.status(500).send("Error getting data from database.");
        return;
      }
      const cafeLists = results.map((result) => ({
        name: result.cafe_name,
        address: result.cafe_addr,
        table: result.table_a * result.table_b,
      }));
      res.json(cafeLists);
    }
  );
});

//카페 관리자 및 테이블 개수 등록
app.post("/addAdmin", (req, res) => {
  const { adminId, adminPw, cafeName, cafeAddr, tableA, tableB } = req.body;
  connection.query(
    "INSERT INTO admin (user_id, user_pw, cafe_names) VALUES (?, ?, ?)",
    [adminId, adminPw, cafeName],
    (error, results, fields) => {
      if (error) throw error;

      //admin 테이블의 idx를 받아옴
      connection.query(
        "INSERT INTO cafe (admin_idx, cafe_name, cafe_addr, table_a, table_b) VALUES (?, ?, ?, ?, ?)",
        [results.insertId, cafeName, cafeAddr, tableA, tableB],
        (error, results, fields) => {
          if (error) throw error;
          else {
            const tableCount = tableA * tableB;
            const tableData = [];
            // table_a와 table_b의 곱 만큼 table_id를 부여하여 데이터 생성
            for (let i = 1; i <= tableCount; i++) {
              tableData.push({
                cafe_idx: results.insertId,
                cafe_names: cafeName,
                table_id: i,
                table_status: 0,
              });
            }
            for (let i = 0; i < tableCount; i++) {
              connection.query(
                "INSERT INTO `table` SET ?",
                tableData[i],
                (error, results, fields) => {
                  if (error) {
                    res.status(500).json({ error });
                  } else if (i === tableCount - 1) {
                    res.send("Data insert success");
                  }
                }
              );
            }
          }
        }
      );
    }
  );
});

//회원가입
app.post("/addAdmin", (req, res) => {
  const { adminId, adminPw } = req.body;
  connection.query(
    "INSERT INTO admin (user_id, user_pw) VALUES (?, ?)",
    [adminId, adminPw],
    (error, results, fields) => {
      if (error) throw error;
})});

//예약을 할 때 고객의 정보
app.post("/reservation", (req, res) => {
  const { id, pw, pNumber } = req.body;
  connection.query(
    "INSERT INTO customer (c_nick, c_pw, phone_number, reservation_time, cafe_names) VALUES (?, ?, ?, ?, ?)",
    [id, pw, pNumber, "2022-05-01 12:30:00", "A카페"],
    (error, results, fields) => {
      if (error) throw error;

      res.send("Data insert success");
    }
  );
});

app.listen(app.get("port"), () => {
  console.log("Express server listening on port " + app.get("port"));
});

app.get("/cafe/:cafeName", (req, res) => {
  const { cafeName } = req.params;
  connection.query(
    "SELECT table_a, table_b FROM cafe WHERE cafe_name = ?",
    [cafeName],
    (error, results, fields) => {
      if (error) {
        console.log("Error getting data from database:", error);
        res.status(500).json({ error: "Error getting data from database." });
        return;
      }
      if (results.length === 0) {
        res.status(404).json({ error: `Cafe '${cafeName}' not found.` });
        return;
      }
      const { table_a, table_b } = results[0];
      res.json({ table_a, table_b });
    }
  );
});

app.get("/cafe/:cafeName/table/:tables", (req, res) => {
  const { cafeName, tableId } = req.params;
  connection.query(
    "SELECT seats FROM reservations WHERE cafe_name = ? AND table_id = ?",
    [cafeName, tableId],
    (error, results, fields) => {
      if (error) {
        console.log("Error getting data from database:", error);
        res.status(500).json({ error: "Error getting data from database." });
        return;
      }
      if (results.length === 0) {
        res.status(404).json({ error: `Table '${tableId}' not found.` });
        return;
      }
      const { seats } = results[0];
      res.json({ seats });
    }
  );
});

app.post("/cafe/:cafeName/table/:tableId", (req, res) => {
  const { cafeName, tableId } = req.params;
  const { seats } = req.body;
  connection.query(
    "INSERT INTO reservations (cafe_names, table_id, table_status) VALUES (?, ?, ?)",
    [cafeName, tableId, seats],
    (error, results, fields) => {
      if (error) {
        console.log("Error inserting data into database:", error);
        res.status(500).json({ error: "Error inserting data into database." });
        return;
      }
      res.json({ success: true });
    }
  );
});

app.post("/onlogin", (req, res) => {
  // user_id, user_pw 변수로 선언
  // const user_id = req.body.user_id;
  // const user_pw = req.body.user_pw;
  const user_id = req.query.user_id;
  const user_pw = req.query.user_pw;
  // 입력된 id 와 동일한 id 가 mysql 에 있는 지 확인
  const sql1 = "SELECT COUNT(*) AS result FROM admin WHERE user_id = ?";
  connection.query(sql1, user_id, (err, data) => {
    if (!err) {
      // 결과값이 1보다 작다면(동일한 id 가 없다면)
      if (data[0].result < 1) {
        res.send({ msg: "입력하신 id 가 일치하지 않습니다." });
      } else {
        // 동일한 id 가 있으면 비밀번호 일치 확인
        const sql2 = `SELECT 
                                CASE (SELECT COUNT(*) FROM admin WHERE user_id = ? AND user_pw = ?)
                                    WHEN '0' THEN NULL
                                    ELSE (SELECT user_id FROM admin WHERE user_id = ? AND user_pw = ?)
                                END AS userId
                                , CASE (SELECT COUNT(*) FROM admin WHERE user_id = ? AND user_pw = ?)
                                    WHEN '0' THEN NULL
                                    ELSE (SELECT user_pw FROM admin WHERE user_id = ? AND user_pw = ?)
                                END AS userPw`;
        // sql 란에 필요한 parameter 값을 순서대로 기재
        const params = [
          user_id,
          user_pw,
          user_id,
          user_pw,
          user_id,
          user_pw,
          user_id,
          user_pw,
        ];
        connection.query(sql2, params, (err, data) => {
          if (!err) {
            res.send(data[0]);
          } else {
            res.send(err);
          }
        });
      }
    } else {
      res.send(err);
    }
  });
});

app.post("/customlogin", (req, res) => {
  const c_nick = req.query.c_nick;
  const c_pw = req.query.c_pw;
  // 입력된 id 와 동일한 id 가 mysql 에 있는 지 확인
  const sql1 = "SELECT COUNT(*) AS result FROM customer WHERE c_nick = ?";
  connection.query(sql1, c_nick, (err, data) => {
    if (!err) {
      // 결과값이 1보다 작다면(동일한 id 가 없다면)
      if (data[0].result < 1) {
        res.send({ msg: "입력하신 id 가 일치하지 않습니다." });
      } else {
        // 동일한 id 가 있으면 비밀번호 일치 확인
        const sql2 = `SELECT 
                                CASE (SELECT COUNT(*) FROM customer WHERE c_nick = ? AND c_pw = ?)
                                    WHEN '0' THEN NULL
                                    ELSE (SELECT c_nick FROM customer WHERE c_nick = ? AND c_pw = ?)
                                END AS customerId
                                , CASE (SELECT COUNT(*) FROM customer WHERE c_nick = ? AND c_pw = ?)
                                    WHEN '0' THEN NULL
                                    ELSE (SELECT c_pw FROM customer WHERE c_nick = ? AND c_pw = ?)
                                END AS customerPw`;
        // sql 란에 필요한 parameter 값을 순서대로 기재
        const params = [
          c_nick,
          c_pw,
          c_nick,
          c_pw,
          c_nick,
          c_pw,
          c_nick,
          c_pw,
        ];
        connection.query(sql2, params, (err, data) => {
          if (!err) {
            res.send(data[0]);
          } else {
            res.send(err);
          }
        });
      }
    } else {
      res.send(err);
    }
  });
});

app.post("/signup", (req, res) => {
  const c_nick = req.body.c_nick;
  const c_pw = req.body.c_pw;
  const phone_number = req.body.phone_number;

  // customer 테이블에 데이터 저장하는 로직 추가
  const sql = "INSERT INTO customer (c_nick, c_pw, phone_number) VALUES (?, ?, ?)";
  connection.query(sql, [c_nick, c_pw, phone_number], (err, result) => {
    if (!err) {
      res.send({ success: true });
    } else {
      res.send({ success: false });
    }
  });
});

app.post('/tableres', (req, res) => {
  const { c_nick, cafe_names, table_id, start_time, end_time } = req.body;

  // Get the current date
  const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

  const dbQuery = `INSERT INTO res_table (c_nick, cafe_names, table_id, start_time, end_time, res_time) VALUES (?, ?, ?, ?, ?, ?)`;
  const dbParams = [c_nick, cafe_names, table_id, start_time, end_time, currentDate];

  connection.query(dbQuery, dbParams, (error, results) => {
    if (error) {
      console.error('Error inserting reservation:', error);
      res.status(500).json({ error: 'Failed to insert reservation' });
    } else {
      console.log('Reservation inserted successfully');

      // Update table_status in cafe_table
      const updateQuery = `UPDATE cafe_table SET table_status = 1 WHERE cafe_name = ? AND table_id = ?`;
      const updateParams = [cafe_names, table_id];

      connection.query(updateQuery, updateParams, (updateError, updateResults) => {
        if (updateError) {
          console.error('Error updating table status:', updateError);
          res.status(500).json({ error: 'Failed to update table status' });
        } else {
          console.log('Table status updated successfully');
          res.status(200).json({ message: 'Reservation successful' });
        }
      });
    }
  });
});


app.get('/mypage/:customerId', (req, res) => {
  const customerId = req.params.customerId;

  const dbQuery = `SELECT cafe_names, res_time, start_time, end_time, table_id FROM res_table WHERE c_nick = ?`;

  connection.query(dbQuery, [customerId], (error, results) => {
    if (error) {
      console.error('Error retrieving data from res_table:', error);
      res.status(500).json({ error: 'Failed to retrieve data from res_table' });
    } else {
      console.log('Data retrieved successfully');
      res.status(200).json({ data: results });
    }
  });
});

app.post('/tablecount', (req, res) => {
  const { cafeName } = req.body;

  // cafe_table 테이블에서 cafe_name이 cafeName이고 table_status가 0인 레코드 수를 조회합니다.
  const query = `SELECT COUNT(*) AS count FROM cafe_table WHERE cafe_name = ? AND table_status = 0`;
  connection.query(query, [cafeName], (error, results) => {
    if (error) {
      console.error('Error querying database:', error);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    const count = results[0].count;

    res.json({ count });
  });
});

app.get('/cafe-tables', (req, res) => {
  const { cafeName } = req.query;

  // cafe_table 테이블에서 cafe_name이 cafeName인 모든 레코드를 조회합니다.
  const query = `SELECT table_id, table_status FROM cafe_table WHERE cafe_name = ?`;
  connection.query(query, [cafeName], (error, results) => {
    if (error) {
      console.error('Error querying database:', error);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    res.json(results);
  });
});

app.get('/adminres', (req, res) => {
  const cafeName = '투썸플레이스 경산하양점';

  const dbQuery = `SELECT res_table.c_nick, res_table.start_time, res_table.end_time, res_table.table_id, customer.phone_number 
                   FROM res_table 
                   INNER JOIN customer ON res_table.c_nick = customer.c_nick 
                   WHERE res_table.cafe_names = ?`;

  connection.query(dbQuery, [cafeName], (error, results) => {
    if (error) {
      console.error('Error fetching reservation details:', error);
      res.status(500).json({ error: 'Failed to fetch reservation details' });
    } else {
      res.status(200).json(results);
    }
  });
});
