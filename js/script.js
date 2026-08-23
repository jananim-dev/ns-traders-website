"use strict";

/*
  IMPORTANT:
  Replace this with the client's actual WhatsApp number.
  Country code included, without + and spaces.
*/
const whatsappNumber = "91XXXXXXXXXX";

const generalMessage =
  "Hello NS Traders, I need details about your construction materials and services.";

function createWhatsAppLink(message) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/* General WhatsApp Buttons */
const generalWhatsappButtons = [
  document.getElementById("navWhatsapp"),
  document.getElementById("heroWhatsapp"),
  document.getElementById("contactWhatsapp"),
  document.getElementById("floatWhatsapp")
];

generalWhatsappButtons.forEach((button) => {
  if (button) {
    button.href = createWhatsAppLink(generalMessage);
  }
});

/* Floating Call Button */
const floatCallButton = document.getElementById("floatCall");

if (floatCallButton) {
  /*
    Uses the same number as WhatsApp for now.
    If client gives a separate call number, replace whatsappNumber
    below with that number.
  */
  floatCallButton.href = `tel:+${whatsappNumber}`;
}

/* Product WhatsApp Buttons */
const productButtons = document.querySelectorAll(".product-whatsapp");

productButtons.forEach((button) => {
  const productName = button.dataset.product;

  const message =
    `Hello NS Traders, I need today's price for ${productName}. ` +
    "Please share availability, quantity and delivery details.";

  button.href = createWhatsAppLink(message);
});

/* Service WhatsApp Buttons */
const serviceButtons = document.querySelectorAll(".service-whatsapp");

serviceButtons.forEach((button) => {
  const serviceName = button.dataset.service;

  const message =
    `Hello NS Traders, I need details about ${serviceName}. ` +
    "Please share availability and quotation details.";

  button.href = createWhatsAppLink(message);
});

/* Mobile Menu */
const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");

if (menuButton && navLinks) {
  menuButton.addEventListener("click", () => {
    const menuIsOpen = navLinks.classList.toggle("active");

    menuButton.setAttribute(
      "aria-expanded",
      String(menuIsOpen)
    );

    menuButton.setAttribute(
      "aria-label",
      menuIsOpen ? "Close navigation menu" : "Open navigation menu"
    );

    menuButton.textContent = menuIsOpen ? "×" : "☰";
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");

      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute(
        "aria-label",
        "Open navigation menu"
      );

      menuButton.textContent = "☰";
    });
  });
}

/* Close Mobile Menu When Clicking Outside */
document.addEventListener("click", (event) => {
  if (!menuButton || !navLinks) {
    return;
  }

  const clickedInsideMenu = navLinks.contains(event.target);
  const clickedMenuButton = menuButton.contains(event.target);

  if (
    !clickedInsideMenu &&
    !clickedMenuButton &&
    navLinks.classList.contains("active")
  ) {
    navLinks.classList.remove("active");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.textContent = "☰";
  }
});

/* Background Video */
const heroVideo = document.querySelector(".hero-video");

if (heroVideo) {
  heroVideo.muted = true;

  heroVideo.play().catch(() => {
    /*
      If autoplay is blocked, poster image remains visible.
    */
    console.log("Background video autoplay was blocked.");
  });
}

/* Scroll Reveal */
const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  revealItems.forEach((item) => {
    revealObserver.observe(item);
  });
} else {
  revealItems.forEach((item) => {
    item.classList.add("show");
  });
}

/* Gallery Lightbox */
const galleryImages = document.querySelectorAll(".gallery-item img");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");

function closeLightbox() {
  if (lightbox) {
    lightbox.classList.remove("active");
    document.body.classList.remove("lightbox-open");
  }
}

galleryImages.forEach((image) => {
  image.addEventListener("click", () => {
    if (!lightbox || !lightboxImage) {
      return;
    }

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;

    lightbox.classList.add("active");
    document.body.classList.add("lightbox-open");
  });
});

if (lightboxClose) {
  lightboxClose.addEventListener("click", closeLightbox);
}

if (lightbox) {
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeLightbox();
  }
});

/* Current Year */
const currentYear = document.getElementById("currentYear");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}
