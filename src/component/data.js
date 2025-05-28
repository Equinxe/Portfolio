/**
 * Fichier contenant toutes les données du portfolio
 */

// AJOUTER ICI LES ICONES,COMPETENCE,PROJET !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!S
// Données du carrousel de technologies
const techCarouselData = [
  { name: "", icon: "" },
  { name: "Lua", icon: "fas fa-moon" },
  { name: "JavaScript", icon: "fab fa-js" },
  { name: "HTML5", icon: "fab fa-html5" },
  { name: "CSS3", icon: "fab fa-css3-alt" },
  { name: "TypeScript", icon: "fab fa-js" },
  { name: "Python", icon: "fab fa-python" },
  { name: "PHP", icon: "fab fa-php" },
  { name: "Golang", icon: "fab fa-golang" },
  { name: "React", icon: "fab fa-react" },
  { name: "Vue.js", icon: "fab fa-vuejs" },
  { name: "Node.js", icon: "fab fa-node-js" },
  { name: "Love2D", icon: "fas fa-heart" },
  { name: "Git", icon: "fab fa-git-alt" },
  { name: "Docker", icon: "fab fa-docker" },
  { name: "VS Code", icon: "fas fa-code" },
  { name: "Vite", icon: "fas fa-bolt" },
  { name: "Unreal Engine 5", icon: "fab fa-unreal-engine" },
  { name: "Makefile", icon: "fa-solid fa-file" },
  { name: "Prettier", icon: "fa-solid fa-p" },
  { name: "Tiled", icon: "fas fa-map-signs" },
  { name: "Aseprite", icon: "fas fa-swatchbook" },
];

// Données des compétences
const skillsData = {
  programmingLanguages: [
    { name: "JavaScript", level: 70, icon: "fab fa-js" },
    { name: "TypeScript", level: 50, icon: "fab fa-js" },
    { name: "Python", level: 75, icon: "fab fa-python" },
    { name: "PHP", level: 30, icon: "fab fa-php" },
    { name: "Lua", level: 90, icon: "fas fa-moon" },
    { name: "Golang", level: 70, icon: "fab fa-golang" },
  ],
  frameworks: [
    { name: "React.js", level: 90, icon: "fab fa-react" },
    { name: "Vue.js", level: 30, icon: "fab fa-vuejs" },
    { name: "Node.js", level: 85, icon: "fab fa-node-js" },
    { name: "Love2D", level: 95, icon: "fa-brands fa-gratipay" },
  ],
  tools: [
    { name: "Unreal Engine 5", level: 50, icon: "fab fa-unreal-engine" },
    { name: "Git & GitHub", level: 90, icon: "fab fa-git-alt" },
    { name: "Docker", level: 75, icon: "fab fa-docker" },
    { name: "Makefile", level: 75, icon: "fa-solid fa-file " },
    { name: "Vite", level: 80, icon: "fas fa-bolt" },
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
    media: [
      { type: "image", src: "static/img/project/Sylverra.png" },
      { type: "image", src: "static/img/project/Sylverra.png" },
      { type: "video", src: "" },
    ],

    tags: [
      "Work In Progress",
      "Personnal project",
      "Game Development",
      "Lua",
      "Love2D",
      "Tiled",
      "Aseprite",
    ],
    links: [
      {
        name: "Code Source",
        url: "https://github.com/Equinxe/Sylverra-The-Last-Sylphsong",
        icon: "fab fa-github",
      },
    ],
  },
  {
    title: "Bomberman",
    description:
      "Un jeu classique de style Bomberman, développé avec JavaScript et manipulation DOM. Ce projet illustre le développement de jeux par navigateur hautes performances sans framework ni Canvas. Merci à Golden76z pour les Assets et background réalisé à la main",
    media: [
      { type: "image", src: "static/img/project/bomberman1.png" },
      { type: "image", src: "static/img/project/bomberman2.png" },
    ],

    tags: [
      "Game Development",
      "Lua",
      "Javascript",
      "Golang",
      "Aseprite",
      "Database",
    ],
    links: [
      {
        name: "Code Source",
        url: "https://github.com/Golden76z/bomberman_js",
        icon: "fab fa-github",
      },
    ],
  },
  {
    title: "Roblox x Rolex",
    description:
      "Un simulateur Roblox innovant avec des mécaniques de progression uniques et une interface utilisateur soignée.",
    media: [
      { type: "image", src: "" },
      { type: "video", src: "" },
    ],

    tags: [
      "Level Design",
      "Game Design",
      "Roblox",
      "Roblox Studio",
      "Lua",
      "Game Development",
      "Scripting",
      "Game Mechanics",
      "Game Marketing",
      "Game Testing",
      "Security",
      "Accessibility",
      "Advertising",
      "Roblox",
      "Studio",
      "Lua",
      "Game Development",
      "UI/UX",
      "Marketing",
      "3D",
    ],
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
    media: [
      { type: "image", src: "static/img/project/kinder11.png" },
      { type: "video", src: "static/img/project/rolls.mp4" },
      { type: "video", src: "static/img/project/sword.mp4" },
    ],

    tags: [
      "Roblox",
      "Lua",
      "Game Development",
      "Scripting",
      "MotionDesign",
      "UI/UX",
      "Marketing",
      "Advertising",
      "Simulation",
      "Game Design",
      "Game Mechanics",
      "Game Marketing",
      "Game Testing",
      "Game Performance",
      "Security",
      "Accessibility",
      "Roblox Studio",
    ],
    links: [
      { name: "Voir le site", url: "#", icon: "fas fa-external-link-alt" },
      { name: "Code Source", url: "#", icon: "fab fa-github" },
    ],
    featured: true,
  },
  {
    title: "Portfolio Personnel",
    description:
      "Un portfolio dynamique et responsive pour présenter mes projets et compétences avec un système de thème clair/sombre, des animations spatiales et une interface moderne.",
    media: [
      { type: "image", src: "static/img/project/portfolio1.png" },
      { type: "image", src: "static/img/project/portfolio2.png" },
      { type: "image", src: "static/img/project/portfolio3.png" },
    ],

    tags: ["HTML5", "CSS3", "JavaScript", "Responsive", "Animations"],
    links: [
      {
        name: "Voir le site",
        url: "https://equinxe.github.io/Portfolio/",
        icon: "fas fa-external-link-alt",
      },
      {
        name: "Code Source",
        url: "https://github.com/Equinxe/Portfolio",
        icon: "fab fa-github",
      },
    ],
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
