function setAbout(){
  let aboutNav=document.getElementById('about-nav');
  aboutNav.classList.add('active');
  let customerNav = document.getElementById('customer-nav');
  customerNav.classList.remove('active');
}

function setCustomer(){
  let aboutNav=document.getElementById('about-nav');
  aboutNav.classList.remove('active');
  let customerNav = document.getElementById('customer-nav');
  customerNav.classList.add('active');
}

let customers = [
  { name: "Suresh", email: "xyz@gmail.com", mobile: "9703456712", balance: 1200 },
  { name: "Ramesh", email: "abc@gmail.com", mobile: "7093221998", balance: 100 },
  { name: "Mahesh", email: "abc@gmail.com", mobile: "7093221998", balance: 800 },
  { name: "Paresh", email: "abc@gmail.com", mobile: "7093221998", balance: 500 },
  { name: "Jignesh", email: "abc@gmail.com", mobile: "7093221998", balance: 1300 },
  { name: "Ramnesh", email: "abc@gmail.com", mobile: "7093221998", balance: 300 },
  { name: "Ratnesh", email: "abc@gmail.com", mobile: "7093221998", balance: 600 },
  { name: "Sumesh", email: "abc@gmail.com", mobile: "7093221998", balance: 900 },
  { name: "Sukesh", email: "abc@gmail.com", mobile: "7093221998", balance: 700 }
];

let transactionHistory=[];

localStorage.setItem('customers',JSON.stringify(customers));
localStorage.setItem('transactionHistory',transactionHistory);

function fillData(cardClone, customer) {
  const name = cardClone.querySelector("#name");
  const email = cardClone.querySelector("#email");
  const mobile = cardClone.querySelector("#mobile");
  const balance = cardClone.querySelector("#balance");

  name.innerHTML = `<p>${customer.name}</p>`;
  email.innerHTML = `<p>${customer.email}</p>`;
  mobile.innerHTML = `<p>${customer.mobile}</p>`;
  balance.innerHTML = `<p>${customer.balance}</p>`;
}

function bindData(customers) {
  const cardContainer = document.getElementById("card-container");
  const template = document.getElementById("template-card");

  cardContainer.innerHTML = "";
  customers.forEach((customer) => {
    const cardClone = template.content.cloneNode(true);
    fillData(cardClone, customer);
    cardContainer.appendChild(cardClone);
  });
}
bindData(customers);

const popup = document.getElementById("pop-up");
const showMainBtn=document.getElementById('show-main-btn');
const transferPop=document.getElementById('transfer-pop');
const performTransferBtn=document.getElementById('perform-transfer-btn');
const depositPop=document.getElementById('deposit-pop');
const performDepositBtn=document.getElementById('perform-deposit-btn');
let selectedCard=null;
let sender=null;

function showPopUp(that){
  if (selectedCard == null) {

    const index = Array.from(that.parentElement.children).indexOf(that);
    sender = customers[index];

    const popName = document.getElementById("pop-up-name");
    const popBalance = document.getElementById("pop-up-balance");

    selectedCard=that;
      
    popName.innerHTML = `<p><strong>Name: </strong>${sender.name}</p>`;
    popBalance.innerHTML = `<p><strong>Balance: </strong>${sender.balance}</p>`;

    popup.style.display = "block";
    showMainBtn.style.display="block";
    transferPop.style.display="none";
    performTransferBtn.style.display="none";
    depositPop.style.display="none";
    performDepositBtn.style.display="none";
    document.getElementById('close-btn').style.display="block";
  }    
}

function closePopUp(){
  selectedCard=null;
  popup.style.display="none";
}

function showTransfer(){
  transferPop.style.display="block";
  performTransferBtn.style.display="block";
  depositPop.style.display="none";
  performDepositBtn.style.display="none";
  showMainBtn.style.display="none";
  document.getElementById('close-btn').style.display="none";
}

function showDeposit(){
  depositPop.style.display="block";
  performDepositBtn.style.display="block";
  transferPop.style.display="none";
  performTransferBtn.style.display="none";
  showMainBtn.style.display="none";
  document.getElementById('close-btn').style.display="none";
}

const transferNameInput = document.getElementById("transfer-name");
const transferAmountInput = document.getElementById("transfer-amount");
const depositAmountInput=document.getElementById('deposit-amount');
const storedCustomers = JSON.parse(localStorage.getItem('customers'));

function confirmTransfer() {
  
  const receiver = transferNameInput.value;
  
  let senderInfo=storedCustomers.find(customer=> customer.name===sender.name);
  let senderIndex=storedCustomers.findIndex(customer => customer.name===sender.name);
  let receiverInfo=storedCustomers.find(customer=> customer.name===receiver);
  let receiverIndex=storedCustomers.findIndex(customer => customer.name===receiver);
  
  const transferAmount = parseInt(transferAmountInput.value);


  if (!receiverInfo || (transferAmount==NaN) || transferAmount <= 0) {
    alert("Invalid receiver or amount!");
    return;
  }
  else if(receiverInfo.name==senderInfo.name){
    alert("You need to Opt for Deposit Window");
    return;
  }

  if (senderInfo.balance < transferAmount) {
    alert("Insufficient balance for the transfer!");
    return;
  }

  
  senderInfo.balance -= transferAmount;
  receiverInfo.balance += transferAmount;
 
 
  const transaction = {
    type:"Transfer",
    from: senderInfo.name,
    sbalance:senderInfo.balance,
    to: receiverInfo.name,
    rbalance: receiverInfo.balance,
    amount: transferAmount
  };
  transactionHistory.push(transaction);
  localStorage.setItem("transactionHistory", JSON.stringify(transactionHistory));

  customers[senderIndex].balance = senderInfo.balance;
  customers[receiverIndex].balance = receiverInfo.balance;

  localStorage.setItem('afterTransaction',JSON.stringify(customers));

  bindData(customers);

  transferNameInput.value="";
  transferAmountInput.value="";

  closePopUp();
}

function confirmDeposit() {

  let senderInfo=storedCustomers.find(customer=> customer.name===sender.name);
  let senderIndex=storedCustomers.findIndex(customer => customer.name===sender.name);

  let depositAmount=parseInt(depositAmountInput.value);
  
  senderInfo.balance += depositAmount;

  const depositTransaction = {
    type: "Deposit",
    name: senderInfo.name,
    amount: depositAmount,
    balance:senderInfo.balance
  };
  transactionHistory.push(depositTransaction);
  localStorage.setItem("transactionHistory", JSON.stringify(transactionHistory));

  customers[senderIndex].balance = senderInfo.balance;

  localStorage.setItem('afterTransaction',JSON.stringify(customers));

  bindData(customers);

  depositAmountInput.value="";

  closePopUp();
}

function cancelBtn(){
  closePopUp();
  transferNameInput.value="";
  transferAmountInput.value="";
  depositAmountInput.value="";
}




