
<?php
  $servidor = "gupoe.com"; # Puede ser una IP o un nombre DNS
  $username = "gupoecom_mazuecos3";
  $passwordDB = "minimazu3";
  $basedatos = "gupoecom_valenrunner";

  # Crear conexión. Opcionalmente se puede poner como quinto parámetro
  # el puerto
  $conn = mysqli_connect($servidor, $username, $passwordDB, $basedatos);

  # Comprobar conexión
  if (!$conn) {
      die("Conexi&ocacuten fallida: " . mysqli_connect_error());
      echo "Error";
  }
  echo "Exito <br><br>";
 

?>
    
