import { projectsData } from "./data.js";

const SLIDE_INTERVAL = 2000; // 2 secondes

const initProjects = () => {
  const projectsGrid = document.getElementById("projectsGrid");
  populateProjects(projectsGrid);
  animateProjectsOnScroll();
  setupModal();
};

const populateProjects = (container) => {
  projectsData.forEach((project, index) => {
    const projectCard = document.createElement("div");
    projectCard.className = "project-card";

    const tagsHTML = project.tags
      .map((tag) => `<span class="tag">${tag}</span>`)
      .join("");

    const linksHTML = project.links
      .map(
        (link) => `
      <a href="${link.url}" class="project-link" target="_blank">
        <i class="${link.icon}"></i>${link.name}
      </a>`
      )
      .join("");

    const mediaHTML = project.media
      .map((media, i) =>
        media.type === "image"
          ? `<img src="${media.src}" class="project-media ${
              i === 0 ? "active" : ""
            }" />`
          : `<video src="${media.src}" class="project-media ${
              i === 0 ? "active" : ""
            }" muted loop></video>`
      )
      .join("");

    projectCard.innerHTML = `
      <div class="project-media-slider" data-index="${index}">
        ${mediaHTML}
        <button class="fullscreen-btn" title="Agrandir">&#x26F6;</button>
      </div>
      <div class="slider-timer-bar"><div class="progress-bar-fill"></div></div>
      <div class="slider-controls">
        <button class="slider-prev">&#10094;</button>
        <div class="slider-progress" data-count="${project.media.length}">
        ${project.media
          .map(
            (_, i) =>
              `<div class="progress-dot ${i === 0 ? "active" : ""}"></div>`
          )
          .join("")}
        </div>
        <button class="slider-next">&#10095;</button>
      </div>
      
      <div class="project-content">
        <div class="project-tags">${tagsHTML}</div>
        <h3 class="project-title">${project.title}</h3>
        <p class="project-description">${project.description}</p>
        <div class="project-links">${linksHTML}</div>
      </div>
    `;

    container.appendChild(projectCard);

    setupSlider(projectCard.querySelector(".project-media-slider"));
  });
};

const setupSlider = (slider) => {
  let currentIndex = 0;
  const medias = slider.querySelectorAll(".project-media");
  const progressDots = slider.parentElement.querySelectorAll(".progress-dot");
  const timerBar = slider.parentElement.querySelector(".progress-bar-fill");
  const prevBtn = slider.parentElement.querySelector(".slider-prev");
  const nextBtn = slider.parentElement.querySelector(".slider-next");

  let interval;
  let isHovering = false;

  const startTimerAnimation = (duration) => {
    timerBar.style.transition = "none";
    timerBar.style.width = "0%";
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        timerBar.style.transition = `width ${duration}ms linear`;
        timerBar.style.width = "100%";
      });
    });
  };

  const showSlide = (index) => {
    currentIndex = index;

    medias.forEach((el, i) => {
      el.classList.toggle("active", i === currentIndex);
      if (el.tagName === "VIDEO") {
        el[i === currentIndex ? "play" : "pause"]();
      }
    });

    progressDots.forEach((dot, i) => {
      dot.classList.toggle("active", i === currentIndex);
    });

    const activeMedia = medias[currentIndex];
    const duration =
      activeMedia.tagName === "VIDEO"
        ? Math.max(
            activeMedia.duration * 1000 || SLIDE_INTERVAL,
            SLIDE_INTERVAL
          )
        : SLIDE_INTERVAL;

    startTimerAnimation(duration);
  };

  const nextSlide = () => showSlide((currentIndex + 1) % medias.length);
  const prevSlide = () =>
    showSlide((currentIndex - 1 + medias.length) % medias.length);

  const startAutoSlide = () => {
    if (interval) return;
    isHovering = true;
    showSlide(currentIndex); // Always refresh on enter
    interval = setInterval(nextSlide, SLIDE_INTERVAL);
  };

  const stopAutoSlide = () => {
    isHovering = false;
    clearInterval(interval);
    interval = null;
    timerBar.style.transition = "none";
    timerBar.style.width = "0%";
    medias.forEach((el) => {
      if (el.tagName === "VIDEO") el.pause();
    });
  };

  slider.addEventListener("mouseenter", startAutoSlide);
  slider.addEventListener("mouseleave", stopAutoSlide);

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", () => {
      stopAutoSlide();
      prevSlide();
    });
    nextBtn.addEventListener("click", () => {
      stopAutoSlide();
      nextSlide();
    });
  }

  slider.querySelector(".fullscreen-btn").addEventListener("click", () => {
    openModal([...medias].map((m) => m.cloneNode(true)));
  });
};

const animateProjectsOnScroll = () => {
  const projectCards = document.querySelectorAll(".project-card");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in-up");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  projectCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    observer.observe(card);
  });
};

// Modal plein écran
const setupModal = () => {
  const modal = document.createElement("div");
  modal.id = "mediaModal";
  modal.innerHTML = `
    <div class="modal-content">
      <button id="modalCloseBtn">&times;</button>
      <div id="modalSlider"></div>
      <div class="modal-nav">
        <button id="modalPrev">&#10094;</button>
        <button id="modalNext">&#10095;</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  document.getElementById("modalCloseBtn").onclick = () =>
    modal.classList.remove("active");
  document.getElementById("modalPrev").onclick = () => changeModalSlide(-1);
  document.getElementById("modalNext").onclick = () => changeModalSlide(1);
};

let modalMedias = [],
  modalIndex = 0;

const openModal = (mediaElements) => {
  const container = document.getElementById("modalSlider");
  container.innerHTML = "";
  modalMedias = mediaElements;
  modalIndex = 0;

  mediaElements.forEach((el) => {
    el.classList.remove("active");
    el.classList.add("modal-media");
    container.appendChild(el);
  });

  document.getElementById("mediaModal").classList.add("active");
  showModalSlide(0);
};

const showModalSlide = (index) => {
  modalMedias.forEach((el, i) => {
    el.classList.toggle("active", i === index);
    if (el.tagName === "VIDEO") {
      el[i === index ? "play" : "pause"]();
    }
  });
};

const changeModalSlide = (delta) => {
  modalIndex = (modalIndex + delta + modalMedias.length) % modalMedias.length;
  showModalSlide(modalIndex);
};

export { initProjects };
