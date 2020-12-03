const express = require(`express`);
const mysql = require(`mysql`);
const bodyParser = require(`body-parser`);
const app = express();

app.use(bodyParser.json());

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

app.get('/api/facts', function(req, res) {
    connection.query(`SELECT facts FROM cat`, function(err, results, fields) {
        if(err) throw err;
        console.log(results);
        res.json({ data : results });
    });
});

app.get('/api/:no_of_facts', function(req, res) {
    connection.query(`SELECT facts FROM cat LIMIT ${req.params.no_of_facts}`, function(err, results, fields) {
        if(err) throw err;
        console.log(results);
        res.json({ data : results });
    });
});

app.get('/api/cat/random_facts', function(req, res) {
    connection.query(`SELECT facts FROM cat LIMIT 7 OFFSET 10`, function(err, results, fields) {
        if(err) throw err;
        console.log(results);
        res.json({ data : results });
    });
});

app.post('/api/add_facts', function(req, res) {
    let insert = `INSERT INTO cat (facts) VALUES ?`;
    let values = [
        [req.body.facts]
    ];
    connection.query(insert, [values], function(err, results) {
        if(err) throw err;
        console.log(req.body);
        console.log(results);
        res.json({ data : results });
    });
});

app.use(function(err, req, res, next) {
    console.error(err);
    res.status(500);
    res.send(`Something went wrong!`);
})

app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});
