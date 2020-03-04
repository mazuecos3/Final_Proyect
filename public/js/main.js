function init() {
    console.log(document.getElementById("acceder"));
    document.getElementById("acceder").addEventListener("click", prueba);
    console.log("Iniciadno...")
}

function prueba() {
    window.location.replace("../main.html");

}
// The mother of the lamb.
window.onload = init;