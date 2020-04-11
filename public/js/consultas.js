

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "gupoe.com",
  user: "gupoecom_mazuecos3",
  password: "minimazu3",
  database: "gupoecom_valenrunner"
});

module.exports.insert = function consutaInsert(usuario, email, edad, password) {
    var values = {usuario, email, edad, password};
    console.log(values);
    
    con.connect(function(err) {
        if (err) throw err;
        con.query('INSERT INTO valenrunner SET ?;', values, function (err, result) {
          if (err) throw err;
          console.log(result);

          
        });
        con.end();
      });    
}


module.exports.comprobar = function comprobar(usuario, res) {
  var value = usuario;
 
  con.connect(function(err) {
    if (err) throw err;

 //Con esta consulta comprobamos si el usuario esta en la base de datos
    con.query("SELECT usuario FROM valenrunner WHERE usuario LIKE '" + value + "';", function (err, result) {
//console.log(result.length);
//si no estuviera en la base de datos el result que devuve es 0, entonces con una condición sencilla de si 
//es mayor que cero(si que está en la base de datos)
//de lo contrario, saldrá una alerta de que hay que registrarse primero
       if (result.length > 0 ) {
        console.log(result[0].usuario);
        res.redirect('main.html'); 
      } else{
        console.log("Registrate Primero ");
        res.redirect('index.html'); 
       
      }  
    });
    con.end();
  });      
}


/*module.exports = {
    insert: consutaInsert(params)
  };

   */

