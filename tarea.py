# Ejercicio 1: Fundamentos de Python y Lógica
# Escribí un script corto en Python que defina tres variables: service_name (cadena de texto con valor "api"), status_code 
# (entero con valor 200) y is_active (booleano con valor True).
# Mediante una estructura condicional if/elif/else, verificá: si is_active es True y status_code es igual a 200, imprimí en 
# consola: "[OK] api funcionando correctamente".
# Si status_code es distinto de 200, imprimí: "[ERROR] Servicio inestable".
# En cualquier otro caso, imprimí: "[OFFLINE] Servicio inactivo". SIN AYUDA DE LA IA DEL EDITOR

service_name = "api"
status_code = 200
is_active = True

if is_active and status_code == 200:
    print(f"[Ok] {service_name} funcionando correctamente.")

elif status_code != 200:
    print(f"[ERROR] servicio innestable.")
    
else:
    print("[OFFLINE] Servicio Innestable")

