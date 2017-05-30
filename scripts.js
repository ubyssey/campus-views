
// Google VR API script to swap out photos
var vrView;
var browserHeight = $(window).height();
var carouselHeight = $('.carousel').height();
var thumbnailWidth = 150 + 16;

// All the scenes for the experience
// To add a photo, you must include a title feild, a link to the 360 photo in the
// image feild, and a thumbnail of the VR Photo
var scenes = [
  {
    title: 'Marine Drive',
    image: 'images/marine-drive.jpg',
    thumbnail: 'images/marine-drive-thumb.jpg'
  },
  {
    title: 'Mosquito Field',
    image: 'images/mosquito-field.jpg',
    thumbnail: 'images/mosquito-field-thumb.jpg'
  },
  {
    title: 'Museum of Anthropology',
    image: 'images/moa.jpg',
    thumbnail: 'images/moa-thumb.jpg'
  },
  {
    title: 'Wreck Beach',
    image: 'images/wreck-beach.jpg',
    thumbnail: 'images/wreck-beach-thumb.jpg'
  },
  {
    title: 'AMS Nest',
    image: 'images/nest.jpg',
    thumbnail: 'images/nest-thumb.jpg'
  },
  {
    title: 'Nitobe Garden',
    image: 'images/nitobe.jpg',
    thumbnail: 'images/nitobe-thumb.jpg'
  },
  {
    title: 'Tower Beach Stairs',
    image: 'images/tower-beach.jpg',
    thumbnail: 'images/tower-beach-thumb.jpg'
  },
  {
    title: 'Pacific Spirit Park',
    image: 'images/pacific-spirit.jpg',
    thumbnail: 'images/pacific-spirit-thumb.jpg'
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
}

function onLoad() {
  vrView = new VRView.Player('#vrview', {
    width: '100%',
    height: browserHeight,
    image: 'images/marine-drive.jpg',
    is_stereo: false,
    is_autopan_off: true
  });

  vrView.on('ready', onVRViewReady);
  vrView.on('modechange', onModeChange);
  vrView.on('error', onVRViewError);
}

function loadScene(id) {
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
