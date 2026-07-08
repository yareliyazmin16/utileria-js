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
        console.log("Error: Campos del formulario incompletos");
        alert("Completa todos los campos del formulario");
        return;
    }

    if (archivo.files.length === 0) {
        console.log("Error: Archivo no adjuntado");
        alert("Por favor adjunta tu archivo de Carga Académica");
        return;
    }




    if (!soloLetras(Nombre)) {
        console.log("Error: Nombre invalido - " + Nombre);
        alert("El nombre solo debe contener letras y espacios ");
        return;
    }

    if (!validarLongitud(numCodigo, 5)) {
        console.log("Error: Longitud de codigo valida - " + numCodigo);
        alert("El código numérico es inválido. No debe superar los 5 dígitos");
        return;
    }

    if (!validarCURP(Curp)) {
        console.log("Error: Formato de CURP invalido - " + Curp);
        alert("La CURP ingresada no tiene un formato válido de 18 caracteres");
        return;
    }



    if (!validarSemestre(numAnio, numSemestre)) {
        console.log("Error: Incoherencia en semestre y año de ingreso - Año: " + numAnio + ", Semestre: " + numSemestre);
        alert("El semestre ingresado no concuerda con el año de ingreso");
        return;
    }



    if (!validarHorarioEscolar(HoraInicio, HoraFin)) {
        console.log("Error: Horario escolar fuera de rango o invertido - Inicio: " + HoraInicio + ", Fin: " + HoraFin);
        alert(" Las clases deben pertenecer al horario de 07:00 a 20:00 hrs");
        return;
    }

    var elArchivo = archivo.files[0];
    if (!validarPesoArchivo(elArchivo, 2)) { 
        console.log("Error: El archivo " + elArchivo.name + " supera el limite de peso permitido");
        alert("El archivo supera el peso máximo permitido de 2 MB.");
        return;
    }








    var edadCalculada = calcularEdad(Fecha);
    var mayorDeEdad = esMayorDeEdad(Fecha); 

    console.log("Validacion exitosa de todos los campos");
    console.log("Edad calculada: " + edadCalculada + " anos");
    console.log("Mayor de edad: " + mayorDeEdad);
    console.log("Ventana modal desplegada");

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
    console.log("Ventana modal cerrada");
    document.getElementById("Modal").style.display = "none";
}