```markdown
# Sistema de Control Escolar Universitario - Libreria utileria.js

## Portada e Informacion General
* **Nombre del Alumno:** Yareli Yazmin Pacheco Aragon
* **Semestre:** Sexto Semestre
* **Carrera:** Ingenieria en Sistemas Computacionales
* **Materia:** Programacion Web

### Que problema resuelve este proyecto?
Este proyecto resuelve la validacion y consistencia de datos en el lado del cliente para una plataforma universitaria de control escolar. A traves de JavaScript puro (Vanilla JS), la libreria intercepta los flujos de autenticacion (login.html) y registro de estudiantes (index.html) antes de que la informacion sea enviada al servidor. 

El objetivo principal es optimizar el rendimiento del sistema, previniendo el almacenamiento de informacion incorrecta en la base de datos, controlando el peso de los archivos cargados para no saturar el almacenamiento y asegurando que los datos escolares cumplan con las reglas de negocio de la institucion desde el navegador del usuario.

---

## Instalacion
Para integrar esta libreria en cualquier documento HTML de la plataforma, se debe almacenar el archivo en el directorio correspondiente de scripts e importarlo al final del cuerpo del documento, asegurando su carga antes del script controlador principal:

```html
<script src="js/utileria.js"></script>

```

---

## Uso y Ejemplos de Codigo (Documentacion Codigo Fuente)

### Funciones Obligatorias

#### 1. validarCorreo(correo)

Comprueba si el correo electronico ingresado cumple con una estructura estandar global mediante expresiones regulares.

```javascript
function validarCorreo(correo) {
    var expresion = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return expresion.test(correo); 
}

// Ejemplo de ya implementado:
var correoInput = "yareli@correo.com";
if (!validarCorreo(correoInput)) {
    console.log("Error: El formato del correo electronico es incorrecto.");
} else {
    console.log("Validacion exitosa: Correo estructurado correctamente.");
}

```

#### 2. soloLetras(texto)

Filtra cadenas de texto para asegurar que contengan unicamente letras (mayusculas o minusculas), espacios y caracteres acentuados o la letra n.

```javascript
function soloLetras(texto) {
    var expresion = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    return expresion.test(texto);
}

// Ejemplo de ya implementado:
var nombreInput = "Yareli Yazmin";
if (!soloLetras(nombreInput)) {
    alert("El campo nombre solo acepta letras, acentos y espacios.");
}

```

#### 3. validarLongitud(numero, maxLongitud)

Convierte un valor numerico a tipo String y evalua si su cantidad de digitos es menor o igual al limite maximo permitido (usado para el codigo escolar).

```javascript
function validarLongitud(numero, maxLongitud) {
    var cadenaNumero = String(numero);
    return cadenaNumero.length <= maxLongitud;
}

// Ejemplo de ya implementado:
var codigoEstudiante = 12345;
if (!validarLongitud(codigoEstudiante, 5)) {
    console.error("El codigo numerico supera el limite de 5 caracteres.");
}

```

#### 4. calcularEdad(fechaNacimiento)

Calcula de forma exacta la edad de una persona restando el ano de nacimiento al ano actual y ajustando el resultado si la persona no ha cumplido anos en el mes en curso.

```javascript
function calcularEdad(fechaNacimiento) {
    var hoy = new Date(); 
    var cumpleanos = new Date(fechaNacimiento);
    
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var diferenciaMeses = hoy.getMonth() - cumpleanos.getMonth();
  
    if (diferenciaMeses < 0 || (diferenciaMeses === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }
    return edad; 
}

// Ejemplo de ya implementado:
var edadCalculada = calcularEdad("2002-05-15");
console.log("Resultado matematico: El alumno tiene " + edadCalculada + " anos.");

```

#### 5. esMayorDeEdad(fechaNacimiento)

Determina si la fecha de nacimiento ingresada corresponde a un usuario con 18 anos o mas apoyandose en la funcion de calculo de edad.

```javascript
function esMayorDeEdad(fechaNacimiento) {
    var edadCalculada = calcularEdad(fechaNacimiento);
    return edadCalculada >= 18; 
}

// Ejemplo de ya implementado:
var fechaInput = "2002-05-15";
if (esMayorDeEdad(fechaInput)) {
    console.log("Estatus verificado: Mayor de edad habilitado para el padron escolar.");
}

```

#### 6. validarPassword(password)

Evalua que la contrasena cumpla con criterios de seguridad: minimo 8 caracteres, una mayuscula, una minuscula, un numero y un caracter especial.

```javascript
function validarPassword(password) {
    var expresion = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    return expresion.test(password);
}

// Ejemplo de ya implementado:
var passInput = "Sistemas2026#";
if (!validarPassword(passInput)) {
    alert("La contrasena debe incluir mayusculas, minusculas, numeros y caracteres especiales.");
}

```

---

### Funciones de la Seccion Libre (Creatividad)

#### 1. validarCURP(curp)

* **Que hace:** Transforma la cadena a mayusculas y valida que la CURP cumpla con el formato estructural oficial de 18 caracteres de la RENAPO en Mexico mediante expresiones regulares.
* **Por que es importante:** La CURP es el identificador unico del estudiante para tramites oficiales como la titulacion. Validar su formato desde el navegador evita errores de captura humanos antes de registrar el dato en la base de datos.

```javascript
function validarCURP(curp) {
    var expresion = /^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z0-9]\d$/;
    return expresion.test(curp.toUpperCase());
}

