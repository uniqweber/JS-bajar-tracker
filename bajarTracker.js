const dataList = document.getElementById("data-list");
const showBudget = document.getElementById("showBudget");
const showExpense = document.getElementById("showExpense");

const newItemForm = document.getElementById("addNewItemForm");
const newItemName = document.getElementById("newItemName");
const newItemQuantity = document.getElementById("newItemQuantity");

const expenseForm = document.getElementById("expenseItemForm");
const expenseItemName = document.getElementById("expenseItemName");
const expenseItemPrice = document.getElementById("expenseItemPrice");

const BazarItems = [
  { name: "বাসা ভাড়া", quantity: 10000 },
  { name: "বিদ্যুৎ বিল", quantity: 1200 },
  { name: "ওয়াইফাই বিল", quantity: 500 },
  { name: "ময়লার বিল", quantity: 120 },
  { name: "সয়াবিন তৈল", quantity: 700 },
  { name: "মাংস", quantity: 500 },
  { name: "সবজি", quantity: 500 },
  { name: "ডিম", quantity: 500 },
  { name: "চাউল", quantity: 650 },
  { name: "ডাউল", quantity: 200 },
  { name: "আটা", quantity: 200 },
  { name: "রসুন", quantity: 240 },
  { name: "আলু", quantity: 300 },
  { name: "পেঁয়াজ", quantity: 300 },
  { name: "আদা", quantity: 100 },
  { name: "মরিচের গুড়া", quantity: 100 },
  { name: "হলুদের গুড়া", quantity: 100 },
  { name: "জিরা", quantity: 120 },
  { name: "এলাচ", quantity: 100 },
  { name: "সরিষার তৈল", quantity: 150 },
  { name: "লবন", quantity: 40 },
  { name: "চিনি", quantity: 150 },
  { name: "মুড়ি", quantity: 200 },
  { name: "কাচামরিচ", quantity: 100 },
  { name: "তেজপাতা", quantity: 10 },
  { name: "চা-পাতি", quantity: 110 },
  { name: "শুকনা মরিচ", quantity: 70 },
  { name: "গোসলের সাবান", quantity: 0 },
  { name: "গুড়া সাবান", quantity: 200 },
  { name: "হুইল সাবান", quantity: 30 },
  { name: "পোলাও চাউল", quantity: 300 },
  { name: "কালোজিরা", quantity: 0 },
  { name: "পাঁচফোড়ন", quantity: 0 },
  { name: "টিস্যু", quantity: 100 },
  { name: "ভীম সাবান", quantity: 0 },
  { name: "কিসমিস", quantity: 50 },
  { name: "চানাচুর", quantity: 300 },
  { name: "বিস্কুট", quantity: 150 },
  { name: "দুধ", quantity: 400 },
  { name: "ন্যাপকিন", quantity: 0 },
  { name: "ভুট্টা", quantity: 50 },
  { name: "শসা", quantity: 150 },
  { name: "গাজর", quantity: 150 },
  { name: "ছোলা বুট", quantity: 150 },
  { name: "নুডলস", quantity: 150 },
  { name: "লেবু", quantity: 100 },
  { name: "শ্যাম্পু", quantity: 130 },
  { name: "চিরা", quantity: 100 },
  { name: "সেমাই", quantity: 100 },
];


if (!localStorage.getItem("items")) {
  localStorage.setItem("items", JSON.stringify(BazarItems));
}

let totalBudget = 20000;
let totalExpense = 0;

function displayBudget() {
  showBudget.innerText = totalBudget;
  showExpense.innerText = totalExpense;
  localStorage.setItem("budget", totalBudget);
  localStorage.setItem("expense", totalExpense);
}

expenseForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const itemName = expenseItemName.value.trim();
  const itemPrice = parseInt(expenseItemPrice.value);
  if (itemName && itemPrice) {
    updateExpense(itemName, itemPrice);
    e.target.reset();
  }
});

newItemForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const itemName = newItemName.value.trim();
  const itemQuantity = parseInt(newItemQuantity.value.trim());
  if (itemName && itemQuantity) {
    addNewItem(itemName, itemQuantity);
    e.target.reset();
  }
});

function addNewItem(name, quantity) {
  const storedData = JSON.parse(localStorage.getItem("items"));
  const newItem = { name, quantity };
  storedData && storedData.push(newItem);
  localStorage.setItem("items", JSON.stringify(storedData));
  sortItemPrice();
}

function updateExpense(name, expenseAmount) {
  const storedBudget = JSON.parse(localStorage.getItem("budget"));
  const storedExpense = JSON.parse(localStorage.getItem("expense"));
  const storedData = JSON.parse(localStorage.getItem("items"));
  if (storedData) {
    const itemIndex = storedData.findIndex((item) => item.name == name);
    if (itemIndex === -1) {
      alert(`"${name}" নামে কোনো পণ্য পাওয়া যায়নি!`);
      return;
    }
    if (storedData[itemIndex].quantity < expenseAmount) {
      alert(`"${name}"-এর জন্য পর্যাপ্ত বাজেট নেই!`);
      return;
    }

    const isTrue = confirm(
      `"${name}"-এর জন্য ${expenseAmount} টাকা খরচ করা হলো।`
    );
    if (isTrue) {
      storedData[itemIndex].quantity -= expenseAmount;
      totalBudget -= expenseAmount;
      totalExpense += expenseAmount;

      localStorage.setItem("items", JSON.stringify(storedData));
      localStorage.setItem("budget", JSON.stringify(storedBudget));
      localStorage.setItem("expense", JSON.stringify(storedExpense));

      sortItemPrice();
      displayBudget();
    }
  }
}

function sortItemPrice() {
  const storedData = JSON.parse(localStorage.getItem("items"));
  if (storedData) {
    storedData.sort((a, b) => b.quantity - a.quantity);
    localStorage.setItem("items", JSON.stringify(storedData));
    displayItems();
  }
}

function displayItems() {
  const storedData = JSON.parse(localStorage.getItem("items"));
  dataList.innerHTML = "";
  storedData &&
    storedData.forEach(({ name, quantity }, idx) => {
      let formattedIndex = (idx + 1).toString().padStart(2, "0");
      dataList.innerHTML += `<li class="flex w-full items-center justify-between  gap-2 ${
        quantity === 0 && "text-red-500 line-through "
      }">
          <div class="flex items-center gap-2 ">
              <span class="bullet">${formattedIndex}</span>
              <span class="">${name}</span>
          </div>
              <span>${quantity} ৳</span>
          </li>`;
    });
}

document.getElementById("removeData").addEventListener("click", function (e) {
  const confirmReset = confirm("আপনি কি নিশ্চিত যে সমস্ত ডেটা মুছে ফেলতে চান?");
  if (confirmReset) {
    localStorage.clear();
    displayItems();
  }
});

// Initialize budget and items on page load
document.addEventListener("DOMContentLoaded", () => {
  totalBudget = parseInt(localStorage.getItem("budget")) || 20000;
  totalExpense = parseInt(localStorage.getItem("expense")) || 0;
  sortItemPrice();
  displayBudget();
});
