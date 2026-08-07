const contenedorDetalle = document.getElementById("detalleProducto");

const urlParams = new URLSearchParams(window.location.search);
const productoId = urlParams.get("id");
let productoActual = null;

async function cargarDetalle() {
    if (!productoId) {
        contenedorDetalle.innerHTML = "<p>Producto no encontrado.</p>";
        return;
    }

    try {
        const respuesta = await fetch(`https://fakestoreapi.com/products/${productoId}`);
        productoActual = await respuesta.json();
        contenedorDetalle.innerHTML = `
            <article>
                <div class="detalleImg">
                    <img src="${productoActual.image}">
                </div>
            </article>
            <article>
                <h1>${productoActual.title}</h1>
                <h5>${productoActual.category}</h5><br><br>
                <h3>$${productoActual.price}</h3>
                <div class=tallas>
                    <div class="detalleInfo">
                        <div class="calificacion">
                            <h4>&#11088; ${productoActual.rating.rate}</h4>
                        </div>
                        <div class="calificacion">
                            <p>(${productoActual.rating.count} reviews)</p>
                        </div>
                    </div>
                    <div class="cantidad">
                        <button>-</button>
                        <h3>1</h3>
                        <button>+</button>
                    </div>
                </div>
                <div>
                    <div>
                    <p>${productoActual.description}
                    </div>
                    <div>
                        <hr>
                    </div>
                    <div class="tallas2">
                        <div>
                            <h2>Choose Size</h2>
                            <div class="tallasBotones">
                                <button>S</button>
                                <button>M</button>
                                <button>L</button>
                                <button>XL</button>
                            </div>
                        </div>
                        <div>
                            <h2>Color</h2>
                            <div class="colorBotones">
                                <button class="gris"></button>
                                <button class="grisOscuro"></button>
                                <button class="negro"></button>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        `;
    } catch (error) {
        contenedorDetalle.innerHTML = `
            <h2>Error</h2>
            <p>${error.message}</p>
        `;
    }
}

function agregarAlCarrito(e) {
    e.preventDefault();

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push(productoActual);
    localStorage.setItem("carrito", JSON.stringify(carrito));

    alert("¡Producto añadido al carrito!");
    window.location.href = e.currentTarget.href;
}

document.getElementById("agregarCarrito").addEventListener("click", agregarAlCarrito);

cargarDetalle();