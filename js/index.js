'use strict'
const API_BASE_URL = 'https://api.themoviedb.org/3/';
const IMAGE_BASE_URL = 'https://www.themoviedb.org/t/p/w220_and_h330_face';
const API_KEY = '294eb45bf7bff7680030e60e8372c815';

class Pelicula 
{
    constructor(imgUrl,titulo,fecha,puntos)
    {
        this.imgUrl = imgUrl;
        this.titulo = titulo;
        this.fecha = fecha;
        this.puntos = puntos;
    }
    
}

const carousels = document.querySelectorAll(".popu, .cartelera, .extras")
//console.log(carousels)
carousels.forEach(car=> {
  const buttonsWrapper = car.querySelector(".map .botones");
  const slides = car.querySelector(".inner");

  buttonsWrapper.addEventListener("click", function( e ) {
    if (e.target.nodeName === "BUTTON") {
      Array.from(buttonsWrapper.children).forEach(item =>
        item.classList.remove("active")
      );
      if (e.target.classList.contains("first")) {
        slides.style.transform = "translateX(-0%)";
        e.target.classList.add("active");
      } else if (e.target.classList.contains("second")) {
        slides.style.transform = "translateX(-25%)";
        e.target.classList.add("active");
      } else if (e.target.classList.contains('third')){
        slides.style.transform = 'translatex(-50%)';
        e.target.classList.add('active');
      } else if (e.target.classList.contains('fourth')){
        slides.style.transform = 'translatex(-75%)';
        e.target.classList.add('active');
      }
    }
  });
});



window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 60 || document.documentElement.scrollTop > 60) {
    document.querySelector("nav").className = "scrollNav";
  } else {
    document.querySelector("nav").className = "";
  }
}

//Populares
async function getPeliculas(page = 1) {
  let data = []
  const response = await fetch(`${API_BASE_URL}movie/popular?api_key=${API_KEY}&language=es-ES&page=${page}`)
  const responseData = await response.json()
  data = responseData?.results
  //console.log(data[0])
  pintaPelicula(data)
}

function pintaPelicula(peliculas){
  let i = 0;
  while(i < 20){
    var pelicula = new Pelicula(IMAGE_BASE_URL+peliculas[i].poster_path,peliculas[i].title,peliculas[i].release_date,peliculas[i].vote_average);
    document.querySelector(".popu .inner").innerHTML += "<div class=\"card\"> <img src=\""+pelicula.imgUrl+"\"></div>"
    i++;
  }
}
//Cartelera
async function getCartelera(page = 1) {
  let data = []
  const response = await fetch(`${API_BASE_URL}movie/now_playing?api_key=${API_KEY}&language=es-ES&page=${page}`)
  const responseData = await response.json()
  data = responseData?.results
  console.log(data)
  pintaPeliculaCartelera(data)
}
function pintaPeliculaCartelera(peliculas){
  let i = 0;
  while(i < 20){
    var pelicula = new Pelicula(IMAGE_BASE_URL+peliculas[i].poster_path,peliculas[i].title,peliculas[i].release_date,peliculas[i].vote_average);
    document.querySelector(".cartelera .inner").innerHTML += "<div class=\"card\"> <img src=\""+pelicula.imgUrl+"\"></div>"
    i++;
  }
}

//Proximas
async function getProximas(page = 1) {
  let data = []
  const response = await fetch(`${API_BASE_URL}movie/upcoming?api_key=${API_KEY}&language=es-ES&page=${page}`)
  const responseData = await response.json()
  data = responseData?.results
  console.log(data)
  pintaPeliculaProxima(data)
}
function pintaPeliculaProxima(peliculas){
  let i = 0;
  while(i < 20){
    var pelicula = new Pelicula(IMAGE_BASE_URL+peliculas[i].poster_path,peliculas[i].title,peliculas[i].release_date,peliculas[i].vote_average);
    document.querySelector(".extras .inner").innerHTML += "<div class=\"card\"> <img src=\""+pelicula.imgUrl+"\"></div>"
    i++;
  }
}
getPeliculas();
getCartelera();
getProximas();









  