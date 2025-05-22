import { techCarouselData } from "./data.js";

let animationId;
let scrollSpeed = 1;
let currentPosition = 0;
let totalWidth = 0;
let containerWidth = 0;

const initCarousel = () => {
  const carousel = document.getElementById("techCarousel");
  const prevButton = document.getElementById("carouselPrev");
  const nextButton = document.getElementById("carouselNext");
  const progressBar = document.getElementById("carouselProgressBar");

  // Créer les éléments du carrousel (sans duplication)
  populateCarousel(carousel);

  // Calculer les dimensions
  calculateDimensions(carousel);

  // Configuration des boutons de navigation
  prevButton.addEventListener("click", () => {
    scrollSpeed = Math.max(0.2, scrollSpeed - 0.3);
    updateProgressBar(progressBar);
  });

  nextButton.addEventListener("click", () => {
    scrollSpeed = Math.min(2.5, scrollSpeed + 0.3);
    updateProgressBar(progressBar);
  });

  // Démarrer l'animation continue
  startContinuousScroll(carousel, progressBar);

  // Gestion du survol
  carousel.parentElement.addEventListener("mouseenter", () => {
    scrollSpeed = 0.2;
  });

  carousel.parentElement.addEventListener("mouseleave", () => {
    scrollSpeed = 1;
  });

  // Recalculer les dimensions au redimensionnement
  window.addEventListener("resize", () => {
    calculateDimensions(carousel);
    updateProgressBar(progressBar);
  });

  updateProgressBar(progressBar);
};

// Créer les éléments du carrousel (version simple)
const populateCarousel = (carousel) => {
  carousel.innerHTML = "";

  techCarouselData.forEach((tech) => {
    const techItem = createTechItem(tech);
    carousel.appendChild(techItem);
  });
};

// Créer un élément de technologie
const createTechItem = (tech) => {
  const techItem = document.createElement("div");
  techItem.className = "tech-item";

  techItem.innerHTML = `
    <div class="tech-icon">
      <i class="${tech.icon}"></i>
    </div>
    <div class="tech-name">${tech.name}</div>
  `;

  return techItem;
};

// Calculer les dimensions du carrousel
const calculateDimensions = (carousel) => {
  totalWidth = carousel.scrollWidth;
  containerWidth = carousel.parentElement.offsetWidth;
};

// Défilement continu avec retour au début
const startContinuousScroll = (carousel, progressBar) => {
  const scroll = () => {
    currentPosition += scrollSpeed;

    // Calculer la distance maximale de défilement
    const maxScroll = totalWidth - containerWidth;

    // Si on atteint la fin, retourner au début avec une transition fluide
    if (currentPosition >= maxScroll) {
      currentPosition = 0;
    }

    carousel.style.transform = `translateX(-${currentPosition}px)`;
    updateCarouselProgress(progressBar, maxScroll);

    animationId = requestAnimationFrame(scroll);
  };

  scroll();
};

// Mettre à jour la barre de progression du carrousel
const updateCarouselProgress = (progressBar, maxScroll) => {
  if (maxScroll <= 0) {
    progressBar.style.width = "100%";
    return;
  }

  const progress = (currentPosition / maxScroll) * 100;
  progressBar.style.width = `${Math.min(100, progress)}%`;
};

// Mettre à jour la barre de progression de vitesse
const updateProgressBar = (progressBar) => {
  // Cette fonction peut être utilisée pour d'autres indicateurs si nécessaire
  console.log(`Vitesse actuelle: ${scrollSpeed}`);
};

export { initCarousel };
