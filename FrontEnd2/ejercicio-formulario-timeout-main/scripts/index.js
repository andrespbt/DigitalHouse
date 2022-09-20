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

// 1) Escuchar el evento necesario para reaccionar cuando la persona
// haga click en el botón iniciar sesión.

// 2) El proceso de inicio de sesión deberá tener una demora de 3 segundos.
// Deberás agregar la función correspondiente para simular dicha demora.

// 3) Durante el tiempo indicado anteriormente, se deberá mostrar el mensaje "Iniciando sesión..."

// 4) A partir de los inputs ingresados en el formulario, se deberan realizar las siguientes validaciones:
// 1) Que el primer input sea un email válido.
// 2) Que la contraseña tenga al menos 5 caracteres.
// 3) Que los datos ingresados corresponden a una
// persona que se encuentre registrada en la base de datos.
// En caso de que alguna de las validaciones no sea exitosa,
// se deberá mostrar un mensaje de error que diga "Alguno de los datos ingresados son incorrectos"

// 5) En caso de que los datos ingresados sean correctos, se deberá ocultar el formulario y mostrar
// un mensaje de bienvenida al sitio.

/* 
TIPS:
  - Puedes averiguar acerca de la manera de validar el formato de un email utilizando Javascript, buscando
    en internet frases como "Validar email con Javascript o similar".

  - Recuerda que puedes seleccionar y manipular los elementos del archivo index.html, usando los
    recursos que Javascript te ofrece para ello. Además, en el archivo styles.css tiene algunas clases y 
    estilos predefinidos para ayudarte a completar la actividad.

  - También te dejamos algunos mensajes que te pueden ser de utilidad:
  
   Mensaje de error => <small>Alguno de los datos ingresados son incorrectos</small>

   Mensaje de bienvenida => "<h1> Bienvenido al sitio 😀 </h1>";

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
   email.addEventListener('blur', validarEmail);
   password.addEventListener('blur', validarPassword);
   loginBtn.addEventListener('click', validarCampos);
   formulario.addEventListener('submit', validarFormulario);
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
               formulario.classList.add('hidden');
               h1.textContent = 'Bienvenido/a al sitio 😀 ! !';
               h1.style.color = 'white';
               h1.style.fontSize = '2rem';
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
