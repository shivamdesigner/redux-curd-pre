// document.addEventListener("DOMContentLoaded", function () {
//     const navbar = document.querySelector(".navbar-sticky");
//     const navbarToggle = document.querySelector(".navbar-toggler");
//     window.addEventListener("scroll", function () {
//       if (window.scrollY > 50) {
//         navbar.classList.add("scrolled");
//       } else {
//         navbar.classList.remove("scrolled");
//       }
//     });
//     navbarToggle.addEventListener("click", function () {
//       if (window.innerWidth < 992) {
//         navbar.classList.toggle("bg-dark", !navbar.classList.contains("bg-dark"));
//       }
//     });
//   });

  (function () {
    const doc = document.documentElement;
    const header = document.getElementById('site-header');
    let prevScroll = window.scrollY || doc.scrollTop;
    let prevDirection = 0;
    const threshold = 200;

    window.addEventListener('scroll', () => {
        const curScroll = window.scrollY || doc.scrollTop;
        const curDirection = curScroll > prevScroll ? 2 : 1;

        if (curDirection !== prevDirection) {
            if (curDirection === 2 && curScroll > threshold) {
                header.classList.add('hide');
                prevDirection = curDirection;
            } else if (curDirection === 1) {
                header.classList.remove('hide');
                prevDirection = curDirection;
            }
        }

        header.classList.toggle('scrolled', curScroll > threshold);
        prevScroll = curScroll;
    });
})();