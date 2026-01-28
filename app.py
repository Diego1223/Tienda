from flask import Flask, render_template, jsonify
from database import conexion

app = Flask(__name__)

#  ---------------------- Rutas FLASK  ----------------------
@app.route("/")
def index():
    return render_template("index.html")

@app.route("/carrito")
def carrito():
    return render_template("carrito.html")


#Nos mandará a la descripcion del producto
@app.route("/descripcion/<int:id>")
def descripcion(id):
    return render_template("descripcion.html", producto_id=id)


# ---------------------- APIS productos ----------------------
@app.route("/api/productos")
def productos():
    conectar = conexion()
    cursor = conectar.cursor(dictionary=True)

    cursor.execute("SELECT id, nombre, descripcion_corta, precio FROM productos")
    datos = cursor.fetchall()   

    return jsonify(datos)

#cmp - completo
@app.route("/api/producto_cmp/<int:id>")
def producto_cmp(id):
    conectar = conexion()
    cursor = conectar.cursor(dictionary=True)

    cursor.execute(
        "SELECT id, nombre, descripcion_larga, precio, stock, created_at, imagen FROM productos WHERE id = %s", (id, )
    )
    dato = cursor.fetchone()

    if not dato:
        return jsonify({
            "mensaje": "Producto no encontrado"
        }), 404
    
    return jsonify(dato)




if __name__ == "__main__":
    app.run(debug=True)

