const expressions = {
  name: /^[a-zA-ZÀ-ÿ\s]{1,25}$/, // Letras y espacios, pueden llevar acentos.
  pass: /^.{8,20}$/, // 8 a 20 digitos.
  email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
};

/* ---------------------------------- texto --------------------------------- */
function validarTexto(texto) {
  return expressions.name.test(texto);
}

function normalizarTexto(texto) {
  return texto.trim().toLowerCase();
}

/* ---------------------------------- email --------------------------------- */
function validarEmail(email) {
  return expressions.email.test(email);
}

function normalizarEmail(email) {
  return email.trim();
}

/* -------------------------------- password -------------------------------- */
function validarContrasenia(contrasenia) {
  return expressions.pass.test(contrasenia);
}

function compararContrasenias(contrasenia_1, contrasenia_2) {
  return contrasenia_1 === contrasenia_2;
}

// Mostrar alerta

function showAlert(message, type) {
  const form = document.querySelector('form');

  if (type === 'error') {
    message.forEach(error => {
      const divError = document.createElement('div');
      divError.classList.add('error');
      divError.innerHTML = ` <span>${error}</span>`;

      form.appendChild(divError);

      setTimeout(() => {
        divError.remove();
      }, 3000);
    });
  } else {
    const divError = document.createElement('div');
    divError.classList.add('success');
    divError.innerHTML = ` <span>${message}</span>`;
    form.appendChild(divError);
    setTimeout(() => {
      divError.remove();
    }, 3000);
  }
}
