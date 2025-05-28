import { projectsData } from "./data.js";

const SLIDE_INTERVAL = 2000; // 2 secondes pour les images

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

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  seconds = Math.floor(seconds % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

const setupSlider = (slider) => {
  let currentIndex = 0;
  const medias = slider.querySelectorAll(".project-media");
  const progressDots = slider.parentElement.querySelectorAll(".progress-dot");
  const timerBar = slider.parentElement.querySelector(".progress-bar-fill");
  const prevBtn = slider.parentElement.querySelector(".slider-prev");
  const nextBtn = slider.parentElement.querySelector(".slider-next");

  let slideTimeout;
  let isActive = false;
  let pausedAt = null;
  let totalDuration = null;

  const startTimerAnimation = (remainingDuration, startPercent = 0) => {
    timerBar.style.transition = "none";
    timerBar.style.width = `${startPercent}%`;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        timerBar.style.transition = `width ${remainingDuration}ms linear`;
        timerBar.style.width = "100%";
      });
    });
  };

  const scheduleNextSlide = (duration) => {
    if (slideTimeout) {
      clearTimeout(slideTimeout);
    }

    slideTimeout = setTimeout(() => {
      if (isActive) {
        pausedAt = null;
        nextSlide();
      }
    }, duration);
  };

  const showSlide = (index, resumeFromPause = false) => {
    currentIndex = index;

    medias.forEach((el, i) => {
      el.classList.toggle("active", i === currentIndex);
      if (el.tagName === "VIDEO") {
        if (i === currentIndex) {
          if (!resumeFromPause) {
            el.currentTime = 0;
          }
          el.play();
        } else {
          el.pause();
          el.currentTime = 0;
        }
      }
    });

    progressDots.forEach((dot, i) => {
      dot.classList.toggle("active", i === currentIndex);
    });

    const activeMedia = medias[currentIndex];

    if (resumeFromPause && pausedAt !== null) {
      const elapsed = pausedAt;
      const remaining = totalDuration - elapsed;
      const progressPercent = (elapsed / totalDuration) * 100;

      startTimerAnimation(remaining, progressPercent);
      scheduleNextSlide(remaining);
      return;
    }

    let duration = SLIDE_INTERVAL;

    if (activeMedia.tagName === "VIDEO") {
      const updateDuration = () => {
        if (activeMedia.duration && !isNaN(activeMedia.duration)) {
          duration = activeMedia.duration * 1000;
          totalDuration = duration;

          // Update the duration display
          const durationDisplay =
            slider.parentElement.querySelector(".video-duration");
          if (durationDisplay) {
            durationDisplay.textContent = formatTime(activeMedia.duration);
          }

          startTimerAnimation(duration);
          if (isActive) {
            scheduleNextSlide(duration);
          }
        }
      };

      // Set up timeupdate handler for current time
      const updateCurrentTime = () => {
        const currentTimeDisplay = slider.parentElement.querySelector(
          ".video-current-time"
        );
        if (currentTimeDisplay) {
          currentTimeDisplay.textContent = formatTime(activeMedia.currentTime);
        }
      };

      // Remove existing listeners to avoid duplicates
      activeMedia.removeEventListener("loadedmetadata", updateDuration);
      activeMedia.removeEventListener("timeupdate", updateCurrentTime);

      // Add the listeners
      activeMedia.addEventListener("loadedmetadata", updateDuration);
      activeMedia.addEventListener("timeupdate", updateCurrentTime);

      // If duration is already available, update immediately
      if (activeMedia.duration && !isNaN(activeMedia.duration)) {
        updateDuration();
      }

      // Start with default duration until video metadata is loaded
      duration = SLIDE_INTERVAL;
      totalDuration = duration;
    } else {
      totalDuration = duration;

      // Reset time displays for non-video media
      const timeDisplays =
        slider.parentElement.querySelectorAll(".video-time span");
      timeDisplays.forEach((display) => {
        display.textContent = "0:00";
      });
    }

    startTimerAnimation(duration);
    pausedAt = null;

    if (isActive) {
      scheduleNextSlide(duration);
    }
  };

  const nextSlide = () => {
    pausedAt = null;
    showSlide((currentIndex + 1) % medias.length);
  };

  const prevSlide = () => {
    pausedAt = null;
    showSlide((currentIndex - 1 + medias.length) % medias.length);
  };

  const startAutoSlide = () => {
    if (isActive) return;
    isActive = true;

    if (pausedAt !== null) {
      showSlide(currentIndex, true);
    } else {
      showSlide(currentIndex);
    }
  };

  const stopAutoSlide = () => {
    isActive = false;

    if (totalDuration) {
      const activeMedia = medias[currentIndex];
      if (activeMedia.tagName === "VIDEO") {
        pausedAt = activeMedia.currentTime * 1000;
      } else {
        const computedStyle = window.getComputedStyle(timerBar);
        const currentWidth = parseFloat(computedStyle.width);
        const parentWidth = parseFloat(
          window.getComputedStyle(timerBar.parentElement).width
        );
        const progressPercent = (currentWidth / parentWidth) * 100;
        pausedAt = (progressPercent / 100) * totalDuration;
      }
    }

    if (slideTimeout) {
      clearTimeout(slideTimeout);
      slideTimeout = null;
    }

    medias.forEach((el) => {
      if (el.tagName === "VIDEO") {
        el.pause();
      }
    });

    if (pausedAt !== null && totalDuration) {
      const currentProgressPercent = (pausedAt / totalDuration) * 100;
      timerBar.style.transition = "none";
      timerBar.style.width = `${currentProgressPercent}%`;
    }
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
      <button id="modalCloseBtn" class="modal-close">&times;</button>
      <button id="modalPrev" class="modal-nav-btn modal-nav-left">&#10094;</button>
      <div id="modalSlider" class="modal-slider"></div>
      <button id="modalNext" class="modal-nav-btn modal-nav-right">&#10095;</button>
      <div class="modal-video-controls">
        <div class="video-progress-container">
          <div class="video-progress-bar">
            <div class="video-progress-filled"></div>
          </div>
          <div class="video-time">
            <span class="video-current-time">0:00</span>
            <span class="video-duration">0:00</span>
          </div>
        </div>
      </div>
      <div class="modal-preview">
        <div id="modalPreviewContainer" class="modal-preview-container"></div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  document.getElementById("modalCloseBtn").onclick = () =>
    modal.classList.remove("active");
  document.getElementById("modalPrev").onclick = () => changeModalSlide(-1);
  document.getElementById("modalNext").onclick = () => changeModalSlide(1);

  // Add keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("active")) return;

    if (e.key === "Escape") modal.classList.remove("active");
    if (e.key === "ArrowLeft") changeModalSlide(-1);
    if (e.key === "ArrowRight") changeModalSlide(1);
  });
};

