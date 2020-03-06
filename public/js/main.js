

// FUNCTION TO CREATEA REGISTER FORM
function register() {
    let divEntero = document.getElementById("login");

    console.log(divEntero);
    divEntero.innerHTML ="";
    divEntero.innerHTML =
`
    <form action="javascript:void(0);" method="get">
    <fieldset class="clearfix">
        <p><span class="fa fa-user"></span><input id="usuario" type="text" Placeholder="Usuario" ></p>
        <p><span class="fa fa-envelope"></span><input id="email" type="text" Placeholder="sample@gmail.com" >  </p>
       
        <p><span class="fa fa-info"></span><input id="edad" type="number" Placeholder="Edad" min="12" max="99" maxlength="2">  </p>
        <p><span class="fa fa-lock"></span><input id="contraseña"type="password" Placeholder="Contraseña" >  </p>
        <p><span class="fa fa-lock"></span><input id="RepeatContraseña"type="password" Placeholder="Repetir Contraseña"></p>
        <div>
            <input id="registro" type="submit" value="Registrarse">          
        </div>
    </fieldset>
</form>
`
;
document.getElementById("edad").addEventListener("keypress", function() {
   if (document.getElementById("edad").value) {
       
   } console.log(document.getElementById("edad"));
    
});
document.getElementById("registro").addEventListener("click", login);
}

// FUNCTION TO CREATE THE LOGIN
function login() {
    let divEntero = document.getElementById("login");

    console.log(divEntero);
    divEntero.innerHTML ="";
    divEntero.innerHTML =
`
    <form action="javascript:void(0);" method="get">
    <fieldset class="clearfix">
        <p><span class="fa fa-user"></span><input id="usuario" type="text" Placeholder="Usuario" ></p>  
        <p><span class="fa fa-lock"></span><input id="email" type="password" Placeholder="Contraseña" >  </p>
        <div>
            <input id="registro" type="submit" value="Registrarse">
            <input id="acceder" type="submit" value="Acceder">          
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
   addEvents();  
   
}
// FIRST FUNCTION WHEN ONLOAD THE PAGE
window.onload = init;