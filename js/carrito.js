// Recuperar productos del localStorage
let cartStorage = localStorage.getItem("cartProducts")
cartStorage = cartStorage ? JSON.parse(cartStorage) : []

let cartContainer = document.getElementById("cart-section")
let totalContainer = document.getElementById("total-section")

// Renderizar productos del carrito
function renderCarrito(cartItems) {
    // Limpiar contenedores antes de renderizar
    cartContainer.innerHTML = ""
    totalContainer.innerHTML = ""

    // Comprobar si hay productos en el carrito
    if (cartItems.length === 0) {
        cartContainer.innerHTML = "<p>El carrito está vacío</p>"
        totalContainer.innerHTML = "<p>Total: $0</p>"
        return
    }

    // Renderizar cada producto
    cartItems.forEach(producto => {
        const card = document.createElement("div")
        card.innerHTML = `<h3>${producto.nombre}</h3>
                          <p>Precio: $${producto.precio}</p>
                          <p>Cantidad: ${producto.cantidad}</p>
                          <button class="restar-item" data-id="${producto.id}">-</button>
                          <button class="sumar-item" data-id="${producto.id}">+</button>
                          <button class="eliminar-item" data-id="${producto.id}">Eliminar</button>`
        cartContainer.appendChild(card)
    })

    // Calcular y mostrar el total
    const total = calcularTotal(cartItems)
    totalContainer.innerHTML = `<p>Total: $${total}</p>`

    // Añadir eventos a los botones
    addEventListeners()
}

// Función para calcular el monto total
function calcularTotal(cartItems) {
    // Asegurarse de que se calcule sobre la propiedad cantidad
    return cartItems.reduce((acc, item) => acc + (item.precio * item.cantidad), 0)
}

// Añadir eventos a los botones de sumar/restar/eliminar
function addEventListeners() {
    document.querySelectorAll(".sumar-item").forEach(button => {
        button.addEventListener("click", (e) => {
            const productId = e.target.getAttribute("data-id")
            const product = cartStorage.find(item => item.id == productId)
            product.cantidad++
            localStorage.setItem("cartProducts", JSON.stringify(cartStorage))
            renderCarrito(cartStorage)
        })
    })

    document.querySelectorAll(".restar-item").forEach(button => {
        button.addEventListener("click", (e) => {
            const productId = e.target.getAttribute("data-id")
            const product = cartStorage.find(item => item.id == productId)
            if (product.cantidad > 1) {
                product.cantidad--
            } else {
                cartStorage = cartStorage.filter(item => item.id != productId)
            }
            localStorage.setItem("cartProducts", JSON.stringify(cartStorage))
            renderCarrito(cartStorage)
        })
    })

    document.querySelectorAll(".eliminar-item").forEach(button => {
        button.addEventListener("click", (e) => {
            const productId = e.target.getAttribute("data-id")
            cartStorage = cartStorage.filter(item => item.id != productId)
            localStorage.setItem("cartProducts", JSON.stringify(cartStorage))
            renderCarrito(cartStorage)
        })
    })
}

// Inicializar la renderización del carrito
renderCarrito(cartStorage)
