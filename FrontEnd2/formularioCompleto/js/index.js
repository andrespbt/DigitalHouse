const formulario = document.querySelector(".form");
const nombre = document.querySelector("#nombre");
const contra = document.querySelector("#pass");
const telefono = document.querySelector("#tel");
const fieldsetHobbies = document.querySelector(".hobbies");
const fieldsetNacionalidad = document.querySelector(".nacionalidad");
const mensajeError = document.createElement("p");
const submitBtn = document.querySelector(".submitBtn");
mensajeError.classList.add("textoError");

const datosPersona = {
  nombre: "",
  telefono: "",
  contrasenia: "",
  hobbies: [],
  nacionalidad: "",
};

// Validar input nombre

nombre.addEventListener("input", (e) => {
  // Capturando lo que ingresa el usuario caracter por caracter
  let userText = e.target.value;
  if (userText.length > 0) {
    // Validar que el nombre tenga mas de 6 caracteres, en el caso que no sea asi se muestra un error
    if (!lengthTextoValido(userText, 6)) {
      if (!formulario.children[2].classList.contains("textoError")) {
        nombre.classList.add("error");
        mensajeError.textContent = "Cantidad minima 6 caracteres";
        formulario.insertBefore(mensajeError, formulario.children[2]);
      }
    } else if (
      lengthTextoValido(userText, 6) &&
      formulario.children[2].hasAttribute("class", "textoError")
    ) {
      formulario.children[2].remove();
      nombre.classList.remove("error");
    }

    // Validar que el formato sea el correcto, de no ser asi se muestra un error
    if (!formatoTextoValido(userText)) {
      if (!formulario.children[2].classList.contains("textoError")) {
        nombre.classList.add("error");
        mensajeError.textContent =
          "Solo se permiten letras mayusculas y minusculas";
        formulario.insertBefore(mensajeError, formulario.children[2]);
      }
    } else if (
      formatoTextoValido(userText) &&
      formulario.children[2].hasAttribute("class", "textoError") &&
      lengthTextoValido(userText, 6)
    ) {
      nombre.classList.remove("error");
      formulario.children[2].remove();
    }

    // Si el length y el formato son correctos se valida el input

    if (lengthTextoValido(userText, 6) && formatoTextoValido(userText)) {
      nombre.classList.add("validInput");
    } else {
      nombre.classList.remove("validInput");
    }
  }
});

// Validar input contraseña

contra.addEventListener("input", (e) => {
  let userText = e.target.value;
  if (userText.length > 0) {
    if (!lengthTextoValido(userText, 6)) {
      // Si hay que mostrar error ,y el error del input anterior no existe, lo colocamos en la pos 3
      if (
        !formulario.children[2].classList.contains("textoError") &&
        !formulario.children[3].classList.contains("textoError")
      ) {
        contra.classList.add("error");
        mensajeError.textContent =
          "La contraseña debe poseer minimo 6 caracteres";
        formulario.insertBefore(mensajeError, formulario.children[3]);
      }
      // Si hay que mostrar el error, y el error del input anterior si existe, lo colocamos en la pos 4
      else if (
        !formulario.children[3].classList.contains("textoError") &&
        !formulario.children[4].classList.contains("textoError")
      ) {
        contra.classList.add("error");
        mensajeError.textContent =
          "La contraseña debe poseer minimo 6 caracteres";
        formulario.insertBefore(mensajeError, formulario.children[4]);
      }
    } else if (lengthTextoValido(userText, 6)) {
      // Si el input es valido, y el mensaje de error esta en el input 4 o en el 3, lo borramos
      if (formulario.children[4].classList.contains("textoError")) {
        formulario.children[4].remove();
        contra.classList.remove("error");
      } else if (formulario.children[3].classList.contains("textoError")) {
        formulario.children[3].remove();
        contra.classList.remove("error");
      }
    }

    // Si todo es valido el borde sera de color verde
    if (lengthTextoValido(userText, 6)) {
      contra.classList.add("validInput");
    } else {
      contra.classList.remove("validInput");
    }
  } else {
    contra.classList.remove("validInput");
    contra.classList.remove("error");
    if (formulario.children[4].classList.contains("textoError")) {
      formulario.children[4].remove();
    } else if (formulario.children[3].classList.contains("textoError")) {
      formulario.children[3].remove();
    }
  }
});

// Validar input Telefono

