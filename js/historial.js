const contenedorHistorial = document.getElementById("listaHistorial");

function mostrarHistorial() {
    const historial = JSON.parse(localStorage.getItem("historialCompra")) || [];

    contenedorHistorial.innerHTML = "";

    if (historial.length === 0) {
        contenedorHistorial.innerHTML = "<p>El Historial de compras está vacío.</p>";
        return;
    }

    historial.forEach((producto, index) => {
        contenedorHistorial.innerHTML += `
            <article class="item">
                <div class="itemInfo">
                    <img src="${producto.image}" width="50">
                </div>
                <div class="itemInfo2">
                    <h4>${producto.title}</h4>
                    <p>${producto.category}</p>
                    <h4>$${producto.price}</h4>
                </div>
            </article>
            <hr>
        `;
    });

}

mostrarHistorial();