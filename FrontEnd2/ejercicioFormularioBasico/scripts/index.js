const registerBtn = document.querySelector(".register-btn");

registerBtn.addEventListener("click", () => {
  // Escribe tu código aquí, siguiendo los siguientes lineamientos paso a paso:
  // 1. Obtenemos el valor ingresado en el input de email
  // 2. Obtenemos los datos ingresados en el input de password
  // 3. Obtenemos el valor del input radio
  // 4. Obtenemos el valor del input checkbox
  // 5 Validamos si el usuario es mayor de edad. Si no, mostramos
  // un mensaje de error: "Debes ser mayor de edad para registrarte en el sitio"
  // 6 Vaidamos si el usuario aceptó los términos y condiciones. Si no, mostramos
  // un mensaje de error: "Debes aceptar los TyCs para registrarte en el sitio"
  // 7 Si todo esta correcto, mostramos por consola un objeto con la información
  // ingresada por el usuario.

  const email = document.querySelector("#email-input");
  const password = document.querySelector("#password-input");
  let legalAge = document.getElementsByName("legalAge");
  const tyc = document.querySelector("#tyc-input");
  let valid = true;
  legalAge.forEach((age) => {
    if (age.id === "age_yes") {
      age.checked == true ? (legalAge = true) : (legalAge = false);
    }
  });

  datosPersona = {
    email: email.value ? email.value : alert("Ingresa un email"),
    password: password.value ? password.value : alert("Ingresa una contraseña"),
    legalAge: legalAge
      ? legalAge
      : alert("Debes ser mayor de edad para registrarte en el sitio"),
    tycAccepted: tyc.checked
      ? tyc.checked
      : alert("Debes aceptar los TyCs para registrarte en el sitio"),
  };

  for (let dato in datosPersona) {
    datosPersona[dato] ? "" : valid == false;
  }

  valid == true ? console.log(datosPersona) : "";
});
