/* ================= HERO IMAGE SLIDER ================= */
const slides = document.querySelectorAll(".slide");
let currentSlide = 0;

setInterval(() => {
  slides[currentSlide].classList.remove("active");
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add("active");
}, 4000);


/* ================= STATS COUNTER (SCROLL UP & DOWN) ================= */
const counters = document.querySelectorAll(".counter");
const statsSection = document.querySelector(".stats");

function animateCounter(counter) {
  const target = +counter.getAttribute("data-target");
  let count = 0;
  const speed = target / 80;

  function updateCount() {
    if (count < target) {
      count += speed;
      counter.innerText = Math.ceil(count);
      requestAnimationFrame(updateCount);
    } else {
      counter.innerText = target;
    }
  }
  updateCount();
}

function resetCounters() {
  counters.forEach(counter => {
    counter.innerText = "0";
    counter.dataset.started = "false";
  });
}

window.addEventListener("scroll", () => {
  const sectionTop = statsSection.getBoundingClientRect().top;
  const sectionBottom = statsSection.getBoundingClientRect().bottom;
  const windowHeight = window.innerHeight;

  if (sectionTop < windowHeight - 120 && sectionBottom > 120) {
    counters.forEach(counter => {
      if (counter.dataset.started !== "true") {
        animateCounter(counter);
        counter.dataset.started = "true";
      }
    });
  } else {
    resetCounters();
  }
});


/* ================= CONTACT FORM → WHATSAPP ================= */
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const message = document.getElementById("message").value;

    const myNumber = "918838399707"; // Your WhatsApp number

    const text =
      `Hi, this is ${name}.%0A` +
      `I would like to enquire about tiles.%0A` +
      `My contact number is ${phone}.%0A` +
      `Message: ${message}`;

    const whatsappUrl = `https://wa.me/${myNumber}?text=${text}`;
    window.open(whatsappUrl, "_blank");
  });
}

/* ================= PRODUCTS SLIDE ON SCROLL ================= */
const productCards = document.querySelectorAll(".product-card");

function revealProducts() {
  productCards.forEach(card => {
    const cardTop = card.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (cardTop < windowHeight - 100) {
      card.classList.add("show");
    }
  });
}

window.addEventListener("scroll", revealProducts);
revealProducts();


/* ================= MOBILE MENU ================= */
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");

  menuToggle.innerHTML = navMenu.classList.contains("active")
    ? '<i class="fas fa-times"></i>'
    : '<i class="fas fa-bars"></i>';
});

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
  });
});

/* ===== SCROLL ANIMATION FOR SHOWROOM IMAGES ===== */

const scrollElements = document.querySelectorAll(".scroll-animate");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        // remove when scrolling up → animation repeats
        entry.target.classList.remove("show");
      }
    });
  },
  {
    threshold: 0.2
  }
);

scrollElements.forEach(el => observer.observe(el));
