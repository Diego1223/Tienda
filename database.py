import mysql.connector

CONFIG = {
    "host": "localhost",
    "database": "carneWeb",
    "user": "root",
    "password": "tuclave",
    "auth_plugin": "mysql_native_password"
}


def conexion():
    return mysql.connector.connect(**CONFIG)
