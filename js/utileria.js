
function validarCorreo(correo) {
    var expresion = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return expresion.test(correo); 
}

function soloLetras(texto) {
    var expresion = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    return expresion.test(texto);
}

function validarLongitud(numero, maxLongitud) {
    var cadenaNumero = String(numero);
    return cadenaNumero.length <= maxLongitud; // Devuelve true si no supera el límite máximo
}

function calcularEdad(fechaNacimiento) {
    var hoy = new Date(); 
    var cumpleanos = new Date(fechaNacimiento);
    
    var edad = hoy.getFullYear() - cumpleanos.getFullYear(); // Resta de años directa
    var diferenciaMeses = hoy.getMonth() - cumpleanos.getMonth(); // Resta de meses

  
    if (diferenciaMeses < 0 || (diferenciaMeses === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }
    return edad; 
}

function esMayorDeEdad(fechaNacimiento) {
    var edadCalculada = calcularEdad(fechaNacimiento);
    return edadCalculada >= 18; 
}

function validarPassword(password) {
    var expresion = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    return expresion.test(password);
}







function validarCURP(curp) {
    var expresion = /^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z0-9]\d$/;
    return expresion.test(curp.toUpperCase());
}

// 4 LETRAS POR EL NOMBRE 
// 6 DIGITOS NUMERICOS PARA LA FECHA DE NACIMIENTO 
// H O M PARA GENERO 
// 5 LETRAS MAYUSCULAS 
// CARACTER O NUMERO 

function validarSemestre(anioIngreso, semestreActual) {
    var anioActual = new Date().getFullYear(); 
    var semestre = parseInt(semestreActual);
    var ingreso = parseInt(anioIngreso);

    if (semestre < 1 || semestre > 12) return false; // SI EL SEMESRE ES MENOR A 0  O MAYOR A 12 
    var aniosTranscurridos = anioActual - ingreso;
    if (aniosTranscurridos < 0) return false;  // SI LA DIFERENCIA ES MENOR A 0 SE RETORNA FALSE 

    var maxSemestrePosible = (aniosTranscurridos * 2) + 2;
    return semestre <= maxSemestrePosible;
}

function validarHorarioEscolar(horaInicio, horaFin) {
    if (!horaInicio || !horaFin) return false; // SI DEJA EN BLANCO LOS CAMPOS 

    // CONVERTIR NUMEROS Y MULTIPLICAR PARA CONVERTIR A MINUTOS 
    var partesInicio = horaInicio.split(":");
    var partesFin = horaFin.split(":");
    
    var minutosInicio = parseInt(partesInicio[0]) * 60 + parseInt(partesInicio[1]);
    var minutosFin = parseInt(partesFin[0]) * 60 + parseInt(partesFin[1]);

    var limiteInferior = 7 * 60;   
    var limiteSuperior = 20 * 60;  

    if (minutosInicio >= minutosFin) return false; // SI LA HORA DE INICIO ES MENOR A LA DE SALIDA 

    if (minutosInicio < limiteInferior || minutosFin > limiteSuperior) return false;

    return true;
}

function validarPesoArchivo(archivoObjeto, maxMB) {
    if (!archivoObjeto) return false;
    
    var pesoEnBytes = archivoObjeto.size;
    var pesoEnMB = pesoEnBytes / (1024 * 1024); 

    return pesoEnMB <= maxMB; 
}