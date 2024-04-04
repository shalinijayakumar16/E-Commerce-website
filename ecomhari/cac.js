function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cart = document.getElementById('cart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            cart.classList.add('open');
        });
    });

    document.querySelector('.cancel-btn').addEventListener('click', () => {
        cart.classList.remove('open');
    });

    document.querySelector('.next-btn').addEventListener('click', () => {
        document.querySelector('.offer-slider').scrollBy({ left: 300, behavior: 'smooth' });
    });
    
    document.querySelector('.prev-btn').addEventListener('click', () => {
        document.querySelector('.offer-slider').scrollBy({ left: -300, behavior: 'smooth' });
    });
    