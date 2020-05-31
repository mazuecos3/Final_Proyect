import { createCookie } from "./login.js";
import { getCookieValue } from "./exports.js";
export { logOut };


let totalRacesDone = 0;
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
    //http://valenrunner.herokuapp.com/verifyToken for heroku 
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
  <h5>
    ` + usuario + ` / ` + userRol + ` 
  </h5>
  <br>
  <h6>Estado:</h6>
  <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.. "</p>
  <p class="proile-rating">Carreras Totales : <span>7</span></p>
  <ul class="nav nav-tabs" id="myTab" role="tablist">
      <li class="nav-item">
          <a class="nav-link active" id="home-tab"  href="#">Datos</a>
      </li>
      <li class="nav-item">
          <a class="nav-link" id="profile-tab" href="#" >Historial</a>
      </li> 
  </ul>
</div>`
}

function leftInfo() {
    let container = document.getElementById("leftInfo");
    //console.log(container);
    container.innerHTML = "";

    container.innerHTML =
        `
  <div class="profile-work">
  <p> ` + userRol + `</p>
  <a >` + races[Math.floor(Math.random() * 8)] + `</a><br />
  <a >` + races[Math.floor(Math.random() * 8)] + `</a><br />
  <a >` + races[Math.floor(Math.random() * 8)] + `</a><br />
  <a >` + races[Math.floor(Math.random() * 8)] + `</a><br />
  <a >` + races[Math.floor(Math.random() * 8)] + `</a><br />
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
  <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">       
      <div class="row">
          <div class="col-md-6">
              <label>I Carrera por el día mundial del TDH</label>
            
          </div>
          <div class="col-md-6">
              <p>16-06-2020</p>
            
          </div>
      </div>
      <div class="row">
          <div class="col-md-6">
              <label>VIII Can-rrera Bioparc Valencia</label>
          </div>
          <div class="col-md-6">
              <p>17-06-2020</p>
          </div>
      </div>
      <div class="row">
          <div class="col-md-6">
              <label>XLIV Volta a Peu als Barris</label>
          </div>
          <div class="col-md-6">
              <p>18-06-2020</p>
          </div>
      </div>
  </div>
</div>

  `;
    }
}


//function imported from profile.js that add event to the 
//button in nav (goOut) and removes the cookie
//Set the cookie with value "empty" and expires with 0 ( is the same as sesion)
function logOut() {

    createCookie("tokenUser", "", 0);
    createCookie("carreras", "", 0);
}


function loadFile(event) {
    var image = document.getElementById('output');
    image.src = URL.createObjectURL(event.target.files[0]);
}



function init() {

    // First of all we call to revise the cookie function, inside of this 
    //we are going to get all the values from the bdd in the response so we need
    // the reviseCookie like the first Call in this script
    reviseCookie();

}


window.onload = init;