require("dotenv").config();

const path = require("path");
const express = require("express");
const cors = require("cors");

const bodyParser = require('body-parser');
const mysql = require('mysql');


const PORT = process.env.PORT || 3001;

const app = express();

// // Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../client/build")));
app.use(bodyParser.json());
//app.use(express.json());
app.use(cors());


const conn = mysql.createConnection({
  host: 'localhost',
  user: 'nodejs',
  password: 'nodejs',
  database: 'myproject'
});

conn.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connected with App...');
});


// Handle GET requests to /api route
// app.get("/api", (req, res) => {
//   res.json({ message: "Hello from server!" });
// });



/**
 * Get All Users
 *
 * @return response()
 */
 app.get('/api/users',(req, res) => {
  let sqlQuery = "SELECT * FROM users";
  
  let query = conn.query(sqlQuery, (err, results) => {
    if(err) throw err;
    res.send(apiResponse(results));
  });
});
   
/**
 * Get Single Item
 *
 * @return response()
 */
app.get('/api/users/:id',(req, res) => {
  let sqlQuery = "SELECT * FROM users WHERE id=" + req.params.id;
    
  let query = conn.query(sqlQuery, (err, results) => {
    if(err) throw err;
    res.send(apiResponse(results));
  });
});
   
/**
 * Create New Item
 *
 * @return response()
 */
app.post('/api/users',(req, res) => {
  let data = {title: req.body.email, body: req.body.password};
  
  let sqlQuery = "INSERT INTO users SET ?";
  
  let query = conn.query(sqlQuery, data,(err, results) => {
    if(err) throw err;
    res.send(apiResponse(results));
  });
});
   
/**
 * Update Item
 *
 * @return response()
 */
app.put('/api/users/:id',(req, res) => {
  let sqlQuery = "UPDATE users SET email='"+req.body.email+"', password='"+req.body.password+"' WHERE id="+req.params.id;
  
  let query = conn.query(sqlQuery, (err, results) => {
    if(err) throw err;
    res.send(apiResponse(results));
  });
});
   
/**
 * Delete Item
 *
 * @return response()
 */
app.delete('/api/users/:id',(req, res) => {
  let sqlQuery = "DELETE FROM users WHERE id="+req.params.id+"";
    
  let query = conn.query(sqlQuery, (err, results) => {
    if(err) throw err;
      res.send(apiResponse(results));
  });
});
  
/**
 * API Response
 *
 * @return response()
 */
function apiResponse(results){
    return JSON.stringify({"status": 200, "error": null, "response": results});
}
   

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});
  
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });