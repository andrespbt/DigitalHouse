// alert("Bienvenido!");

// confirm("¿Aceptas ingresar?");

// console.log(confirm("¿Aceptas ingresar?"));

// let nombreUsuario = prompt("Por favor, introduzca su nombre");
// console.log(nombreUsuario);

// let tratoPersonalizado = confirm("¿Desea un trato personalizado?");

// if (tratoPersonalizado) {
//   let nombre = prompt("Por favor, introduzca su nombre");
//   alert(
//     "Le damos la bienvenida a nuestro sitio " +
//       nombre +
//       ". ¡Muchas gracias por visitarnos, estamos a su disposición! "
//   );
// } else {
//   alert("Gracias por conectarse.");
// }

// let a = parseInt("22");
// let b = parseInt(prompt("Ingrese edad"));
// let c = parseInt("22" + "150");
// let d = parseInt(22 + 150);
// let e = parseInt(22 + parseInt("150"));
// let f = parseInt(22.55);
// console.log(a);
// console.log(b);
// console.log(c);
// console.log(d);
// console.log(e);
// console.log(f);
// console.log(parseFloat(22.34));
// console.log(parseFloat(22.3456284));

/* Prueba troll */

// let edad = parseInt(prompt("Ingrese su edad"));
// if (edad > 18) {
//   console.log("Es mayor de edad");
// } else {
//   console.log("Es menor de edad");
// }

/* Preguntas */

//¿Cuál es el resultado de este código? Indica si el usuario es mayor de edad o menor aplicando un condicional
//¿Es correcto lo que arroja en base a lo que ingresó el usuario? Si el usuario ingresa un numero si es correcto
//¿Dónde podría existir un problema? Si el usuario no ingresa un numero
//¿Cómo podríamos solucionarlo y llegar a un mejor resultado utilizando los métodos que ya conocemos? Aplicando un condicional que indique si el tipo de dato ingresado es un numero o no
// 🎈Animate a refactorizar el código, pensar en los posibles errores y cómo salvarlos.

/* Codigo refactorizado 

let edad = parseInt(prompt("Ingrese su edad"));

if (isNaN(edad)) {
  do {
    edad = prompt("Edad invalida por favor ingresa un numero: ");
  } while (isNaN(parseInt(edad)));
}

if (!isNaN(edad) && edad > 18) {
  console.log("Es mayor de edad");
} else if (!isNaN(edad) && edad < 18) {
  console.log("Es menor de edad");
}


*/

/* Piedra papel o tijera */

alert("¡Bienvenido al piedra, papel o tijera!");
alert("Jugaras contra mi al mejor de 3. ¡Mucha suerte!");
let esGanador = piePaTi();

if (esGanador) {
  alert(
    "¡Felicidades de nuevo por haber ganado, espero te hayas divertido! Para volver a jugar solo tienes que actualizar el navegador."
  );
} else {
  alert(
    "¡Espero te hayas divertido! ¡Pero no te rindas! Para volver a jugar solo tienes que actualizar el navegador."
  );
}

function piePaTi() {
  var resultado = "";
  var resultadoJugador = 0;
  var resultadoPc = 0;
  var nombreJugador = prompt("Por favor, introduzca su nombre");
  var hayGanador = false;
  function opcionElegida(opcion) {
    switch (opcion) {
      case 1:
      case "1":
        opcion = "Piedra";
        break;

      case 2:
      case "2":
        opcion = "Papel";
        break;

      case 3:
      case "3":
        opcion = "Tijera";
        break;

      default:
        alert("Ingresa un numero valido");
    }

    return opcion;
  }

  function resultadoFuncion() {
    let jugador = prompt(
      "Elije una opcion:\n1 - Piedra\n2 - Papel\n3 - Tijera"
    );
    let pc = Math.round(Math.random() * 2 + 1);
    if (jugador == 1 || jugador == 2 || jugador == 3) {
      if (jugador == 1 && pc == 2) {
        resultadoPc += 1;
        resultado += "¡Perdiste esta ronda!";
      } else if (jugador == 2 && pc == 1) {
        resultadoJugador += 1;
        resultado += "¡Ganaste esta ronda!";
      }

      if (jugador == 1 && pc == 3) {
        resultadoJugador += 1;
        resultado += "¡Ganaste esta ronda!";
      } else if (jugador == 3 && pc == 1) {
        resultadoPc += 1;
        resultado += "¡Perdiste esta ronda!";
      }

      if (jugador == 2 && pc == 3) {
        resultadoPc += 1;
        resultado += "¡Perdiste esta ronda!";
      } else if (jugador == 3 && pc == 2) {
        resultadoJugador += 1;
        resultado += "¡Ganaste esta ronda!";
      }

      if (jugador == pc) {
        resultado +=
          "¡Empate!" +
          "\n\nResultado parcial: \n\n" +
          nombreJugador +
          ":  " +
          resultadoJugador +
          "        Yo:  " +
          resultadoPc;
        alert(resultado);
      } else {
        alert(
          resultado +
            "\n\n" +
            nombreJugador +
            ": " +
            opcionElegida(jugador) +
            "        Yo:  " +
            opcionElegida(pc) +
            "\n\nResultado parcial:\n\n" +
            nombreJugador +
            ": " +
            resultadoJugador +
            "        Yo:  " +
            resultadoPc
        );
      }
    } else {
      alert("Ingresa un numero valido");
    }
    resultado = "";

    if (resultadoJugador == 3 || resultadoPc == 3) {
      hayGanador = true;
    }
  }

  do {
    resultadoFuncion();
  } while (hayGanador == false);

  if (resultadoJugador == 3) {
    alert("¡Felicidades! ¡Le has ganado al campeon del mundo! :)");
    return true;
  } else {
    alert("¡Gane! ¡No te preocupes, perdiste contra el mejor! :(");
    return false;
  }
}
