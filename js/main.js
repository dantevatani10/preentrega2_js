let productos = [
    { id: 1,
        tipo: "Entradas",
        nombre: "Tenders de pollo",
        precio: 1590,
        url: "./img/tenderpollo.jpeg" },

    { id: 2,
         tipo: "Hamburguesas", 
         nombre: "Hamburguesa Simple", 
         precio: 2000, 
         url: "./img/hamburguesasimple.jpeg" },
    { id: 3, 
        tipo: "Acompañamientos", 
        nombre: "Papas Fritas", 
        precio: 2000, 
        url: "./img/fritas.jpeg" }

]

let cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || []

// Seleccionamos los contenedores por tipo
let entradasContainer = document.getElementById("entradas-container")
let hamburguesasContainer = document.getElementById("hamburguesas-container")
let acompanamientosContainer = document.getElementById("acompanamientos-container")

function renderProductos(productsArray) {
    productsArray.forEach(producto => {
        // Crear la card para cada producto
        const card = document.createElement("div")
        card.classList.add("card")
        card.innerHTML = `
            <h3>${producto.nombre}</h3>
            <img src="${producto.url}" alt="${producto.nombre}">
            <h4>$${producto.precio}</h4>
            <label for="cantidad-${producto.id}">Cantidad:</label>
            <input type="number" id="cantidad-${producto.id}" class="cantidadInput" value="1" min="1" max="99">
            <button class="productoAgregar" id="${producto.id}">Agregar</button>
        `

        // Insertar el producto en el contenedor adecuado según su tipo
        if (producto.tipo === "Entradas") {
            entradasContainer.appendChild(card)
        } else if (producto.tipo === "Hamburguesas") {
            hamburguesasContainer.appendChild(card)
        } else if (producto.tipo === "Acompañamientos") {
            acompanamientosContainer.appendChild(card)
        }
    })
    addToCartButton()
}
renderProductos(productos)

function addToCartButton() {
    const addButton = document.querySelectorAll(".productoAgregar")
    addButton.forEach(button => {
        button.onclick = (e) => {
            const productId = e.currentTarget.id
            const selectedProduct = productos.find(producto => producto.id == productId)
            
            // Capturar la cantidad seleccionada por el usuario
            const cantidadInput = document.getElementById(`cantidad-${productId}`).value
            const cantidad = parseInt(cantidadInput)

            // Verificar si el producto ya está en el carrito
            const existingProduct = cartProducts.find(item => item.id == selectedProduct.id)
            
            if (existingProduct) {
                // Si el producto ya está en el carrito, incrementar la cantidad
                existingProduct.cantidad += cantidad
            } else {
                // Si es la primera vez que se agrega, inicializar con la cantidad seleccionada
                selectedProduct.cantidad = cantidad
                cartProducts.push(selectedProduct)
            }

            // Guardar en el localStorage
            localStorage.setItem("cartProducts", JSON.stringify(cartProducts))
            console.log(cartProducts)
        }
    })
}
