window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 60 || document.documentElement.scrollTop > 60) {
    document.querySelector("nav").className = "scrollNav";
  } else {
    document.querySelector("nav").className = "";
  }
}