telefono.addEventListener("input", (e) => {
  let userText = e.target.value;
  const mensajeError = document.createElement("p");
  mensajeError.classList.add("textoError");
  if (userText.length > 0) {
    // Validar length del telefono

    if (!lengthTelefonoValido(userText)) {
      if (telefono.classList.contains("validInput")) {
        telefono.classList.remove("validInput");
      }
      telefono.classList.add("error");
      mensajeError.textContent = "Ingresar 10 numeros";
      if (
        !telefono.parentElement.nextElementSibling.classList.contains(
          "textoError"
        )
      ) {
        formulario.insertBefore(mensajeError, fieldsetHobbies);
      }
    }

    // Validar formato del telefono
    if (!formatoTelefonoValido(userText)) {
      if (telefono.classList.contains("validInput")) {
        telefono.classList.remove("validInput");
      }
      telefono.classList.add("error");
      mensajeError.textContent = "Ingresar solo numeros";
      if (
        telefono.parentElement.nextElementSibling.classList.contains(
          "textoError"
        )
      ) {
        telefono.parentElement.nextElementSibling.textContent =
          "Ingresar solo numeros";
      } else {
        formulario.insertBefore(mensajeError, fieldsetHobbies);
      }
    }

    // Si uno es valido y el otro no, mostrar el error correspondiente

    if (!lengthTelefonoValido(userText) && formatoTelefonoValido(userText)) {
      telefono.parentElement.nextElementSibling.textContent =
        "Ingresar 10 numeros";
    } else if (
      lengthTelefonoValido(userText) &&
      !formatoTelefonoValido(userText)
    ) {
      telefono.parentElement.nextElementSibling.textContent =
        "Ingresar solo numeros";
    } else if (
      lengthTelefonoValido(userText) &&
      formatoTelefonoValido(userText)
    ) {
      telefono.classList.remove("error");
      telefono.parentElement.nextElementSibling.remove();
      telefono.classList.add("validInput");
    }
  } else {
    if (telefono.classList.contains("error")) {
      telefono.classList.remove("error");
    } else if (telefono.classList.contains("validInput")) {
      telefono.classList.remove("validInput");
    }
    if (
      telefono.parentElement.nextElementSibling.classList.contains("textoError")
    ) {
      telefono.parentElement.nextElementSibling.remove();
    }
  }
});

// Validar fieldset hobbies

fieldsetHobbies.addEventListener("change", (e) => {
  const hobbies = document.querySelectorAll('input[name="hobbies"]:checked');

  if (hobbies.length > 4) {
    fieldsetHobbies.classList.add("error");
    mensajeError.textContent =
      "Recuerda seleccionar hasta un maximo de 4 hobbies";
    fieldsetHobbies.appendChild(mensajeError);
  } else if (fieldsetHobbies.classList.contains("error")) {
    fieldsetHobbies.classList.remove("error");
    fieldsetHobbies.lastChild.remove();
  }
});

// Validar que todos los campos sean validos

formulario.addEventListener("change", (e) => {
  let hobbiesList = document.querySelectorAll('input[name="hobbies"]:checked');
  let pais = document.querySelector('input[name="nacionalidad"]:checked');
  if (
    nombre.classList.contains("validInput") &&
    contra.classList.contains("validInput") &&
    telefono.classList.contains("validInput") &&
    hobbiesList.length > 0 &&
    hobbiesList.length <= 4 &&
    pais
  ) {
    submitBtn.disabled = false;
    submitBtn.setAttribute("type", "submit");
  } else {
    submitBtn.disabled = true;
  }
});

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  const hobbies = document.querySelectorAll('input[name="hobbies"]:checked');
  const nacionalidad = document.querySelector(
    'input[name="nacionalidad"]:checked'
  );
  hobbies.forEach((hobbie) => {
    let hobbieText = hobbie.parentElement.innerText.trimStart();
    if (!datosPersona.hobbies.find((hobbie) => hobbie === hobbieText)) {
      datosPersona.hobbies = [...datosPersona.hobbies, hobbieText];
    }
  });
  if (validarCamposVacios(nombre.value)) {
    datosPersona.nombre = normalizarDatos(nombre.value);
  }
  if (validarCamposVacios(contra.value)) {
    datosPersona.contrasenia = normalizarDatos(contra.value);
  }
  if (validarCamposVacios(telefono.value)) {
    datosPersona.telefono = normalizarDatos(telefono.value);
  }
  let valid = true;
  datosPersona.nacionalidad = nacionalidad.parentElement.textContent.trim();
  Object.values(datosPersona).forEach((dato) => {
    if (!validarCamposVacios(dato)) {
      valid = false;
    }
  });
  console.log(datosPersona);
  formulario.reset();
  nombre.classList.remove("validInput");
  contra.classList.remove("validInput");
  telefono.classList.remove("validInput");
  mensajeFinal();
});

const normalizarDatos = (dato) => dato.toLowerCase().trim();

const validarCamposVacios = (dato) => {
  if (typeof dato === "string") return dato.trim().length > 0;
  return dato.length > 0;
};

const formatoTextoValido = (texto) => {
  result = true;
  for (let i = 0; i < texto.length; i++) {
    if (texto[i].match(/[^a-zA-Z\s]/)) {
      result = false;
    }
  }
  return result;
};

const lengthTextoValido = (texto, minLength) => texto.length >= minLength;

const formatoTelefonoValido = (telefono) => {
  result = true;
  for (let i = 0; i < telefono.length; i++) {
    if (telefono[i].match(/[^0-9]/)) {
      result = false;
    }
  }
  return result;
};

const lengthTelefonoValido = (telefono) => telefono.length === 10;

const mensajeFinal = () => {
  document.body.removeChild(document.querySelector(".form"));
  document.body.classList.add("mensajeFinal");
  let mensaje = "";
  let hobbies = "";

  for (let hobbie of datosPersona.hobbies) {
    hobbies += `<span>${hobbie} </span>`;
  }

  mensaje = `<h1 class = "mensaje">Gracias por llenar este cuestionario!</h1>\n</div>\n<div class="datos"><p class="parrafoDatos">Nombre: ${datosPersona.nombre}</p>\n<p class="parrafoDatos" >Contraseña: ${datosPersona.contrasenia}</p>\n<p class="parrafoDatos" >Telefono: ${datosPersona.telefono}</p><p class="parrafoDatos" >Hobbies: ${hobbies}</p><p class="parrafoDatos" >Nacionalidad: ${datosPersona.nacionalidad}</p></div>`;

  document.body.innerHTML = mensaje;
};
