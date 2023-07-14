//=include ./helpers/elementsNodeList.js
//=include ./helpers/toggleBodyLock.js
//=include ./modules/index.js

// Включить/выключить FLS (Full Logging System) (в работе)


document.addEventListener('DOMContentLoaded', function(){ // Аналог $(document).ready(function(){
  if(document.querySelector('.cities')) {
      const swiper = new Swiper('.cities-swiper', {
          // Default parameters
          slidesPerView: 2.8,
          spaceBetween: 40,
          // Responsive breakpoints
          navigation: {
              nextEl: '.cities__arrow.next',
              prevEl: '.cities__arrow.prev',
          },
          breakpoints: {
              // when window width is >= 320px
              320: {
                  slidesPerView: 1.4,
                  spaceBetween: 20
              },
              769: {
                  slidesPerView: 2.8,
                  spaceBetween: 40
              },
              820: {
                  slidesPerView: 2.1,
                  spaceBetween: 20
              },
              1080: {
                  slidesPerView: 2.3,
                  spaceBetween: 40
              },
              1280: {
                  slidesPerView: 2.3,
                  spaceBetween: 40
              }
          }
      })
        if(window.innerWidth > 768) {
            let offset = (window.innerWidth - document.querySelector('.cities__container').clientWidth) / 2
            document.querySelector('.cities-swiper').style.marginRight = -offset - 10 + 'px'
        }
  }

  if(document.querySelector('img.svg')) {
      $('img.svg').each(function () {
          let $img = $(this);
          let imgID = $img.attr('id');
          let imgClass = $img.attr('class');
          let imgURL = $img.attr('src');

          $.get(imgURL, function (data) {
              // Get the SVG tag, ignore the rest
              let $svg = $(data).find('svg');

              // Add replaced image's ID to the new SVG
              if (typeof imgID !== 'undefined') {
                  $svg = $svg.attr('id', imgID);
              }
              // Add replaced image's classes to the new SVG
              if (typeof imgClass !== 'undefined') {
                  $svg = $svg.attr('class', imgClass + ' replaced-svg');
              }

              // Remove any invalid XML tags as per http://validator.w3.org
              $svg = $svg.removeAttr('xmlns:a');

              // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
              if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                  $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
              }

              // Replace image with new SVG
              $img.replaceWith($svg);

          }, 'xml');

      });
  }

  if(document.querySelector('.machines-item')) {
      hidePrice()
  }
});

let hidePrice = () => {
    let allServicesItem = document.querySelectorAll('.machines .machines-item')

    for (let i = 9; i < allServicesItem.length; i++) {
        allServicesItem[i].classList.add('hidden')
    }

    let more = document.querySelectorAll('.machines__button');

    for (let i = 0; i < more.length; i++) {
        more[i].addEventListener('click', function () {
            let showPerClick = 20;

            let hidden = document.querySelectorAll('.machines .machines-item.hidden');
            for (let i = 0; i < showPerClick; i++) {
                if (!hidden[i]) return this.style.display = "none";

                hidden[i].classList.remove('hidden');
            }
        });
    }
}


// Паралакс мышей ========================================================================================
// const mousePrlx = new MousePRLX({})
// =======================================================================================================

// Фиксированный header ==================================================================================
// headerFixed()
// =======================================================================================================

// togglePopupWindows()
// =======================================================================================================
// получаем координаты элемента в контексте документа
function getCoords(elem) {
    let box = elem.getBoundingClientRect();

    return {
        top: box.top + window.pageYOffset,
        right: box.right + window.pageXOffset,
        bottom: box.bottom + window.pageYOffset,
        left: box.left + window.pageXOffset
    };
}