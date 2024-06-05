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

function add_cart(indice) {
  let frase = `
  ${catalogoCliente[indice].item} foi adicionado ao carrinho!
  `
  alert(frase);
  clientCart.push(catalogoCliente[indice]);
  console.log(clientCart);
  atualizarValorTotal();
  saveCart();
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
          <div class="card" style="width: 20rem" height: 15rem;>
                <div class="card-body">
                  <h5 class="card-title">${item.item}</h5>
                  <h6>${item.valor.toFixed(2)}</h6>
                  <p class="card-text">
                    ${item.desc}
                  </p>
                  <button type="button" class="btn btn-primary" onclick="add_cart(${indice})">Buy</button>
                </div>
          </div>
          `;
    catalogBody.appendChild(li);
  });
}

function atualizarValorTotal() {
  let valorTotal = clientCart.reduce(
    (total, item) => total + item.valor,
    0
  );
  document.getElementById(
    "valor-total"
  ).textContent = `Valor Total: R$ ${valorTotal.toFixed(2)}`;
}

function atualizarTabelaPopulares() {
  let popularBody1 = document.getElementById("catalog-popular-1");
  let popularBody2 = document.getElementById("catalog-popular-2");
  let popularBody3 = document.getElementById("catalog-popular-3");

  catalogoCliente.forEach((item, indice) => {
    let li = document.createElement("li");
    li.innerHTML = `
            <div class="card" style="width: 20rem" height: 15rem;>
                  <div class="card-body">
                    <h5 class="card-title">${item.item}</h5>
                    <h6>${item.valor.toFixed(2)}</h6>
                    <p class="card-text">
                      ${item.desc}
                    </p>
                    <button class="btn btn-primary" onclick="add_cart(${indice})">Buy</button>
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
