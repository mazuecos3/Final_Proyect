

function init() {
    console.log("inicio JS");
    dates();
}


function dates() {
    let contador = 0;
    let num;
    let divDates = document.getElementsByClassName('num-dates');
   // console.log(divDates[0]);
    divDates[0].innerHTML = "";
   let date = document.createElement("div");
   
    date.classList.add("week");
    console.log(date);
for (let i = 1; i <=42; i++) {
    contador++
    num = document.createElement("p");
    if (contador < 10) {
        num.innerText = "0"+i; 
    }else{
        num.innerText = +i; 
    }
  
    
    console.log(num);
    date.appendChild(num);
divDates[0].appendChild(date);
}


    /*divDates[0].innerHTML =   `
    <div class="first-week"> 01 02 03 04 05 06 07</div>
    <!-- first week -->
    <div class="second-week"> 08 09 10 11 12 13 14</div>
    <!-- second week -->
    <div class="third-week"> 15 16 17 18 19 20 21</div>
    <!-- third week -->
    <div class="fourth-week"> 22 23 24 25 26 27 28</div>
    <!-- fourth week -->
    <div class="fifth-week"> 29 30 <span class="grey">01 02 03 04 05</span></div>
    <!-- fifth week -->
    <div class="sixt-week"><span class="grey"> 06 07 08 09 10 11 12</span></div>
    <!-- sixt week -->
`;*/


}



window.onload = init;