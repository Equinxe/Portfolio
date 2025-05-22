import { initTheme } from "./component/theme.js";
import { initNavigation } from "./component/navigation.js";
import { initCarousel } from "./component/carousel.js";
import { initSkills } from "./component/skills.js";
import { initProjects } from "./component/projects.js";
import { initContactForm } from "./component/form.js";
import { loadData } from "./component/data.js";
import { resize, start } from "./component/space-bg.js";

document.addEventListener("DOMContentLoaded", async () => {
  resize();
  start();
  const data = await loadData();

  initTheme();
  initNavigation();
  initCarousel();
  initSkills(data.skills); // Si tu passes des données
  initProjects(data.projects); // Idem
  initContactForm();

  const yearSpan = document.getElementById("currentYear");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
