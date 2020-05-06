

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
    num.dataset.num = contador;
    //CREATION NUMBERS OF THE CALENDAR
    if (contador < 10) {
        num.innerText = "0"+i; 
    }else{
        // IF THEY ARE BIGGER THAN 30 WE HAVE TO START 01 , 02 , etc. And add classlist grey
        if (contador <= 30) {
            num.innerText = +i; 
        } else {
            num.classList.add("grey");
            num.innerText = i - 30; 
           
        }
    }
    console.log(num);
    date.appendChild(num);
divDates[0].appendChild(date);
}
}



window.onload = init;