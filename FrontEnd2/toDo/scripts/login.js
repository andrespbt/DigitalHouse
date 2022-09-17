window.addEventListener('load', function () {
  /* ---------------------- obtenemos variables globales ---------------------- */

  const emailInput = document.getElementById('inputEmail');
  const passwordInput = document.getElementById('inputPassword');
  const form = document.querySelector('form');
  const loginBtn = document.querySelector('.loginBtn');
  const spinner = document.createElement('div');
  alerts = [];

  /* -------------------------------------------------------------------------- */
  /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
  /* -------------------------------------------------------------------------- */
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    validarEmail(emailInput.value) ? '' : alerts.push('Invalid email format');
    validarContrasenia(passwordInput.value) ? '' : alerts.push('Invalid password format');

    if (alerts.length > 0) {
      showAlert(alerts, 'error');
      alerts = [];
      return;
    }

    const user = { email: emailInput.value, password: passwordInput.value };
    const settings = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    };
    realizarLogin(settings);
  });

  /* -------------------------------------------------------------------------- */
  /*                     FUNCIÓN 2: Realizar el login [POST]                    */
  /* -------------------------------------------------------------------------- */
  function realizarLogin(settings) {
    const loginUrl = 'https://ctd-todo-api.herokuapp.com/v1/users/login';

    fetch(loginUrl, settings)
      .then(response => response.json())
      .then(data => {
        if (data.jwt) {
          localStorage.setItem('jwt', data.jwt);
          spinner.classList.add('sk-chase');
          spinner.innerHTML = `
          <div class="sk-chase-dot"></div>
          <div class="sk-chase-dot"></div>
          <div class="sk-chase-dot"></div>
          <div class="sk-chase-dot"></div>
          <div class="sk-chase-dot"></div>
          <div class="sk-chase-dot"></div>
          `;

          form.appendChild(spinner);

          loginBtn.remove();

          setTimeout(() => {
            window.location.replace('./mis-tareas.html');
          }, 2000);
        } else {
          spinner.classList.add('sk-chase');
          spinner.innerHTML = `
          <div class="sk-chase-dot"></div>
          <div class="sk-chase-dot"></div>
          <div class="sk-chase-dot"></div>
          <div class="sk-chase-dot"></div>
          <div class="sk-chase-dot"></div>
          <div class="sk-chase-dot"></div>
          `;

          form.appendChild(spinner);

          loginBtn.remove();

          setTimeout(() => {
            form.reset();
            spinner.remove();
            form.appendChild(loginBtn);
            alerts.push('Invalid account');
            showAlert(alerts, 'error');
            alerts = [];
          }, 2000);
        }
      });
  }
});
