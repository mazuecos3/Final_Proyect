

function reviseCookie() {

    let splitCookie = document.cookie.split(";")[0].indexOf("=");
    let cookie = document.cookie.substring(splitCookie + 1, document.cookie.length);
    fetch("http://localhost:3000/verifyToken", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ token: cookie }),
      })
        .then((response) => response.json())
        .then((response) => console.log(response)
        )
}


function main(){

  headerInfo();
  leftInfo();
  rightInfo();
}
function headerInfo() {
  let container = document.getElementById("headerInfo");
  console.log(container);
  container.innerHTML = "";

  container.innerHTML = 
  `
  <div class="profile-head">
  <h5>
     Oscar Mazuecos Montoro
  </h5>
  <h6>
    Dueño / Runner / Admin
  </h6>
  <p class="proile-rating">Carreras Totales : <span>7</span></p>
  <ul class="nav nav-tabs" id="myTab" role="tablist">
      <li class="nav-item">
          <a class="nav-link active" id="home-tab" data-toggle="tab" href="#">Datos</a>
      </li>
      <li class="nav-item">
          <a class="nav-link" id="profile-tab" href="#" >Historial</a>
      </li>
     
  </ul>
</div>`
  
}
function leftInfo() {
  let container = document.getElementById("leftInfo");
  console.log(container);
  container.innerHTML = "";

  container.innerHTML = 
  `
  <div class="profile-work">
  <p>Dueño / Runner</p>
  <a>10k Valencia</a><br />
  <a >10k Paiporta-Torrent</a><br />
  <a >10k Paiporta-Torrent</a><br />
  <a >10k Paiporta-Torrent</a><br />
  <a >10k Paiporta-Torrent</a><br />
</div>
  
  `;
}
function rightInfo() {
  let container =  document.getElementById("rightInfo");
  console.log(container);
  container.innerHTML = "";
  container.innerHTML = 
  `
  <div class="tab-content profile-tab" id="myTabContent">
  <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">       
      <div class="row">
          <div class="col-md-6">
              <label>Nombre</label>
          </div>
          <div class="col-md-6">
              <p>Oscar Mazuecos</p>
          </div>
      </div>
      <div class="row">
          <div class="col-md-6">
              <label>Email</label>
          </div>
          <div class="col-md-6">
              <p>oscar3mazuecos@hotmail.com</p>
          </div>
      </div>
      <div class="row">
          <div class="col-md-6">
              <label>Edad</label>
          </div>
          <div class="col-md-6">
              <p>20</p>
          </div>
      </div>
     
  </div>
 
</div>

  `;
}

function init() {
  main();
  reviseCookie();
}


window.onload = init;

