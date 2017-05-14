
//Google VR API script to swap out photos
var vrView;
var browserHeight = $(window).height();
var carouselHeight = $('.carousel').height();
var thumbnailWidth = 150 + 16;

// All the scenes for the experience
//To add a photo, you must include a title feild, a link to the 360 photo in the
//image feild, and a thumbnail of the VR Photo
var scenes = [
  {
    title: 'Marine Drive',
    image: 'https://raw.githubusercontent.com/ubyssey/campus-views/master/VR_Photos/MarineDrive.jpg',
    thumbnail: 'https://raw.githubusercontent.com/ubyssey/campus-views/master/VR_Photos/MarineDriveTumbnail.png'
  },
  {
    title: 'Mosquito Field',
    image: 'https://raw.githubusercontent.com/ubyssey/campus-views/master/VR_Photos/Mosquito_Field.jpg',
    thumbnail: 'https://raw.githubusercontent.com/ubyssey/campus-views/master/VR_Photos/MosqFeildThumbnail.png'
  },
  {
    title: 'Museum of Anthropology',
    image: 'https://raw.githubusercontent.com/ubyssey/campus-views/master/VR_Photos/MOA.jpg',
    thumbnail: 'https://raw.githubusercontent.com/ubyssey/campus-views/master/VR_Photos/MOAThumbnail.png'
  },
  {
    title: 'Wreck Beach',
    image: 'https://raw.githubusercontent.com/ubyssey/campus-views/master/VR_Photos/WreckBeach.jpg',
    thumbnail: 'https://raw.githubusercontent.com/ubyssey/campus-views/master/VR_Photos/WreckBeachThumbnail.png'
  },
  {
    title: 'AMS Nest',
    image: 'https://raw.githubusercontent.com/ubyssey/campus-views/master/VR_Photos/Nest.jpg',
    thumbnail: 'https://raw.githubusercontent.com/ubyssey/campus-views/master/VR_Photos/NestThumbnail.png'
  },
  {
    title: 'Nitobe Garden',
    image: 'https://raw.githubusercontent.com/ubyssey/campus-views/master/VR_Photos/Nitobe.jpg',
    thumbnail: 'https://raw.githubusercontent.com/ubyssey/campus-views/master/VR_Photos/NitobeThumbnail.png'
  },
  {
    title: 'Tower Beach Stairs',
    image: 'https://raw.githubusercontent.com/ubyssey/campus-views/master/VR_Photos/TowerBeachStairs.jpg',
    thumbnail: 'https://raw.githubusercontent.com/ubyssey/campus-views/master/VR_Photos/TowerBeachThumbnail.png'
  }
];

var activeScene = 0;

function renderCarousel() {
  var carousel = $('.carousel');
  scenes.forEach(function(scene, i) {

    var item = $('<li></li>');

    var image = $('<img />');
    image.attr('src', scene.thumbnail);

    var tooltip = $('<span></span>');
    tooltip.addClass('tooltiptext');
    tooltip.text(scene.title);

    item.append(image);
    item.append(tooltip);

    item.data('i', i);

    if (activeScene == i) {
      item.addClass('current');
    }

    carousel.append(item);
  });
  console.log(carousel);
}

function onLoad() {
  vrView = new VRView.Player('#vrview', {
    width: '100%',
    height: browserHeight,
    image: 'https://raw.githubusercontent.com/ubyssey/campus-views/master/VR_Photos/MarineDrive.jpg',
    is_stereo: false,
    is_autopan_off: true
  });

  vrView.on('ready', onVRViewReady);
  vrView.on('modechange', onModeChange);
  vrView.on('error', onVRViewError);
}

function loadScene(id) {
  console.log('loadScene', id);

  // Set the image
vrView.setContent({
    image: scenes[id].image,
    //preview: scenes[id].preview,
    is_autopan_off: true
  });
}

//Will allow the gallery to slide when the width of the window is less than 800 pixels
function mobileResize() {
  var windowWidth = $(window).width();
  if(windowWidth < 800){
    var carouselOffset = (thumbnailWidth * activeScene) + (thumbnailWidth / 2);
    $('ul.carousel').css('margin-left', -carouselOffset);
    $('.Gallery').css('left', '50%');
    $(document).on('click', 'ul.carousel li', function(e) {
      $('.Gallery').css('left', '50%');
      e.preventDefault();
      var i = $(this).data('i');
      activeScene = i;
      loadScene(i);
      var carouselOffset = (thumbnailWidth * i) + (thumbnailWidth / 2);
      $('ul.carousel').css('margin-left', -carouselOffset);
      $('ul.carousel li').removeClass('current');
      $(this).addClass('current');
    });
  }
  else {
    $('.Gallery').css('text-align', 'center');
    $('ul.carousel').css('text-align', 'center');
    $('ul.carousel li').css('display', 'inline-block');
    $(document).on('click', 'ul.carousel li', function(e) {
      e.preventDefault();
      var i = $(this).data('i');
      activeScene = i;
      loadScene(i);
      $('ul.carousel li').removeClass('current');
      $(this).addClass('current');
    });
  }
}

function onVRViewReady(e) {
  console.log('onVRViewReady');
  mobileResize();
}

function onModeChange(e) {
  console.log('onModeChange', e.mode);
}

function onVRViewError(e) {
  console.log('Error! %s', e.message);
}

window.addEventListener('load', onLoad);

//Will change the carousel's dimensions and the VR view's dimensions when the window is resized
$(function () {
  renderCarousel();
    $( window ).resize(function() {
      browserHeight = $(window).height();
      carouselHeight = $('.carousel').height();
      $( "#vrview" ).css( {width: '100%',
      height: browserHeight});
      mobileResize();
    });
});
