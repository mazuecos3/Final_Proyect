const pool = require("./auth");

module.exports.insert = function consutaInsert(usuario, email, edad, password) {
    var values = {usuario, email, edad, password};
    console.log(values);
    
   
     
        pool.query('INSERT INTO valenrunner SET ?;', values, function (err, result) {
          if (err) throw err;
          console.log(result);

          
        });
           
}


module.exports.comprobar = function comprobar(usuario, password, res) {

 //Con esta consulta comprobamos si el usuario esta en la base de datos


    pool.query("SELECT usuario,password FROM valenrunner WHERE usuario LIKE '" + usuario + "' AND password LIKE '"+ password + "';", function (err, result) {
console.log(result.length);
//console.log(result.length);
//si no estuviera en la base de datos el result que devuve es 0, entonces con una condición sencilla de si 
//es mayor que cero(si que está en la base de datos)
//de lo contrario, saldrá una alerta de que hay que registrarse primero
       if (result.length > 0 ) {
        console.log(result[0].usuario);
        console.log(result[0].password);
        res.redirect('main.html'); 
      } else {
        console.log("Registrate Primero");
        res.redirect('index.html'); 
       
      }  
    }); 
  
 
}


/*module.exports = {
    insert: consutaInsert(params)
  };

   */

