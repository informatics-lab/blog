// Add css tag to paragraphs containing only images
$( "p" ).has( "img" ).addClass( "image" );

// Change background on scroll
var h = document.documentElement,
    b = document.body,
    st = 'scrollTop',
    sh = 'scrollHeight'
    index = 0;

var backgrounds = [
  "https://s3-eu-west-1.amazonaws.com/informatics-webimages/articles/2016-03-30-year-one/CB5A1046.jpg",
  "https://s3-eu-west-1.amazonaws.com/informatics-webimages/articles/2016-03-30-year-one/CB5A1055.jpg",
  "https://s3-eu-west-1.amazonaws.com/informatics-webimages/articles/2016-03-30-year-one/CB5A1057.jpg"
]

window.addEventListener("scroll", function(){
    var percent = h[st]||b[st] / ((h[sh]||b[sh]) - h.clientHeight);
    old_index = index;
    index = Math.floor(backgrounds.length * Math.min(percent, 0.99));
    if (old_index != index){
      if (index % 2 == 1){
        $('#background_one').css('opacity','0.1');
        $('#background_two').css('opacity','0');

        setTimeout(function() {
          $('#background_one').css('background-image','url(' + backgrounds[index] + ')');
          $('#background_two').css('background-image','url(' + backgrounds[index + 1] + ')');
        }, 1000);
      } else {
        $('#background_one').css('opacity','0');
        $('#background_two').css('opacity','0.1');

        setTimeout(function() {
          $('#background_one').css('background-image','url(' + backgrounds[index + 1] + ')');
          $('#background_two').css('background-image','url(' + backgrounds[index] + ')');
        }, 1000);
      }
    }

});
