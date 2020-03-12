const express = require('express');
const path = require('path');
const app = express();
const consultas= require('./public/js/consultas.js');

//para que heroku elija el puerto que tenga libre
let puerto = process.env.PORT || 3000;

const bodyParser = require('body-parser');


app.use(express.json());
app.use(bodyParser.json());


app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
  }));

// FUNCTION INSERTAR DATOS USUARIO REGISTRO
app.post('/consulta',function(req,res){
    var username = req.body.usuario;
    var email = req.body.email;
    var edad = req.body.edad;
    var password = req.body.password;
    
    console.log(username, email, edad, password);
    
    consultas.insert(username, email, edad, password);
 });


// Paginas publicas (estaticas)
app.use(express.static(path.join(__dirname, 'public')));

// Escuchemos en un puerto
app.listen(puerto, () => {
    console.log(" * Miniserver UP and Running en http://localhost:" + puerto);
});

