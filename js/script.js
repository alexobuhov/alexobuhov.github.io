$(document).ready(function () {
  $(".header__burger").click(function (event) {
    $(".header__burger, .header__menu").toggleClass("active");
    $("body").toggleClass("lock");
  });
});

$(document).ready(function () {
  $(".header__link").click(function () {
    $(".header__burger, .header__menu").toggleClass("active");
    $("body").toggleClass("lock");
  });
});

$(window).scroll(function () {
  $(".picture").css(
    "background-position",
    "0% " + ($(this).scrollTop() / 15 - 10) + "px"
  );
});
