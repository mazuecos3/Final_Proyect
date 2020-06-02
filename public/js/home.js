import { logOut } from "./exports.js";
import { createCookie } from "./login.js";
import { getCookieValue } from "./exports.js";
import { cookieRacesValues } from "./exports.js";


let numRaces = 0;


function mainHome() {


    //add function logout to the logout section
    //console.log(document.getElementById("logOut"));
    let btnLogOut = document.getElementById("logOut");
    btnLogOut.addEventListener("click", logOut);

    let start;
    let end;

    let main = document.getElementById("main");
    console.log(main);
    main.innerHTML = "";
    for (let i = 19; i < 22; i++) {

        let container = document.createElement("div");
        container.classList.add("w3-row-padding");
        /*  container.id = i;
         container.value = i; */
        container.innerHTML =
            `
          <div class="w3-container w3-white">     
          <p>` + container.id + `</p>
          <!--<img src="./media/race1.jpg" alt="race1">-->
            <h3>10k</h3>
            <h6 class="w3-opacity"> 12€</h6>
            <p>Carrera de 10 kilometros maximo 200 participantes</p>
            <p>Ubicacion Prevista: Zona Alameda</p>
            <div id="map` + i + `" class="map"></div>
            <button id="button` + i + `" class="w3-button w3-block w3-black w3-margin-bottom buttonRaces"></button>
          </div>        
        `
            // console.log(container)
        main.appendChild(container);
        eventsReservar(i);

        // console.log(container.id);
        switch (container.id) {
            case "19":
                start = 'Paiporta, Santa Ana';
                end = 'Paiporta, Colombicultura';
                break;

            case "20":
                start = 'Paiporta, Jaume I';
                end = 'Paiporta, Colombicultura';
                break;

            case "21":
                start = 'Paiporta, Maestre Palau';
                end = 'Paiporta, Colombicultura';
                break;
        }
        createMap(i, start, end);
    }


}


function eventsReservar(i) {


    //Now we take the button pressed (with each id)
    let buttonClicked = document.getElementById("button" + i);
    //console.log(buttonClicked);c


    //Add function when click in the button and enable 2 clases(animation and disable the button)
    buttonClicked.addEventListener("click", addCart);
    buttonClicked.addEventListener("click", function() {

        buttonClicked.classList.add("buttonAnimation", "disableButton");
    });
}

function addCart() {


    // Take the id of the button (always is button + id of the race) so...
    let buttonId = event.target.id;
    // Here we take the last 2 characters because we know they are the id of the race, and it
    // is that we want to put in the cookie
    let idforCookie = buttonId.substring(buttonId.length - 2, buttonId.length);
    console.log(idforCookie);
    let finalIdForCookie;

    // If the cookie is undefined or is empty, we create the cookie with the id (simple)
    // else we have to add a ",".

    if (getCookieValue("carreras") === undefined || getCookieValue('carreras').length === 0) {
        finalIdForCookie = idforCookie;

    } else {
        // Now we take the value (the first time the value is empty the cookie and 
        // add our id taked beofre with the race and also the ","
        finalIdForCookie = getCookieValue("carreras") + "," + idforCookie;
    }
    //create a new cookie with the number of races added to the shoping cart (because we want the value in all the pages)

    createCookie("carreras", finalIdForCookie, 200);

    cookieRacesValues();
}

function createMap(i, start, end) {
    let map;
    let dir;

    map = L.map(`map${i}`, {
        layers: MQ.mapLayer(),
        center: [39.429204, -0.417839],
        zoom: 15
    });

    dir = MQ.routing.directions();

    dir.route({
        locations: [
            start,
            end
        ]
    });

    map.addLayer(MQ.routing.routeLayer({
        directions: dir,
        fitBounds: true
    }));
}

//With this function we get the cookie and send the cookie to the server, if the resposne
//is true, can enter to the site, else not.
function comprobarCookie() {
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
            console.log(response.isValid)
            console.log(response);
            if (response.isValid) {

                // window.location.replace("../main.html");
            } else {
                //console.log("replace");

                window.location.replace("../index.html");
            }

        })


}
// We get the cookie at the start of the aplication and check if the values of the cookie 
//are pressed(buttons on home page), if is true, we have to disable the buttons or
// the user can click to much times and we dont want this.
function checkCookieRaces() {
    let buttonsRaces = document.querySelectorAll(".buttonRaces");
    console.log(buttonsRaces);
    let idRacesArray = [];

    // Array 
    for (let i = 0; i < buttonsRaces.length; i++) {

        // console.log(buttonsRaces[i].id);
        let idButtonsRaces = buttonsRaces[i].id.substring(buttonsRaces[i].id.length - 2, buttonsRaces[i].id.length);
        // console.log(idButtonsRaces);
        idRacesArray.push(idButtonsRaces);
    }
    //console.log("ARRAY IDS", idRacesArray);

    let allValuesCookie = getCookieValue('carreras');
    console.log(allValuesCookie);
    if (allValuesCookie !== undefined) {

        allValuesCookie = allValuesCookie.split(',');
        for (let i = 0; i < allValuesCookie.length; i++) {



            for (let j = 0; j < idRacesArray.length; j++) {
                // allValuesCookie[i].indexOf(idRacesArray);

                console.log("i", allValuesCookie[i]);
                console.log("j", idRacesArray[j]);
                console.log(allValuesCookie.indexOf(idRacesArray[j]));

                if (allValuesCookie.indexOf(idRacesArray[j]) !== -1) {
                    buttonsRaces[allValuesCookie.indexOf(idRacesArray[j])].classList.add("disableButton", "buttonbck");
                }


            }

        }

    }


}



function init() {

    console.log("Inicio js Home");

    comprobarCookie();

    cookieRacesValues();

    mainHome();

    checkCookieRaces();



}



window.onload = init();