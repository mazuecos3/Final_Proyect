const jstoken = require("jsonwebtoken");
const express = require("express");
const path = require("path");
const app = express();
//tener el e
const consultas = require("./public/js/consultas.js");
const pool = require("./public/js/auth");

//para que heroku elija el puerto que tenga libre
let puerto = process.env.PORT || 3000;

const bodyParser = require("body-parser");

app.use(express.json());
app.use(bodyParser.json());

// to support URL-encoded bodies
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// FUNCTION INSERTAR DATOS USUARIO REGISTRO
app.post("/consulta", function (req, res) {
  var username = req.body.usuario;
  var email = req.body.email;
  var edad = req.body.edad;
  var password = req.body.password;

  //console.log(username, email, edad, password);

  consultas.insert(username, email, edad, password);

  res.redirect("index.html");
});

// FUNCTION COMPROBAR USUARIO EN BDD
app.post("/comprobar", function (req, res) {
  var username = req.body.username;
  var password = req.body.password;

 //query that check if the id_usuario is orrect with the password/username
  pool.query(
    "SELECT id_usuario FROM valenrunner WHERE usuario LIKE '" +
      username +
      "' AND password LIKE '" +
      password +
      "';",
    function (err, result) {
      //console.log(result);
      //If the result is in the bdd the result will be bigger than 0 
      //so if the gresult is bigger than 0 we can create a token and do things
      //else, show an alert that you have to register first;

      if (result.length > 0) {
        //console.log(result[0].usuario);
        //console.log(result[0].password);
        console.log(result[0].id_usuario);

        let token = createToken(result[0].id_usuario)

        let tokenjson = {
          token: token
        }
        res.send(tokenjson)
        
        //res.redirect('main.html');
      } else {
        console.log("Registrate Primero");
        return 0;
        //res.redirect('index.html');
      }
    }
  );
});

// ENCRYPT TOKEN
function createToken(userId) {
  let token = jstoken.sign(userId, "desencrypt");

  return token;
}

// Verify token
app.post("/verifyToken", (req, res) => {
  jstoken.verify(req.body.token, "desencrypt", (err, token) => {
    if (err) {
      res.send(false);
    } else {
      pool.query(`SELECT * FROM valenrunner WHERE id_usuario LIKE ${token};`, function (
        error,
        results,
        fields
      ) {
        if (error) throw error;
        console.log(results[0].id_usuario);

        userData = {
          isValid: true,
          id: results[0].id_usuario,
        };

        res.send(userData);
      });
    }
  });
});

function verifyToken(token) {
  return jwt.verify(token, "desencrypt", function (err, decoded) {
    console.log("token:", token);

    if (err) {
      console.log("error NO CONFIRMED");
    } else {
      return decoded;
    }
  });
}

// Paginas publicas (estaticas)
app.use(express.static(path.join(__dirname, "public")));

// Escuchemos en un puerto
app.listen(puerto, () => {
  console.log(" * Miniserver UP and Running en http://localhost:" + puerto);
});
