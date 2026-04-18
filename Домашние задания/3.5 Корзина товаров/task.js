const cartProducts = document.querySelector('.cart__products');
const cartContainer = document.querySelector('.cart');
const products = document.querySelectorAll('.product');

function loadCart() {
    const savedCart = localStorage.getItem('cart_data');
    if (savedCart) {
        cartProducts.innerHTML = savedCart;
    }
    toggleCartVisibility();
}

function saveCart() {
    localStorage.setItem('cart_data', cartProducts.innerHTML);
    toggleCartVisibility();
}

function toggleCartVisibility() {
    if (cartProducts.children.length > 0) {
        cartContainer.style.display = 'block';
    } else {
        cartContainer.style.display = 'none';
    }
}

document.body.addEventListener('click', (event) => {
    const target = event.target;

    if (target.classList.contains('product__quantity-control')) {
        const quantityValue = target.closest('.product__quantity-controls').querySelector('.product__quantity-value');
        let currentCount = parseInt(quantityValue.textContent);

        if (target.classList.contains('product__quantity-control_inc')) {
            currentCount++;
        } else if (target.classList.contains('product__quantity-control_dec')) {
            currentCount = currentCount > 1 ? currentCount - 1 : 1; // Минимум 1
        }
        quantityValue.textContent = currentCount;
    }

    if (target.classList.contains('product__add')) {
        const product = target.closest('.product');
        const id = product.dataset.id;
        const imageSrc = product.querySelector('.product__image').src;
        const countToAdd = parseInt(product.querySelector('.product__quantity-value').textContent);

        const productInCart = cartProducts.querySelector(`.cart__product[data-id="${id}"]`);

        if (productInCart) {
            const countElement = productInCart.querySelector('.cart__product-count');
            countElement.textContent = parseInt(countElement.textContent) + countToAdd;
        } else {
            cartProducts.insertAdjacentHTML('beforeend', `
                <div class="cart__product" data-id="${id}" style="cursor: pointer;" title="Нажмите, чтобы удалить">
                    <img class="cart__product-image" src="${imageSrc}">
                    <div class="cart__product-count">${countToAdd}</div>
                </div>
            `);
        }
        saveCart();
    }

    if (target.closest('.cart__product')) {
        target.closest('.cart__product').remove();
        saveCart();
    }
});

loadCart();