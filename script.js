

/*   
       navbar 

*/
const hamburger = document.getElementById("hamburger");
const sidebar = document.getElementById("sidebar");
const closeBtn = document.getElementById("closeBtn");
const marqueeWrapper = document.querySelector(".marquee-wrapper");

// Hamburger toggle
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  sidebar.classList.toggle("show");
});

// Close sidebar button
closeBtn.addEventListener("click", () => {
  hamburger.classList.remove("active");
  sidebar.classList.remove("show");
});

// Click outside sidebar to close
sidebar.addEventListener("click", (e) => {
  if (e.target === sidebar) {
    hamburger.classList.remove("active");
    sidebar.classList.remove("show");
  }
});

// Hide marquee completely on scroll
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    marqueeWrapper.style.display = "none";
  } else {
    marqueeWrapper.style.display = "block";
  }
});

// Close sidebar on window resize > 768px
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    hamburger.classList.remove("active");
    sidebar.classList.remove("show");
  }
});

/*     our Expertsss   */

const wrapper = document.querySelector(".faculty-wrapper");
const cards = Array.from(wrapper.children);
const dotsContainer = document.querySelector(".dots");
let index = 0;

function getVisibleCards() {
  if (window.innerWidth > 1024) return 4;
  if (window.innerWidth > 768) return 3;
  return 1;
}

function createDots() {
  dotsContainer.innerHTML = "";
  const visible = getVisibleCards();
  const dotsCount = cards.length - visible;
  for (let i = 0; i <= dotsCount; i++) {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
      index = i;
      updateSlider();
      resetInterval();
    });
    dotsContainer.appendChild(dot);
  }
}

function updateSlider(instant = false) {
  const cardWidth = cards[0].offsetWidth + 25;
  const visible = getVisibleCards();

  if (index > cards.length - visible) index = 0;

  const offset = index * cardWidth;
  wrapper.style.transition = instant ? "none" : "transform 0.5s ease";
  wrapper.style.transform = `translateX(-${offset}px)`;

  const dots = document.querySelectorAll(".dot");
  dots.forEach((d) => d.classList.remove("active"));
  const activeIndex = index >= dots.length ? 0 : index;
  if (dots[activeIndex]) dots[activeIndex].classList.add("active");
}

function nextSlide() {
  index++;
  const visible = getVisibleCards();
  if (index > cards.length - visible) index = 0;
  updateSlider();
}

let interval = setInterval(nextSlide, 3000);

function resetInterval() {
  clearInterval(interval);
  interval = setInterval(nextSlide, 3000);
}

wrapper.addEventListener("mouseenter", () => clearInterval(interval));
wrapper.addEventListener(
  "mouseleave",
  () => (interval = setInterval(nextSlide, 3000)),
);

window.addEventListener("resize", () => {
  createDots();
  updateSlider(true);
});

createDots();
updateSlider();
