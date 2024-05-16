const lista = [];
const tabela = document.getElementById("tabela_linhas");

function limpar() {
  document.getElementById("item").value = "";
  document.getElementById("value").value = "";
}

function adicionar() {
  let item = document.getElementById("item").value;
  let value = parseFloat(document.getElementById("value").value);

  let obj = { item, value };

  lista.push(obj);
  limpar();
  read();
}

function read() {
  tabela.innerHTML = "";

  lista.forEach((obj, indice) => {
   let tr = document.createElement('tr');
   tr.innerHTML=`
   <td>${obj.item}</td>
   <td>R$ ${obj.value}</td>
   <td>
    <button onclick="update(${indice})" class="buttons table_buttons">Editar</button>
    <button onclick="remove(${indice})" class="buttons table_buttons">Excluir</button>
   </td>
   `;
  tabela.appendChild(tr);
  });
}

function update(indice) {
    let objEdit = lista[indice];
    objEdit.item = document.getElementById('item').value;
    objEdit.value = document.getElementById('value').value;
    limpar();
    read();
}

function remove(indice) {
  lista.splice(indice, 1);
  read();
}
