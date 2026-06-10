/* ==========================================================
   Le Petit Moka — script principal
   Fonctionnalités :
   1. Menu burger (mobile)
   2. Compteurs animés (page d'accueil)
   3. Filtres de la carte (page menu)
   4. Validation du formulaire de contact
   ========================================================== */

"use strict";

/* ===== 1. Menu burger ===== */
const burgerBtn = document.getElementById("burger-btn");
const mainNav = document.getElementById("main-nav");

if (burgerBtn && mainNav) {
    burgerBtn.addEventListener("click", () => {
        const isOpen = mainNav.classList.toggle("open");
        burgerBtn.classList.toggle("open", isOpen);
        burgerBtn.setAttribute("aria-expanded", String(isOpen));
    });
}

/* ===== 2. Compteurs animés =====
   Les <span class="stat-number" data-target="..."> comptent
   de 0 jusqu'à leur valeur cible quand ils entrent à l'écran. */
const statNumbers = document.querySelectorAll(".stat-number");

function animateCounter(element) {
    const target = Number(element.dataset.target);
    const duration = 1500; // millisecondes
    const start = performance.now();

    function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        element.textContent = Math.floor(progress * target).toLocaleString("fr-FR");
        if (progress < 1) {
            requestAnimationFrame(tick);
        }
    }
    requestAnimationFrame(tick);
}

if (statNumbers.length > 0) {
    // IntersectionObserver : déclenche l'animation à l'apparition à l'écran
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target); // une seule fois
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach((el) => observer.observe(el));
}

/* ===== 3. Filtres de la carte ===== */
const filterButtons = document.querySelectorAll(".filter-btn");
const menuItems = document.querySelectorAll(".menu-item");

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const filter = button.dataset.filter;

        // Met à jour le bouton actif
        filterButtons.forEach((b) => b.classList.remove("active"));
        button.classList.add("active");

        // Affiche / cache les plats selon leur catégorie
        menuItems.forEach((item) => {
            const matches = filter === "all" || item.dataset.category === filter;
            item.classList.toggle("hidden", !matches);
        });
    });
});

/* ===== 4. Validation du formulaire de contact ===== */
const contactForm = document.getElementById("contact-form");

if (contactForm) {
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");
    const charCount = document.getElementById("char-count");
    const successMessage = document.getElementById("form-success");

    // Affiche ou efface l'erreur d'un champ
    function setError(input, errorId, message) {
        const errorElement = document.getElementById(errorId);
        errorElement.textContent = message;
        input.classList.toggle("invalid", message !== "");
    }

    // Règles de validation — renvoient "" si le champ est valide
    function validateName() {
        const value = nameInput.value.trim();
        if (value === "") return "Le nom est obligatoire.";
        if (value.length < 2) return "Le nom doit contenir au moins 2 caractères.";
        return "";
    }

    function validateEmail() {
        const value = emailInput.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (value === "") return "L'adresse e-mail est obligatoire.";
        if (!emailPattern.test(value)) return "L'adresse e-mail n'est pas valide.";
        return "";
    }

    function validateMessage() {
        const value = messageInput.value.trim();
        if (value === "") return "Le message est obligatoire.";
        if (value.length < 10) return "Le message doit contenir au moins 10 caractères.";
        return "";
    }

    // Compteur de caractères du message, mis à jour à chaque frappe
    messageInput.addEventListener("input", () => {
        charCount.textContent = `${messageInput.value.length} / 500`;
    });

    // Validation "au fil de l'eau" quand on quitte un champ
    nameInput.addEventListener("blur", () => setError(nameInput, "error-name", validateName()));
    emailInput.addEventListener("blur", () => setError(emailInput, "error-email", validateEmail()));
    messageInput.addEventListener("blur", () => setError(messageInput, "error-message", validateMessage()));

    // Validation complète à la soumission
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault(); // pas de rechargement de page (site de démo)

        const nameError = validateName();
        const emailError = validateEmail();
        const messageError = validateMessage();

        setError(nameInput, "error-name", nameError);
        setError(emailInput, "error-email", emailError);
        setError(messageInput, "error-message", messageError);

        const formIsValid = nameError === "" && emailError === "" && messageError === "";

        if (formIsValid) {
            // Dans un vrai site, on enverrait les données à un serveur ici (fetch / POST)
            successMessage.hidden = false;
            contactForm.reset();
            charCount.textContent = "0 / 500";

            // Cache le message de succès après 5 secondes
            setTimeout(() => {
                successMessage.hidden = true;
            }, 5000);
        } else {
            successMessage.hidden = true;
        }
    });
}
