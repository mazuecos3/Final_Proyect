

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


module.exports.comprobar = function comprobar(usuario) {
  var value = usuario;
  console.log(value);
  
  con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT usuario FROM valenrunner WHERE usuario LIKE '" + value + "';", function (err, result) {
      if (err) throw err;
      console.log(result);

      
    });
    //con.end();
  });      
}


/*module.exports = {
    insert: consutaInsert(params)
  };

   */

