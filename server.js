const jstoken = require("jsonwebtoken");
const express = require("express");
const path = require("path");
const app = express();


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

    let reqBody = req.body;
    //console.log(reqBody);


    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;
    let edad = req.body.edad;
    let id_categoria = req.body.categorias;
    let genero = req.body.options;
    //console.log(username, password, email, edad, id_categoria, genero);

    //query to check if the username already exists 
    pool.query(

        "SELECT usuario FROM usuarios WHERE usuario LIKE '" + username + "';",
        function(err, result) {
            // IF THE USER THAT WE WANT TO INSERT IS ALLREADY CREATED, SHOW ALERT THAT THE USER IS CREATED AND REFRESH THE PAGE
            if (result.length > 0) {
                //res.send(result[0].usuario);
                // console.log("El usuario ya esta creado");
                // if is created send false
                res.send({ response: false });
            } else {
                //console.log(result);
                pool.query(
                    `INSERT INTO usuarios (usuario, email, edad, password, id_categoria, genero) VALUES ('${username}', '${email}', '${edad}', '${password}','${id_categoria}','${genero}')`,
                    /* "INSERT INTO `usuarios` ( `usuario`, `email`, `edad`, `password`) VALUES ('" + username + "', '" + password + "', '" + email + "', '" + edad + "')", */
                    function(err, result) {
                        // if is not created send true
                        res.send({ response: true });
                    }
                );
            }
        }
    );

    //query to insert the dates in the bdd like ( username, password, email, edad )

});


// FUNCTION COMPROBAR USUARIO EN BDD
app.post("/comprobar", function(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    //query that check if the id_usuario is orrect with the password/username
    pool.query(
        "SELECT * FROM usuarios WHERE usuario LIKE '" +
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
                let id_categoria = result[0].id_categoria;
                let genero = result[0].genero;

                //console.log(id_usuario, usuario, email, edad, id_categoria, genero);

                let token = createToken(id_usuario, usuario);

                let tokenjson = {
                    token: token
                }
                res.send(tokenjson)

                //res.redirect('main.html');
            } else {
                //console.log("Registrate Primero");
                return 0;
                //res.redirect('index.html');
            }
        }
    );
});



// FUNCTION COMPROBAR CARRERAS EN LA BDD
app.post("/comprobarCarreras", function(req, res) {

    //console.log(req.body.carreras.toString());
    let idCarrera = req.body.carreras.toString();

    //query that check if the id_carrera is correct with the Bdd
    pool.query(
        ` SELECT * FROM carreras WHERE id_carrera IN (${idCarrera});`,
        function(err, result) {
            // console.log(result);
            //If the result is in the bdd the result will be bigger than 0 
            //so if the gresult is bigger than 0 we can create the object/json carreras to send the values
            //else, return 0 , if you didnt put this it probably explode;

            if (result.length > 0) {
                //console.log(result.length);
                let carreras = []
                let carrera;
                for (let i = 0; i < result.length; i++) {
                    carrera = {
                        id_carrera: result[i].id_carrera,
                        nombre: result[i].nombre,
                        tiempo: result[i].tiempo,
                        distancia: result[i].distancia,
                        precio: result[i].precio,
                        max_corredores: result[i].max_corredores,
                        fecha: result[i].fecha
                    }
                    carreras.push(carrera)
                }
                //console.log(carreras);
                res.send({ carreras: carreras });
                //res.redirect('main.html');
            } else {
                // console.log("Fallo consulta Carrera");
                return 0;
                //res.redirect('index.html');
            }
        }
    );

});
// TO CHECK THE RACES RUNNED AND TAKE THE INFO
app.post("/historialCarreras", function(req, res) {
    //console.log(req.body);

    let idCarreraHistorial = req.body.idCarrera;
    // console.log(idCarreraHistorial);

    pool.query(
        "SELECT nombre FROM `carreras` WHERE id_carrera IN (" + idCarreraHistorial + ");SELECT * FROM `tiempos-carreras` WHERE id_carrera IN (" + idCarreraHistorial + ")",
        function(err, result) {
            //console.log(result);
            if (result.length > 0) {
                res.send({
                    result: result,
                });
            } else {

                //console.log("Fallo consulta Carrera");
                return 0;
            }
        }
    );

});

// TO CHECK THE RACES BOUGHT AND TAKE THE INFO

app.post("/historialCompras", function(req, res) {

    //console.log(req.body);

    let idCarreraCompra = req.body.idCarrera;
    //console.log(idCarreraCompra);

    pool.query(
        "SELECT nombre FROM `carreras` WHERE id_carrera IN (" + idCarreraCompra + ");SELECT * FROM `usuarios-carreras` WHERE id_carrera IN (" + idCarreraCompra + ")",
        function(err, result) {
            // console.log(result);
            if (result.length > 0) {
                res.send({
                    result: result,
                });
            } else {

                // console.log("Fallo consulta Carrera");
                return 0;
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
        // console.log("Petición", req.body);

        if (err) {
            res.send({ isValid: false });
        } else {
            pool.query("SELECT * FROM usuarios WHERE id_usuario LIKE " + token.userid + ";", function(
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
                    id_categoria: results[0].id_categoria,
                    genero: results[0].genero
                };
                // console.log(userData);

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