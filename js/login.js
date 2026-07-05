function procesarLogin() {
            
            var Correo = document.getElementById("correo").value;
            var Password = document.getElementById("Contraseña").value;

            if (Correo.trim() === "" || Password.trim() === "") {
                alert("Llena todos los campos obligatorios");
                return;
            }


            if (!validarCorreo(Correo)) {
                alert("El formato del correo electrónico no es correcto");
                return;
            }

            if (!validarPassword(Password)) {
                alert("La contraseña debe  incluir:\n- Mínimo 8 caracteres\n- Al menos una mayúscula\n- Al menos una minúscula\n- Al menos un número\n- Al menos un carácter especial (ej. !, @, #, $)");
                return;
            }

            alert("Campos validados correctamente");}