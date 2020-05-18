import {logOut} from "./profile.js";

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
  console.log(date);
  for (let i = 1; i <= 35; i++) {
    contador++;
    
    num = document.createElement("p");
    num.dataset.num = contador;
   
    
    //CREATION NUMBERS OF THE CALENDAR
    if (contador < 10) {
      num.innerText = "0" + i;

         //FUNCTION WHEN U CLICK, CHANGUE ALL THE LEFT SECTION CALENDAR OF THIS DAY
      num.addEventListener("click", () => openDate( event.target.innerText ,  event.target.dataset.num));
    } else {

      if (contador <= 20 && contador > 15) {
       num.classList.add("active-day");
      }
      // IF THEY ARE BIGGER THAN 30 WE HAVE TO START 01 , 02 , etc. And add classlist grey
      if (contador <= 30) {
        num.innerText = i;
      //FUNCTION WHEN U CLICK, CHANGUE ALL THE LEFT SECTION CALENDAR OF THIS DAY
        num.addEventListener("click", () => openDate( event.target.innerText ,  event.target.dataset.num));
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

console.log(d);

  // for take Monday, Tuesday... etc
  d = (d-1)%7
  // array of races on this day
  let races = 
  [
  "Marxa conta l'Escleròsi Múltiple", "Carrera por la Esclerosis Múltiple" ,
  "Carrera Solidaria Popular Cruz Roja", "Carrera Marta Fernández de Castro", 
  "Cursa Illa de El Palmar", "I Carrera por el día mundial del TDH", 
  " XLIV Volta a Peu als Barris", "VIII Can-rrera Bioparc Valencia"
];
  let leftDiv = document.querySelector(".calendar-left");
  leftDiv.innerHTML = ``;


   if (event.target.classList == "active-day") {

    let idRaces = event.target.dataset.num;

    leftDiv.innerHTML= `
 <div class="num-date">` + date + `</div>
 <div class="day">` + day[d]  + `</div>
 <div class="current-events">Próximos Eventos :
   <ul>
   <li> <a href="main.html#` +idRaces+ `">` +races[Math.floor(Math.random() * 8)]  + ` </a></li>
   <li> <a href="main.html#` +idRaces+ `">` +races[Math.floor(Math.random() * 8)]  + ` </a></li>
   <li> <a href="main.html#` +idRaces+ `">` +races[Math.floor(Math.random() * 8)]  + ` </a></li>
   </ul>
</div>
</div>
 `
} else {

  console.log(event.target.classList);
  leftDiv.innerHTML= `
  <div class="num-date">` + date + `</div>
  <div class="day">` + day[d]  + `</div>
  <div class="current-events">Próximos Eventos :
    <ul>
  <li>  Ningún evento programado.</li>
    </ul>
 </div>
 </div>
  `

}

  
  console.log(leftDiv);
}

function init() {
  console.log("inicio JS");
  dates();
 
}

window.onload = init;