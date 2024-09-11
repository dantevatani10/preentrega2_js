const productos = [
    {
        id: 1,
        nombre: "Tenders de pollo",
        precio: 15900,
        url: "./img/tenderpollo.jpeg"
    },
    {
        id: 2,
        nombre: "Hamburguesa Simple",
        precio: 6000,
        url: "./img/hamburguesasimple.jpeg"
    },
    {
        id: 3,
        nombre: "Papas Fritas",
        precio: 3500,
        url: "./img/fritas.jpeg"
    },
    {
        id: 4,
        nombre: "Coca Cola",
        precio: 2000,
        url: "./img/cocacola.jpeg"
    },
    {
        id: 5,
        nombre: "Hamburguesa doble",
        precio: 8000,
        url: "./img/doble.jpeg"
    },
    {
        id: 6,
        nombre: "Aros de cebolla",
        precio: 5000,
        url: "./img/cebolla.jpeg"
    },


];

let productsContainer = document.getElementById("products-container");

// Renderizar productos en la página
function renderProductos(productsArray) {
    productsContainer.innerHTML = "";

    productsArray.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("product-card"); 
        card.innerHTML = `
            <h3>${producto.nombre}</h3>
            <img src="${producto.url}" alt="${producto.nombre}">
            <h4>$${producto.precio}</h4>
            <button class="productoAgregar" id="${producto.id}">Agregar</button>
        `;
        productsContainer.appendChild(card);
    });

    addToCartButton();  
}

// renderizar los productos
renderProductos(productos);

// Función para agregar productos al carrito 
function addToCartButton() {
    const addButton = document.querySelectorAll(".productoAgregar");

    addButton.forEach(button => {
        button.onclick = (e) => {
            const productId = e.currentTarget.id;
            const selectedProduct = productos.find(producto => producto.id == productId);

            
            if (typeof addToCart === "function") {
                addToCart(selectedProduct);
            } else {
                console.error("addToCart function not found.");
            }
        };
    });
}
