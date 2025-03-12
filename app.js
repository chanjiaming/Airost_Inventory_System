// ✅ Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyAjhvZvx6F-nQS7Gq-xcP2g4VPEoQWfuXo",
    authDomain: "airost-inventory-system-60861.firebaseapp.com",
    projectId: "airost-inventory-system-60861",
    storageBucket: "airost-inventory-system-60861.firebasestorage.app",
    messagingSenderId: "665682206493",
    appId: "1:665682206493:web:d46bc1757b43f7a8e54bf4",
    measurementId: "G-VRPFJ99QLJ"
};

// ✅ Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// ✅ Function to Fetch & Display Items
function loadInventoryItems() {
    const inventoryRef = db.collection("inventory");
    const itemsContainer = document.getElementById("itemsContainer");

    inventoryRef.onSnapshot(snapshot => {
        itemsContainer.innerHTML = ""; // Clear previous items

        snapshot.forEach(doc => {
            const data = doc.data();
            const itemCard = `
                <div class="items-preview">
                    <img class="preview-images" src="${data.image || 'images/default.png'}">
                    <div class="info-preview">
                        <p class="preview-texts">${data.Name || "Unknown Item"}</p>
                        <a href="ItemsDescription.html?id=${doc.id}">
                            <button class="preview-button">SELECT</button>
                        </a>
                    </div>
                </div>
            `;
            itemsContainer.innerHTML += itemCard;
        });
    });
}

// ✅ Search Functionality
function searchItems() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const items = document.querySelectorAll(".items-preview");

    items.forEach(item => {
        const itemName = item.querySelector(".preview-texts").innerText.toLowerCase();
        if (itemName.includes(searchInput)) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
}

// ✅ Load items when the page loads
document.addEventListener("DOMContentLoaded", loadInventoryItems);
