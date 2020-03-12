       <?php
            require_once("bd.php");

            $usuario = $_POST["usuario"];
            $email = $_POST["email"];
            $edad = $_POST["edad"];
            $password = $_POST["password"];
            $password_repeat = $_POST["password_repeat"];

            echo $usuario, $email, $edad, $password, $password_repeat;

            $consulta = "INSERT INTO valenrunner ( usuario, email, edad, password)
            VALUES ('$usuario', '$email',$edad,'$password');";
        
            $result = mysqli_query($conn, $consulta);
            
            $_POST["usuario"] = "patata";
          
            mysqli_close($conn);

           
                                    
        ?>
      
