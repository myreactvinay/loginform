const express = require('express')
const app = express();
const cors = require('cors');
const bodyParser  = require('body-parser');
const mariadb = require('mariadb');
const pool = mariadb.createPool({host: 'localhost', port: 3306, user: 'root', password: '123456', database: 'userdb'});

const port = 8000;

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  pool.getConnection()
    .then(conn => {
      conn.query("SELECT * FROM User")
        .then((result) => {
          console.log(result);
          conn.end();
          res.json({data: result, success: true});
        })
        .catch(err => {
          console.log(err);
          conn.end();
          res.json({error: err, success: false});
        })

    }).catch(err => {
      console.log(err);
      res.json({error: err, success: false});
    });

})

app.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  pool.getConnection()
    .then(conn => {
      conn.query("SELECT * FROM User Where email=? AND password=?",[email,password])
        .then((result) => {
          console.log(result);
          conn.end();
          res.json({data: result, success: true});
        })
        .catch(err => {
          console.log(err);
          conn.end();
          res.json({error: err, success: false});
        })

    }).catch(err => {
      console.log(err);
      res.json({error: err, success: false});
    });

})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))