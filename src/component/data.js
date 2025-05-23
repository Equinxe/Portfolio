/**
 * Fichier contenant toutes les données du portfolio
 */

// AJOUTER ICI LES ICONES,COMPETENCE,PROJET !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!S
// Données du carrousel de technologies
const techCarouselData = [
  { name: "HTML5", icon: "fab fa-html5" },
  { name: "CSS3", icon: "fab fa-css3-alt" },
  { name: "JavaScript", icon: "fab fa-js" },
  { name: "TypeScript", icon: "fab fa-js" },
  { name: "Python", icon: "fab fa-python" },
  { name: "PHP", icon: "fab fa-php" },
  { name: "Lua", icon: "fas fa-moon" },
  { name: "Golang", icon: "fab fa-golang" },
  { name: "React", icon: "fab fa-react" },
  { name: "Vue.js", icon: "fab fa-vuejs" },
  { name: "Node.js", icon: "fab fa-node-js" },
  { name: "Love2D", icon: "fas fa-heart" },
  { name: "Git", icon: "fab fa-git-alt" },
  { name: "Docker", icon: "fab fa-docker" },
  { name: "VS Code", icon: "fas fa-code" },
  { name: "Vite", icon: "fas fa-bolt" },
];

// Données des compétences
const skillsData = {
  programmingLanguages: [
    { name: "JavaScript", level: 70, icon: "fab fa-js" },
    { name: "TypeScript", level: 50, icon: "fab fa-js" },
    { name: "Python", level: 75, icon: "fab fa-python" },
    { name: "PHP", level: 30, icon: "fab fa-php" },
    { name: "Lua", level: 90, icon: "fab fa-lua" },
    { name: "Golang", level: 70, icon: "fab fa-golang" },
  ],
  frameworks: [
    { name: "React.js", level: 90, icon: "fab fa-react" },
    { name: "Vue.js", level: 30, icon: "fab fa-vuejs" },
    { name: "Node.js", level: 85, icon: "fab fa-node-js" },
    { name: "Love2D", level: 95, icon: "fa-brands fa-gratipay" },
  ],
  tools: [
    { name: "Git & GitHub", level: 90, icon: "fab fa-git-alt" },
    { name: "Docker", level: 75, icon: "fab fa-docker" },
    { name: "Makefile", level: 75, icon: "fa-solid fa-file " },
    { name: "Vite", level: 80, icon: "" },
    { name: "Prettier", level: 95, icon: "fa-solid fa-p" },
    { name: "VS Code", level: 95, icon: "fa-solid fa-code" },
  ],
  softSkills: [
    { name: "Travail d'équipe", level: 95, icon: "fas fa-users" },
    { name: "Communication", level: 90, icon: "fas fa-comments" },
    { name: "Résolution de problèmes", level: 95, icon: "fas fa-puzzle-piece" },
    { name: "Gestion du temps", level: 85, icon: "fas fa-clock" },
    { name: "Adaptabilité", level: 90, icon: "fas fa-sync-alt" },
    { name: "Créativité", level: 80, icon: "fas fa-lightbulb" },
  ],
};

// Données des projets
const projectsData = [
  {
    title: "Sylverra, The last Sylphsong",
    description:
      "Sylverra, The Last Skysong est un RPG 2D inspiré de la série Zelda. Le jeu propose six mondes aux ambiances et mécaniques uniques, avec un système d’inventaire permettant au joueur de collecter, équiper et utiliser des objets pour progresser. Chaque niveau introduit de nouveaux défis, entre exploration, combat et énigmes.",
    image: "static/img/Sylverra.png",
    tags: [
      "Work In Progress",
      "Personnal project",
      "Lua",
      "Love2D",
      "Tiled",
      "Aseprite",
    ],
    links: [
      { name: "Voir le site", url: "#", icon: "fas fa-external-link-alt" },
      {
        name: "Code Source",
        url: "https://github.com/Equinxe/Sylverra-The-Last-Sylphsong",
        icon: "fab fa-github",
      },
    ],
  },
  {
    title: "Portfolio Personnel",
    description:
      "Un portfolio dynamique et responsive pour présenter mes projets et compétences avec un système de thème clair/sombre, des animations spatiales et une interface moderne.",
    image: "/api/placeholder/600/400",
    tags: ["HTML5", "CSS3", "JavaScript", "Responsive", "Animations"],
    links: [
      { name: "Voir le site", url: "#", icon: "fas fa-external-link-alt" },
      {
        name: "Code Source",
        url: "https://github.com/Equinxe/Portfolio",
        icon: "fab fa-github",
      },
    ],
  },
  {
    title: "Roblox x Rolex",
    description:
      "Un simulateur Roblox innovant avec des mécaniques de progression uniques et une interface utilisateur soignée.",
    image: "/api/placeholder/600/400",
    tags: ["Roblox", "Lua", "Game Development", "UI/UX"],
    links: [
      { name: "Jouer", url: "#", icon: "fas fa-gamepad" },
      { name: "Code Source", url: "#", icon: "fab fa-github" },
    ],
    featured: true,
  },
  {
    title: "Roblox x Kinder",
    description:
      "Second simulateur Roblox avec des fonctionnalités avancées et un système de récompenses élaboré.",
    image: "/api/placeholder/600/400",
    tags: ["Roblox", "Lua", "Game Development", "Scripting", "MotionDesign"],
    links: [
      { name: "Voir le site", url: "#", icon: "fas fa-external-link-alt" },
      { name: "Code Source", url: "#", icon: "fab fa-github" },
    ],
    featured: true,
  },
];

const loadData = () => {
  return {
    techCarouselData,
    skillsData,
    projectsData,
  };
};

// Export des données
export { techCarouselData, skillsData, projectsData, loadData };
