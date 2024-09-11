// Recuperar carrito desde localStorage o inicializarlo vacío
let cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];

// Variables de referencia para el carrito en la navbar
let cartButton = document.getElementById("cart-button");
let cartDropdown = document.getElementById("cart-dropdown");
let cartCount = document.getElementById("cart-count");
let cartItemsBody = document.getElementById("cart-items-body");
let cartTotalElement = document.getElementById("cart-total");
let cartEmptyMessage = document.getElementById("cart-empty");
let confirmOrderButton = document.getElementById("confirm-order");
let confirmationMessage = document.getElementById("confirmation-message");

let cartTotal = 0;

// Función para mostrar/ocultar el carrito en la navbar
cartButton.onclick = () => {
    cartDropdown.classList.toggle("active");
};

// Función para actualizar la vista del carrito en la navbar
function updateCartView() {
    cartItemsBody.innerHTML = ""; // Limpiar la vista anterior
    cartTotal = 0; // Resetear el total

    if (cartProducts.length > 0) {
        // Agrupamos los productos por ID y contamos las unidades
        const productCount = cartProducts.reduce((acc, product) => {
            acc[product.id] = (acc[product.id] || 0) + 1;
            return acc;
        }, {});

        for (const [productId, quantity] of Object.entries(productCount)) {
            const product = productos.find(p => p.id == productId);
            const cartItemRow = document.createElement("tr");
            cartItemRow.innerHTML = `
                <td>${product.nombre}</td>
                <td>${quantity}</td>
                <td>$${product.precio}</td>
                <td class="item-actions">
                    <button class="remove-item" data-id="${productId}">-</button>
                    <button class="add-item" data-id="${productId}">+</button>
                </td>
            `;
            cartItemsBody.appendChild(cartItemRow);
            cartTotal += product.precio * quantity;
        }
        cartEmptyMessage.style.display = "none"; // Ocultar mensaje de carrito vacío
    } else {
        cartEmptyMessage.style.display = "block"; // Mostrar mensaje si el carrito está vacío
    }

    cartTotalElement.innerText = `Total: $${cartTotal}`;
    cartCount.innerText = cartProducts.length;
}

// Función para agregar un producto al carrito y actualizar localStorage
function addToCart(product) {
    cartProducts.push(product);
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
    updateCartView();  // Actualiza la vista del carrito
}

// Función para eliminar una unidad del carrito
function removeFromCart(productId) {
    const index = cartProducts.findIndex(product => product.id == productId);
    if (index > -1) {
        cartProducts.splice(index, 1); // Elimina solo una instancia del producto
        localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
        updateCartView();  // Actualiza la vista del carrito
    }
}

// Función para añadir una unidad más del producto al carrito
function addMore(productId) {
    const product = productos.find(p => p.id == productId);
    if (product) {
        cartProducts.push(product);
        localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
        updateCartView();  // Actualiza la vista del carrito
    }
}

// Función para manejar eventos de botones dentro del carrito
function handleCartActions() {
    cartItemsBody.addEventListener("click", (e) => {
        if (e.target.classList.contains("remove-item")) {
            const productId = e.target.dataset.id;
            removeFromCart(productId);
        } else if (e.target.classList.contains("add-item")) {
            const productId = e.target.dataset.id;
            addMore(productId);
        }
    });
}

// Función para confirmar el pedido
function confirmOrder() {
    confirmationMessage.innerText = "Pedido confirmado, tiempo de entrega estimado 20 minutos";
    setTimeout(() => {
        confirmationMessage.innerText = ""; // Ocultar mensaje después de un tiempo
        cartProducts = [];
        localStorage.removeItem("cartProducts");
        updateCartView();
    }, 3000); // Mensaje visible por 3 segundos
}

// Inicialización
document.addEventListener("DOMContentLoaded", function() {
    handleCartActions(); // Agregar manejadores de eventos a los botones dentro del carrito
    updateCartView();
    confirmOrderButton.addEventListener("click", confirmOrder);
});

// Escucha cambios en localStorage y actualiza tanto la navbar como la sección del carrito
window.addEventListener('storage', function () {
    cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
    updateCartView();
});
