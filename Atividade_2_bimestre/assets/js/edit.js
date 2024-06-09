// scripts.js
let catalogo = JSON.parse(localStorage.getItem("catalogo")) || [];


function salvarLista() {
  localStorage.setItem("catalogo", JSON.stringify(catalogo));
}

function limparForm() {
  document.getElementById("name").value = "";
  document.getElementById("value").value = "";
  document.getElementById("desc").value = "";
  document.getElementById("image").files[0] = '';
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

document.getElementById("image").addEventListener('change', function readImage(){
  const reader = new FileReader();
  reader.addEventListener('load', function(){
      localStorage.setItem('recent-image', reader.result);
  });

  reader.readAsDataURL(this.files[0]);
});

function create() {
  if (validaForm()) {
    let item = document.getElementById("name").value;
    let valor = parseFloat(document.getElementById("value").value);
    let desc = document.getElementById("desc").value;
    let img = localStorage.getItem("recent-image");


    let indiceEdicao = -1;
    let objExistente = catalogo.find((element, index) => {
      if (element.index === index) {
        indiceEdicao = index;
        return true;
      } else return false;
    });

    if (indiceEdicao >= 0) {
      img = localStorage.getItem("recent-image") || [];
      catalogo[indiceEdicao] = { item, valor, desc, img};
    } else {
      catalogo.push({ item, valor, desc, img});
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
  document.getElementById("image").files[0] = obj.img;
  obj.index = indice;
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
                <div class="card-title">
                    <h5 class="card-title">${item.item}</h5>
                    <h6 class="card-title">R$${item.valor.toFixed(2)}</h6>
                    </div>
                    <img class="card-image" src="${item.img}">
                </div>
                <p class="card-text">
                  ${item.desc}
                </p>
                <div class="btn-container">
                <button onclick="editarItem(${indice})" class="btn btn-primary me-2" data-bs-toggle="modal" data-bs-target="#addModal">Editar</button>
                <button onclick="excluirItem(${indice})" class="btn btn-secondary">Excluir</button>
                </div>
              </div>
        </div>
        `;
    listBody.appendChild(li);
  });
}

// Inicialização da tabela
atualizarTabela();
