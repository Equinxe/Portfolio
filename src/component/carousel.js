import { techCarouselData } from "./data.js";

let animationId;
let scrollSpeed = 0.5;
let currentPosition = 0;
let totalWidth = 0;
let containerWidth = 0;
let isHovered = false;
let itemWidth = 152; // 120px + 16px de gap

const initCarousel = () => {
  const carousel = document.getElementById("techCarousel");
  const prevButton = document.getElementById("carouselPrev");
  const nextButton = document.getElementById("carouselNext");
  const progressBar = document.getElementById("carouselProgressBar");

  // Créer les éléments du carrousel
  populateCarousel(carousel);

  // Calculer les dimensions et définir la position initiale
  calculateDimensions(carousel);

  // Configuration des boutons de navigation pour navigation manuelle
  prevButton.addEventListener("click", () => {
    navigateCarousel(-1, carousel, progressBar);
  });

  nextButton.addEventListener("click", () => {
    navigateCarousel(1, carousel, progressBar);
  });

  // Gestion du survol - arrêter/reprendre l'animation automatique
  const carouselContainer = carousel.parentElement;

  carouselContainer.addEventListener("mouseenter", () => {
    isHovered = true;
    stopContinuousScroll();
  });

  carouselContainer.addEventListener("mouseleave", () => {
    isHovered = false;
    startContinuousScroll(carousel, progressBar);
  });

  // Démarrer l'animation continue
  startContinuousScroll(carousel, progressBar);

  // Recalculer les dimensions au redimensionnement
  window.addEventListener("resize", () => {
    calculateDimensions(carousel);
    updateCarouselProgress(progressBar);
  });

  updateCarouselProgress(progressBar);
};

// Créer les éléments du carrousel
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
  // Mettre à jour la largeur d'un élément en fonction de la taille d'écran
  const techItems = carousel.querySelectorAll(".tech-item");
  if (techItems.length > 0) {
    const firstItem = techItems[0];
    const itemStyle = window.getComputedStyle(firstItem);
    itemWidth = firstItem.offsetWidth + parseInt(itemStyle.marginRight || "16");
  }

  // Démarrer avec un décalage d'un élément pour éviter le rognage
  if (currentPosition === 0) {
    currentPosition = itemWidth;
    carousel.style.transform = `translateX(-${currentPosition}px)`;
  }
};

// Navigation manuelle du carrousel
const navigateCarousel = (direction, carousel, progressBar) => {
  // Calculer les limites avec décalage pour éviter le rognage
  const minPosition = itemWidth; // Commence après le premier élément
  const maxPosition = Math.max(
    minPosition,
    totalWidth - containerWidth + itemWidth
  ); // Finit avant le dernier élément

  // Calculer la nouvelle position basée sur la largeur d'un élément
  let newPosition = currentPosition + direction * itemWidth;

  // Gérer les limites avec navigation circulaire
  if (direction > 0) {
    // Aller vers la droite
    if (newPosition >= maxPosition) {
      newPosition = minPosition; // Retourner au début (avec décalage)
    }
  } else {
    // Aller vers la gauche
    if (newPosition < minPosition) {
      newPosition = maxPosition - itemWidth; // Aller vers la fin (avec décalage)
    }
  }

  currentPosition = newPosition;

  // Appliquer la transition avec animation
  carousel.style.transition = "transform 0.3s ease";
  carousel.style.transform = `translateX(-${currentPosition}px)`;

  // Retirer la transition après l'animation pour le défilement automatique
  setTimeout(() => {
    carousel.style.transition = "";
  }, 300);

  updateCarouselProgress(progressBar);
};

// Défilement continu automatique
const startContinuousScroll = (carousel, progressBar) => {
  if (isHovered) return;

  stopContinuousScroll();

  const scroll = () => {
    if (isHovered) return;

    currentPosition += scrollSpeed;

    // Calculer les limites avec décalage
    const minPosition = itemWidth;
    const maxPosition = Math.max(
      minPosition,
      totalWidth - containerWidth + itemWidth
    );

    // Si on atteint la fin, retourner au début (avec décalage)
    if (currentPosition >= maxPosition) {
      currentPosition = minPosition;
    }

    carousel.style.transform = `translateX(-${currentPosition}px)`;
    updateCarouselProgress(progressBar);

    animationId = requestAnimationFrame(scroll);
  };

  animationId = requestAnimationFrame(scroll);
};

// Arrêter le défilement automatique
const stopContinuousScroll = () => {
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
};

// Mettre à jour la barre de progression
const updateCarouselProgress = (progressBar) => {
  const minPosition = itemWidth;
  const maxPosition = Math.max(
    minPosition,
    totalWidth - containerWidth + itemWidth
  );
  const scrollRange = maxPosition - minPosition;

  if (scrollRange <= 0) {
    progressBar.style.width = "100%";
    return;
  }

  const adjustedPosition = currentPosition - minPosition;
  const progress = (adjustedPosition / scrollRange) * 100;
  progressBar.style.width = `${Math.max(0, Math.min(100, progress))}%`;
};

export { initCarousel };
