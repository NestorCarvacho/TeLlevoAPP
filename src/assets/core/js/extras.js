// function muestraDatos()
//   {
//     document.getElementById("carta").value =
//       "rut: " +
//       document.getElementById("rut").value +
//       "\n" +
//       "nombre: " +
//       document.getElementById("nombre").value +
//       " " +
//       document.getElementById("appaterno").value +
//       " " +
//       document.getElementById("apmaterno").value +
//       "\n" +
//       "Genero: " +
//       document.getElementById("genero").value +
//       "\n" +
//       "Celular: " +
//       document.getElementById("celular").value +
//       "\n" +
//       "Edad: " +
//       document.getElementById("edad").value;
//       alert(document.getElementById("carta").value)
// }


const mensajeDiv = document.getElementById('errorMensaje');

if (mensajeDiv) {
  setTimeout(() => {
    mensajeDiv.style.display = 'none';
  }, 2000);
}
