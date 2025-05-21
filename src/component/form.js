/**
 * Gestion du formulaire de contact
 */

const initContactForm = () => {
  const contactForm = document.getElementById("contactForm");

  // Validation et envoi du formulaire
  if (contactForm) {
    contactForm.addEventListener("submit", handleFormSubmit);
  }
};

// Gérer la soumission du formulaire
const handleFormSubmit = (e) => {
  e.preventDefault();

  // Récupérer les champs du formulaire
  const formElements = e.target.elements;
  const name = formElements[0].value.trim();
  const email = formElements[1].value.trim();
  const subject = formElements[2].value.trim();
  const message = formElements[3].value.trim();

  // Vérifier si tous les champs requis sont remplis
  if (!name || !email || !message) {
    showFormNotification(
      "Veuillez remplir tous les champs obligatoires.",
      "error"
    );
    return;
  }

  // Vérifier le format de l'email
  if (!isValidEmail(email)) {
    showFormNotification("Veuillez entrer une adresse email valide.", "error");
    return;
  }

  // Simuler l'envoi du formulaire
  showFormNotification(
    "Formulaire envoyé avec succès ! Je vous contacterai bientôt.",
    "success"
  );

  // Réinitialiser le formulaire
  e.target.reset();
};

// Vérifie si l'email est dans un format valide
const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Afficher une notification sous le formulaire
const showFormNotification = (message, type = "success") => {
  let notif = document.querySelector(".form-notification");

  if (!notif) {
    notif = document.createElement("div");
    notif.classList.add("form-notification");
    e.target.parentNode.appendChild(notif);
  }

  notif.textContent = message;
  notif.style.color = type === "success" ? "green" : "red";

  // Disparition automatique après 5 secondes
  setTimeout(() => {
    notif.textContent = "";
  }, 5000);
};

export { initContactForm };
