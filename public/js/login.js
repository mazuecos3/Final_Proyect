

// FUNCTION TO CREATEA REGISTER FORM
function register() {
    let divEntero = document.getElementById("login");
    let warning = document.getElementsByClassName("alert-danger");
    //console.log(divEntero);
    divEntero.innerHTML = "";
    divEntero.innerHTML =
        `
   
    <form action="./consulta" method="POST">
    <h2>Registrarse</h2>
    <fieldset class="clearfix">
        <p><span class="fa fa-user"></span><input id="usuario" name="usuario" type="text" Placeholder="Usuario" required></p>
        <p><span class="fa fa-envelope"></span><input id="email" name="email" type="text" Placeholder="sample@gmail.com " required>  </p>
        <p><span class="fa fa-circle-o"></span><input id="edad" name="edad" type="number" Placeholder="Edad" min="12" max="99" maxlength="2" required>  </p>
        <p><span class="fa fa-lock"></span><input id="contraseña" name="password" type="password" Placeholder="Contraseña" required>  </p>
        <p><span class="fa fa-lock"></span><input id="RepeatContraseña" name="password_repeat" type="password" Placeholder="Repetir Contraseña" required></p>
    <div>
              
            <input id="volver" type="button" value="Volver"> 
            <input id="registro" type="submit" value="Registrarse">       
        </div>
    </fieldset>
</form>
<br>
<div class="alert alert-danger">
<strong>Error!</strong> Las contraseñas no coinciden.
</div>
`
        ;
        /*Comprobación errores*/ 
        /*Si la contraseña no es igual a repetir contraseña, lanzar alert*/ 
    document.getElementById("registro").addEventListener("click", function () {
        if (document.getElementById("contraseña").value != document.getElementById("RepeatContraseña").value) {
    console.log("las contraseñas no son iguales");

            console.log(warning[0]);
            warning[0].style.visibility = "visible";
        } 


    });
   
   volver();
}

function createWarning() {
  
}


// FUNCTION TO CREATE THE LOGIN
function login() {
    let divEntero = document.getElementById("login");

    //console.log(divEntero);
    divEntero.innerHTML = "";
    divEntero.innerHTML =
        `
    <form action="./comprobar" method="POST">
    <fieldset class="clearfix">
    <h2>Inicio Sesión</h2>
        <p><span class="fa fa-user"></span><input id="usuario" type="text" name="usuario" Placeholder="Usuario"></p>  
        <p><span class="fa fa-lock"></span><input id="email" type="password" name="password" Placeholder="Contraseña" >  </p>
        <div>
            <input id="registro" type="button" value="Registrarse">
            <input id="acceder" type="submit" value="Acceder ">          
        </div>
    </fieldset>
</form>
`
        ;

    addEvents();
  
}
//FUNCTION TO OPEN THE LOGIN
function IniciarLogin() {

    window.location.replace("../main.html");

}
function volver() {
    document.getElementById("volver").addEventListener("click", login);
}
function addEvents() {
   
    document.getElementById("acceder").addEventListener("click", IniciarLogin);
    document.getElementById("registro").addEventListener("click", register);
  

}

// FIRST FUNCTION & ADDVEVENTS
function init() {
    console.log("Iniciando...")
    login();
    addEvents();
//Call function (when u press Enter you are going to the home page)
  //  goLoginWithEnter();
   


}
// FIRST FUNCTION WHEN ONLOAD THE PAGE
window.onload = init;