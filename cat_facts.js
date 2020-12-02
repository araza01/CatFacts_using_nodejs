const http = require(`http`);
const express = require(`express`);
const mysql = require(`mysql`);
const bodyParser = require(`body-parser`);
const app = express();

const connection = mysql.createConnection({
    host: `localhost`,
    user: `root`,
    password: `password`,
    database: `catfacts`
});

connection.connect(function(err) {
    if(err) throw err;
    console.log(`Connected to the server!`);
});

app.get('/facts', function(req, res) {
    connection.query(`SELECT * FROM cat`, function(err, results, fields) {
        if(err) throw err;
        console.log(results);
        console.log(fields);
        res.end(JSON.stringify(results));
    });
})

app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});