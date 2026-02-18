async function iniciarSesion(event) {
    event.preventDefault(); //evita recargar

    const correo = document.getElementById("correo").value;
    const contrasena = document.getElementById("contrasena").value;

    try {
        const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                correo:correo,
                contrasena: contrasena
            })
        });

        const data = await response.json()
        //200 - ok
        if (!response.ok) {
            alert(data.mensaje);
            return;
        }

        window.location.href = "/";
        
    }
    catch(e) {
        console.log(e)
    }
        
}