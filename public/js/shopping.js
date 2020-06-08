import { logOut } from "./exports.js";
import { cookieRacesValues } from "./exports.js";
import { getCookieValue } from "./exports.js";
import { createCookie } from "./login.js";

function mainShopping() {

    // call the function exported from exports to put the style in the cart shopping
    cookieRacesValues();
    //take the cookie value to compare the with the id on the bdd
    let allValuesCookie = getCookieValue('carreras');
    // cookie value separated without  ","
    let finalValuesCookie;
    console.log("AllValues Cookie 1" + allValuesCookie);
    if (allValuesCookie !== undefined && allValuesCookie !== "") {
        finalValuesCookie = allValuesCookie.split(",");


        // console.log(finalValuesCookie);

        // add function logout to the logout section
        // console.log(document.getElementById("logOut"));
        let btnLogOut = document.getElementById("logOut");
        btnLogOut.addEventListener("click", logOut);

        let container = document.getElementById("product");
        //console.log(container);

        let urlImage = "https://carreradeltaller.com/wp-content/uploads/2020/03/MartaJFunes_CarreradelTaller-0369-scaled.jpg";
        let raceName;
        let distance;
        let aproxTime;
        let idCarrera;
        let price;
        let maxCorredores;
        let dorsal;

        let totalPrice = 0;

        // Fetch to the server to take the values for our 
        //https://valenrunner.herokuapp.com/comprobarCarreras for heroku 
        //http://localhost:3000/comprobarCarreras for localhost


        if (allValuesCookie !== undefined && allValuesCookie !== "") {

            fetch("https://valenrunner.herokuapp.com/comprobarCarreras", {
                    headers: {
                        "Accept": "application/json",
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
                        maxCorredores = carrera.max_corredores;
                        dorsal = carrera.current_dorsal;

                        let productContainer = document.createElement("div");
                        productContainer.innerHTML = `
              <div id="row` + idCarrera + `" class="row">
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
                                              <h6 id="price` + idCarrera + `"><strong> ` + price + `€</span></strong></h6>
                                          </div>
                                      </div>
                                      <div class="col-2 col-sm-2 col-md-2 text-right">
                                          <button id="buttonTrash` + idCarrera + `" type="button" class="btn btn-outline-danger btn-xs">
                                              <i class="fa fa-trash" aria-hidden="true"></i>
                                          </button>
                                      </div>
                                    
                                  </div>
                               
                              </div>
              `;
                        totalPrice += price;

                        // function to put the total price to pay 
                        setTotalPrice(totalPrice);
                        container.appendChild(productContainer);
                        // When the container is creatted, we can take the Id added before into the button 
                        //for do  function remove race
                        removeRace(idCarrera, totalPrice);

                    });
                    console.log(totalPrice);
                    paypalPay(totalPrice);
                })
        }

    }


}

function removeRace(id_carrera, totalPrice) {


    // each button id to add event to all of them
    let buttonId = "buttonTrash" + id_carrera;
    let buttonTrash = document.getElementById(buttonId);

    // add event click and the function
    buttonTrash.addEventListener("click", function() {

        // First we have to changue ta value of the total price when we click on each trash button
        // So we take the value of each and later we have to take off the price to the total price
        let inputPrice = document.getElementById("price");
        let totalPrice;
        if (inputPrice.innerText.length <= 2) {
            totalPrice = parseInt(inputPrice.innerText.substring(0, 2));
        } else {
            totalPrice = parseInt(inputPrice.innerText.substring(0, 3));
        }
        let priceInput = "price" + id_carrera;
        let priceSection = document.getElementById(priceInput);
        let price = parseInt(priceSection.innerText.substring(0, 2));


        totalPrice = totalPrice - price;
        paypalPay(totalPrice);
        inputPrice.innerText = totalPrice + "€";

        // Now we have to remove the value of the cookie too.
        let allValuesCookie = getCookieValue('carreras');
        let insertCookie;
        let idRow;
        let row;
        // cookie value separated without  ","
        let finalValuesCookie;
        if (allValuesCookie !== undefined) {
            finalValuesCookie = allValuesCookie.split(",");
            console.log(finalValuesCookie);

            // If the value is only 1 in the races Cookie, we can delete the cookie 
            // because is only 1 value and also we have to remove the row-container too.
            if (finalValuesCookie.length <= 1) {
                console.log("es menor");
                insertCookie = "";

            } else {
                // Else if we have "," before the number we have to separate them with substring
                if (allValuesCookie.lastIndexOf(",") < allValuesCookie.indexOf(id_carrera)) {
                    insertCookie = allValuesCookie.substring(0, allValuesCookie.lastIndexOf(","));

                } else {
                    // Else if the value that we want, have one "," before we have to separate it and take only the value
                    // removing the "," with substring
                    if (allValuesCookie[allValuesCookie.indexOf(id_carrera) - 1] === ",") {

                        let separation = allValuesCookie.substring(allValuesCookie.indexOf(id_carrera), allValuesCookie.length).indexOf(",") + allValuesCookie.indexOf(id_carrera);
                        let start = allValuesCookie.substring(0, allValuesCookie.indexOf(id_carrera) - 1);
                        let end = allValuesCookie.substring(separation, allValuesCookie.length);

                        console.log(start + end);
                        insertCookie = start + end;

                        // Else to remove the last value of the cookie we do the substring of the penultimate value to the last value "length"    
                    } else {
                        insertCookie = allValuesCookie.substring(allValuesCookie.indexOf(",") + 1, allValuesCookie.length);

                    }
                }
            }
        }
        // Here we have to take each div ("row") in this case,
        // to remove riw (display none) 
        idRow = "row" + id_carrera;
        row = document.getElementById(idRow);

        // console.log(row);
        row.style.display = "none";
        // And finally we have to remove the cookie with the insert that we putted before.
        createCookie("carreras", insertCookie, 200);
    });
}


function setTotalPrice(totalPrice) {
    let inputPrice = document.getElementById("price");
    inputPrice.innerText = totalPrice + "€";
}

// Function that creates the Payment with paypal / credit or debit cards.
function paypalPay(totalPrice) {

    // first we take the element because we have to clean it first anyone call, 
    // we are going to create the payment button the first time with all price value and
    // when we remove each race because the value changue.
    let buttonPaypal = document.getElementById("paypal-button");
    buttonPaypal.innerHTML = "";


    paypal.Button.render({
        // Configure environment
        env: 'sandbox',
        client: {
            sandbox: 'demo_sandbox_client_id',
            production: 'demo_production_client_id'
        },
        // Customize button (optional)
        locale: 'en_US',
        style: {
            size: 'small',
            color: 'gold',
            shape: 'pill',
        },

        // Enable Pay Now checkout flow (optional)
        commit: true,

        // Set up a payment
        payment: function(data, actions) {
            return actions.payment.create({
                transactions: [{
                    amount: {
                        total: totalPrice,
                        currency: 'EUR'
                    }
                }]
            });
        },
        // Execute the payment
        onAuthorize: function(data, actions) {
            return actions.payment.execute().then(function() {
                // Show a confirmation message to the buyer
                window.alert('Thank you for your purchase!');
            });
        }
    }, '#paypal-button');

}

function init() {

    console.log("Script starts!!");


    mainShopping();

}

window.onload = init;