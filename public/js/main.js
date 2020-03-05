

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
        <p><span class="fa fa-male"></span><input type="radio" id="male" name="gender" value="male"><span class="fa fa-female"></span><input type="radio" id="female" name="gender" value="male"></p>
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
}

function login() {
    window.location.replace("../main.html");

}

function init() {
    
    document.getElementById("registro").addEventListener("click", register);
    document.getElementById("acceder").addEventListener("click", login);
    
    console.log("Iniciando...")
}
// The mother of the lamb.
window.onload = init;