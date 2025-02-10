window.onload = function() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-content');
    let subtotal = 0; 
    cartItemsContainer.innerHTML = '';

    if (cart.length > 0) {
        cart.forEach((item, index) => {
            const productTotal = item.price * item.quantity; 
            subtotal += productTotal; 
            const cartItemHTML = `
                <div class="table__product-row" id="cart-item-${index}">
                    <div class="table__item table__item_product">
                        <div class="item-product-image">
                            <img src="${item.image}" alt="${item.title}" />
                        </div>
                        <div class="item-product-name">
                            <p>${item.title}</p>
                            <a href="#"  onclick="removeItem(${index})">Remove</a>
                        </div>
                    </div>

                    <div class=" table__item table__item_price">
                        <p>$${item.price}</p>
                    </div>

                    <div class=" table__item table__item_quantity counter">
                        <div class=" items counter-wrapper">
                            <button class="items__control" type="button" onclick="updateQuantity(${index}, 'subtract')">-</button>
                            <button class="items__current" type="button" id="count-${index}">${item.quantity}</button>
                            <button class="items__control" type="button" onclick="updateQuantity(${index}, 'add')">+</button>
                        </div>
                    </div>

                    <div class=" table__item table__item_total">
                        <p class="total" id="total-price-${index}">$${productTotal.toFixed(2)}</p>
                    </div>
                </div>
            `;
            cartItemsContainer.innerHTML += cartItemHTML;
        });
        document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    } else {
        cartItemsContainer.innerHTML = `<div class="table__cart-empty"> Your cart is empty.</div>`;
    }
};

function updateQuantity(index, action) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart[index];
    
    if (action === 'add') {
        item.quantity++;
    } else if (action === 'subtract' && item.quantity > 1) {
        item.quantity--;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    document.getElementById(`count-${index}`).textContent = item.quantity;
    const productTotal = item.price * item.quantity;
    document.getElementById(`total-price-${index}`).textContent = `$${productTotal.toFixed(2)}`;
    updateSubtotal();
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1); 
    localStorage.setItem('cart', JSON.stringify(cart));
    const itemRow = document.getElementById(`cart-item-${index}`);
    itemRow.remove();
    updateSubtotal();
}
function updateSubtotal() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let subtotal = 0;
    cart.forEach(item => {
        subtotal += item.price * item.quantity;
    });
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1); 
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.reload();
}
function updateQuantity(index, action) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart[index];

    if (action === 'add') {
        item.quantity++;
    } else if (action === 'subtract' && item.quantity > 1) {
        item.quantity--;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    document.getElementById(`count-${index}`).textContent = item.quantity;
    document.getElementById(`total-price-${index}`).textContent = `$${(item.price * item.quantity).toFixed(2)}`;
    let subtotal = 0;
    cart.forEach(item => subtotal += item.price * item.quantity);
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
}
document.getElementById('wrapProduct').addEventListener('change', function () {
    let wrapFee = 10; 
    let subtotalElement = document.getElementById('subtotal');
    let currentSubtotal = parseFloat(subtotalElement.textContent.replace('$', ''));

    if (this.checked) {
        currentSubtotal += wrapFee;
    } else {
        currentSubtotal -= wrapFee;
    }

    subtotalElement.textContent = `$${currentSubtotal.toFixed(2)}`;
});


const emailInput = document.getElementById("emailInput");
const subscribeButton = document.getElementById("subscribeButton");
const resultElement = document.getElementById("result");

subscribeButton.addEventListener("click", function(event) {
    event.preventDefault(); 

    const emailValue = emailInput.value;

    if (validateEmail(emailValue)) {
    resultElement.textContent = "Newsletter subscription completed";
    } else {
    resultElement.textContent = "Invalid email format";
    }
});

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}