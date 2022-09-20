window.addEventListener('load', function () {
  /* ---------------------- obtenemos variables globales ---------------------- */
  const inputFirstName = document.getElementById('inputNombre');
  const inputLastName = document.getElementById('inputApellido');
  const inputEmail = document.getElementById('inputEmail');
  const inputPassword = document.getElementById('inputPassword');
  const inputRepeatedPassword = document.getElementById('inputPasswordRepetida');
  const form = document.querySelector('form');
  let alerts = [];

  /* -------------------------------------------------------------------------- */
  /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
  /* -------------------------------------------------------------------------- */
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Validate inputs
    validarTexto(inputFirstName.value) ? '' : alerts.push('Invalid name');
    validarTexto(inputLastName.value) ? '' : alerts.push('Invalid lastname');
    validarEmail(inputEmail.value) ? '' : alerts.push('Invalid email format');
    validarContrasenia(inputPassword.value) ? '' : alerts.push('Invalid password format');
    compararContrasenias(inputPassword.value, inputRepeatedPassword.value)
      ? ''
      : alerts.push("Passwords doesn't match");

    // Show error if there is an invalid input
    if (alerts.length > 0) {
      showAlert(alerts, 'error');
      alerts = [];
      return;
    }

    // Create object with the user info
    const newUser = {
      firstName: normalizarTexto(inputFirstName.value),
      lastName: normalizarTexto(inputLastName.value),
      email: normalizarEmail(inputEmail.value),
      password: inputPassword.value
    };

    // Make register
    realizarRegister(newUser);
  });

  /* -------------------------------------------------------------------------- */
  /*                    FUNCIÓN 2: Realizar el signup [POST]                    */
  /* -------------------------------------------------------------------------- */
  function realizarRegister(newUser) {
    const urlPost = 'https://ctd-todo-api.herokuapp.com/v1/users';

    fetch(urlPost, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
      .then(response => response.json())
      .then(data => {
        if (data.jwt) {
          alerts.push('Account created successfully');
          showAlert(alerts);
          alerts = [];
          localStorage.setItem('jwt', data.jwt);

          setTimeout(() => {
            window.location.replace('./index.html');
          }, 3000);
        } else {
          alerts.push('Account creation failed');
          showAlert(alerts, 'error');
          alerts = [];
        }
      });
  }
});
