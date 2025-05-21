/**
 * Gestion de la navigation et du menu mobile
 */

const initNavigation = () => {
  const navbar = document.querySelector(".navbar");
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const links = document.querySelectorAll(".nav-links a");

  // Gestion du menu hamburger pour mobile
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    hamburger.classList.toggle("active");
  });

  // Fermer le menu mobile lorsqu'un lien est cliqué
  links.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      hamburger.classList.remove("active");
    });
  });

  // Changement de style de la navbar au scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Défilement fluide pour les liens d'ancrage
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Calculer la position de défilement avec un petit décalage pour la navbar
        const navbarHeight = navbar.offsetHeight;
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Activer le lien de navigation en fonction de la section visible
  const sections = document.querySelectorAll("section");

  const activateNavOnScroll = () => {
    const scrollPosition = window.scrollY;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - navbar.offsetHeight - 20;
      const sectionBottom = sectionTop + section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        document
          .querySelector(`.nav-links a[href="#${sectionId}"]`)
          .classList.add("active");
      } else {
        document
          .querySelector(`.nav-links a[href="#${sectionId}"]`)
          .classList.remove("active");
      }
    });
  };

  window.addEventListener("scroll", activateNavOnScroll);
};

// Ajouter des styles pour le menu mobile et les liens actifs
const injectNavigationStyles = () => {
  const style = document.createElement("style");
  style.textContent = `
      /* Styles pour le menu hamburger */
      @media (max-width: 768px) {
        .nav-links {
          position: fixed;
          top: 70px;
          right: -100%;
          width: 70%;
          height: calc(100vh - 70px);
          background-color: var(--color-bg-secondary);
          flex-direction: column;
          justify-content: flex-start;
          padding-top: 2rem;
          transition: all 0.5s ease;
          box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
          z-index: 99;
        }
        
        .nav-links.active {
          right: 0;
        }
        
        .nav-links a {
          margin: 1.5rem 0;
          font-size: 1.2rem;
        }
        
        .hamburger {
          display: flex;
          flex-direction: column;
        }
        
        .hamburger.active div:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }
        
        .hamburger.active div:nth-child(2) {
          opacity: 0;
        }
        
        .hamburger.active div:nth-child(3) {
          transform: rotate(-45deg) translate(5px, -5px);
        }
      }
      
      /* Style pour la navbar au défilement */
      .navbar.scrolled {
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(10px);
        background-color: var(--color-bg-secondary);
      }
      
      /* Style pour le lien actif */
      .nav-links a.active {
        color: var(--color-orange);
      }
      
      .nav-links a.active::after {
        width: 100%;
      }
    `;

  document.head.appendChild(style);
};

export { initNavigation, injectNavigationStyles };
