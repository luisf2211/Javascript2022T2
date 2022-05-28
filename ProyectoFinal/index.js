const express = require('express'); 
const app = express(); 

app.use(express.static('assets'));
app.use(express.static('json'));
app.use(express.static('node_modules'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + "/index.html")
});

app.get('/dashboard', function(req, res) {
    res.sendFile(__dirname + "/views/dashboard.html")
});

app.get('/users', function(req, res) {
    res.sendFile(__dirname + "/views/users.html")
});


app.get('/', function(req, res) {
    res.sendFile(__dirname + "/db.json")
});

app.listen(4000)
console.log('Running in port: ' + 4000)

