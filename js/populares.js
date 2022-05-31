const API_BASE_URL = 'https://api.themoviedb.org/3/';
const IMAGE_BASE_URL = 'https://www.themoviedb.org/t/p/w220_and_h330_face';
const API_KEY = '294eb45bf7bff7680030e60e8372c815';

window.onscroll = function() {scrollFunction()};

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

function scrollFunction() {
  if (document.body.scrollTop > 60 || document.documentElement.scrollTop > 60) {
    document.querySelector("nav").className = "scrollNav";
  } else {
    document.querySelector("nav").className = "";
  }
}

async function getPeliculas(page = 1) {
  let data = []
  const response = await fetch(`${API_BASE_URL}movie/popular?api_key=${API_KEY}&language=es-ES&page=${page}`)
  const responseData = await response.json()
  data = responseData?.results
  console.log(data)
  pintaPelicula(data)

}

async function getPeliculasBuenas(page = 1,mayor) {
  let data = []
  const response = await fetch(`${API_BASE_URL}movie/popular?api_key=${API_KEY}&language=es-ES&page=${page}`)
  const responseData = await response.json()
  data = responseData?.results
  if(mayor == 1) pintaPelicula(data.sort(compareMayor))
  else pintaPelicula(data.sort(compareMenor))

}

function pintaPelicula(peliculas){
  let i = 0;
  while(i < 20){
    const nota = parseFloat(peliculas[i].vote_average).toFixed(1);
    var pelicula = new Pelicula(IMAGE_BASE_URL+peliculas[i].poster_path,peliculas[i].title,peliculas[i].release_date,nota);
    console.log(peliculas[i])
    let cadena = "<div class=\"pelicula\"> <img class=\"portada\" src=\""+pelicula.imgUrl+"\">"
    if(nota<4.5) cadena += "<span class=\"rojo\">"+pelicula.puntos+"</span>"
    else if(nota<6) cadena += "<span class=\"naranja\">"+pelicula.puntos+"</span>"
    else if(nota<8) cadena += "<span class=\"amarillo\">"+pelicula.puntos+"</span>"
    else cadena += "<span class=\"verde\">"+pelicula.puntos+"</span>"
    cadena += "<div class=\"titulo\">"+pelicula.titulo+"</div>"
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

function ordenaYPinta(){

}

let clicks = 0;
document.querySelector(".orden").addEventListener("click", function(){
  clicks++;
  document.querySelector(".contenido").innerHTML = "";
  if(clicks==1) getPeliculasBuenas("",1)
  else if(clicks==2) getPeliculasBuenas("",0)
  else if(clicks>2) {
    getPeliculas(); clicks=0;
  }
},true);

getPeliculas();
