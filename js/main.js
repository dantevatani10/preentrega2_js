const productos=[
    {
        id:1,
        tipo:"Entradas",
        nombre: "Tenders de pollo",
        precio: 1590,
        url: "./img/tenderpollo.jpeg"
    },
    {
        id:2,
        tipo:"Hamburguesas",
        nombre: "Hamburguesa Simple",
        precio: 2000,
        url: "./img/hamburguesasimple.jpeg"
    },
    {
        id:3,
        tipo:"Acompañamientos",
        nombre: "Papas Fritas",
        precio: 2000,
        url: "./img/fritas.jpeg"
    },
]

let cartProducts = []

let productsContainer = document.getElementById("products-container")

function renderProductos(productsArray) {
    productsArray.forEach(producto => {
        const card = document.createElement("div")
        card.innerHTML = `<h3>${producto.nombre}</img>
                          <img src=${producto.url} alt="">
                          <h4>${producto.precio}</h4>
                          <button class="productoAgregar" id="${producto.id}">Agregar</button>`
        productsContainer.appendChild(card)
    } )
    addToCartButton()
}
renderProductos(productos)


function addToCartButton (){
    addButton = document.querySelectorAll(".productoAgregar")
    addButton.forEach(button => {
        button.onclick = (e) =>{
            const productId = e.currentTarget.id
            const selectedProduct = productos.find(producto => producto.id == productId)
            cartProducts.push(selectedProduct)
            console.log(cartProducts)

            localStorage.setItem("cartProducts", JSON.stringify(cartProducts))
        }
    })
}