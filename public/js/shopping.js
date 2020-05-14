function paid() {
  let container = document.getElementById("product");
  console.log(container);

 
  
  let urlImage = "http://placehold.it/120x80";
  let raceName = "10k Valencia 2020";

  for (let i = 0; i < 4; i++) {
      
    let productContainer = document.createElement("div");
    productContainer.innerHTML = `
      <div class="row">
                          <div class="col-12 col-sm-12 col-md-2 text-center">
                              <img class="img-responsive" src="`+ urlImage+`" alt="prewiew" width="120" height="80">
                          </div>
                          <div class="col-12 text-sm-center col-sm-12 text-md-left col-md-6">
                              <h4 class="product-name"><strong>`+ raceName +`</strong></h4>
                              <h4>
                                  <small>Product description</small>
                              </h4>
                          </div>
                          <div class="col-12 col-sm-12 text-sm-center col-md-4 text-md-right row">
                              <div class="col-3 col-sm-3 col-md-6 text-md-right" style="padding-top: 5px">
                                
                              </div>
                              <div class="col-4 col-sm-4 col-md-4">
                                  <div class="quantity" style="padding-top: 5px">
                                      <h6><strong>25.00 <span class="text-muted">x</span></strong></h6>
                                  </div>
                              </div>
                              <div class="col-2 col-sm-2 col-md-2 text-right">
                                  <button type="button" class="btn btn-outline-danger btn-xs">
                                      <i class="fa fa-trash" aria-hidden="true"></i>
                                  </button>
                              </div>
                          </div>
                      </div>
                      <hr>
      
      `;

      container.appendChild(productContainer);
  }
  
}

function addEvents() {
  let totalPrice = document.getElementById("price");
  console.log(totalPrice.innerText);
}

function init() {
  console.log("Script starts!!");
  addEvents();
  paid();
}

window.onload = init;
