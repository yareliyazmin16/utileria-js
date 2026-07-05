function procesarLogin() {
    var Correo = document.getElementById("correo").value;
    var Password = document.getElementById("Contraseña").value;

    if (Correo.trim() === "" || Password.trim() === "") {
        alert("Llena todos los campos obligatorios");
        console.log("Error: Campos  incompletos");
        return;
    }

    if (!validarCorreo(Correo)) {
        alert("El formato del correo electrónico no es correcto");
        console.log("Error: Formato de correo invalido - " + Correo);
        return;
    }

    if (!validarPassword(Password)) {
        alert("La contraseña debe  incluir:\n- Mínimo 8 caracteres\n- Al menos una mayúscula\n- Al menos una minúscula\n- Al menos un número\n- Al menos un carácter especial (ej. !, @, #, $)");
        console.log("Error: La contraseña no cumple con los requisitos");
        return;
    }

    alert("Campos validados correctamente");
    console.log("Validacion exitosa de credenciales");
    console.log("Usuario autenticado: " + Correo);
}