// scripts.js
let catalogo = JSON.parse(localStorage.getItem("catalogo")) || [];
let imagem_data = JSON.parse(localStorage.getItem('imagem_data')) || [];

function salvarLista() {
  localStorage.setItem("catalogo", JSON.stringify(catalogo));
  localStorage.setItem('imgData', JSON.stringify(imagem_data));
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

function getImageDataURL(url, success) {
	var data, canvas, ctx;
	var img = new Image();
	img.onload = function(){
		// Create the canvas element.
	    canvas = document.createElement('canvas');
	    canvas.width = img.width;
	    canvas.height = img.height;
		// Get '2d' context and draw the image.
		ctx = canvas.getContext("2d");
	    ctx.drawImage(img, 0, 0);
		// Get canvas data URL
		try{
			data = {image: img, data: canvas.toDataURL()};
      success.data = data.data;
      success.image = data.image;
		}catch(e){
			
		}
	}
	// Load image URL.
	try{
		img.src = url;
	}catch(e){
		
	}
}

function create() {
  if (validaForm()) {
    let item = document.getElementById("name").value;
    let valor = parseFloat(document.getElementById("value").value);
    let desc = document.getElementById("desc").value;
    let img = document.getElementById("image").files;
    let imgURL = URL.createObjectURL(img[0]);
    let imgData={imagem: '', data:''};
    
    getImageDataURL(imgURL, imgData); 

    console.log(imgData);

    let indiceEdicao = -1;
    let objExistente = catalogo.find((element, index) => {
      if (element.index === index) {
        indiceEdicao = index;
        return true;
      } else return false;
    });

    if (indiceEdicao >= 0) {
      catalogo[indiceEdicao] = { item, valor, desc, imgData};
    } else {
      catalogo.push({ item, valor, desc, imgData });
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
                <h5 class="card-title">${item.item}</h5>
                <img src="">
                <h6>Price: R$${item.valor.toFixed(2)}</h6>
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
}

// Inicialização da tabela
atualizarTabela();