let modalMedias = [],
  modalIndex = 0;

const openModal = (mediaElements) => {
  const container = document.getElementById("modalSlider");
  const previewContainer = document.getElementById("modalPreviewContainer");
  container.innerHTML = "";
  previewContainer.innerHTML = "";
  modalMedias = mediaElements;
  modalIndex = 0;

  // Add main media elements
  mediaElements.forEach((el) => {
    el.classList.remove("active");
    el.classList.add("modal-media");
    container.appendChild(el);

    // Create and add preview thumbnails
    const thumbnail = document.createElement("div");
    thumbnail.className = "modal-thumbnail";

    if (el.tagName === "VIDEO") {
      // Create a canvas element to capture the video thumbnail
      const canvas = document.createElement("canvas");
      const video = el.cloneNode(true);

      // Set up video for thumbnail capture
      video.muted = true;
      video.currentTime = 1; // Skip to 1 second to avoid black frame

      // Once the video data is loaded, capture the thumbnail
      video.addEventListener("loadeddata", () => {
        // Set canvas size to match video dimensions
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Draw the video frame on the canvas
        canvas
          .getContext("2d")
          .drawImage(video, 0, 0, canvas.width, canvas.height);

        // Use the canvas as the thumbnail background
        thumbnail.style.backgroundImage = `url(${canvas.toDataURL()})`;
      });

      // Load the video to trigger the loadeddata event
      video.load();
    } else {
      // For images, use the direct source
      thumbnail.style.backgroundImage = `url(${el.src})`;
    }

    previewContainer.appendChild(thumbnail);

    // Add click event to thumbnails
    thumbnail.addEventListener("click", () => {
      modalIndex = Array.from(previewContainer.children).indexOf(thumbnail);
      showModalSlide(modalIndex);
    });
  });

  document.getElementById("mediaModal").classList.add("active");
  showModalSlide(0);
};

const showModalSlide = (index) => {
  modalMedias.forEach((el, i) => {
    el.classList.toggle("active", i === index);
    if (el.tagName === "VIDEO") {
      if (i === index) {
        el.play();
        setupVideoProgress(el);
      } else {
        el.pause();
        el.currentTime = 0;
      }
    } else {
      // Reset video controls for non-video media
      document.querySelector(".modal-content").classList.remove("has-video");
      const currentTimeEl = document.querySelector(".video-current-time");
      const durationEl = document.querySelector(".video-duration");
      if (currentTimeEl) currentTimeEl.textContent = "0:00";
      if (durationEl) durationEl.textContent = "0:00";
    }
  });

  // Update thumbnails
  const thumbnails = document.querySelectorAll(".modal-thumbnail");
  thumbnails.forEach((thumb, i) => {
    thumb.classList.toggle("active", i === index);
  });
};

const setupVideoProgress = (video) => {
  const modalContent = document.querySelector(".modal-content");
  const progressBar = document.querySelector(".video-progress-bar");
  const progressFilled = document.querySelector(".video-progress-filled");
  const currentTimeEl = document.querySelector(".video-current-time");
  const durationEl = document.querySelector(".video-duration");

  // Show video controls
  modalContent.classList.add("has-video");

  // Update duration immediately if available
  if (video.duration) {
    durationEl.textContent = formatTime(video.duration);
  }

  // Update duration when metadata is loaded
  video.addEventListener("loadedmetadata", () => {
    durationEl.textContent = formatTime(video.duration);
  });

  // Update progress bar and current time as video plays
  video.addEventListener("timeupdate", () => {
    const percent = (video.currentTime / video.duration) * 100;
    progressFilled.style.width = `${percent}%`;
    currentTimeEl.textContent = formatTime(video.currentTime);
    durationEl.textContent = formatTime(video.duration); // Mise à jour continue
  });

  // Click handling for progress bar
  progressBar.addEventListener("click", (e) => {
    const progressRect = progressBar.getBoundingClientRect();
    const percent = (e.clientX - progressRect.left) / progressRect.width;
    video.currentTime = percent * video.duration;
  });
};

const changeModalSlide = (delta) => {
  modalIndex = (modalIndex + delta + modalMedias.length) % modalMedias.length;
  showModalSlide(modalIndex);
};

export { initProjects };
