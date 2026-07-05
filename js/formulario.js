 function procesarFormulario() {
            var Nombre = document.getElementById("nombre").value;
            var numCodigo = document.getElementById("codigo").value;
            var Curp = document.getElementById("curp").value;
            var numAnio = document.getElementById("anioIngreso").value;
            var numSemestre = document.getElementById("semestre").value;
            var Fecha = document.getElementById("fechaNac").value;
            var HoraInicio = document.getElementById("horaInicio").value;
            var HoraFin = document.getElementById("horaFin").value;
            var archivo = document.getElementById("cargaAcademica");

            if (!Nombre || !numCodigo || !Curp || !numAnio || !numSemestre || !Fecha || !HoraInicio || !HoraFin) {
                alert("Completa todos los campos del formulario");
                return;
            }

            if (archivo.files.length === 0) {
                alert("Por favor adjunta tu archivo de Carga Académica");
                return;
            }

            if (!soloLetras(Nombre)) {
                alert("El nombre solo debe contener letras y espacios ");
                return;
            }

            if (!validarLongitud(numCodigo, 5)) {
                alert("El código numérico es inválido. No debe superar los 5 dígitos");
                return;
            }

            if (!validarCURP(Curp)) {
                alert("La CURP ingresada no tiene un formato válido de 18 caracteres");
                return;
            }

            if (!validarSemestre(numAnio, numSemestre)) {
                alert("El semestre ingresado no concuerda con el año de ingreso");
                return;
            }

            if (!validarHorarioEscolar(HoraInicio, HoraFin)) {
                alert(" Las clases deben pertenecer al horario de 07:00 a 20:00 hrs");
                return;
            }

            var elArchivo = archivo.files[0];
            if (!validarPesoArchivo(elArchivo, 2)) { 
                alert("El archivo supera el peso máximo permitido de 2 MB.");
                return;
            }

            var edadCalculada = calcularEdad(Fecha);
            var mayorDeEdad = esMayorDeEdad(Fecha); 

            var mensajeModal = "Hola <b>" + Nombre.toUpperCase() + "</b>.<br><br>" +
                               "<b>Edad calculada:</b> " + edadCalculada + " años.<br>" +
                               "<b>CURP:</b> " + Curp.toUpperCase() + "<br>" +
                               "<b> Semestre: " + numSemestre + " Año de Ingreso: " + numAnio + "<br>" +
                               "<b>Horario:</b> " + HoraInicio + " a " + HoraFin + " hrs.<br>" +
                               "<b>Archivo:</b> " + elArchivo.name + " <span > Correcto </span><br><br>";

            if (mayorDeEdad) { 
                mensajeModal += "<span  > El estudiante puede  votar (Mayor de edad)</span>"; 
            } else {
                mensajeModal += "<span > El estudiante no puede votar (Menor de edad) </span>"; 
            }

            document.getElementById("modalTexto").innerHTML = mensajeModal;
            document.getElementById("Modal").style.display = "flex";
        }

        function cerrarModal() {
            document.getElementById("Modal").style.display = "none";
        }