const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const products = [
    { name: 'Rose Plant', category: 'Plants', price: 15.99 },
    { name: 'Tomato Seeds', category: 'Seeds', price: 5.49 },
    { name: 'Apple', category: 'Fruits', price: 0.99 },
    { name: 'Carrot', category: 'Vegetables', price: 1.49 },
    { name: 'Lavender Seeds', category: 'Herbs', price: 3.99 },
    { name: 'Sunflower', category: 'Flowers', price: 2.99 },
    { name: 'Pruning Shears', category: 'Tools', price: 12.99 }
];

const productsContainer = document.getElementById('products');
const searchInput = document.getElementById('search-input');
const userInfo = document.getElementById('user-info');

// Display user information when logged in
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        userInfo.innerHTML = `Logged in as ${user.email}`;
    } else {
        userInfo.innerHTML = '';
    }
});

// Filter products based on category
function filterProducts(category) {
    const filteredProducts = products.filter(product => product.category === category);
    displayProducts(filteredProducts);
}

// Display products based on search input or all products if search is empty
function displayProducts(productsToDisplay = products) {
    productsContainer.innerHTML = '';
    productsToDisplay.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <h2>${product.name}</h2>
            <p>Category: ${product.category}</p>
            <p>Price: $${product.price.toFixed(2)}</p>
            <button>Add to Cart</button>
        `;
        productsContainer.appendChild(productCard);
    });
}

displayProducts();

// Search functionality
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm) || product.category.toLowerCase().includes(searchTerm)
    );
    displayProducts(filteredProducts);
});

// Logout function
function logout() {
    firebase.auth().signOut().then(() => {
        console.log('User logged out successfully');
    }).catch(error => {
        console.error('Error logging out:', error);
    });
}