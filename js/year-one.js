// Add css tag to paragraphs containing only images
$( "p" ).has( "img" ).addClass( "image" );

// Change background on scroll
var h = document.documentElement,
    b = document.body,
    st = 'scrollTop',
    sh = 'scrollHeight'
    index = 0,
    percent = 0;

var images = new Array()
function preload(preload_images) {
  for (i = 0; i < preload_images; i++) {
    images[i] = new Image()
    images[i].src = preload_images[i]
  }
}

var backgrounds = [
  "https://s3-eu-west-1.amazonaws.com/informatics-webimages/articles/2016-03-30-year-one/backg-1.jpg",
  "https://s3-eu-west-1.amazonaws.com/informatics-webimages/articles/2016-03-30-year-one/backg-2.jpg",
  "https://s3-eu-west-1.amazonaws.com/informatics-webimages/articles/2016-03-30-year-one/backg-3.jpg",
  "https://s3-eu-west-1.amazonaws.com/informatics-webimages/articles/2016-03-30-year-one/backg-4.jpg",
  "https://s3-eu-west-1.amazonaws.com/informatics-webimages/articles/2016-03-30-year-one/backg-5.jpg"
]

preload(backgrounds);

window.addEventListener("scroll", function(){
    percent = h[st]||b[st] / ((h[sh]||b[sh]) - h.clientHeight);
    index = Math.floor(backgrounds.length * Math.min(percent, 0.99));
    $('.background').css('background-image','url(' + backgrounds[index] + ')');
});
