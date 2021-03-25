const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv')
const path = require('path');
const app = express();
dotenv.config();

let port = process.env.PORT || 8080;
let cors = require('cors')
const HOST = process.env.HOST || 'localhost';
const USERNAME = process.env.USER || 'username';
const PASSWORD = process.env.PASSWORD || 'password';
const PORTDB = process.env.DBPORT || 3360;
const DB = process.env.DB || '';

// Create Database Connection
const db = mysql.createConnection({
  host: HOST,
  user: USERNAME,
  password: PASSWORD,
  port: PORTDB,
  database: DB
})
console.log(USERNAME);
db.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + db.threadId);
});

// the __dirname is the current directory from where the script is running
app.use(express.json())
app.use(express.static(path.join(__dirname, 'build')));
app.options('*', cors()) // include before other routes
app.use(cors())

app.get('/checkup/isdbempty', function (req, res) {
  let query = `SHOW DATABASES LIKE '${DB}'`;
  db.query(query, (err, result) => {
    if (err) throw err;
    if (result.length === 0) {
      return res.send('Please create a database')
    }
    return res.send(result)
  })
});

// C.R.U.D System
// Create (Post)
// Read (Get)
// Update (Put)
// Delete (Delete)

app.get('/get/todo-list', (req, res) => {
  let query = `SELECT * FROM todoList`;
  db.query(query, (err, result) => {
    if (err) throw err;
    res.send(result)
  })
});

app.get('/get/fullList/:id', (req, res) => {
  let query = `SELECT todoList.name, items.item FROM items INNER JOIN todoList ON items.listID = todoList.id WHERE items.listID = ${req.params['id']}`;
  db.query(query, (err, result) => {
    if (err) throw err;
    res.send(result);
  })
});

app.get('/get/list/:id', (req, res) => {
  let query = `SELECT name FROM todoList WHERE todoList.id=${req.params['id']}`;

  db.query(query, (err, result) => {
    if (err) throw err;
    res.send(result)
  })
});

app.post('/create/list', (req, res) => {
  let post = req.body;
  let query = `INSERT INTO todoList SET ?`;

  db.query(query, post, (err, result) => {
    if (err) throw err;
    res.send(result)
  })
});

app.post('/create/items', (req, res) => {
  let post = {
    listID: req.body.listID,
    item: JSON.stringify(req.body.item.items)
  };
  let query = `INSERT INTO items SET ?`;

  db.query(query, post, (err, result) => {
    if (err) throw err;
    res.send(result)
  })
});

app.delete('/delete/list', (req, res) => {
  let query = `DELETE todoList, items FROM items INNER JOIN todoList ON items.listID = todoList.id WHERE items.listID = ${req.body.id}`;
  db.query(query, (err, result) => {
    if (err) throw err;
  })
})

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

console.log('listen to: ', port)
app.listen(port);
// db.end();