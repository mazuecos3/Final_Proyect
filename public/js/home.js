
function main() {
    let main = document.getElementById("main");
    console.log(main);
    main.innerHTML = "";
    for (let i = 1; i < 40; i++) {
      
        let container = document.createElement("div");
        container.classList.add("w3-row-padding");
        container.id = i;
        container.innerHTML = 
        `
       
          <div class="w3-container w3-white">
          <div id="map"></div>
          <p>`+  container.id +`</p>
          <img src="./media/race1.jpg" alt="race1">
            <h3>10k</h3>
            <h6 class="w3-opacity"> 12€</h6>
            <p>Carrera de 10 kilometros maximo 200 participantes</p>
            <p>Ubicacion Prevista: Zona Alameda</p>
          
            <button class="w3-button w3-block w3-black w3-margin-bottom">Reservar</button>
          </div>
        
        `
        console.log(container)
    
       main.appendChild(container);
        
    }
    
}

function events() {
    console.log("eventos");
    
}

function init() {
    
    console.log("Inicio js Home");
    events();
    main();
}



window.onload = init();