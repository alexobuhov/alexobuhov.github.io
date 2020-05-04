$(function () {

  $(".top__slider").slick({
    arrows: false,
    dots: true,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    pauseOnFocus: false,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          dots: false
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  });

  $(".menu__btn").click(function () {
    $(".header__menu-list").slideToggle();
  });

  $(".top__to-go").on("click", "a", function (event) {
    // отменяем стандартную обработку нажатия по ссылке
    event.preventDefault();

    // забираем идентификатор бока с атрибута href
    var id = $(this).attr("href"),
      top = $(id).offset().top;

    $("body,html").animate({ scrollTop: top }, 900);
  });
});
