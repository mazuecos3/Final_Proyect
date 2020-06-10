import { getCookieValue } from "./exports.js";
import { cookieRacesValues } from "./exports.js";

import { logOut } from "./exports.js";


/* Variables declaration */
let usuario;
let email;
let edad;
let categoria;
let genero;
let userRol = "Runner";

/* --------------------- */

let nombreCarrera;
let nombreCarrera1;

let tiempo;
let tiempo1;
let dorsal;
let dorsal1;
/**/

let nombrePayment;
let nombrePayment1;

let datePayment;
let datePayment1;

function reviseCookie() {

    let cookie;
    cookie = getCookieValue("tokenUser");
    //https://valenrunner.herokuapp.com/verifyToken for heroku 
    //http://localhost:3000/verifyToken for localhost
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
            // Response if is Valid and all the values like user, email, age, etc
            console.log(response)
            usuario = response.usuario;
            email = response.email;
            edad = response.edad;
            categoria = response.id_categoria;
            genero = response.genero;

            //When we have the dates from the response like the username, email, years
            mainProfile();
        })

}

function historyInfo() {

    let idCarrera = [14, 15];
    fetch("http://localhost:3000/historialCarreras", {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
                idCarrera: idCarrera

            }),
        })
        .then((response) => response.json())
        .then((response) => {

            // Name of the race with the time and numberParticipant(dorsal)
            nombreCarrera = response.result[0][0].nombre;
            nombreCarrera1 = response.result[0][1].nombre;

            // Time of the race with the name and numberParticipant(dorsal)
            tiempo = response.result[1][0].tiempo;
            tiempo1 = response.result[1][1].tiempo;

            // numberParticipant(dorsal) of the race with the name and time
            dorsal = response.result[1][0].dorsal;
            dorsal1 = response.result[1][1].dorsal;


            leftInfo();
        });

}

function payMentInfo() {

    let idCarrera = [14, 15];
    fetch("http://localhost:3000/historialCompras", {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
                idCarrera: idCarrera

            }),
        })
        .then((response) => response.json())
        .then((response) => {

            // Name of the race with the date
            nombrePayment = response.result[0][0].nombre;
            nombrePayment1 = response.result[0][1].nombre;

            // una vez tenemos las fechas para quedarnos unicamente con el texto que nos interesa
            // el siguiente formato XXXX/XX/XX hacemos un substring de el resultado desde 0 hasta 10.

            datePayment = response.result[1][0].fecha_compra.substring(0, 10);
            datePayment1 = response.result[1][1].fecha_compra.substring(0, 10);

            console.log(nombrePayment, datePayment, nombrePayment1, datePayment1);



            rightInfo();
        });

}


//call all functions
function mainProfile() {
    historyInfo();
    payMentInfo();
    headerInfo();



    //add function logout to the logout section
    //console.log(document.getElementById("logOut"));
    let btnLogOut = document.getElementById("logOut");
    btnLogOut.addEventListener("click", logOut);

    //Add function to the the click on upload image to set the image that yo want
    document.getElementById("file").addEventListener("change", () => loadFile(event));
}

function headerInfo() {

    let container = document.getElementById("headerInfo");
    // console.log(container);
    container.innerHTML = "";
    container.innerHTML =
        `
  <div class="profile-head">
  <h1>Perfil de Valenrunner </h1>
  <br>
  
  <p id="textUser"> ` + usuario + ` / ` + userRol + ` </p>
  <p class="proile-rating">Carreras Totales : <span>0</span></p>
  <ul class="nav nav-tabs" id="myTab" role="tablist">
      <li class="nav-item">
          <a class="nav-link active" id="home-tab"  href="#">Datos</a>
      </li>
      <li class="nav-item">
          <a class="nav-link" id="profile-tab" href="#" >Historial de Compra</a>
      </li> 
  </ul>
</div>`
}

function leftInfo() {
    let container = document.getElementById("leftInfo");
    let alertNoRaces = "Aún no has completado ninguna carrera.";


    //console.log(container);
    container.innerHTML = "";

    // Users to check if the fetch works and only take this values for history racers / shopping 
    if (usuario === "runnerPrueba" || usuario === "runnerPrueba2") {
        container.innerHTML =
            `
<div class="profile-work">
<p> Historial de carreras: </p>
<p>- ` + nombreCarrera + " / " + tiempo + "h  /  Dorsal Número: " + dorsal + `</p><br />
<p>- ` + nombreCarrera1 + " / " + tiempo1 + "h  /  Dorsal Número: " + dorsal1 + `</p><br />
</div>
`;
    } else {
        container.innerHTML =
            `
<div class="profile-work">
<p> Historial de carreras: </p>
<a >` + alertNoRaces + `</a><br />
</div>
`;
    }
}

