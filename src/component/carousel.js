/**
 * Gestion du carrousel de technologies
 */

import { techCarouselData } from "./data.js";

let currentPosition = 0;
let carouselInterval;
const scrollAmount = 3; // Nombre d'éléments à faire défiler à chaque clic

const initCarousel = () => {
  const carousel = document.getElementById("techCarousel");
  const prevButton = document.getElementById("carouselPrev");
  const nextButton = document.getElementById("carouselNext");
  const progressBar = document.getElementById("carouselProgressBar");

  // Créer les éléments du carrousel
  populateCarousel(carousel);

  // Calculer la largeur totale et le nombre d'éléments visibles
  const carouselWidth = carousel.scrollWidth;
  const containerWidth = carousel.parentElement.offsetWidth;
  const maxScroll = carouselWidth - containerWidth;

  let visibleItems = Math.floor(containerWidth / (120 + 16)); // Largeur d'un élément + marge
  if (visibleItems <= 0) visibleItems = 1;

  // Configuration des boutons de navigation
  prevButton.addEventListener("click", () => {
    stopAutoScroll();
    scrollCarousel(-scrollAmount, carousel, maxScroll);
    startAutoScroll(carousel, maxScroll);
  });

  nextButton.addEventListener("click", () => {
    stopAutoScroll();
    scrollCarousel(scrollAmount, carousel, maxScroll);
    startAutoScroll(carousel, maxScroll);
  });

  // Mettre à jour la barre de progression
  updateProgressBar(carousel, maxScroll, progressBar);

  // Écouter les événements de redimensionnement
  window.addEventListener("resize", () => {
    const newCarouselWidth = carousel.scrollWidth;
    const newContainerWidth = carousel.parentElement.offsetWidth;
    const newMaxScroll = newCarouselWidth - newContainerWidth;

    updateProgressBar(carousel, newMaxScroll, progressBar);
  });

  // Démarrer le défilement automatique
  startAutoScroll(carousel, maxScroll);

  // Pause du défilement au survol
  carousel.parentElement.addEventListener("mouseenter", () => {
    stopAutoScroll();
  });

  carousel.parentElement.addEventListener("mouseleave", () => {
    startAutoScroll(carousel, maxScroll);
  });
};

// Créer les éléments du carrousel à partir des données
const populateCarousel = (carousel) => {
  techCarouselData.forEach((tech) => {
    const techItem = document.createElement("div");
    techItem.className = "tech-item";

    techItem.innerHTML = `
      <div class="tech-icon">
        <i class="${tech.icon}"></i>
      </div>
      <div class="tech-name">${tech.name}</div>
    `;

    carousel.appendChild(techItem);
  });
};

// Faire défiler le carrousel
const scrollCarousel = (direction, carousel, maxScroll) => {
  const itemWidth = 120 + 16; // Largeur d'un élément + marge

  // Calculer la nouvelle position
  let newPosition = currentPosition + direction * itemWidth;

  // S'assurer que la position reste dans les limites
  if (newPosition < 0) {
    newPosition = 0;
  } else if (newPosition > maxScroll) {
    newPosition = 0; // Revenir au début
  }

  // Mettre à jour la position actuelle
  currentPosition = newPosition;

  // Appliquer le défilement
  carousel.style.transform = `translateX(-${currentPosition}px)`;

  // Mettre à jour la barre de progression
  updateProgressBar(
    carousel,
    maxScroll,
    document.getElementById("carouselProgressBar")
  );
};

// Mettre à jour la barre de progression
const updateProgressBar = (carousel, maxScroll, progressBar) => {
  const progress = maxScroll === 0 ? 0 : (currentPosition / maxScroll) * 100;
  progressBar.style.width = `${progress}%`;
};

// Démarrer le défilement automatique
const startAutoScroll = (carousel, maxScroll) => {
  stopAutoScroll();
  carouselInterval = setInterval(() => {
    scrollCarousel(1, carousel, maxScroll);
  }, 3000);
};

// Arrêter le défilement automatique
const stopAutoScroll = () => {
  if (carouselInterval) {
    clearInterval(carouselInterval);
  }
};

export { initCarousel };
