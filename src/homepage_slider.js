export function initSlider() {
  document.addEventListener("DOMContentLoaded", function() {
    const slides = document.querySelectorAll(".main__section1__slide");
    const prevBtn = document.querySelector(".section1__slider__prev");
    const nextBtn = document.querySelector(".section1__slider__next");
    const dots = document.querySelectorAll(".slider__dot");

    let currentSlide = 0;

    function updateSlider() {
      slides.forEach((slide, index) => {
        slide.classList.remove("active");
        if (dots[index]) {
          dots[index].classList.remove("slider__dot__active");
        }
      });

      if (slides[currentSlide]) {
        slides[currentSlide].classList.add("active");
      }
      if (dots[currentSlide]) {
        dots[currentSlide].classList.add("slider__dot__active");
      }
    }

    nextBtn.addEventListener("click", function() {
      currentSlide = (currentSlide + 1) % slides.length;
      updateSlider();
    });

    prevBtn.addEventListener("click", function() {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      updateSlider();
    });

    dots.forEach((dot, index) => {
      dot.addEventListener("click", function() {
        currentSlide = index;
        updateSlider();
      });
    });

    // Инициализация
    updateSlider();
  });
}
