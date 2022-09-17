/*
REQUERIMIENTOS
- utilizar el formulario para captar el texto ingresado

- implmentar el evento "submit", utilizarlo para guardar el comentario en un array

- cada vez que se agrega un nuevo comentario renderizarlo en una etiqueta "p"(sacar del html los hardcodeados y hacerlo dinamico)

- constantemente guardar la informacion en localStorage, si se recarga la pagina deberian mantenerse los comentarios
*/

const form = document.querySelector('form');
let comentarios = JSON.parse(localStorage.getItem('comentarios')) || [];
const fecha = new Date();
const dia = fecha.getDate();
const options = { weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };

const buttonEliminar = document.createElement('button');
buttonEliminar.textContent = 'Eliminar comentarios';
buttonEliminar.onclick = () => {
   localStorage.clear();
   location.reload();
};
form.appendChild(buttonEliminar);

function init() {
   document.querySelector('.comentarios').innerHTML = '';

   comentarios.forEach(comentario => {
      document.querySelector(
         '.comentarios'
      ).innerHTML += `<p style = "display:flex; justify-content:space-between;">${comentario}<span>${fecha.toLocaleDateString(
         'es-ES',
         options
      )}</span></p>`;
   });
}

form.addEventListener('submit', e => {
   e.preventDefault();
   const comentario = document.querySelector('#comentario').value;
   if (comentario.length != 0) {
      comentarios.push(comentario);
      pintarComentario(comentario);
      localStorage.setItem('comentarios', JSON.stringify(comentarios));
      form.reset();
   }
});

function pintarComentario(comentario) {
   document.querySelector(
      '.comentarios'
   ).innerHTML += `<p style = "display:flex; justify-content:space-between;">${comentario}<span>${fecha.toLocaleDateString(
      'es-ES',
      options
   )}</span></p>`;
}

init();
