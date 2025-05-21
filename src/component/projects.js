/**
 * Gestion de l'affichage des projets
 */

import { projectsData } from "./data.js";

const initProjects = () => {
  const projectsGrid = document.getElementById("projectsGrid");

  // Remplir la grille de projets
  populateProjects(projectsGrid);

  // Ajouter des animations au défilement
  animateProjectsOnScroll();
};

// Fonction pour créer les cartes de projet
const populateProjects = (container) => {
  projectsData.forEach((project) => {
    const projectCard = document.createElement("div");
    projectCard.className = "project-card";

    // Créer les tags pour le projet
    const tagsHTML = project.tags
      .map(
        (tag) => `
      <span class="tag">${tag}</span>
    `
      )
      .join("");

    // Créer les liens pour le projet
    const linksHTML = project.links
      .map(
        (link) => `
      <a href="${link.url}" class="project-link" target="_blank">
        <i class="${link.icon}"></i>
        ${link.name}
      </a>
    `
      )
      .join("");

    // Structure HTML de la carte de projet
    projectCard.innerHTML = `
      <div class="project-image">
        <img src="${project.image}" alt="${project.title}">
      </div>
      <div class="project-content">
        <div class="project-tags">
          ${tagsHTML}
        </div>
        <h3 class="project-title">${project.title}</h3>
        <p class="project-description">${project.description}</p>
        <div class="project-links">
          ${linksHTML}
        </div>
      </div>
    `;

    container.appendChild(projectCard);
  });
};

// Animer les cartes de projet lors du défilement
const animateProjectsOnScroll = () => {
  const projectCards = document.querySelectorAll(".project-card");

  // Observer les cartes de projet
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in-up");

          // Arrêter d'observer cet élément
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  // Observer chaque carte de projet
  projectCards.forEach((card, index) => {
    // Ajouter un délai progressif pour créer un effet cascade
    card.style.animationDelay = `${index * 0.1}s`;
    observer.observe(card);
  });
};

export { initProjects };
