function procesarLogin() {
    var Correo = document.getElementById("correo").value;
    var Password = document.getElementById("Contraseña").value;

    if (Correo.trim() === "" || Password.trim() === "") {
        console.log("Error: Campos incompletos");
        alert("Llena todos los campos obligatorios");
        return;
    }

    if (!validarCorreo(Correo)) {
        console.log("Error: Formato de correo invalido - " + Correo);
        alert("El formato del correo electrónico no es correcto");
        return;
    }

    if (!validarPassword(Password)) {
        console.log("Error: La contraseña no cumple con los requisitos");
        alert("La contraseña debe incluir:\n- Mínimo 8 caracteres\n- Al menos una mayúscula\n- Al menos una minúscula\n- Al menos un número\n- Al menos un carácter especial (ej. !, @, #, $)");
        return;
    }

    console.log("Validacion exitosa de credenciales");
    console.log("Usuario autenticado: " + Correo);
    alert("Campos validados correctamente");
}