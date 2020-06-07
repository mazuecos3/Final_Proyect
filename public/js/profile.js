import { getCookieValue } from "./exports.js";
import { cookieRacesValues } from "./exports.js";

import { logOut } from "./exports.js";



let usuario;
let email;
let edad;
let userRol = "Runner";
let races = [
    "Marxa conta l'Escleròsi Múltiple", "Carrera por la Esclerosis Múltiple",
    "Carrera Solidaria Popular Cruz Roja", "Carrera Marta Fernández de Castro",
    "Cursa Illa de El Palmar", "I Carrera por el día mundial del TDH",
    " XLIV Volta a Peu als Barris", "VIII Can-rrera Bioparc Valencia"
];

function reviseCookie() {

    let cookie;
    cookie = getCookieValue("tokenUser");
    //https://valenrunner.herokuapp.com/verifyToken for heroku 
    //https://localhost:3000/verifyToken for localhost
    fetch("https://valenrunner.herokuapp.com/verifyToken", {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({ token: cookie }),
        })
        .then((response) => response.json())
        .then((response) => {
            console.log(response)
            usuario = response.usuario;
            email = response.email;
            edad = response.edad;

            // console.log(usuario,email,edad);
            //When we have the dates from the response like the username, email, years
            mainProfile();
        })

}
//call all functions
function mainProfile() {

    headerInfo();
    leftInfo();
    rightInfo();
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
  <h1>Perfil de Valenrunners </h1>
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

    container.innerHTML =
        `
  <div class="profile-work">
  <p> Historial de carreras: </p>
  <a >` + alertNoRaces + `</a><br />
 
</div>
  
  `;
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

//Depends if you are in the dates/history section you are going to see
//different info, with the dates that we recopile of the fetch request to the bdd

function fillText() {
    console.log(usuario, email, edad);

    let container = document.getElementById("rightInfo");

    let datesTab = document.getElementById("home-tab");
    let historyTab = document.getElementById("profile-tab");

    if (datesTab.classList.contains("active")) {
        console.log(datesTab);
        container.innerHTML = "";
        container.innerHTML =
            `
  <div class="tab-content profile-tab" id="myTabContent">
  <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">       
      <div class="row">
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
     
  </div>
 
</div>

  `;
    } else {
        //console.log(container);
        console.log(historyTab);
        container.innerHTML = "";
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
              <label>Ninguna compra realizada.</label>
            
          </div>
          <div class="col-md-6">
              <p>XX / XX / XXXX </p>
            
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