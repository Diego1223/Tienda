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
