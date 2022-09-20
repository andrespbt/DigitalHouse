// Esta es la base de datos de nuestros usuarios
const baseDeDatos = {
   usuarios: [
      {
         id: 1,
         name: 'Steve Jobs',
         email: 'steve@jobs.com',
         password: 'Steve123',
      },
      {
         id: 2,
         name: 'Ervin Howell',
         email: 'shanna@melissa.tv',
         password: 'Ervin345',
      },
      {
         id: 3,
         name: 'Clementine Bauch',
         email: 'nathan@yesenia.net',
         password: 'Floppy39876',
      },
      {
         id: 4,
         name: 'Patricia Lebsack',
         email: 'julianne.oconner@kory.org',
         password: 'MysuperPassword345',
      },
   ],
};

// ACTIVIDAD

// Paso a paso:

// 1) Al momento de que la persona inicia sesión, si las validaciones que ya tenemos implementadas
// han sido exitosas, deberemos almacenar la información del usuario en el LocalStorage.

// 2) Al mensaje de bienvenida que ya teníamos implementado, deberemos agregarle el nombre de la
// persona y un botón de "Cerrar Sesión".

// 3) Una vez iniciada la sesión, la misma se deberá mantener en ese estado para el caso de que la persona
// recargue la página. Para ello, deberás validar si existe información del usuario al momento en
// que se produce la carga de la página, y en base a dicha condción decidir que elementos mostrar.

// 3) Para el caso de que la persona haga click en el botón "Cerrar Sesión", se deberá eliminar
// la información del usuario, mostrar un mensaje indicando que se ha cerrado la sesión, y recargar
// la página para mostrar nuevamente el formulario de login.

/* 
TIPS:
  - Para lograr los objetivos de este ejercicio, deberás valerte de algunos eventos y métodos que vimos en
    las clases anteriores. Te invitamos a que revises los recursos en caso de que tengas dudas, ya que allí
    encontrarás todas las respuestas que necesitas para completar la actividad.

  - Recuerda que puedes seleccionar y manipular los elementos del archivo index.html, usando los
    recursos que Javascript te ofrece para ello. Además, en el archivo styles.css tiene algunas clases y 
    estilos predefinidos para ayudarte a completar la actividad.

  - Al momento de guardar información del usuario en el navegador, recuerda que debemos almacenar solo la 
    información necesaria, y EN NINGUN CASO DEBEMOS GUARDAR LA CONTRASEÑA. Por ello, deberás seleccionar y
    separar la información que tienes que almacenar, a partir del objeto que contiene la información del 
    usuario.

   ¡Manos a la obra!
 */

// Variables
const email = document.querySelector('#email-input');
const password = document.querySelector('#password-input');
const formulario = document.querySelector('form');
const loginBtn = document.querySelector('.login-btn');
const containerError = document.querySelector('#error-container');
const loader = document.querySelector('#loader');
const h1 = document.querySelector('h1');

// Eventos

window.onload = function () {
   if (JSON.parse(localStorage.getItem('sesionIniciada')) === true && localStorage.getItem('email') != undefined) {
      darBienvenida();
   } else {
      email.addEventListener('blur', validarEmail);
      password.addEventListener('blur', validarPassword);
      loginBtn.addEventListener('click', validarCampos);
      formulario.addEventListener('submit', validarFormulario);
   }
};

// Funciones

// Validar el campo email
function validarEmail() {
   // Expresion regular para validar emails
   const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   // Validar que el campo no este vacio y que tenga mas de 5 caracteres
   validarLongitud(this.value);

   // Validar formato de email
   if (!re.test(this.value)) {
      mostrarErrores('Formato email no valido', containerError);
   }
}

// Validar el campo password
function validarPassword() {
   // Validar longitud
   validarLongitud(this.value);
}

// Validar campos
function validarCampos() {
   // Mostrar diferentes mensajes si el usuario hace click en el boton Iniciar Sesion
   if (email.value.length === 0 && password.value.length === 0) {
      mostrarErrores('Por favor ingresa un email y una contraseña', containerError);
   } else if (email.value.length === 0) {
      mostrarErrores('Por favor ingresa un email', containerError);
   } else if (password.value.length === 0) {
      mostrarErrores('Por favor ingresa una contraseña', containerError);
   } else {
      // Si esta todo ok el boton se habilita y pasa a ser de tipo submit
      if (password.value.length >= 5 && email.value.length >= 5) loginBtn.setAttribute('type', 'submit');
   }
}

