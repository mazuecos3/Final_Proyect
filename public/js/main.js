

// FUNCTION TO CREATEA REGISTER FORM
function register() {
    let divEntero = document.getElementById("login");

    console.log(divEntero);
    divEntero.innerHTML ="";
    divEntero.innerHTML =
`
    <form action="javascript:void(0);" method="get">
    <fieldset class="clearfix">
        <p><span class="fa fa-user"></span><input type="text" Placeholder="Usuario" ></p>
        <p><span class="fa fa-envelope"></span><input type="text" Placeholder="Email" >  </p>
       
        <p><span class="fa fa-info"></span><input type="text" Placeholder="Edad" >  </p>
        <p><span class="fa fa-lock"></span><input type="password" Placeholder="Contraseña" >  </p>
        <p><span class="fa fa-lock"></span><input type="password" Placeholder="Repetir Contraseña"></p>
        <div>
            <input id="registro" type="submit" value="Registrarse">          
        </div>
    </fieldset>
</form>
`
;

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
        <p><span class="fa fa-user"></span><input type="text" Placeholder="Usuario" ></p>  
        <p><span class="fa fa-lock"></span><input type="password" Placeholder="Contraseña" >  </p>
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