function rightInfo() {
    let container = document.getElementById("rightInfo");

    let datesTab = document.getElementById("home-tab");
    let historyTab = document.getElementById("profile-tab");

    fillText();
    //Function to changue te active class when u click in the 2 nav links
    datesTab.addEventListener("click", function() {
        datesTab.classList.add("active");
        historyTab.classList.remove("active");
        fillText();
    });

    historyTab.addEventListener("click", function() {
        datesTab.classList.remove("active");
        historyTab.classList.add("active");
        fillText();
    });

}


function fillText() {

    console.log(usuario, email, edad);
    // Get  the localvalue of data because there we have the race putted in Shopping js.
    var dataRecogida = JSON.parse(localStorage.getItem("data"));
    //console.log(dataRecogida);


    // Depends if the category is 1 = Infantil, 2 - Cadete, etc...
    switch (categoria) {
        case 1:
            categoria = "Infantil";
            break;
        case 2:
            categoria = "Cadete";
            break;
        case 3:
            categoria = "Juvenil";
            break;
        case 4:
            categoria = "Junior";
            break;
        case 5:
            categoria = "Promesa";
            break;
    }

    let container = document.getElementById("rightInfo");
    //Depends if you are in the dates/history section you are going to see
    //different info, with the dates that we recopile of the fetch request to the bdd
    let datesTab = document.getElementById("home-tab");
    let historyTab = document.getElementById("profile-tab");

    if (datesTab.classList.contains("active")) {
        console.log(datesTab);
        container.innerHTML = "";

        // Put the values that we take of the bdd with the fetch to the server like username, email, etc...
        container.innerHTML =
            `
  <div class="tab-content profile-tab" id="myTabContent">
  <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">       
      <div class="row" >
          <div class="col-md-6">
              <label>Usuario</label>
          </div>
          <div class="col-md-6">
              <p>` + usuario + `</p>
          </div>
      </div>
      <div class="row">
          <div class="col-md-6">
              <label>Email</label>
          </div>
          <div class="col-md-6">
              <p>` + email + `</p>
          </div>
      </div>
      <div class="row">
          <div class="col-md-6">
              <label>Edad</label>
          </div>
          <div class="col-md-6">
              <p>` + edad + `</p>
          </div>
      </div>

      <div class="row">
      <div class="col-md-6">
          <label>Categoría</label>
      </div>
      <div class="col-md-6">
          <p>` + categoria + `</p>
      </div>
      </div>
      <div class="row">
      <div class="col-md-6">
          <label>Género</label>
      </div>
      <div class="col-md-6">
          <p>` + genero + `</p>
      </div>
      </div>
 
  </div>
</div>

  `;
        // Else if the history section is open put:
    } else {
        //console.log(container);
        console.log(historyTab);
        container.innerHTML = "";
        let name;
        let name1;
        let date;
        let date1;

        // if the users bought some race put the values from bdd 
        if (usuario === "runnerPrueba" || usuario === "runnerPrueba2") {
            name = nombrePayment;
            name1 = nombrePayment1
            date = datePayment;
            date1 = datePayment1;
            // else put that you didnt buy nothing and a example of the format
        } else if (dataRecogida !== null) {
            name = dataRecogida.name;
            date = dataRecogida.fecha;

            name1 = "";
            date1 = "";
        } else {
            name = "Ninguna compra realizada";
            date = "XXXX / XX / XX";
            name1 = "";
            date1 = "";
        }
        // and finally put the values in the HTML
        container.innerHTML =
            `
  <div class="tab-content profile-tab" id="myTabContent">
  <div class="tab-pane fade show active" id="rightSection" role="tabpanel" aria-labelledby="home-tab">       
      <div class="row">
          <div class="col-md-6">
              <p>Nombre carrera:</p>   
          </div>
          <div class="col-md-6">
              <p>Fecha:</p>  
          </div>
      </div>
      <div class="row">
          <div class="col-md-6">
              <label>` + name + `</label>
          </div>
          <div class="col-md-6">
              <p>` + date + `</p>       
          </div>
      </div>
      <div class="row">
      <div class="col-md-6">
          <label>` + name1 + `</label>
      </div>
      <div class="col-md-6">
          <p>` + date1 + `</p>       
      </div>
  </div>
      
  </div>
</div>

  `;
    }
}


//Set the cookie with value "empty" and expires with 0 ( is the same as sesion)
//add function logout to the logout section
//console.log(document.getElementById("logOut"));
let btnLogOut = document.getElementById("logOut");
btnLogOut.addEventListener("click", logOut);

function loadFile(event) {
    var image = document.getElementById('output');
    image.src = URL.createObjectURL(event.target.files[0]);
}


function init() {

    // First of all we call to revise the cookie function, inside of this 
    //we are going to get all the values from the bdd in the response so we need
    // the reviseCookie like the first Call in this script
    reviseCookie();
    cookieRacesValues();




}


window.onload = init;