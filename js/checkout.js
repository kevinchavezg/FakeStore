const contenedorCarrito = document.getElementById("listaCarrito");

function mostrarCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    contenedorCarrito.innerHTML = "";

    if (carrito.length === 0) {
        contenedorCarrito.innerHTML = "<p>El carrito está vacío.</p>";
        return;
    }

    carrito.forEach((producto, index) => {
        contenedorCarrito.innerHTML += `
            <article class="item">
                <div class="itemInfo">
                    <img src="${producto.image}" width="50">
                </div>
                <div class="itemInfo2">
                    <h4>${producto.title}</h4>
                    <p>${producto.category}</p>
                    <h4>${producto.price}</h4>
                </div>
                <div class="itemInfo">
                    <button>-</button>
                    <h3>4</h3>
                    <button>+</button>
                </div>
            </article>
            <hr>
        `;
    });

}

mostrarCarrito();