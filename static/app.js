let productos = [];
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

//Aqui es donde inicializamos todo
document.addEventListener("DOMContentLoaded", () => {
    cargarProductos();
    mostrar_contador();
})


async function cargarProductos() {
    const respuesta = await fetch("/api/productos");
    productos = await respuesta.json();
    renderProductos();
}

//Renderizar - Se muestran los productos uno por uno
function renderProductos() {
    const contenedor = document.getElementById("productos");
    contenedor.innerHTML = ""; //limpiar lo que haya en la etiqueta html

    //por cada producto crea una tarjeta visual    
    productos.forEach(p => {
        const div = document.createElement("div");
        div.innerHTML = `
            <strong>${p.nombre}</strong> <p>${p.descripcion_corta}</p>Precio Mayorista: $${p.precio}
            <a class="descripcion-a" href="/descripcion/${p.id}">Descripción</a>
        `;

        div.classList.add("producto")

        contenedor.appendChild(div);
    })
}

function mostrar_contador() {
    const contador = document.getElementById("contador-carrito");
    if (contador) contador.textContent = carrito.length;
}
