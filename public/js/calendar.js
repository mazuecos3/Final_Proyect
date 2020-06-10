import { logOut } from "./exports.js";
import { cookieRacesValues } from "./exports.js";


const day = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

function dates() {
    let btnLogOut = document.getElementById("logOut");
    btnLogOut.addEventListener("click", logOut);

    let contador = 0;
    let num;

    let divDates = document.getElementsByClassName("num-dates");
    // console.log(divDates[0]);
    divDates[0].innerHTML = "";
    let date = document.createElement("div");

    date.classList.add("dates");

    for (let i = 1; i <= 35; i++) {
        contador++;

        num = document.createElement("p");
        num.dataset.num = contador;


        //CREATION NUMBERS OF THE CALENDAR
        if (contador < 10) {
            num.innerText = "0" + i;

            //FUNCTION WHEN U CLICK, CHANGUE ALL THE LEFT SECTION CALENDAR OF THIS DAY
            num.addEventListener("click", () => openDate(event.target.innerText, event.target.dataset.num));
        } else {
            if (contador <= 15 && contador >= 14) {
                num.classList.add("dissabledRaces");
            }
            if (contador <= 24 && contador > 18) {
                num.classList.add("active-day");
            }
            // IF THEY ARE BIGGER THAN 30 WE HAVE TO START 01 , 02 , etc. And add classlist grey
            if (contador <= 30) {
                num.innerText = i;
                //FUNCTION WHEN U CLICK, CHANGUE ALL THE LEFT SECTION CALENDAR OF THIS DAY
                num.addEventListener("click", () => openDate(event.target.innerText, event.target.dataset.num));
            } else {
                num.classList.add("grey");
                num.innerText = i - 30;
            }

        }


        // console.log(num);
        //Add all to the to the father class
        date.appendChild(num);
        //Add all to the to the father DOM
        divDates[0].appendChild(date);


        //num.addEventListener("click", () => openDate(num.value,num.innerText));

    }


}

function openDate(date, d) {



    // for take Monday, Tuesday... etc
    d = (d - 1) % 7
        // array of races on this day
    let races = [
        "Carrera en Paiporta, (Click aquí para mas información)", "Carrera en Catarroja, (Click aquí para mas información)",
        "Carrera en Massarrojos, (Click aquí para mas información)", "Carrera en Cheste, (Click aquí para mas información)",
        "VIII Playa Pinedo, (Click aquí para mas información)", "VII Rio Turia, (Click aquí para mas información)",
        "Valencia Rio - Mestalla, (Ninguna información disponible)", "Avenida Joaquin - Puerto (Ninguna información disponible"

    ];
    let leftDiv = document.querySelector(".calendar-left");
    leftDiv.innerHTML = ``;
    let finalRace;
    // Asign for each ID-race, his name race
    if (event.target.classList == "active-day" || event.target.classList == "dissabledRaces") {

        let idRaces = event.target.dataset.num;

        switch (idRaces) {
            case "14":
                finalRace = races[6];

                break;
            case "15":
                finalRace = races[7];

                break;
            case "19":
                finalRace = races[0];
                break;
            case "20":
                finalRace = races[1];
                break;
            case "21":
                finalRace = races[2];
                break;
            case "22":
                finalRace = races[3];
                break;
            case "23":
                finalRace = races[4];
                break;
            case "24":
                finalRace = races[5];
                break;


        }
        // Inner all the dates in the current-events section

        leftDiv.innerHTML = `
 <div class="num-date">` + date + `</div>
 <div class="day">` + day[d] + `</div>
 <div id="current-events" class="current-events">Próximos Eventos :
   <ul>
   <li> <a href="main.html#` + idRaces + `">` + finalRace + ` </a></li>
   </ul>
</div>
</div>
 `
    } else {


        leftDiv.innerHTML = `
  <div class="num-date">` + date + `</div>
  <div class="day">` + day[d] + `</div>
  <div  class="current-events">Próximos Eventos :
    <ul>
  <li>  Ningún evento programado.</li>
    </ul>
 </div>
 </div>
  `

    }
    /* let allDissableRaces = document.querySelectorAll(".dissabledRaces").length;
    console.log(document.querySelectorAll(".dissabledRaces").length);
    for (let i = 0; i < allDissableRaces.length; i++) {
        console.log(document.getElementById("current-events"));

    } */






    // console.log(leftDiv);
}

function init() {
    console.log("inicio JS");
    dates();
    cookieRacesValues();


}

window.onload = init;