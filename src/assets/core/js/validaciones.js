//contador de caracteres del nombre
//Nombre: largo entre 3 y 20 caracteres
function contadorNombre() {
    var nombre = document.getElementById("nombre").value;
    numeroCaracteres = nombre.length;
    if (numeroCaracteres >= 3 && numeroCaracteres <= 10) {
      document.getElementById("nombre").value;
      document.getElementById("errorNombre").innerHTML="";
    } else {  
      document.getElementById("errorNombre").innerHTML="nombre ingresado no tiene el largo correcto";
      document.getElementById("nombre").value = "";
    }
  }


  function contadorCorreo() {
    var nombre = document.getElementById("correo").value;
    numeroCaracteres = nombre.length;
    if (numeroCaracteres >= 3 && numeroCaracteres <= 10) {
      document.getElementById("correo").value;
      document.getElementById("errorCorreo").innerHTML="";
    } else {  
      document.getElementById("errorCorreo").innerHTML="Verifique su correo";
      document.getElementById("correo").value = "";
    }
  }
  
  //contador de largo de rut
  //Rut: largo entre 9 y 10 caracteres
  /*function contadorRut() {
    var rut = document.getElementById("rut").value;
    numeroCaracteres = rut.length;
    if (numeroCaracteres == 9 || numeroCaracteres == 10) {
      document.getElementById("rut").value;
      document.getElementById("errorRut").innerHTML=""
    } else {
        document.getElementById("errorRut").innerHTML="El número de RUT ingresado debe tener 9 o 10 dígitos y no debe incluir puntos ni guiones. Por favor, ingrese un número de RUT válido";
        document.getElementById("rut").value = "";
        document.getElementById("rut").focus();
    }
  }
  */
  //contador de caracteres del appaterno
  //Apellido materno: largo entre 3 y 20 caracteres
  function contadorAppaterno() {
    var appaterno = document.getElementById("appaterno").value;
    numeroCaracteres = appaterno.length;
    if (numeroCaracteres >= 3 && numeroCaracteres <= 10) {
      document.getElementById("appaterno").value;
      document.getElementById("errorAppaterno").innerHTML="";
    } else {
      document.getElementById("errorAppaterno").innerHTML="Largo de Apellido Paterno ingresado no tiene el largo correcto";
      document.getElementById("appaterno").value = "";
      document.getElementById("appaterno").focus();
    }
  }
  
  //contador de caracteres del apmaterno
  //c. Apellido paterno: largo entre 3 y 20 caracteres
  function contadorApmaterno() {
    var apmaterno = document.getElementById("apmaterno").value;
    numeroCaracteres = apmaterno.length;
    if (numeroCaracteres >= 3 && numeroCaracteres <= 10) {
      document.getElementById("apmaterno").value;
      document.getElementById("errorApmaterno").innerHTML="";
    } else {
      document.getElementById("errorApmaterno").innerHTML="Largo de Apellido Materno ingresado no tiene el largo correcto";
      document.getElementById("apmaterno").value = "";
      document.getElementById("apmaterno").focus();
    }
  }
  
  function contadorCelular() {
    var celular = document.getElementById("telefono").value;
    var numeroCaracteres = celular.length;
    if (numeroCaracteres == 9 || numeroCaracteres == 10) {
      document.getElementById("telefono").value = celular;
      document.getElementById("errorCelular").innerHTML="";
    } else {
      document.getElementById("errorCelular").innerHTML="El número de celular ingresado debe tener 9 o 10 dígitos, ingrese un número de celular válido";
      document.getElementById("telefono").value = "";
      document.getElementById("telefono").focus();
    }
  }
  
  //e. Edad: entre 18 y 35 años.
  function calcularEdad() {
      document.getElementById("errorEdad").innerHTML="";
      var fechaNac = new Date(document.getElementById("fechaNac").value);
      var fechaActual = new Date();
      var edad = fechaActual.getFullYear() - fechaNac.getFullYear();
      var mes = fechaActual.getMonth() - fechaNac.getMonth();
      if (mes < 0 || (mes === 0 && fechaActual.getDate() < fechaNac.getDate())) {
        edad = edad - 1;
      }else{document.getElementById("errorEdad").innerHTML="Solo pueden Ingresar personas Mayores a 18 años y menores a 35 años";
  
  }
      document.getElementById("edad").value = edad;
      return edad;
  }
  
  function carta() {
    if (document.getElementById("edad").value>=18 && document.getElementById("edad").value<=35 && document.getElementById("errorRut").innerHTML==""){
        document.getElementById("errorRut").innerHTML="";
        document.getElementById("errorEdad").innerHTML="";
        document.getElementById("carta").value =
          "rut: " + document.getElementById("rut").value +
          "\n" +
          "nombre: " + document.getElementById("nombre").value + " " + document.getElementById("appaterno").value + " " + document.getElementById("apmaterno").value +
          "\n" +
          "Genero: " + document.getElementById("genero").value +
          "\n" +
          "Celular: " + document.getElementById("celular").value+
          "\n" +
          "Edad: "+ document.getElementById("edad").value;
    }else{
      
      document.getElementById("carta").value = "";    
    }
  }
  