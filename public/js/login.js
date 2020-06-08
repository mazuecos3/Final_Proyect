export { createCookie };
import { getCookieValue } from "./exports.js";



// FUNCTION TO CREATEA REGISTER FORM
function register() {

    let divEntero = document.getElementById("login");

    //console.log(divEntero);
    divEntero.innerHTML = "";
    divEntero.innerHTML = `
   
    <form id="formRegister">
    <h2>Registrarse</h2>
    <fieldset class="clearfix">
        <p><span class="fa fa-user"></span><input id="usuario" name="usuario" type="text" Placeholder="Usuario"  required></p>
        <p><span class="fa fa-envelope"></span><input id="email" name="email" type="text" Placeholder="sample@gmail.com "   required>  </p>
        <p><span class="fa fa-circle-o"></span><input id="edad" name="edad" type="number" Placeholder="Edad" min="12" max="99" maxlength="2" required>  </p>
        <p><span class="fa fa-user"></span>
            <select name="generos" id="options" >
                <option value="" selected hidden >Sexo</option>
                <option value="Hombre">Hombre</option>
                <option value="Mujer">Mujer</option>
            </select>
        </p>
        <p><span class="fa fa-user"></span>
        <select name="id_categoria" id="categorias">
        <option value="" selected hidden >Categorías</option>
            <option value="1">Infantil</option>
            <option value="2">Cadete</option>
            <option value="3">Juvenil</option>
            <option value="4">Junior</option>
            <option value="5">Promesa</option>
        </select>
    </p>
        <p><span class="fa fa-lock"></span><input id="contraseña" name="password" type="password" Placeholder="Contraseña" required>  </p>
        <p><span class="fa fa-lock"></span><input id="RepeatContraseña" name="password_repeat" type="password" Placeholder="Repetir Contraseña" required></p>
    <div>
              
            <input id="volver" type="button" value="Volver"> 
            <input id="registroRegister" type="button" value="Registrarse">       
        </div>
    </fieldset>
</form>
<br>
<div class="alert alert-danger">
<strong>Error!</strong> Las contraseñas no coinciden.
</div>
`;
    volver();

    document.getElementById("registroRegister").addEventListener("click", fetchRegister);
    document.getElementById("registroRegister").addEventListener("click", function(event) {
        event.preventDefault()
    });
}


function fetchRegister() {
    // Values to send to the server 
    let username = document.getElementById("usuario").value;
    let password = document.getElementById("contraseña").value;
    let RepeatContraseña = document.getElementById("RepeatContraseña").value;
    let email = document.getElementById("email").value;
    let edad = document.getElementById("edad").value;
    let options = document.getElementById("options").value;
    let categorias = document.getElementById("categorias").value;
    // Get the errors because if some error is empty we have to stop send it to the server
    let errores = 0;
    /*Comprobación errores*/
    let warning = document.getElementsByClassName("alert-danger");
    let option;
    console.log(username.length);

    /* If the username is empty*/
    warning[0].innerHTML = "";
    if (username === '' || username.length > 15) {
        warning[0].innerHTML = `<strong>Error!</strong> El usuario no puede estar vacío o contener más de 20 caracteres.`
        errores++;
    } else {
        /* If the email is empty or the syntax is not good*/
        if (email === '') {
            warning[0].innerHTML = `<strong>Error!</strong> El e-mail no puede estar vacío.`
            errores++;
        } else if (!isEmail(email)) {
            warning[0].innerHTML = `<strong>Error!</strong> El email no contiene @ o caracteres de e-mail..`
        } else {
            /* If the password aren't the same show an alert*/
            if (password === '' || password.length > 20) {
                // Put the warning with the text that we want
                warning[0].innerHTML = `<strong>Error!</strong> La contraseña no puede estar vacía o contener más de 20 caracteres.`
                errores++;
            } else {
                /* If the second password */
                if (RepeatContraseña === '') {
                    // Put the warning with the text that we want
                    warning[0].innerHTML = `<strong>Error!</strong> La segunda contraseña no puede estar vacía.`

                } else if (password !== RepeatContraseña) {
                    // Put the warning with the text that we want
                    warning[0].innerHTML = `<strong>Error!</strong>  Las contraseñas  no coinciden.`

                }
            }
        }

    }

    warning[0].style.visibility = "visible";
    console.log(errores);

    // FETCH TO SEND ALL THE VALUES TO THE SERVER 
    // HEROKU LINK
    // https://valenrunner.herokuapp.com/consulta for heroku
    // http://localhost:3000/comprobar for localhost
    if (errores === 0) {
        warning[0].style.visibility = "hidden";
        console.log("Bien");
        fetch("https://valenrunner.herokuapp.com/consulta ", {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
                username: username,
                password: password,
                email: email,
                edad: edad,
                options: options,
                categorias: categorias
            }),
        })

        .then((response) => response.json())
            .then((response) => {
                console.log("Response: ", response.response)

                if (response.response) {
                    window.location.replace("index.html")
                } else {

                }
            });

    }
}



// Check if the email syntax is correct
function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}





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
    // with the tokenUser and the response signed by the token, also when all of this is
    //correct we can go inside the application.

    // HEROKU LINK
    // http://valenrunner.herokuapp.com/comprobar for heroku
    // http://localhost:3000/comprobar for localhost
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

    let cookie;
    cookie = getCookieValue("tokenUser");


    //https://valenrunner.herokuapp.com/verifyToken for heroku 
    //http://localhost:3000/verifyToken for localhost
    fetch("https://valenrunner.herokuapp.com/verifyToken ", {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({ token: cookie }),
        })
        .then((response) => response.json())
        .then((response) => {
            console.log(response);

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