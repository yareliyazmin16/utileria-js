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
        console.log("Error: Campos del formulario incompletos");
        return;
    }

    if (archivo.files.length === 0) {
        alert("Por favor adjunta tu archivo de Carga Académica");
        console.log("Error: Archivo no adjuntado");
        return;
    }

    if (!soloLetras(Nombre)) {
        alert("El nombre solo debe contener letras y espacios ");
        console.log("Error: Nombre invalido - " + Nombre);
        return;
    }

    if (!validarLongitud(numCodigo, 5)) {
        alert("El código numérico es inválido. No debe superar los 5 dígitos");
        console.log("Error: Longitud de codigo invalida - " + numCodigo);
        return;
    }

    if (!validarCURP(Curp)) {
        alert("La CURP ingresada no tiene un formato válido de 18 caracteres");
        console.log("Error: Formato de CURP invalido - " + Curp);
        return;
    }

    if (!validarSemestre(numAnio, numSemestre)) {
        alert("El semestre ingresado no concuerda con el año de ingreso");
        console.log("Error: Incoherencia en semestre y año de ingreso - Año: " + numAnio + ", Semestre: " + numSemestre);
        return;
    }

    if (!validarHorarioEscolar(HoraInicio, HoraFin)) {
        alert(" Las clases deben pertenecer al horario de 07:00 a 20:00 hrs");
        console.log("Error: Horario escolar fuera de rango o invertido - Inicio: " + HoraInicio + ", Fin: " + HoraFin);
        return;
    }

    var elArchivo = archivo.files[0];
    if (!validarPesoArchivo(elArchivo, 2)) { 
        alert("El archivo supera el peso máximo permitido de 2 MB.");
        console.log("Error: El archivo " + elArchivo.name + " supera el limite de peso permitido");
        return;
    }

    var edadCalculada = calcularEdad(Fecha);
    var mayorDeEdad = esMayorDeEdad(Fecha); 

    console.log("Validacion exitosa de todos los campos");
    console.log("Edad calculada: " + edadCalculada + " anos");
    console.log("Mayor de edad: " + mayorDeEdad);

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
    console.log("Ventana modal desplegada");
}

function cerrarModal() {
    document.getElementById("Modal").style.display = "none";
    console.log("Ventana modal cerrada");
}