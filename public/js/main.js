

// FUNCTION TO CREATEA REGISTER FORM
function register() {
    let divEntero = document.getElementById("login");

    console.log(divEntero);
    divEntero.innerHTML = "";
    divEntero.innerHTML =
        `
    <form action="./consulta" method="POST">
    <fieldset class="clearfix">
        <p><span class="fa fa-user"></span><input id="usuario" name="usuario" type="text" Placeholder="Usuario" ></p>
        <p><span class="fa fa-envelope"></span><input id="email" name="email" type="text" Placeholder="sample@gmail.com" >  </p>
        <p><span class="fa fa-circle-o"></span><input id="edad" name="edad" type="number" Placeholder="Edad" min="12" max="99" maxlength="2">  </p>
        <p><span class="fa fa-lock"></span><input id="contraseña" name="password" type="password" Placeholder="Contraseña" >  </p>
        <p><span class="fa fa-lock"></span><input id="RepeatContraseña" name="password_repeat" type="password" Placeholder="Repetir Contraseña"></p>
        <div>
            <input id="registro" type="submit" value="Registrarse">          
        </div>
    </fieldset>
</form>
`
        ;
    document.getElementById("edad").addEventListener("keypress", function () {
        if (document.getElementById("edad").value) {

        } console.log(document.getElementById("edad"));

    });
    //document.getElementById("registro").addEventListener("click", login);
}



// FUNCTION TO CREATE THE LOGIN
function login() {
    let divEntero = document.getElementById("login");

    console.log(divEntero);
    divEntero.innerHTML = "";
    divEntero.innerHTML =
        `
    <form action="./comprobar" method="POST">
    <fieldset class="clearfix">
        <p><span class="fa fa-user"></span><input id="usuario" type="text" name="usuario" Placeholder="Usuario " ></p>  
        <p><span class="fa fa-lock"></span><input id="email" type="password" name="password" Placeholder="Contraseña" >  </p>
        <div>
            <input id="registro" type="submit" value="Registrarse">
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
function addEvents() {
    document.getElementById("registro").addEventListener("click", register);
    document.getElementById("acceder").addEventListener("click", IniciarLogin);
}
// FIRST FUNCTION & ADDVEVENTS
function init() {
    console.log("Iniciando...")
    login();
    addEvents();
    
    //CALL THE OTHER JS WITH VALIDATOR LOGIN!
    mainLogin();

    //CALL THE OTHER JS WITH VALIDATOR LOGIN!
   mainRegister();

}
// FIRST FUNCTION WHEN ONLOAD THE PAGE
window.onload = init;