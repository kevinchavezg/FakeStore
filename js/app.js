let datos = [];
let categoriaActual = "all";
let textoBusqueda = "";

const contenedor = document.getElementById("catalogo");
const contenedorCategorias = document.getElementById("contenedorCategorias");

function mostrarProductos(listaProductos) {
    contenedor.innerHTML = ""; 

    if (listaProductos.length === 0) {
        contenedor.innerHTML = "<p>No se encontraron productos en esta categoría.</p>";
        return;
    }

    listaProductos.forEach(product => {
        contenedor.innerHTML += `
            <article class="producto">
                <div class="favorito"></div>
                <a href="views/detail.html?id=${product.id}"><img src="${product.image}"></a>
                <h2>${product.title}</h2>
                <h5>${product.category}</h5>
                <div>
                    <h2>$${product.price.toFixed(2)}</h2>
                    <p>&#11088; ${product.rating.rate}</p>
                </div>
            </article>
        `;
    });
}

async function obtenerDatos() {
    try {
        const datosAPI = await fetch("https://fakestoreapi.com/products");
        datos = await datosAPI.json();
        mostrarProductos(datos);
            } catch (error) {
                contenedor.innerHTML = `
                    <h2>Error</h2>
                    <p>${error.message}</p>
                `;
            }
}

contenedorCategorias.addEventListener("click", (e) => {
    const boton = e.target.closest("button");
    if (!boton) return;

    const categoriaSeleccionada = boton.dataset.category;

    if (categoriaSeleccionada === "all") {
        mostrarProductos(datos);
    } else {
        const productosFiltrados = datos.filter(
            p => p.category === categoriaSeleccionada
        );
        mostrarProductos(productosFiltrados);
    }
});

function aplicarFiltros() {
    const productosFiltrados = datos.filter(producto => {
        const coincideCategoria = categoriaActual === "all" || producto.category === categoriaActual;
        const coincideTexto = producto.title.toLowerCase().includes(textoBusqueda.toLowerCase());
        return coincideCategoria && coincideTexto;
    });

    mostrarProductos(productosFiltrados);
}

contenedorCategorias.addEventListener("click", (e) => {
    const boton = e.target.closest("button");
    if (!boton) return;

    categoriaActual = boton.dataset.category;
    aplicarFiltros();
});

inputBusqueda.addEventListener("input", (e) => {
    textoBusqueda = e.target.value.trim();
    aplicarFiltros();
});

obtenerDatos();