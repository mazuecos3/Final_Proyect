export { createCookie };



// FUNCTION TO CREATEA REGISTER FORM
function register() {
    let divEntero = document.getElementById("login");
    let warning = document.getElementsByClassName("alert-danger");
    //console.log(divEntero);
    divEntero.innerHTML = "";
    divEntero.innerHTML = `
   
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
`;
    /*Comprobación errores*/

    /*Si la contraseña no es igual a repetir contraseña, lanzar alert*/

    document.getElementById("registro").addEventListener("click", function() {
        if (
            document.getElementById("contraseña").value !=
            document.getElementById("RepeatContraseña").value
        ) {
            console.log("las contraseñas no son iguales");

            console.log(warning[0]);
            warning[0].style.visibility = "visible";
        }
    });

    volver();
}

function createWarning() {}

// FUNCTION TO CREATE THE LOGIN
function login() {
    let divEntero = document.getElementById("login");

    //console.log(divEntero);
    divEntero.innerHTML = "";
    divEntero.innerHTML = `
    <form>
    <fieldset class="clearfix">
    <h2>Inicio Sesión</h2>
        <p><span class="fa fa-user"></span><input id="usuario" type="text" name="usuario" Placeholder="Usuario"></p>  
        <p><span class="fa fa-lock"></span><input id="password" type="password" name="password" Placeholder="Contraseña" >  </p>
        <div>
            <input id="registro" type="button" value="Registrarse">
            <input id="acceder" type="button" value="Acceder ">          
        </div>
    </fieldset>
</form>
`;

    addEvents();
}
//FUNCTION TO OPEN THE LOGIN
function IniciarLogin() {
    let username = document.getElementById("usuario").value;
    let password = document.getElementById("password").value;


    console.log(document.getElementById("usuario").value);
    console.log(document.getElementById("password").value);
    //FETCH to check if the response of the server, if is correct we create a cookie
    // with the tokenUser and the response signed by the token, alsa when all of this is
    //correct we can go inside the application.

    // HEROKU LINK
    /*"http://valenrunner.herokuapp.com/comprobar"*/
    fetch("http://valenrunner.herokuapp.com/comprobar", {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({ username: username, password: password }),
        })
        .then((response) => response.json())
        .then((response) => createCookie("tokenUser", response.token, 200))
        .then(() => window.location.replace("../main.html"));

}

function volver() {
    document.getElementById("volver").addEventListener("click", login);
}

function addEvents() {
    document.getElementById("acceder").addEventListener("click", IniciarLogin);
    document.getElementById("registro").addEventListener("click", register);
}

function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        var expires = "; expires=" + date.toGMTString();
    } else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}

function addEnterListener() {
    // Execute a function when the user releases a key on the keyboard
    document.addEventListener("keyup", function(event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            document.getElementById("acceder").click();
        }
    });
}

//TODO!!!! CRATE THIS FUNCTION FOR ALL SCRIPTS IN ONLY 1 PLACE!!!
function comprobarCookie() {

    // SPLIT AND SUBSTRING TO TAKE ONLY THE TEXT THAT WE WANT BECAUSE ALL IS A STRING
    let splitCookie = document.cookie.split(";")[0].indexOf("=");
    let cookie = document.cookie.substring(splitCookie + 1, document.cookie.length);
    //http://valenrunner.herokuapp.com//comprobar for heroku 
    fetch("http://localhost:3000/verifyToken", {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({ token: cookie }),
        })
        .then((response) => response.json())
        .then((response) => {
            console.log(response.isValid)

            if (response.isValid) {
                window.location.replace("../main.html");
            } else {
                //window.location.replace("../index.html");

            }

        })


}


// FIRST FUNCTION & ADDVEVENTS
function init() {
    comprobarCookie();
    console.log("Iniciando...");
    login();
    addEvents();
    addEnterListener();

    //Call function (when u press Enter you are going to the home page)
    //  goLoginWithEnter();
}

// FIRST FUNCTION WHEN ONLOAD THE PAGE
window.onload = init;