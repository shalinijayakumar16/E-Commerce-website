// sell.js
const sellForm = document.getElementById('sell-form');

sellForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const productName = document.getElementById('product-name').value;
    const productCategory = document.getElementById('product-category').value;
    const productPrice = parseFloat(document.getElementById('product-price').value);

    if (productName && productCategory && !isNaN(productPrice)) {
        const newProduct = { name: productName, category: productCategory, price: productPrice };
        allProducts.push(newProduct);
        // Optionally, you can send this data to a backend server for storage and management.
        // For simplicity, we'll just update the products list in memory.
        displayProducts();
        alert('Product added successfully!');
        sellForm.reset();
    } else {
        alert('Please fill all fields correctly!');
    }
});
