// scripts.js
let catalogo = JSON.parse(localStorage.getItem("catalogo")) || [];

function salvarLista() {
  localStorage.setItem("catalogo", JSON.stringify(catalogo));
}

function limparForm() {
  document.getElementById("name").value = "";
  document.getElementById("value").value = "";
  document.getElementById("desc").value = "";
}

function validaForm() {
  let item = document.getElementById("name").value;
  let valor = parseFloat(document.getElementById("value").value);
  if (!item || isNaN(valor)) {
    alert("Por favor, preencha todos os campos corretamente.");
    return false;
  } else {
    return true;
  }
}

function create() {
  if (validaForm()) {
    let item = document.getElementById("name").value;
    let valor = parseFloat(document.getElementById("value").value);
    let desc = document.getElementById("desc").value;

    let indiceEdicao = -1;
    let objExistente = catalogo.find((objExistente, index) => {
      if (objExistente.item === item) {
        indiceEdicao = index;
        return true;
      }
      return false;
    });

    if (indiceEdicao >= 0) {
      catalogo[indiceEdicao] = { item, valor, desc };
    } else {
      catalogo.push({ item, valor, desc });
    }

    salvarLista();
    limparForm();
    atualizarTabela();
  }
}

function editarItem(indice) {
  let obj = catalogo[indice];
  document.getElementById("name").value = obj.item;
  document.getElementById("value").value = obj.valor;
  document.getElementById("desc").value = obj.desc;
}

function excluirItem(indice) {
  if (
    confirm(`Tem certeza que deseja excluir o item ${catalogo[indice].item}?`)
  ) {
    catalogo.splice(indice, 1);
    salvarLista();
    atualizarTabela();
  }
}

function atualizarTabela() {
  let listBody = document.getElementById("catalog-list");
  listBody.innerHTML = "";

  catalogo.forEach((item, indice) => {
    let li = document.createElement("li");
    li.innerHTML = `
        <div class="card" style="width: 20rem" height: 15rem;>
              <div class="card-body">
                <h5 class="card-title">${item.item}</h5>
                <h6>${item.valor.toFixed(2)}</h6>
                <p class="card-text">
                  ${item.desc}
                </p>
                <button onclick="editarItem(${indice})" class="btn btn-primary me-2" data-bs-toggle="modal" data-bs-target="#addModal">Editar</button>
                <button onclick="excluirItem(${indice})" class="btn btn-secondary">Excluir</button>
              </div>
        </div>
        `;
    listBody.appendChild(li);
  });

  atualizarValorTotal();
}

function atualizarValorTotal() {
  let valorTotal = catalogo.reduce((total, item) => total + item.valor, 0);
  document.getElementById(
    "valor-total"
  ).textContent = `Valor Total: R$ ${valorTotal.toFixed(2)}`;
}

// Inicialização da tabela
atualizarTabela();
console.log(catalogo);