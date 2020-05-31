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


//FUNCTION CONSULTA

app.post("/consulta", function(req, res) {

    var username = req.body.usuario;
    var password = req.body.password;
    var email = req.body.email;
    var edad = req.body.edad;
    console.log(username, password, email, edad);

    //query to insert the dates in the bdd like ( username, password, email, edad )
    pool.query(

        `INSERT INTO valenrunner (usuario, email, edad, password) VALUES ('${username}', '${email}', '${edad}', '${password}')`,

        /* "INSERT INTO `valenrunner` ( `usuario`, `email`, `edad`, `password`) VALUES ('" + username + "', '" + password + "', '" + email + "', '" + edad + "')", */
        function(err, result) {


            res.redirect("index.html")
        }
    );
});


// FUNCTION COMPROBAR USUARIO EN BDD
app.post("/comprobar", function(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    //query that check if the id_usuario is orrect with the password/username
    pool.query(
        "SELECT id_usuario, usuario, email, edad FROM valenrunner WHERE usuario LIKE '" +
        username +
        "' AND password LIKE '" +
        password +
        "';",
        function(err, result) {
            //console.log(result);
            //If the result is in the bdd the result will be bigger than 0 
            //so if the gresult is bigger than 0 we can create a token and do things
            //else, show an alert that you have to register first;

            if (result.length > 0) {
                //console.log(result[0].usuario);
                //console.log(result[0].password);

                let id_usuario = result[0].id_usuario;
                let usuario = result[0].usuario;
                let email = result[0].email;
                let edad = result[0].edad;

                console.log(id_usuario);
                console.log(usuario);
                console.log(email);
                console.log(edad);

                let token = createToken(id_usuario, usuario);

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

// ENCRYPT TOKEN With the word "Desencrypt" you have to put the same word
//when you will descencrypt it.
function createToken(userId, usuario) {
    let prueba = {
        userid: userId,
        usuario: usuario,
    }

    let token = jstoken.sign(prueba, "desencrypt");

    return token;
}

// Verify token
app.post("/verifyToken", (req, res) => {


    jstoken.verify(req.body.token, "desencrypt", (err, token) => {
        console.log("perro :", req.body);

        if (err) {
            res.send({ isValid: false });
        } else {
            pool.query("SELECT * FROM valenrunner WHERE id_usuario LIKE " + token.userid + ";", function(
                error,
                results,
                fields
            ) {
                if (error) throw error;
                // console.log(results[0].id_usuario);

                userData = {
                    isValid: true,
                    id: results[0].id_usuario,
                    usuario: results[0].usuario,
                    email: results[0].email,
                    edad: results[0].edad,
                };

                res.send(userData);
            });
        }
    });
});


// Paginas publicas (estaticas)
app.use(express.static(path.join(__dirname, "public")));

// Escuchemos en un puerto
app.listen(puerto, () => {
    console.log(" * Miniserver UP and Running en http://localhost:" + puerto);
});