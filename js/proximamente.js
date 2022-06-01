let actualPage = 1;
'use strict'
const API_BASE_URL = 'https://api.themoviedb.org/3/';
const IMAGE_BASE_URL = 'https://www.themoviedb.org/t/p/w220_and_h330_face';
const API_KEY = '294eb45bf7bff7680030e60e8372c815';

window.onscroll = function() {scrollFunction()};

class Pelicula 
{
    constructor(id,imgUrl,titulo,fecha,puntos)
    {
        this.id = id;
        this.imgUrl = imgUrl;
        this.titulo = titulo;
        this.fecha = fecha;
        this.puntos = puntos;
    }
    
}

function scrollFunction() {
  if (document.body.scrollTop > 60 || document.documentElement.scrollTop > 60) {
    document.querySelector("nav").id = "scrollNav";
  } else {
    document.querySelector("nav").id = "";
  }
}

async function getPeliculas(page) {
  let data = []
  document.querySelector(".numPag").innerHTML = page;
  document.querySelector(".navega .numPag").innerHTML = page;
  const response = await fetch(`${API_BASE_URL}movie/upcoming?api_key=${API_KEY}&language=es-ES&page=${page}`)
  const responseData = await response.json()
  data = responseData?.results
  console.log(data)
  pintaPelicula(data)

}

async function getPeliculasBuenas(page,mayor) {
  let data = []
  const response = await fetch(`${API_BASE_URL}movie/upcoming?api_key=${API_KEY}&language=es-ES&page=${page}`)
  const responseData = await response.json()
  data = responseData?.results
  if(mayor == 1) pintaPelicula(data.sort(compareMayor))
  else pintaPelicula(data.sort(compareMenor))

}

function pintaPelicula(peliculas){
  let i = 0;
  while(i < 20){
    const nota = parseFloat(peliculas[i].vote_average).toFixed(1);
    var pelicula = new Pelicula(peliculas[i].id,IMAGE_BASE_URL+peliculas[i].poster_path,peliculas[i].title,peliculas[i].release_date,nota);
    let cadena = "<div class=\"pelicula\"> "
    console.log("<a href=\"https://www.themoviedb.org/movie/"+peliculas[i].id+"\">");
    cadena += "<a href=\"https://www.themoviedb.org/movie/"+peliculas[i].id+"\"><img class=\"portada\" src=\""+pelicula.imgUrl+"\">"
    if(nota<1) cadena += "<span class=\"nada\">0.0</span>"
    else if(nota<4.5) cadena += "<span class=\"rojo\">"+pelicula.puntos+"</span>"
    else if(nota<6) cadena += "<span class=\"naranja\">"+pelicula.puntos+"</span>"
    else if(nota<8) cadena += "<span class=\"amarillo\">"+pelicula.puntos+"</span>"
    else cadena += "<span class=\"verde\">"+pelicula.puntos+"</span>"
    cadena += "</a><div class=\"titulo\">"+pelicula.titulo+"</div>"
    document.querySelector(".contenido").innerHTML += cadena;
    i++;
  }
}

function compareMayor(a,b) {
  if (a.vote_average < b.vote_average)
    return 1;
  if (a.vote_average > b.vote_average)
    return -1;
  return 0;
}

function compareMenor(a,b) {
  if (a.vote_average < b.vote_average)
    return -1;
  if (a.vote_average > b.vote_average)
    return 1;
  return 0;
}

let clicks = 0;
document.querySelector(".orden").addEventListener("click", function(){
  clicks++;
  document.querySelector(".contenido").innerHTML = "";
  if(clicks==1) getPeliculasBuenas(actualPage,1)
  else if(clicks==2) getPeliculasBuenas(actualPage,0)
  else if(clicks>2) {
    getPeliculas(actualPage); clicks=0;
  }
},true);

document.querySelector(".siguiente").addEventListener("click", function(){
  actualPage++;
  clicks = 0;
  document.querySelector(".contenido").innerHTML = "";
  getPeliculas(actualPage); 
},true);

document.querySelector(".anterior").addEventListener("click", function(){
  if(actualPage!=1) {
    actualPage--;
    clicks = 0;
  }
  document.querySelector(".contenido").innerHTML = "";
  getPeliculas(actualPage); 
},true);

document.querySelector(".navega .siguiente").addEventListener("click", function(){
  actualPage++;
  clicks = 0;
  document.querySelector(".contenido").innerHTML = "";
  getPeliculas(actualPage); 
},true);

document.querySelector(".navega .anterior").addEventListener("click", function(){
  if(actualPage!=1) {
    actualPage--;
    clicks = 0;
  }
  document.querySelector(".contenido").innerHTML = "";
  getPeliculas(actualPage); 
},true);


let pelis = document.querySelectorAll(".contenido a")
console.log[pelis]

pelis.forEach(element => {
  element.ddEventListener("click", function(){
    console.log(element)
  },true);
});


getPeliculas(actualPage);
