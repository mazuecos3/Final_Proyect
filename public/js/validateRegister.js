// Array con los inputs que contiene el formulario
const inputs = document.querySelectorAll("input[data-type]");
const buttonLogin = document.getElementById("loginButton");
const buttonSignUp = document.getElementById("buttonRegistrarse");
// Array con las expresiones regulares para comprobar el formulario

const arrayRegEx = [
    /^[A-Za-z' ']{1,30}$/,
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    /^[A-Za-z0-9]{1,30}$/,
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/
];

// Método que se lanza al cargar la página
function init() {

    // Bucle donde añadimos un evento que al quitar el ratón de los inputs,
    // Comprueba los campos del form
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener("blur", comprobarCamposForm, false);
    }

    document.querySelector("input[name='repeat-pass']").addEventListener("blur", comprobarContrasenya);

    buttonSignUp.addEventListener("click", comprobarForm);

    buttonLogin.addEventListener("click", setLoginClass);


}

function comprobarCamposForm() {

  
    // Número del input que vamos a comprobar [0-3]
    let numeroInput = this.getAttribute("data-type");

    // Input que vamos a comprobar en version objeto HTML
    let input = inputs[numeroInput];

    // Expresión regular para testear el input del form
    let regEx = arrayRegEx[numeroInput];

    //console.log(regEx);

    //TODO Acabar el regex
    console.log(regEx);

    // Comprobar si el input está vacio
    if (input.value == "") {

        // De estar vacío, muestra una alerta
        input.parentNode.classList.add("alert-validate");
        input.parentNode.classList.remove("true-validate");
    } else {
        // Si los datos son correctos, muestra un tick verde
        if (regEx.test(input.value)) {
            input.parentNode.classList.add("true-validate");
            input.parentNode.classList.remove("alert-error");
            input.parentNode.classList.remove("alert-validate");
            
            // Si el input es el campo contraseña y es válido, comprueba que el input
            // Repetir contraseña sea válido
            if (input.getAttribute("data-type") == 3) {
                comprobarContrasenya();
            }
        } else {

            // De no ser correctos los datos, muestra un error con una ayuda
            input.parentNode.classList.add("alert-validate", "alert-error");
            input.parentNode.classList.remove("true-validate");
        }
    }
}

// Comprobar que las contraseñas sean iguales
function comprobarContrasenya() {

    // Campo contraseña
    let contrasenya = document.querySelector("input[name='signUpPassword']");

    // Campo repetir contraseña
    let repetirContrasenya = document.querySelector("input[name='repeat-pass']");

    // Validar si las contraseñas coinciden, de ser así, muestra un check verde
    if (contrasenya.value == repetirContrasenya.value) {
        repetirContrasenya.parentNode.classList.add("true-validate");
        repetirContrasenya.parentNode.classList.remove("alert-error");
        repetirContrasenya.parentNode.classList.remove("alert-validate");
    } else {

        // Si no coinciden, muestra un error
        repetirContrasenya.parentNode.classList.add("alert-validate", "alert-error");
        repetirContrasenya.parentNode.classList.remove("true-validate");
    }
}

// Comprobar que los campos introducidos sean válidos
function comprobarForm() {
    // Campos con valores válidos
    let camposValidos;

    // Array con los todos los inputs a comprobar
    let arrayInputs = document.querySelectorAll("input[data-type]");
console.log(arrayInputs);

    // Parseo de NodeList a Array
    arrayInputs = Array.from(arrayInputs);

    // Los campos válidos son aquellos que tienen la clase "true-validate"
    camposValidos = arrayInputs.filter(input => input.parentNode.classList.value.includes("true-validate"));


    // Si todos los campos son válidos (los 5 que hay), se ejecuta el PHP siguiente
    if (camposValidos.length == 4) {
        buttonSignUp.type = "submit";
    } else {

        // Elimina todos los alerts antes de invocarlos para que Brian no le de ganas de
        // Pegarse un puto tiro en la jodida polla, Dios que asco de puta mierda de JS
        // Asíncrono y de putas mierdas JODER.
        $(".more-ot-alert").remove();

        // Sino, se advierte de cuales son los campos erroneos
        let camposInvalidos = document.querySelectorAll(".alert-validate");
        camposInvalidos.forEach(mostrarErrores);
    }
}

// Enseña un error en los campos con valores inválidos
function mostrarErrores(error) {
    //console.log(error);

    // Añadimos al error un evento que al hacerle click, muestre el error que le corresponda
    error.addEventListener("click", openAlert(error));

    error.click();
}

function changeButtonToSubmit() {
}

// Hace una petición por AJAX para ver si el usuario existe
/* function hacerPeticionAjax() {
    // Nombre de usuario a comprobar
    let username = document.querySelector("input[name='signUpUsername']").value;
    let password = document.querySelector("input[name='signUpPassword']").value;
    let name = document.querySelector("input[name='name']").value;
    let gender;
    let isMaleChecked = document.querySelector("input[type='radio']").checked;
    if (isMaleChecked) {
        gender = "Male";
    } else {
        gender = "Female";
    }
    // Formulario con el username por que AJAX es muy especialito y no le gusta
    // El texto plano, tanta tecnologías y muy avanzado que vamos pero luego mira eh
    let formulario = new FormData();
    formulario.append("name", name);
    formulario.append("password", password);
    formulario.append("username", username);
    formulario.append("gender", gender);
    // Petición AJAX con los datos del usuario
    peticion("http://localhost/Proyecto_Final/php/userExists.php", formulario);
} */

// Mostrar una alerts si el usuario no existe
function mostrarUsuarioYaExiste() {
    alert("El usuario ya existe");
}

// Boton de login

function setLoginClass() {
    document.getElementById("includeLogin").classList.replace("includeMenuSinAnimation", "includeMenuAnimationDown");
}

function closeMenu() {
    let deleteLogin = document.querySelector(".includeMenuAnimationDown");
    deleteLogin.classList.replace("includeMenuAnimationDown", "includeMenuAnimationUp");

    deleteLogin.addEventListener("animationend", function () {
        this.classList.replace("includeMenuAnimationUp", "includeMenuSinAnimation");
    });
}
// Al cargar el documento, ejecuta init
window.onload = init;