// Validar formulario
function validarFormulario(e) {
   e.preventDefault();
   // Mostrar spinner de carga
   loader.classList.remove('hidden');

   // A los 3 segundos el mensaje de iniciando sesion desaparece
   setTimeout(() => {
      loader.classList.add('hidden');
      // Validamos si el usuario ingreso bien el email y la contraseña sino mostramos diferentes errores
      if (!baseDeDatos.usuarios.some(usuario => email.value === usuario.email)) {
         mostrarErrores('Email no valido', containerError);
         loginBtn.setAttribute('type', 'button');
      } else {
         // Si el email es correcto iteramos para comprobar password
         baseDeDatos.usuarios.forEach(usuario => {
            // Si email y password son correctos mostramos mensaje de bienvenida
            if (usuario.email === email.value && usuario.password === password.value) {
               const nombre = usuario.name;
               const email = usuario.email;
               darBienvenida(nombre, email);
            } else {
               mostrarErrores('Password no valido', containerError);
               loginBtn.setAttribute('type', 'button');
            }
         });
      }
      // El error desaparece a los 5 segundos
      setTimeout(() => {
         limpiarHtml(containerError);
      }, 5000);
   }, 3000);
}

// Validar que el input no este vacio ni tenga menos de 5 caracteres
function validarLongitud(texto) {
   let mensaje;
   // Si el texto esta vacio retornar falso
   if (texto === undefined) {
      return;
   }
   // Diferentes errores si esta vacio o si tiene menos de 5 caracteres
   if (texto.length === 0) {
      mensaje = 'Todos los campos son obligatorios';
   } else if (texto.length < 5) {
      mensaje = 'Todos los campos deben poseer al menos 5 caracteres';
   }

   // Si el texto tiene mas de 5 caracteres escondemos el error
   if (texto.length >= 5) {
      containerError.classList.add('hidden');
      return true;
   } else {
      // Limpiar html para no acumular errores
      mostrarErrores(mensaje, containerError);
      return false;
   }
}

// Limpiar el html
function limpiarHtml(campo) {
   while (campo.firstChild) {
      campo.removeChild(campo.firstChild);
   }
}

// Mostrar errores
function mostrarErrores(mensaje, campo) {
   // Limpiar el contenedor del html antes de mostrar errores
   limpiarHtml(campo);
   // Crear elemento html y setearle el mensaje
   const error = document.createElement('small');
   error.innerText = mensaje;
   if (campo.classList.contains('hidden')) {
      campo.classList.remove('hidden');
   }
   campo.appendChild(error);
}

function darBienvenida(nombre, email) {
   // Guardamos la info en local storage
   if (!JSON.parse(localStorage.getItem('email'))) {
      localStorage.setItem('email', JSON.stringify(email));
      localStorage.setItem('sesionIniciada', 'true');
   }
   if (JSON.parse(localStorage.getItem('email'))) {
      email = JSON.parse(localStorage.getItem('email'));
      baseDeDatos.usuarios.forEach(usuario => {
         if (usuario.email === email) {
            nombre = usuario.name;
         }
      });
   }
   // Ocultamos el form
   formulario.classList.add('hidden');
   // Seteamos el h1 con un mensae y añadimos un boton para cerrar sesion
   h1.textContent = `Bienvenido/a ${nombre}!!`;
   h1.style.color = 'white';
   h1.style.fontSize = '2rem';
   const cerrarSesionBtn = document.createElement('button');
   cerrarSesionBtn.classList.add('login-btn');
   cerrarSesionBtn.textContent = 'Cerrar Sesion';
   cerrarSesionBtn.addEventListener('click', cerrarSesion);
   document.querySelector('main').appendChild(cerrarSesionBtn);
}

function cerrarSesion() {
   localStorage.clear();
   location.reload();
}
