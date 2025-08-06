const counterBlock = () => {

    const counterBlockEl = document.querySelectorAll('.counter-block');

    counterBlockEl.forEach((el) => {
        let plus = el.querySelector('[counter-block-type="plus"]');
        let minus = el.querySelector('[counter-block-type="minus"]');
        let input = el.querySelector('[counter-block-type="input"]');

        if (Number(input.value) === 1) {
            minus.disabled = true;
        }

        plus.addEventListener('click', (e) => {
            e.preventDefault();
            input.value = Number(input.value) + 1;
            minus.disabled = false;
        })

        minus.addEventListener('click', (e) => {
            e.preventDefault();

            input.value = Number(input.value) - 1;

            if (Number(input.value) === 1) {
                minus.disabled = true;
            }

        })
    });

};


addEventListener('DOMContentLoaded', (event) => {
    counterBlock();
})
$(function() {
    let icons = $('.footer-part-item .bottom-menu-icons');

    if (icons.is(':visible')) {

        icons.on('click', function () {
            icons.removeClass('active');
            $(this).addClass('active');

            let part = $(this).parents('.footer-part-item');

            if (part.find('.bottom-menu-list').is(':visible')) {
                part.find('.bottom-menu-list').fadeOut();
                $(this).removeClass('active');
            } else {
                part.find('.bottom-menu-list').slideDown();
            }
        })
    }
})
const onScrollLink = () => {

    if (window.location.hash != ''){
        let href = window.location.hash;
        let headerHeight = $('.js-header').outerHeight();

        $("html, body").animate({
            scrollTop: $(href).offset().top - headerHeight - 20
        }, {
            duration: 370,   // по умолчанию «400»
            easing: "linear" // по умолчанию «swing»
        });

        return false;
    }

    $(".scroll").on("click", function () {
        let href = $(this).attr("href");
        let headerHeight = $('.js-header').outerHeight();

        $("html, body").animate({
            scrollTop: $(href).offset().top - headerHeight - 20
        }, {
            duration: 370,   // по умолчанию «400»
            easing: "linear" // по умолчанию «swing»
        });

        return false;
    });

};
$(function() {

  if ($('.header-3')){
    let btn = $('.js-header-search-btn');

    btn.click(function(e){

      $('.header-search__inner').addClass('active');
      $('<div class="overflow"></div>').appendTo('body');

      $('.overflow').click(function(e){
        $('.header-search__inner').removeClass('active');
        $(this).remove();
      })
    })
  }

});
addEventListener('DOMContentLoaded', (event) => {

    $('.slider').each(function( index ) {
        let sliderItems = $(this).attr('data-slider-items') ? $(this).attr('data-slider-items') : 1;
        let sliderItemsMobile = $(this).attr('data-slider-items-mobile') ? $(this).attr('data-slider-items-mobile') : 1;
        let sliderItemsTable = $(this).attr('data-slider-items-table') ? $(this).attr('data-slider-items-table') : 1;

        let dots = $(this).attr('data-dots') ? $(this).attr('data-dots') : false ;
        let arrows = $(this).attr('data-arrows') ? $(this).attr('data-arrows') : false ;

        let autoplaySpeed = $(this).attr('data-autoplaySpeed') ? $(this).attr('data-autoplaySpeed') : 0 ;
        let autoplay = $(this).attr('data-autoplay') ? $(this).attr('data-autoplay') : false ;



        if ( $(this).find('.items').length >= sliderItems) {
            $(this).slick({
                infinite: true,
                dots: $.parseJSON(dots),
                arrows: $.parseJSON(arrows),
                slidesToShow: sliderItems,
                slidesToScroll: 1,
                autoplay: autoplay,
                autoplaySpeed: autoplaySpeed,
                responsive: [
                    {
                        breakpoint: 991,
                        settings: {
                            slidesToShow: sliderItemsTable,
                            slidesToScroll: 1,
                            infinite: true,
                            dots: true
                        }
                    },
                    {
                        breakpoint: 576,
                        settings: {
                            slidesToShow: sliderItemsMobile,
                            slidesToScroll: 1
                        }
                    }
                ]
            });
        }
    });

});
$(function () {
  let currentWidth = $(".tabs-wrapper").outerWidth();

  const arrow =
    '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8"><rect width="12" height="8" fill="#333" fill-opacity="0"></rect><path d="M1015.69,507.693a0.986,0.986,0,0,1-1.4,0l-4.31-4.316-4.3,4.316a0.993,0.993,0,0,1-1.4-1.408l4.99-5.009a1.026,1.026,0,0,1,1.43,0l4.99,5.009A0.993,0.993,0,0,1,1015.69,507.693Z" fill="#333" transform="translate(-1004 -501)"></path></svg>';
  // оболочка для стрелок
  const arrow_wrapper =
    '<div class="tabs-arrows">' +
    '<div class="tabs-arrow-left arrow">' +
    arrow +
    "</div>" +
    '<div class="tabs-arrow-right arrow">' +
    arrow +
    "</div>" +
    "</div>";
  const tabs_wrapper = $(".tabs-wrapper");
  const tabs_nav = $(".tabs-nav");
  // будем менять это значение динамически
  // добавили стрелочки. Стили уже заданы заранее в css, ничего более не нужно для них
  tabs_wrapper.append(arrow_wrapper);
  const right_arrow = $(".tabs-arrow-right");
  const left_arrow = $(".tabs-arrow-left");

  //   изначально их уберём
  left_arrow.addClass("disabled");
  right_arrow.addClass("disabled");

  // переменная, которая будет менять transform
  let transformPX = 0;

  const tabs = $(".tabs-nav");
  // расстояние между двумя табами
  const gap = 5;

  // функция по обновлению положений стрелок
  function updateArrow(tab_width, tabElem_width) {
    // если у нас мобилка, тогда нам не нужны стрелки, будем через drag листать
    // if (window.innerWidth <= 550) {
    //   left_arrow.addClass("disabled");
    //   right_arrow.addClass("disabled");
    //   return;
    // }
    if (transformPX === 0) {
      left_arrow.addClass("disabled");
    } else {
      left_arrow.removeClass("disabled");
    }
    // разбираемся с правой стрелкой
    if (transformPX < tab_width - tabElem_width) {
      right_arrow.addClass("disabled");
    } else {
      right_arrow.removeClass("disabled");
    }
  }
  //   для фикса проблем с интервалами при ресайзе
  let intervalId = null;
  tabs_nav.css("transform", `translateX(${transformPX}px)`);

  //   тут мы обновляем всю инфу
  function checkTabsWidth() {
    tab_width = $(".tabs-nav").outerWidth();
    tabElem_width = 0;

    // находим общую ширину всех табов + ьрасстояние между ними
    $.each(tabs.find("li"), function (i, elem) {
      let elem_width = $(elem).outerWidth();
      tabElem_width += elem_width + gap;
    });

    // если мы вышли за грань, то нам нужно вернуться в ноль
    if (transformPX > 0) {
      transformPX = 0;
    }

    if (tabElem_width > tab_width) {
      // изначально обнавляем стрелки
      updateArrow(tab_width, tabElem_width);
      let touchStart = 0;

      // мобилка
      tabs_nav.on("touchstart", (e) => {
        // e.preventDefault();
        let originalEvent = e.originalEvent;
        touchStart = originalEvent.touches[0].pageX;
      });

      tabs_nav.on("touchmove", function (event) {
        event.preventDefault();
        let originalEvent = event.originalEvent;
        let pageX = originalEvent.touches[0].pageX;

        if (pageX < touchStart) {
          if (-transformPX < -(tab_width - tabElem_width)) {
            transformPX -= 7;
            tabs_nav.css("transform", `translateX(${transformPX}px)`);
            tabs_nav.css("transform", `-webkit-translateX(${transformPX}px)`);
            updateArrow(tab_width, tabElem_width);
          } else {
            right_arrow.addClass("disabled");
          }
          touchStart = pageX;
        }

        if (pageX > touchStart) {
          if (transformPX < 0) {
            transformPX += 7;
            tabs_nav.css("transform", `translateX(${transformPX}px)`);
            tabs_nav.css("transform", `-webkit-translateX(${transformPX}px)`);
            updateArrow(tab_width, tabElem_width);
          } else {
            left_arrow.addClass("disabled");
          }
          touchStart = pageX;
        }
      });

      // true, false - возвращает
      var isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );

      if (!isMobile) {
        // для правой стрелки
        right_arrow.on("mouseover", function () {
          if (!intervalId) {
            intervalId = setInterval(function () {
              if (-transformPX < -(tab_width - tabElem_width)) {
                transformPX -= 5;
                tabs_nav.css("transform", `translateX(${transformPX}px)`);
              } else {
                right_arrow.addClass("disabled");
              }
              updateArrow(tab_width, tabElem_width);
            }, 16);
          }
        });

        right_arrow.on("mouseout", function () {
          clearInterval(intervalId);
          intervalId = null;
        });

        // для левой стрелки
        left_arrow.on("mouseover", function () {
          if (!intervalId) {
            intervalId = setInterval(function () {
              if (transformPX < 0) {
                transformPX += 5;
                tabs_nav.css("transform", `translateX(${transformPX}px)`);
              } else {
                right_arrow.addClass("disabled");
              }
              updateArrow(tab_width, tabElem_width);
            }, 16);
          }
        });

        left_arrow.on("mouseout", function () {
          clearInterval(intervalId);
          intervalId = null;
        });
      } else {
        // для правой стрелки
        right_arrow.on("click", function () {
          if (!intervalId) {
            intervalId = setInterval(function () {
              if (-transformPX < -(tab_width - tabElem_width)) {
                transformPX -= 5;
                tabs_nav.css("transform", `translateX(${transformPX}px)`);
                updateArrow(tab_width, tabElem_width);
              } else {
                right_arrow.addClass("disabled");
              }
            }, 16);
            // чтобы не до конца листалось
            timeoutId = setTimeout(function () {
              clearInterval(intervalId);
              intervalId = null;
            }, 500);
          }
        });

        // для левой стрелки
        left_arrow.on("click", function () {
          if (!intervalId) {
            intervalId = setInterval(function () {
              if (transformPX < 0) {
                transformPX += 5;
                tabs_nav.css("transform", `translateX(${transformPX}px)`);
                updateArrow(tab_width, tabElem_width);
              } else {
                left_arrow.addClass("disabled");
              }
            }, 16);
            // чтобы не до конца листалось
            timeoutId = setTimeout(function () {
              clearInterval(intervalId);
              intervalId = null;
            }, 500);
          }
        });
      }
    }
  }

  // вызываем функцию при стартовой загрузке страницы
  checkTabsWidth();

  // вызываем функцию при изменении ширины экрана
  window.onresize = function () {
    let newWidth = $(".tabs-wrapper").outerWidth();
    // обновляем стрелки
    updateArrow(tab_width, tabElem_width);
    // это для того, чтобы ничего не дергалось при изменении размера экрана
    clearInterval(intervalId);

    // очищаем наш ивент, иначе при любом разрешении экрана начинается ужас, тк начинается дублирование этого события
    tabs_nav.off("touchstart");
    tabs_nav.off("touchmove");

    // если у нас увеличивается ширина, то нужно наши табы смещать
    if (newWidth > currentWidth) {
      // console.log("Ширина увеличилась");
      if (transformPX < 0) {
        transformPX += 20;
        tabs_nav.css("transform", `translateX(${transformPX}px)`);
      }
    }
    // запускаем функцию
    checkTabsWidth();
    // обновляем
    currentWidth = newWidth;
  };
});

