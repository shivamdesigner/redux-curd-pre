document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.querySelector(".navbar-sticky");
    const navbarToggle = document.querySelector(".navbar-toggler");
    window.addEventListener("scroll", function () {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    });
    navbarToggle.addEventListener("click", function () {
      if (window.innerWidth < 992) {
        navbar.classList.toggle("bg-dark", !navbar.classList.contains("bg-dark"));
      }
    });
  });