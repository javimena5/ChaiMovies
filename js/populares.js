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
  const response = await fetch(`${API_BASE_URL}movie/popular?api_key=${API_KEY}&page=${page}`)
  const responseData = await response.json()
  data = responseData?.results
  console.log(data)
  pintaPelicula(data)

}

function pintaPelicula(peliculas){
  let i = 0;
  while(i < 20){
    var pelicula = new Pelicula(IMAGE_BASE_URL+peliculas[i].poster_path,peliculas[i].title,peliculas[i].release_date,peliculas[i].vote_average);
    console.log(peliculas[i])
    let cadena = "<div class=\"pelicula\"> <img class=\"portada\" src=\""+pelicula.imgUrl+"\">"
    cadena += "<span>"+pelicula.puntos+"</span>"
    cadena += "<div class=\"titulo\">"+pelicula.titulo+"</div>"
    document.querySelector(".contenido").innerHTML += cadena;
    i++;
  }
}

getPeliculas();
