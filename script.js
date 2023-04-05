// Get elements from the HTML document
const balanceEl = document.getElementById('balance');
const incomeEl = document.getElementById('income');
const expensesEl = document.getElementById('expenses');
const transactionForm = document.getElementById('transaction-form');
const transactionType = document.getElementById('transaction-type');
const transactionName = document.getElementById('transaction-name');
const transactionAmount = document.getElementById('transaction-amount');
const transactionList = document.getElementById('transaction-list');

// Initialize transaction history
let transactions = [];

// Update balance, income, and expenses
function updateBalance() {
  // Calculate total income and total expenses
  const income = transactions
    .filter(transaction => transaction.type === 'Income')
    .reduce((total, transaction) => total + transaction.amount, 0);
  const expenses = transactions
    .filter(transaction => transaction.type === 'Expense')
    .reduce((total, transaction) => total + transaction.amount, 0);

  // Calculate balance
  const balance = income - expenses;

  // Update HTML elements
  balanceEl.textContent = formatCurrency(balance);
  incomeEl.textContent = `+${formatCurrency(income)}`;
  expensesEl.textContent = `-${formatCurrency(expenses)}`;

  // Save transactions and balance to local storage
  localStorage.setItem('transactions', JSON.stringify(transactions));
  localStorage.setItem('balance', balance.toFixed(2));
}

// Add a new transaction to the history
function addTransaction(event) {
  event.preventDefault();

  // Get the transaction type, name, and amount
  const type = transactionType.value;
  const name = transactionName.value;
  const amount = parseFloat(transactionAmount.value);

  // Validate the input
  if (type === 'Select Transaction Type' || name.trim() === '' || isNaN(amount)) {
    alert('Please enter valid transaction details.');
    return;
  }

  // Create a new transaction object and add it to the history
  const transaction = {
    type,
    name,
    amount,
  };
  transactions.push(transaction);

  // Update the HTML elements and reset the form
  updateBalance();
  transactionList.appendChild(createTransactionElement(transaction));
  transactionForm.reset();
}

// Create an HTML element for a transaction
function createTransactionElement(transaction) {
  const listItem = document.createElement('li');
  listItem.classList.add(transaction.type === 'Income' ? 'plus' : 'minus', 'bg-orange-50', 'p-1', 'border-r-4');
  listItem.classList.add(transaction.type === 'Income' ? 'border-green-600' : 'border-red-600', 'md:flex', 'block', 'justify-between', 'relative', 'md:text-base', 'text-xs');
  listItem.innerHTML = `
    ${transaction.name} <span class="font-normal block mr-8">${transaction.type === 'Income' ? '+' : '-'}${formatCurrency(Math.abs(transaction.amount))}</span>
    <button class="delete-btn bg-red-500 text-white text-base px-1 rounded-full absolute md:right-2 right-2 md:top-1 top-2 opacity-30 hover:opacity-100 ease-out duration-700">x</button>
  `;
  const deleteButton = listItem.querySelector('.delete-btn');
  deleteButton.addEventListener('click', () => {
    transactions = transactions.filter(t => t !== transaction);
    listItem.remove();
    updateBalance();
  });
  return listItem;
}

// Format a number as a currency string
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount);
}

// Load transactions and balance from local storage, if available
transactions = JSON.parse(localStorage.getItem('transactions')) || [];
balanceEl.textContent = formatCurrency(parseFloat(localStorage.getItem('balance')) || 0);

// Add event listener for adding transaction on the form
transactionForm.addEventListener('submit', addTransaction);

// Add existing transactions to the list
transactions.forEach(transaction => transactionList.appendChild(createTransactionElement(transaction)));

updateBalance();

// ************************************************************************************
// ******************************************************************************


// const balanceEl = document.getElementById('balance');
// const incomeEl = document.getElementById('income');
// const expenseEl = document.getElementById('expenses');
// const form = document.getElementById('transaction-form');
// const transactionName = document.getElementById('transaction-name');
// const transactionAmount = document.getElementById('transaction-amount');
// const transactionType = document.getElementById('transaction-type');
// const transactionList = document.getElementById('transaction-list');

// let balance = 0;
// let income = 0;
// let expenses = 0;
// let transactions = [];

// function addTransaction(e) {
//   e.preventDefault();
//   if (transactionName.value.trim() === '' || transactionAmount.value.trim() === '' || transactionType.value === 'Select Transaction Type') {
//     alert('Please enter valid transaction details');
//     return;
//   }

//   const transaction = {
//     id: transactions.length + 1,
//     name: transactionName.value,
//     amount: Number(transactionAmount.value),
//     type: transactionType.value
//   };

//   transactions.push(transaction);

//   if (transaction.type === 'Income') {
//     income += transaction.amount;
//   } else {
//     expenses += transaction.amount;
//   }

//   balance = income - expenses;

//   updateUI();
//   form.reset();
// }

// function updateUI() {
//   balanceEl.innerText = `N${balance.toFixed(2)}`;
//   incomeEl.innerText = `+N${income.toFixed(2)}`;
//   expenseEl.innerText = `-N${expenses.toFixed(2)}`;

//   transactionList.innerHTML = '';

//   transactions.forEach((transaction) => {
//     const sign = transaction.type === 'Income' ? '+' : '-';
//     const liClass = transaction.type === 'Income' ? 'plus' : 'minus';
//     const transactionEl = document.createElement('li');
//     transactionEl.classList.add(liClass, 'bg-orange-50', 'p-1', 'border-r-4', `border-${transaction.type === 'Income' ? 'green' : 'red'}-600`, 'md:flex', 'block', 'justify-between', 'relative', 'md:text-base', 'text-xs');
//     transactionEl.innerHTML = `${transaction.name} <span class="font-normal block mr-8">${sign}N${transaction.amount.toFixed(2)}</span>
//       <button class="delete-btn bg-red-500 text-white text-base px-1 rounded-full absolute md:right-2 right-2 md:top-1 top-2 opacity-30 hover:opacity-100 ease-out duration-700" onclick="deleteTransaction(${transaction.id})">x</button>`;
//     transactionList.appendChild(transactionEl);
//   });
// }

// function deleteTransaction(id) {
//   transactions = transactions.filter((transaction) => transaction.id !== id);

//   if (transactions.length === 0) {
//     income = 0;
//     expenses = 0;
//     balance = 0;
//   } else {
//     income = transactions.filter((transaction) => transaction.type === 'Income').reduce((acc, transaction) => acc + transaction.amount, 0);
//     expenses = transactions.filter((transaction) => transaction.type === 'Expense').reduce((acc, transaction) => acc + transaction.amount, 0);
//     balance = income - expenses;
//   }

//   updateUI();
// }

// form.addEventListener('submit', addTransaction);

// ***************************************************************
