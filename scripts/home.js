const db = firebase.firestore();
const user = firebase.auth().currentUser;
const userID = user.uid;

const userDocRef = firebase.firestore().collection("users").doc(userID);

userDocRef.get().then((doc) => {
  if (doc.exists) {
    const userData = doc.data();
      console.log("olá, " + userID);
  } else {
    // O documento do usuário não foi encontrado.
  }
});


function logout() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      window.location.href = "/index.html";
    })
    .catch(() => {
      alert("Erro ao fazer logout");
    });
}

function adicionar() {
  // Capturar os valores dos campos de entrada
  const descInput = document.getElementById('desc');
  const amountInput = document.getElementById('amount');
  const typeInput = document.getElementById('type');

  const desc = descInput.value;
  const amount = parseFloat(amountInput.value); // Converter o valor para um número
  const type = typeInput.value;

  // Verificar se os campos estão preenchidos
  if (desc.trim() === '' || isNaN(amount)) {
    alert('Por favor, preencha todos os campos corretamente.');
    return;
  }

  // Adicionar uma nova linha à tabela
  const table = document.querySelector('table tbody');
  const newRow = table.insertRow();

  // Inserir as células na nova linha
  const cell1 = newRow.insertCell(0);
  const cell2 = newRow.insertCell(1);
  const cell3 = newRow.insertCell(2);
  const cell4 = newRow.insertCell(3);

  // Preencher as células com os valores capturados
  cell1.innerHTML = desc;
  cell2.innerHTML = amount.toFixed(2); // Formatando o valor para 2 casas decimais
  cell3.innerHTML = type;

  // Definir a classe CSS com base no tipo
  cell3.className = type.toLowerCase(); // Define a classe como "entrada" ou "saida"

  // Adicionar uma célula com o ícone de lixeira para excluir
  cell4.innerHTML = '<i class="fas fa-trash-alt" width="20px" height="20px" onclick="excluir(this)" style="color: #FF2222;"></i>'

  // Limpar os campos de entrada
  descInput.value = '';
  amountInput.value = '';
  typeInput.value = 'Entrada';

  // Atualizar o resumo financeiro
  atualizarResumo(amount, type);
}

function excluir(icon) {
  const row = icon.parentNode.parentNode; // A linha a ser removida
  const table = row.parentNode;
  const amountCell = row.cells[1];
  const type = row.cells[2].textContent;

  // Remover a linha da tabela
  table.removeChild(row);

  // Atualizar o resumo financeiro após a exclusão
  const amount = parseFloat(amountCell.textContent);
  if (type === 'Entrada') {
    atualizarResumo(-amount, type);
  } else if (type === 'Saída') {
    atualizarResumo(-amount, type);
  }
}

function atualizarResumo(valor, tipo) {
  // Capturar os elementos de resumo
  const incomesElement = document.querySelector('.incomes');
  const expensesElement = document.querySelector('.expenses');
  const totalElement = document.querySelector('.totall');

  // Obter os valores atuais a partir dos elementos
  const currentIncomes = parseFloat(incomesElement.textContent);
  const currentExpenses = parseFloat(expensesElement.textContent);

  // Atualizar o resumo com base no tipo (entrada ou saída)
  if (tipo === 'Entrada') {
    incomesElement.textContent = (currentIncomes + valor).toFixed(2);
  } else if (tipo === 'Saída') {
    expensesElement.textContent = (currentExpenses + valor).toFixed(2);
  }

  // Calcular o total
  const newIncomes = parseFloat(incomesElement.textContent);
  const newExpenses = parseFloat(expensesElement.textContent);
  const total = newIncomes - newExpenses;

  // Atualizar o total com sinal negativo, se necessário
  totalElement.textContent = (total >= 0 ? '' : '-') + Math.abs(total).toFixed(2);
}

