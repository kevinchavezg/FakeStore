let datos = [];

async function obtenerDatos() {
    try {
        const datosAPI = await fetch("https://fakestoreapi.com/products");
        const datos = await datosAPI.json();
        console.log(datos);
        const contenedor = document.getElementById("catalogo");
                datos.forEach(product =>{
                    contenedor.innerHTML += `
                        <article class="producto" id="producto">
                            <div class="favorito"></div>
                            <a href="views/detail.html"><img src=${product.image}></a>
                            <h2>${product.title}</h2>
                            <h5>${product.category}</h5>
                            <div>
                                <h2>$${product.price.toFixed(2)}</h2>
                                <p>&#11088; ${product.rating.rate}</p>
                            </div>
                        </article>
                    `;
                })
            } catch (error) {
                contenedor.innerHTML = `
                <h2>Error</h2>
                <p>${error.message}</p>
                `;
            }
}

obtenerDatos();