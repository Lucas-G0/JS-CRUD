let clientCart = JSON.parse(localStorage.getItem("clientCart")) || [];
let catalogoCliente = JSON.parse(localStorage.getItem("catalogo"));

const vermais = document.getElementById("ver_catalogo");
const vercatalogo = document.getElementById("catalogo");

vermais.addEventListener("click", function mostraCatalogo() {
  document.getElementById("carouselExample").style.display = "none";
  document.getElementById("catalog-title").innerHTML = "Catálogo Completo";
  vermais.style.display = "none";
  document.getElementById("catalogo_completo").style.display = "flex";
});

vercatalogo.addEventListener("click", function mostraCatalogo() {
  document.getElementById("carouselExample").style.display = "none";
  document.getElementById("catalog-title").innerHTML = "Catálogo Completo";
  vermais.style.display = "none";
  document.getElementById("catalogo_completo").style.display = "flex";
});

function add_cart(indice, e) {
  let frase = `
  ${catalogoCliente[indice].item} foi adicionado ao carrinho!
  `
  if (e.innerHTML!=frase){
    e.innerHTML=frase;
    clientCart.push(catalogoCliente[indice]);
    saveCart();}
  else {e.innerHTML="Comprar"};
  
}

function saveCart() {
  localStorage.setItem("clientCart", JSON.stringify(clientCart));
}

function atualizarTabelaCliente() {
  let catalogBody = document.getElementById("catalog-main");
  catalogBody.innerHTML = "";

  catalogoCliente.forEach((item, indice) => {
    let li = document.createElement("li");
    li.innerHTML = `
          <div class="card" style="width: 20rem; height: 100%; max-height: 25rem;">
                  <div class="card-body">
                    <div class="card-title">
                    <h5 class="card-title">${item.item}</h5>
                    <h6 class="card-title">R$${item.valor.toFixed(2)}</h6>
                    </div>
                    <div class="img-container">
                    <img class="card-image" src="${item.img}">
                    </div>
                    <p class="card-text">
                      ${item.desc}
                    </p>
                    <button class="btn btn-primary" onclick="add_cart(${indice}, this)">Comprar</button>
                  </div>
            </div>
          `;
    catalogBody.appendChild(li);
  });
}

function atualizarTabelaPopulares() {
  let popularBody1 = document.getElementById("catalog-popular-1");
  let popularBody2 = document.getElementById("catalog-popular-2");
  let popularBody3 = document.getElementById("catalog-popular-3");

  catalogoCliente.forEach((item, indice) => {
    let li = document.createElement("li");
    li.setAttribute("class", "element");
    li.innerHTML = `
            <div class="card" style="width: 20rem; height: 100%; max-height: 25rem;">
                  <div class="card-body">
                    <div class="card-title">
                    <h5 class="card-title">${item.item}</h5>
                    <h6 class="card-title">R$${item.valor.toFixed(2)}</h6>
                    </div>
                    <div class="img-container">
                    <img class="card-image" src="${item.img}">
                    </div>
                    <p class="card-text">
                      ${item.desc}
                    </p>
                    <button class="btn btn-primary" onclick="add_cart(${indice}, this)">Comprar</button>
                  </div>
            </div>
            `;
    if (indice < 4) popularBody1.appendChild(li);
    else if (indice < 8) popularBody2.appendChild(li);
    else if (indice < 12) popularBody3.appendChild(li);
    else return false;
  });
}

// Inicialização da tabela
atualizarTabelaCliente();
atualizarTabelaPopulares();
