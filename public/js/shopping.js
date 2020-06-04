import { logOut } from "./exports.js";
import { cookieRacesValues } from "./exports.js";
import { getCookieValue } from "./exports.js";

function mainShopping() {

    // call the function exported from exports to put the style in the cart shopping
    cookieRacesValues();
    //take the cookie value to compare the with the id on the bdd
    let allValuesCookie = getCookieValue('carreras');
    // cookie value separated without  ","
    let finalValuesCookie;
    if (allValuesCookie !== undefined) {
        finalValuesCookie = allValuesCookie.split(",");


        console.log(finalValuesCookie);

        // add function logout to the logout section
        // console.log(document.getElementById("logOut"));
        let btnLogOut = document.getElementById("logOut");
        btnLogOut.addEventListener("click", logOut);

        let container = document.getElementById("product");
        //console.log(container);

        let urlImage = "http://placehold.it/120x80";
        let raceName;
        let distance;
        let aproxTime;
        let idCarrera;
        let price;

        // Fetch to the server to take the values for our 
        //http://valenrunner.herokuapp.com/comprobarCarreras for heroku 
        //http://localhost:3000/comprobarCarreras for localhost
        fetch("http://valenrunner.herokuapp.com/comprobarCarreras", {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({
                    carreras: finalValuesCookie,


                }),
            })
            .then((response) => response.json())
            .then((response) => {
                console.log(response.carreras);
                // For each response, we have all the values that we want , now only have to put the values in our div html
                // with the variables asignations .
                response.carreras.forEach(carrera => {
                    console.log(carrera);
                    idCarrera = carrera.id_carrera;
                    raceName = carrera.nombre;
                    distance = carrera.distancia;
                    aproxTime = carrera.tiempo;
                    price = carrera.precio;

                    let productContainer = document.createElement("div");
                    productContainer.innerHTML = `
              <div class="row">
                                  <div class="col-12 col-sm-12 col-md-2 text-center">
                                      <img class="img-responsive" src="` + urlImage + `" alt="prewiew" width="120" height="80">
                                  </div>
                                  <div class="col-12 text-sm-center col-sm-12 text-md-left col-md-6">
                                      <h4 class="product-name"><strong>` + raceName + `</strong></h4>
                                      <h4>
                                          <small>Distancia ` + distance + `km - ` + aproxTime + `h aprox.</small>
                                      </h4>
                                  </div>
                                  <div class="col-12 col-sm-12 text-sm-center col-md-4 text-md-right row">
                                      <div class="col-3 col-sm-3 col-md-6 text-md-right" style="padding-top: 5px">
                                        
                                      </div>
                                      <div class="col-4 col-sm-4 col-md-4">
                                          <div class="quantity" style="padding-top: 5px">
                                              <h6><strong> ` + price + `€</span></strong></h6>
                                          </div>
                                      </div>
                                      <div class="col-2 col-sm-2 col-md-2 text-right">
                                          <button id="buttonTrash` + idCarrera + `" type="button" class="btn btn-outline-danger btn-xs">
                                              <i class="fa fa-trash" aria-hidden="true"></i>
                                          </button>
                                      </div>
                                  </div>
                              </div>
                              <hr>
              
              `;

                    container.appendChild(productContainer);
                    // When the container is creatted, we can take the Id added before into the button 
                    //for do  function remove race
                    removeRace(idCarrera);

                });

            })
    }
}

function removeRace(id_carrera) {

    let buttonId = "buttonTrash" + id_carrera;
    let buttonTrash = document.getElementById(buttonId);

    //console.log(buttonTrash);
    buttonTrash.addEventListener("click", changueValueCookie);
}


function changueValueCookie() {


    let allValuesCookie = getCookieValue('carreras');
    // cookie value separated without  ","
    let finalValuesCookie;
    if (allValuesCookie !== undefined) {
        finalValuesCookie = allValuesCookie.split(",");
        console.log(finalValuesCookie);

        if (finalValuesCookie.length <= 1) {
            console.log("es menor");

        }
    }
}

function addEvents() {
    let totalPrice = document.getElementById("price");
    //console.log(totalPrice.innerText);
}

function init() {

    console.log("Script starts!!");

    addEvents();
    mainShopping();

}

window.onload = init;