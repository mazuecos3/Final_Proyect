export { getCookieValue };
export { cookieRacesValues };
export { logOut };
import { createCookie } from "./login.js";



//FUNCTION THATS REPEATS IN SOME JS, SO PREFER STAY HERE THAN REPEAT THE SAME CODE
function getCookieValue(cookieName) {

    // SPLIT AND SUBSTRING TO TAKE ONLY THE TEXT THAT WE WANT BECAUSE ALL IS A STRING
    let splitCookie = document.cookie.split(cookieName + "=")[1];
    let cookie;

    //console.log("SPLITTTTTT", splitCookie);


    //if doesn't exist ";" is because we only have the userToken cookie, so take all the lenght of the value, but 
    // if we have more than 1 cookie they are going to concatenate the strings separating by ";" so if we have more than 1 cookie
    // we are going to take the lenght until ";" not all the cookie lenght.

    if (splitCookie !== undefined) {


        if (splitCookie.indexOf(';') !== -1) {
            //  console.log("if");
            cookie = splitCookie.substring(0, splitCookie.indexOf(';'));
        } else {
            // console.log("else");
            cookie = splitCookie.substring(0, splitCookie.length);
        }
        //console.log("RETURN", cookie)
        return cookie;
    }

}

// Function that gives the value of the cookie for the num of the all races when u add to the cart shopping 
function cookieRacesValues() {


    let cart = document.getElementById("spanCart");

    let result = getCookieValue('carreras');

    //console.log("Result Cookie Carreras", result);

    // If the result is not undefined we can work, else do nothing.
    if (result !== undefined) {

        if (result === "") {
            cart.innerText = "0";
        } else {

            let split = result.split(",");
            cart.innerText = split.length;

        }


        cart.style.visibility = "visible";
    }
}

// Function that create the new cookie but with sesion expire = 0 , if you do that, 
//the cookie will dissapear(perfect because we want this when we will exit the page)
function logOut() {

    createCookie("tokenUser", "", 0);
    createCookie("carreras", "", 0);
}