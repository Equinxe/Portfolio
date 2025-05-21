/**
 * Gestion de l'affichage des compétences
 */

import { skillsData } from "./data.js";

const initSkills = () => {
  // Récupérer les éléments DOM
  const programmingLanguagesContainer = document.getElementById(
    "programmingLanguages"
  );
  const frameworksContainer = document.getElementById("frameworks");
  const toolsContainer = document.getElementById("tools");
  const softSkillsContainer = document.getElementById("softSkills");

  // Remplir les conteneurs avec les données
  populateSkills(
    programmingLanguagesContainer,
    skillsData.programmingLanguages
  );
  populateSkills(frameworksContainer, skillsData.frameworks);
  populateSkills(toolsContainer, skillsData.tools);
  populateSkills(softSkillsContainer, skillsData.softSkills);

  // Ajouter des animations au défilement
  animateSkillsOnScroll();
};

// Fonction pour remplir un conteneur avec les compétences
const populateSkills = (container, skills) => {
  skills.forEach((skill) => {
    const skillElement = document.createElement("div");
    skillElement.className = "skill-item";

    skillElement.innerHTML = `
      <div class="skill-name">
        <i class="${skill.icon} skill-icon"></i>
        ${skill.name}
      </div>
      <div class="skill-bar">
        <div class="skill-progress" data-level="${skill.level}" style="width: 0%;"></div>
      </div>
    `;

    container.appendChild(skillElement);
  });
};

// Animer les barres de progression lors du défilement
const animateSkillsOnScroll = () => {
  const skillBars = document.querySelectorAll(".skill-progress");

  // Observer les barres de compétences
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const skillBar = entry.target;
          const level = skillBar.dataset.level;

          // Animer la barre de progression
          setTimeout(() => {
            skillBar.style.width = `${level}%`;
          }, 200);

          // Arrêter d'observer cet élément
          observer.unobserve(skillBar);
        }
      });
    },
    { threshold: 0.5 }
  );

  // Observer chaque barre de compétence
  skillBars.forEach((skillBar) => {
    observer.observe(skillBar);
  });
};

export { initSkills };