// Ejemplo de ya implementado:
var curpInput = "PAAY020515HOCRRR01";
if (!validarCURP(curpInput)) {
    alert("La estructura de la CURP ingresada es invalida.");
}

```

#### 2. validarSemestre(anioIngreso, semestreActual)

* **Que hace:** Aplica una regla de consistencia temporal en JavaScript. Evalua la diferencia entre el ano actual (2026) y el ano de ingreso del alumno para determinar el limite maximo de semestres que ha podido cursar de forma logica (maximo 2 semestres por ano fisico mas un margen de tolerancia).
* **Por que es importante:** Evita incongruencias logicas en el expediente del estudiante. Impide, por ejemplo, que un usuario que ingreso en el ano 2025 pueda registrarse en un 8vo semestre, bloqueando datos matematicamente imposibles.

```javascript
function validarSemestre(anioIngreso, semestreActual) {
    var anioActual = 2026; 
    var semestre = parseInt(semestreActual);
    var ingreso = parseInt(anioIngreso);

    if (semestre < 1 || semestre > 12) return false;
    var aniosTranscurridos = anioActual - ingreso;
    if (aniosTranscurridos < 0) return false;

    var maxSemestrePosible = (aniosTranscurridos * 2) + 2;
    return semestre <= maxSemestrePosible;
}

// Ejemplo de ya implementado:
if (!validarSemestre(2025, 8)) {
    alert("Error logico: Un alumno que ingreso en 2025 no puede cursar el 8vo semestre en 2026.");
}

```

#### 3. validarHorarioEscolar(horaInicio, horaFin)

* **Que hace:** Convierte las cadenas de tiempo a minutos absolutos para asegurar que el horario pertenezca a la jornada universitaria (07:00 a 20:00 hrs) y que la hora de salida no sea previa a la de entrada.
* **Por que es importante:** Previene errores de planeacion o de captura por parte del alumno, evitando horarios invertidos o registros fuera de las horas de operacion del plantel.

```javascript
function validarHorarioEscolar(horaInicio, horaFin) {
    if (!horaInicio || !horaFin) return false;

    var partesInicio = horaInicio.split(":");
    var partesFin = horaFin.split(":");
    
    var minutosInicio = parseInt(partesInicio[0]) * 60 + parseInt(partesInicio[1]);
    var minutosFin = parseInt(partesFin[0]) * 60 + parseInt(partesFin[1]);

    var limiteInferior = 7 * 60;   
    var limiteSuperior = 20 * 60;  

    if (minutosInicio >= minutosFin) return false;
    if (minutosInicio < limiteInferior || minutosFin > limiteSuperior) return false;

    return true;
}

// Ejemplo de ya implementado:
if (!validarHorarioEscolar("08:00", "13:00")) {
    alert("Horario escolar rechazado por inconsistencia de horas o desfase de turno.");
}

```

#### 4. validarPesoArchivo(archivoObjeto, maxMB)

* **Que hace:** Accede directamente a la propiedad de tamano binario del archivo seleccionado en el DOM para verificar que no sobrepase el peso en Megabytes configurado.
* **Por que es importante:** Funciona como un filtro de optimizacion de almacenamiento. Al limitar el PDF de la carga academica a un maximo de 2 MB, se protege el servidor de archivos demasiado pesados que ralentizan el sistema y consumen almacenamiento de forma innecesaria.

```javascript
function validarPesoArchivo(archivoObjeto, maxMB) {
    if (!archivoObjeto) return false;
    
    var pesoEnBytes = archivoObjeto.size;
    var pesoEnMB = pesoEnBytes / (1024 * 1024); 

    return pesoEnMB <= maxMB; 
}

// Ejemplo de ya implementado:
var inputDocumento = document.getElementById("cargaAcademica").files[0];
if (!validarPesoArchivo(inputDocumento, 2)) {
    alert("El archivo PDF de la carga academica excede el tamano limite de 2 MB.");
}

```

---

## Capturas de Pantalla (Consola mostrando resultados)



* **Errores de validacion capturados en consola:** `![Consola Errores](img/captura_consola_errores.png)`
* **Despliegue de ventana modal interactiva con edad calculada:** `![Modal Exito](img/captura_modal.png)`
* **Modulo de Login interceptando accesos invalidos:** `![Login Activo](img/captura_login.png)`

---

## Demostracion en Video (60 Segundos)


👉 **[Haz clic aqui para ver el Video Demostrativo]

---



```

```