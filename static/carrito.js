/*************************************************
 * CARRITO GLOBAL
 *************************************************/

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

document.addEventListener("DOMContentLoaded", () => {
    actualizarContador();
    renderCarrito();
});

function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function agregarProductoAlCarrito(producto, kilos) {
    const existente = carrito.find(p => p.id === producto.id);

    if (existente) {
        existente.kilos += kilos;
        existente.subtotal = existente.kilos * existente.precio;
    } else {
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            kilos: kilos,
            subtotal: kilos * producto.precio
        });
    }

    guardarCarrito();
}

function renderCarrito() {
    const contenedor = document.getElementById("carrito");
    if (!contenedor) return;

    contenedor.innerHTML = "";
    let total = 0;

    carrito.forEach(p => {
        const div = document.createElement("div");
        div.innerHTML = `
            <strong>${p.nombre}</strong>
            <span>${p.kilos} kg x $${p.precio}</span>
            $${p.subtotal}
            <button class="btn-eliminar" onclick="eliminarProducto(${p.id})">Eliminar</button>
        `;
        div.classList.add("carrito");
        contenedor.appendChild(div);
        total += p.subtotal;
    });

    const totalSpan = document.getElementById("total");
    if (totalSpan) totalSpan.textContent = total.toFixed(2);
}

function actualizarContador() {
    const contador = document.getElementById("contador-carrito");
    if (contador) contador.textContent = carrito.length;
}

function eliminarProducto(id) {
    carrito = carrito.filter(carrito => carrito.id !== id);
    guardarCarrito(carrito);
    renderCarrito();
    actualizarContador();
}