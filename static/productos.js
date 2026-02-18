document.addEventListener("DOMContentLoaded", () => {
    cargarDetalles();
});

async function cargarDetalles() {
    const response = await fetch(`/api/producto_cmp/${PRODUCTO_ID}`);
    const data = await response.json();

    const div = document.getElementById("descripcion_completa");
    
    //En MySQL tenemos el nombre del archivo RESCABRERIA17.png
    div.innerHTML = `
            <div class="product-container">
        <div class="imagen">
            <img src="/static/img/${data.imagen}" alt="imagen">
        </div>

        <div class="informacion">
            <h1>${data.nombre}</h1>

            <div class="etiquetas">
                <button id="Brangus" class="etiqueta">Brangus 🥩</button>
                <button id="parrilla" class="etiqueta">Ideal para parrilla 🔥</button>
                <button id="rancho17" class="etiqueta highlight">Rancho 17</button>
            </div>

            <p id="descripcion" class="descripcion">
                ${data.descripcion_larga}
            </p>
            <div class="price">$${data.precio}kg/caja</div>
            
            <input type="number" id="kilos" min="10" step="10" value="10" class="input-box">
            <button class="btn-agregar" id="btn-agregar">Agregar al carrito</button>
        </div>
    </div>
        `;
    inicializarEtiquetas();

    document.getElementById("btn-agregar").addEventListener("click", () => {
        const kilos = parseFloat(document.getElementById("kilos").value);

        if (kilos <= 0 || isNaN(kilos)) {
            alert("Cantidad inválida");
            return;
        }
        //Mandamos todo data, para poder hacer data.id, data.nombre como diccionario 
        agregarProductoAlCarrito(data, kilos);
        actualizarContador();
        alert("Producto agregado al carrito");
    });

}

async function inicializarEtiquetas() {
    const response = await fetch(`/api/producto_cmp/${PRODUCTO_ID}`);
    const data = await response.json();

    const brangus = document.getElementById("Brangus");
    const parrilla = document.getElementById("parrilla");
    const rancho17 = document.getElementById("rancho17");

    const botones = [parrilla, brangus, rancho17];

    function activarBoton(botonActivo, texto) {
        botones.forEach(boton => boton.classList.remove("highlight"));
        botonActivo.classList.add("highlight");
        descripcion.textContent = texto;
    }

    parrilla.addEventListener("click", () => {
        activarBoton(parrilla, data.parrilla);
    });

    brangus.addEventListener("click", () => {
        activarBoton(brangus, "El ganado Brangus es una raza bovina híbrida de carne desarrollada para combinar lo mejor de dos razas: Angus (conocida por la calidad de su carne) y Brahman (conocida por su resistencia y adaptabilidad).  Produce carne tierna, con buen marmoleado y jugosidad, gracias a la influencia del Angus. Cabe desta Las vacas suelen ser buenas madres, con partos relativamente fáciles y buena producción de leche para sus terneros.");
    });

    rancho17.addEventListener("click", () => {
        activarBoton(rancho17,data.descripcion_larga);
    });

}
