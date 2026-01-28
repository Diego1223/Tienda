const brangus = document.getElementById("Brangus");
const parrilla = document.getElementById("parrilla");
const rancho17 = document.getElementById("rancho17");
const descripcion = document.getElementById("descripcion");

const botones = [parrilla, brangus, rancho17];
//Esto es para quitarle el highlight y que se vea distinto
//le pasamos el boton clickeado y el texto que queremos mostrar
function activarBoton(botonActivo, texto) {
    //quitar highlight a todos
    //recorre cada objeto del boton
    botones.forEach(boton => {
        //le quita la clase css highlight
        boton.classList.remove("highlight");
    });

    //activar solo el boton clickeado
    botonActivo.classList.add("highlight");

    //cambiar texto
    descripcion.textContent = texto;
}

parrilla.addEventListener("click", () => {
    activarBoton(parrilla,        
        `Descripcion acerca de la parrilla
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga animi, omnis ad sequi nisi unde! Eius, molestias nisi libero earum laudantium sunt consequatur, esse optio sed vitae voluptatem eos accusamus?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat vel veritatis, quaerat omnis enim hic eum facilis esse explicabo pariatur, laudantium quam exercitationem similique recusandae veniam ut aperiam, voluptates odit?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem culpa cumque, recusandae nam vero repellendus nobis suscipit accusantium autem dolorem, tempore fugiat quaerat, molestiae deleniti dolor et. Autem, unde aut?`
    );
});

brangus.addEventListener("click", () => {
    activarBoton(brangus,        
        `Descripcion acerca del ganado 
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga animi, omnis ad sequi nisi unde! Eius, molestias nisi libero earum laudantium sunt consequatur, esse optio sed vitae voluptatem eos accusamus?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat vel veritatis, quaerat omnis enim hic eum facilis esse explicabo pariatur, laudantium quam exercitationem similique recusandae veniam ut aperiam, voluptates odit?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem culpa cumque, recusandae nam vero repellendus nobis suscipit accusantium autem dolorem, tempore fugiat quaerat, molestiae deleniti dolor et. Autem, unde aut?`
    );

});

rancho17.addEventListener("click", () => {
    activarBoton(rancho17,
        `Descripcion acerca del rancho 17
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga animi, omnis ad sequi nisi unde! Eius, molestias nisi libero earum laudantium sunt consequatur, esse optio sed vitae voluptatem eos accusamus?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat vel veritatis, quaerat omnis enim hic eum facilis esse explicabo pariatur, laudantium quam exercitationem similique recusandae veniam ut aperiam, voluptates odit?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem culpa cumque, recusandae nam vero repellendus nobis suscipit accusantium autem dolorem, tempore fugiat quaerat, molestiae deleniti dolor et. Autem, unde aut?`
    )
});