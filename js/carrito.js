let cartStorege = localStorage.getItem("cartProducts")
cartStorege = JSON.parse(cartStorege)

let cartContainer = document.getElementById("cart-section")
function renderCarrito (cartItems){
   cartItems.forEach(producto =>{
    const card = document.createElement("div")
    card.innerHTML = `<h3>${producto.nombre}</h3>
                                <h4>${producto.precio}</h4>`
    cartContainer.appendChild(card)
   })
}
renderCarrito(cartStorege)