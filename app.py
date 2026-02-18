from flask import Flask, render_template, jsonify, session, redirect, url_for, request
from database import conexion
from functools import wraps

app = Flask(__name__)
app.secret_key = "clave_secreta"

#proteger las rutas de flask
def login_required(f):
    #Conserva el nombre original de la funcion y evita errores
    @wraps(f)
    def decorador(*args, **kwargs):
    #Si en el diccionario session no existe user_id manda directo a login
        if "user_id" not in session:
            return redirect(url_for("login"))
        
        return f(*args, **kwargs)
    return decorador

#  ---------------------- Rutas FLASK  ----------------------
@app.route("/")
@login_required
def index():
    return render_template("index.html")



@app.route("/login")
def login(): 
    return render_template("login.html")


@app.route("/carrito")
@login_required
def carrito():
    return render_template("carrito.html")

@app.route("/pagar")
def pagar():
    return render_template("pagar.html")


#Nos mandará a la descripcion del producto
@app.route("/descripcion/<int:id>")
@login_required
def descripcion(id):
    return render_template("descripcion.html", producto_id=id)







# --------------- APIS para registro de usuarios e inicios de sesion -------------
@app.route("/api/login", methods=["POST"])
def verificar_usuario():
    data = request.json

    correo = data.get("correo")
    contrasena = data.get("contrasena")
    print(correo)

    if not correo or not contrasena:
        return jsonify({
            "mensaje": "Favor de confirmar los datos"
        }), 400

    #Verificar con MySQL
    try:
        conectar = conexion()
        cursor = conectar.cursor(dictionary=True)

        cursor.execute("SELECT id, nombre, contrasena, correo FROM usuarios WHERE correo = %s AND contrasena = %s", (correo, contrasena))
        usuario = cursor.fetchone()
        conectar.close()
        cursor.close()

        #401 falta autenticacion valida
        if not usuario: 
            return jsonify({
                "mensaje": "Usuario no existe"
            }), 401
        
        #validacion de contraseñas
        if usuario["contrasena"] != contrasena:
            return jsonify({
                "mensaje": "Contraseña incorrecta"
            }), 401
        
        #Login correcto se guarda la sesion
        session["user_id"] = usuario["id"]
        session["user_name"] = usuario["nombre"]
        
        return jsonify({
            "mensaje": "login correcto"
        }), 200
    
    
    except Exception as e:
        print("Error", e)
        return jsonify({
            "mensaje": "Error interno en el servidor"
        }), 500
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
        "SELECT id, nombre, descripcion_larga, precio, parrilla ,imagen FROM productos WHERE id = %s", (id, )
    )
    dato = cursor.fetchone()

    if not dato:
        return jsonify({
            "mensaje": "Producto no encontrado"
        }), 404
    
    return jsonify(dato)


if __name__ == "__main__":
    app.run(debug=True)

