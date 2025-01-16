const addItemForm = document.getElementById("add-item-form");
const itemsList = document.getElementById("items");
const resetBtn = document.getElementById("reset-btn");

let items = JSON.parse(localStorage.getItem("items")) || [];
let remainingBudget = 5000; // Example starting budget
const budget = remainingBudget;

// Load items from localStorage and render
function renderItems() {
  itemsList.innerHTML = "";
  items.forEach((item, index) => {
    const listItem = document.createElement("li");
    listItem.classList.add("flex", "justify-between", "items-center", "mb-2");

    // Display item name, quantity, and price
    listItem.innerHTML = `
            <span style="text-decoration: ${
              item.purchased ? "line-through" : "none"
            }">
                ${item.name} (${item.quantity}g) - ₹${item.price} | Category: ${
      item.category
    }
            </span>
            <button onclick="togglePurchased(${index})" class="ml-2 py-1 px-2 bg-blue-500 text-white rounded">
                ${item.purchased ? "কিনেছি" : "কিনুন"}
            </button>
        `;
    itemsList.appendChild(listItem);
  });
}

// Save items to localStorage
function saveToLocalStorage() {
  localStorage.setItem("items", JSON.stringify(items));
}

// Add item to list
addItemForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("item-name").value;
  const category = document.getElementById("item-category").value;
  const quantity = parseInt(document.getElementById("item-quantity").value);
  const price = parseInt(document.getElementById("item-price").value);

  if (remainingBudget < price) {
    alert("বাজেটের সীমা অতিক্রম হয়েছে!");
    return;
  }

  const newItem = { name, category, quantity, price, purchased: false };
  items.push(newItem);
  remainingBudget -= price;
  saveToLocalStorage();
  renderItems();

  // Clear the form
  document.getElementById("item-name").value = "";
  document.getElementById("item-quantity").value = "";
  document.getElementById("item-price").value = "";
});

// Toggle the purchased status
function togglePurchased(index) {
  items[index].purchased = !items[index].purchased;
  saveToLocalStorage();
  renderItems();
}

// Reset budget
resetBtn.addEventListener("click", () => {
  if (confirm("আপনি কি সত্যিই বাজেট রিসেট করতে চান?")) {
    items = [];
    remainingBudget = budget;
    saveToLocalStorage();
    renderItems();
  }
});

// Item suggestions functionality
function loadSuggestions() {
  const itemSuggestions = document.getElementById("item-suggestions");
  itemSuggestions.innerHTML = "";
  items.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.name;
    itemSuggestions.appendChild(option);
  });
}

// Initial rendering of items and suggestions
loadSuggestions();
renderItems();
