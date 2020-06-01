import { logOut } from "./profile.js";
import { createCookie } from "./login.js";
import { getCookieValue } from "./exports.js";

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
    for (let i = 16; i < 19; i++) {

        let container = document.createElement("div");
        container.classList.add("w3-row-padding");
        container.id = i;
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
            <button id="button` + i + `" class="w3-button w3-block w3-black w3-margin-bottom "></button>
          </div>        
        `
            // console.log(container)
        main.appendChild(container);
        eventsReservar(i);

        // console.log(container.id);
        switch (container.id) {
            case "16":
                start = 'Paiporta, Santa Ana';
                end = 'Paiporta, Colombicultura';
                break;

            case "17":
                start = 'Paiporta, Jaume I';
                end = 'Paiporta, Colombicultura';
                break;

            case "18":
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
    //Num of races when u add 1 race to the cart 



    console.log(document.cookie);

    numRaces++;

    //create a new cookie with the number of races added to the shoping cart (because we want the value in all the pages)
    createCookie("carreras", numRaces, 200);

    let cart = document.getElementById("spanCart");
    //console.log(cart);
    cart.innerText = numRaces;

    cart.style.visibility = "visible";
    // window.location.replace("../shopping.html");



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
    console.log("PERRRRO", cookie);

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
                console.log("replace");

                window.location.replace("../index.html");
            }

        })


}





function init() {


    console.log("Inicio js Home");

    comprobarCookie();


    mainHome();


}



window.onload = init();