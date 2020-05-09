
function main() {
    let main = document.getElementById("main");
    console.log(main);
    main.innerHTML = "";
    for (let i = 1; i < 13; i++) {
      
        let container = document.createElement("div");
        container.classList.add("w3-row-padding");
        container.id = i;
        container.innerHTML = 
        `
       
          <div class="w3-container w3-white">
          <div id="map"></div>
          <img src="https://lh3.googleusercontent.com/proxy/X4toauq8CuP9lLmUHU-5YYZg9OTntenALSkHDzLqNgtmOI0ndkETH8SnXcL_Rv8SRTsQ-Ala_w7KE0_iEUsFm004cwYnKFmKuG-B3Xn5K2stcAsmuIEIhA" alt="race">
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