// const imagenes = document.querySelectorAll("img");
// const urlImagenes = [];
// const links = document.querySelectorAll(".rutas-img");

// imagenes.forEach((_, index) => {
//   const url = prompt(`Ingresa la url para la imagen ${index + 1}`);
//   urlImagenes.push(url);
// });

// urlImagenes.forEach((url, index) => {
//   const nodoImagen = document.querySelector(`#imagen-${index + 1}`);
//   nodoImagen.setAttribute("src", url);
// });

// links.forEach((link, index) => {
//   link.setAttribute("href", urlImagenes[index]);
//   link.setAttribute("target", "_blank");
// });

/* Crear contenedor , setear clase , agregarlo al body y hacer prompt sobre
cantidad de imagenes a añadir*/

const contenedor = document.createElement("div");
contenedor.setAttribute("class", "contenedor");
document.body.appendChild(contenedor);
const cantidadImagenes = parseInt(prompt("Cuantas imagenes quieres agregar"));
const urlArray = [];

/* Funcion para agregar urls con prompt y pushear al array url*/

function agregarUrl() {
  for (let i = 0; i < cantidadImagenes; i++) {
    let url = prompt("Ingresa la url de la imagen");
    urlArray.push(url);
  }
}

/*Funcion para crear contenedor tarjeta, etiqueta a e imagen y sus respectivos atributos*/

function template(url, index) {
  const tarjeta = document.createElement("div");
  tarjeta.setAttribute("class", "tarjeta");
  const a = document.createElement("a");
  a.setAttribute("href", url);
  a.setAttribute("target", "_blank");
  a.setAttribute("class", "rutas-img");
  const imagen = document.createElement("img");
  imagen.setAttribute("class", "imagen");
  imagen.setAttribute("src", url);
  imagen.setAttribute("alt", `imagen-${index}`);
  a.appendChild(imagen);
  tarjeta.appendChild(a);
  contenedor.appendChild(tarjeta);
  return tarjeta;
}

/* Funcion final para crear imagenes*/

function createImg() {
  agregarUrl();
  urlArray.forEach((index) => {
    template(index);
  });
}

createImg();