$(function () {
  let tab = $(".tabs .tabs-items > div");
  tab.hide().filter(":first").show();

  // Клики по вкладкам.
  $(".tabs .tabs-nav a")
    .click(function (e) {
      e.preventDefault();
      tab.hide();
      tab.filter(this.hash).show();
      $(".tabs .tabs-nav a").removeClass("active");
      $(this).addClass("active");
      return false;
    })
    .filter(":first")
    .click();

  // Клики по якорным ссылкам.
  $(".tabs-target").click(function () {
    $(".tabs .tabs-nav a[href=" + $(this).attr("href") + "]").click();
  });

  // Отрытие вкладки из хеша URL
  if (window.location.hash) {
    $(".tabs-nav a[href=" + window.location.hash + "]").click();
    window.scrollTo(0, $("#".window.location.hash).offset().top);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const accordions = document.querySelectorAll('.accordion');

  accordions.forEach((el) => {
    if (el.querySelector('.accordion__control a')) {
      const controlLink = el.querySelector('.accordion__control a');
      controlLink.addEventListener('click', (e) => {
        e.preventDefault();
      });
    }

    const controlEl = el.querySelector('.accordion__control');
    const contentEl = el.querySelector('.accordion__content');

    // click on accordion__control
    controlEl.addEventListener('click', (e) => {
      el.classList.toggle('open');

      if (el.classList.contains('open')) {
        controlEl.setAttribute('aria-expanded', true);
        contentEl.setAttribute('aria-hidden', false);
        contentEl.style.maxHeight = contentEl.scrollHeight + 'px';
      } else {
        controlEl.setAttribute('aria-expanded', false);
        contentEl.setAttribute('aria-hidden', true);
        contentEl.style.maxHeight = null;
      }
    });
  });
});
// Раскрывающийся блок
function expandBlock() {
    let dropDownBoxes = document.querySelectorAll('.js-drop-down-box');

    if (dropDownBoxes.length > 0) {
        dropDownBoxes.forEach(function(box) {
            let contentBox = box.querySelector('.drop-down-box__content');
            let boxMaxHeight = parseInt(box.dataset.height);
            let divider = box.querySelector('.drop-down-box__divider');

            if (contentBox) {
                if (boxMaxHeight) {
                    if (!divider) {
                        contentBox.style.maxHeight = boxMaxHeight + 'px';
                    }
                }

                if (divider) {
                    boxMaxHeight = divider.getBoundingClientRect().top - box.getBoundingClientRect().top - parseInt(getComputedStyle(divider.previousElementSibling).marginBottom);
                    contentBox.style.maxHeight = boxMaxHeight + 'px';
                }
            } else {
                box.insertAdjacentHTML('afterbegin', '<span class="error">Нечего разворачивать!</span>');
                // console.log('Нет контейнера под контент');
            }

            if (divider || boxMaxHeight) {
                if (!contentBox.nextElementSibling) {
                    let expandButton = document.createElement('a');
                    expandButton.classList.add('link');
                    expandButton.classList.add('link_arrow_down');
                    expandButton.classList.add('drop-down-box__link');
                    expandButton.innerHTML = 'Развернуть';
                    box.insertAdjacentElement('beforeend', expandButton);

                    expandButton.addEventListener('click', function(event){
                        event.preventDefault();

                        if (contentBox) {
                            box.classList.toggle('drop-down-box_expanded');
                            if (box.classList.contains('drop-down-box_expanded')) {
                                contentBox.style.maxHeight = contentBox.scrollHeight + 'px';
                                expandButton.innerHTML = 'Свернуть';
                                expandButton.classList.add('link_active'); // Под вопросом
                            } else {
                                contentBox.style.maxHeight = divider.getBoundingClientRect().top - box.getBoundingClientRect().top - parseInt(getComputedStyle(divider.previousElementSibling).marginBottom) + 'px';
                                expandButton.classList.remove('link_active'); // Под вопросом
                                expandButton.innerHTML = 'Развернуть';
                            }
                        }
                    });
                }

                window.addEventListener('resize', function() {
                    if (box.classList.contains('drop-down-box_expanded')) {
                        contentBox.style.maxHeight = contentBox.scrollHeight + 'px';
                    } else {
                        contentBox.style.maxHeight = divider.getBoundingClientRect().top - box.getBoundingClientRect().top - parseInt(getComputedStyle(divider.previousElementSibling).marginBottom) + 'px';
                    }
                });
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    expandBlock();
});
document.addEventListener('DOMContentLoaded', function() {
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const button = dropdown.querySelector('.dropdown-button');

        button.addEventListener('click', function() {
            // Переключаем класс active для показа/скрытия меню
            dropdown.classList.toggle('active');
        });

        // Закрытие меню при клике вне элемента
        document.addEventListener('click', function(event) {
            if (!dropdown.contains(event.target)) {
                dropdown.classList.remove('active');
            }
        });
    });
});
document.addEventListener('DOMContentLoaded', () => {

    const slinky = $('.header-mobile-menu-top').slinky();

    //Бургер открываем
    $(".header-mobile__burger").on("click", () => {
        //меняем иконку бургера
        $(".header-burger-icon").toggleClass("active");

        $(".header-mobile-menu").toggleClass("toggle");
        $(".mobile-nav-overlay").toggleClass("open");
        $("body").toggleClass("header-open");
    });

    // закрываем мобильный хедер при клике на оверлей
    $(".mobile-nav-overlay").on("click", () => {
        $(".mobile-nav-overlay").toggleClass("open");
        $(".header-mobile-menu").toggleClass("toggle");
        $(".header-burger-icon").toggleClass("active");
        $("body").toggleClass("header-open");
    });

    // показываем, скрываем второй уровень
    $(".header-list-more").on("click", function () {
        //взяли родителя и покрасили его
        var parent = $(this).closest(".header-main-link");
        $(this).closest("li").toggleClass("selected");
        //показали\скрыли второй уровень
        parent.next(".header-list-second").toggle();
    });

});
addEventListener("DOMContentLoaded", (event) => {
	const products = document.querySelectorAll('.card-product');

	if (products) {
		products.forEach(el => {
			let currentProduct = el;
			const imageSwitchItems = currentProduct.querySelectorAll('.image-switch__item');
			const imagePagination = currentProduct.querySelector('.image-pagination');

			if (imageSwitchItems.length > 1) {
				imageSwitchItems.forEach((el, index) => {
					el.setAttribute('data-index', index);

					
					imagePagination.innerHTML += `<li class="image-pagination__item ${index == 0 ? 'image-pagination__item--active' : ''}" data-index="${index}"></li>`;
					el.addEventListener('mouseenter', (e) => {
						currentProduct.querySelectorAll('.image-pagination__item').forEach(el => {el.classList.remove('image-pagination__item--active')});
						currentProduct.querySelector(`.image-pagination__item[data-index="${e.currentTarget.dataset.index}"]`).classList.add('image-pagination__item--active');
					});

					el.addEventListener('mouseleave', (e) => {
						currentProduct.querySelectorAll('.image-pagination__item').forEach(el => {el.classList.remove('image-pagination__item--active')});
						currentProduct.querySelector(`.image-pagination__item[data-index="0"]`).classList.add('image-pagination__item--active');
					});
				});
			}
		});
	}

});

addEventListener('DOMContentLoaded', (event) => {


    /* Убрать */
    if (document.querySelector('.maps')) {
        console.log('maps');
        ymaps.ready(init);

        function init() {
            new ymaps.Map('maps', {
                center: [55.76, 37.64],
                zoom: 7,
            });
        }
    }

    Fancybox.bind("[data-fancybox]", {
        autoFocus: false,
    });
});
