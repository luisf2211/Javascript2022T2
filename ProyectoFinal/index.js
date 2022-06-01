const express = require('express');
const app = express();

app.use(express.static('assets'));
app.use(express.static('node_modules'));

app.get('/',function(req,res,){
    res.sendFile(__dirname+"/login.html")
});

app.get('/home',function(req,res,){
    res.sendFile(__dirname+"/index.html")
});

app.get('/user',function(req,res,){
    res.sendFile(__dirname+"/views/user.html")
});

app.get('/insertar-user',function(req,res,){
    res.sendFile(__dirname+"/views/insertar-user.html")
});

app.get('/editar-user',function(req,res,){
    res.sendFile(__dirname+"/views/editar-user.html")
});
app.get('/customer',function(req,res,){
    res.sendFile(__dirname+"/views/customer.html")
});

app.get('/insertar-customer',function(req,res,){
    res.sendFile(__dirname+"/views/insertar-customer.html")
});

app.get('/editar-customer',function(req,res,){
    res.sendFile(__dirname+"/views/editar-customer.html")
});
app.get('/interaction',function(req,res,){
    res.sendFile(__dirname+"/views/interaction.html")
});

app.get('/insertar-interaction',function(req,res,){
    res.sendFile(__dirname+"/views/insertar-interaction.html")
});

app.get('/editar-interaction',function(req,res,){
    res.sendFile(__dirname+"/views/editar-interaction.html")
});
app.listen(3200);
console.log("http://localhost:3200");