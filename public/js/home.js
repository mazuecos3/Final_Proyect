
function main() {

   
 let start;
 let end;
 
    let main = document.getElementById("main");
    //console.log(main);
    main.innerHTML = "";
    for (let i = 16; i < 19; i++) {
      
        let container = document.createElement("div");
        container.classList.add("w3-row-padding");
        container.id = i;
        container.innerHTML = 
        `
       
          <div class="w3-container w3-white">
       
          <p>`+  container.id +`</p>
          <img src="./media/race1.jpg" alt="race1">
            <h3>10k</h3>
            <h6 class="w3-opacity"> 12€</h6>
            <p>Carrera de 10 kilometros maximo 200 participantes</p>
            <p>Ubicacion Prevista: Zona Alameda</p>
            <div id="map`+ i +`" class="map"></div>
            <button id="button`+ i +`" class="w3-button w3-block w3-black w3-margin-bottom">Reservar</button>
          </div>
        
        `
       
      
       // console.log(container)
       main.appendChild(container);
       eventsReservar(i);
     // console.log(container.id);
       switch (container.id) {
         case "16":
          start = 'Paiporta, Santa Ana';
          end  ='Paiporta, Colombicultura'; 
           break;

       case "17": 
       start = 'Paiporta, Jaume I';
       end  ='Paiporta, Colombicultura';
       break;

       case "18":
        start = 'Paiporta, Maestre Palau';
        end  ='Paiporta, Colombicultura'; 
         break;
       
       }
       
       
       createMap(i,start, end); 
      
        
    }
    
}



function createMap(i , start ,  end) {
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

function eventsReservar(i) {
 
 let buttonClicked = document.getElementById("button"+i);
  console.log(buttonClicked);
  buttonClicked.addEventListener("click",reservar);

  
}

function reservar() {
  console.log("Reservando . . .")
}
function init() {
    
    console.log("Inicio js Home");
   
    main();
}



window.onload = init();