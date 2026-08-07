const contenedorDetalle = document.getElementById("detalleProducto");

const urlParams = new URLSearchParams(window.location.search);
const productoId = urlParams.get("id");

async function cargarDetalle() {
    if (!productoId) {
        contenedorDetalle.innerHTML = "<p>Producto no encontrado.</p>";
        return;
    }

    try {
        // La API de FakeStore permite pedir un solo producto por su ID
        const respuesta = await fetch(`https://fakestoreapi.com/products/${productoId}`);
        const producto = await respuesta.json();
        contenedorDetalle.innerHTML = `
            <article>
                <div class="detalleImg">
                    <img src="${producto.image}">
                </div>
            </article>
            <article>
                <h1>${producto.title}</h1>
                <h5>${producto.category}</h5><br><br>
                <h3>$${producto.price.toFixed(2)}</h3>
                <div class=tallas>
                    <div class="detalleInfo">
                        <div class="calificacion">
                            <h4>&#11088; ${producto.rating.rate}</h4>
                        </div>
                        <div class="calificacion">
                            <p>(${producto.rating.count} reviews)</p>
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
                    <p>${producto.description}
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

cargarDetalle();