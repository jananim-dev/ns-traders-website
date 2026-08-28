"use strict";


const whatsappNumber = "918940907122";
const callNumber = "6380808606";
const companyName = "NS Traders";
const generalMessage = "Hello NS Traders, I need details about your construction materials and services.";

function whatsappNumberReady() {
  return whatsappNumber !== "91XXXXXXXXXX";
}

function createWhatsAppLink(message) {
  return "https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(message);
}

function openWhatsApp(message) {
  if (!whatsappNumberReady()) {
    window.alert("Please replace the WhatsApp number in js/script.js first.");
    return;
  }
  const link = createWhatsAppLink(message);
  window.open(link, "_blank", "noopener,noreferrer");
}

const generalButtons = [
  document.getElementById("navWhatsapp"),
  document.getElementById("heroWhatsapp"),
  document.getElementById("contactWhatsapp"),
  document.getElementById("floatWhatsapp")
];

generalButtons.forEach(function (button) {
  if (!button) return;
  button.addEventListener("click", function (event) {
    event.preventDefault();
    openWhatsApp(generalMessage);
  });
});

const productButtons = document.querySelectorAll(".product-whatsapp");

productButtons.forEach(function (button) {
  button.addEventListener("click", function (event) {
    event.preventDefault();
    const productName = button.dataset.product || "construction material";
    const productMessage = "Hello " + companyName + ",\n\nI need today's price for:\n" + productName + "\n\nPlease share availability, quantity and delivery details.";
    openWhatsApp(productMessage);
  });
});

const serviceButtons = document.querySelectorAll(".service-whatsapp");

serviceButtons.forEach(function (button) {
  button.addEventListener("click", function (event) {
    event.preventDefault();
    const serviceName = button.dataset.service || "your service";
    const serviceMessage = "Hello " + companyName + ",\n\nI need details about:\n" + serviceName + "\n\nPlease share availability and quotation details.";
    openWhatsApp(serviceMessage);
  });
});

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const name = String(formData.get("name") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const requirement = String(formData.get("requirement") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (!name || !phone || !requirement || !message) {
      if (formStatus) {
        formStatus.textContent = "Please fill all required fields.";
        formStatus.className = "form-status error";
      }
      return;
    }

    if (!whatsappNumberReady()) {
      if (formStatus) {
        formStatus.textContent = "Please replace the WhatsApp number in js/script.js first.";
        formStatus.className = "form-status error";
      }
      return;
    }

    const enquiryMessage = "Hello " + companyName + ",\n\nNew Customer Enquiry\n====================\n\nName: " + name + "\nPhone: " + phone + "\nEmail: " + (email || "Not provided") + "\nRequirement: " + requirement + "\nMessage: " + message + "\n\nPlease contact me with quotation details.";

    if (formStatus) {
      formStatus.textContent = "Opening WhatsApp...";
      formStatus.className = "form-status success";
    }

    openWhatsApp(enquiryMessage);
    contactForm.reset();

    window.setTimeout(function () {
      if (formStatus) {
        formStatus.textContent = "";
        formStatus.className = "form-status";
      }
    }, 4000);
  });
}

const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");

if (menuButton && navLinks) {
  menuButton.addEventListener("click", function () {
    const menuIsOpen = navLinks.classList.toggle("active");
    menuButton.setAttribute("aria-expanded", String(menuIsOpen));
    menuButton.setAttribute("aria-label", menuIsOpen ? "Close navigation menu" : "Open navigation menu");
    menuButton.textContent = menuIsOpen ? "×" : "☰";
  });

  navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      navLinks.classList.remove("active");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation menu");
      menuButton.textContent = "☰";
    });
  });
}

document.addEventListener("click", function (event) {
  if (!menuButton || !navLinks) return;
  const clickedInsideNav = navLinks.contains(event.target);
  const clickedMenuButton = menuButton.contains(event.target);
  const isMenuOpen = navLinks.classList.contains("active");
  if (isMenuOpen && !clickedInsideNav && !clickedMenuButton) {
    navLinks.classList.remove("active");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation menu");
    menuButton.textContent = "☰";
  }
});

const floatCall = document.getElementById("floatCall");

if (floatCall) {
  floatCall.addEventListener("click", function (event) {
    event.preventDefault();
    if (!whatsappNumberReady()) {
      window.alert("Please replace the WhatsApp number in js/script.js first.");
      return;
    }
    window.location.href = "tel:+" + whatsappNumber;
  });
}

const floatProducts = document.getElementById("floatProducts");

if (floatProducts) {
  floatProducts.addEventListener("click", function (event) {
    event.preventDefault();
    const productsSection = document.getElementById("products");
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
}

const heroVideo = document.querySelector(".hero-video");

if (heroVideo) {
  heroVideo.muted = true;
  const playPromise = heroVideo.play();
  if (playPromise && typeof playPromise.catch === "function") {
    playPromise.catch(function () {
      console.log("Background video autoplay was blocked.");
    });
  }
}

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach(function (item) {
    revealObserver.observe(item);
  });
} else {
  revealItems.forEach(function (item) {
    item.classList.add("show");
  });
}

const galleryImages = document.querySelectorAll(".gallery-item img");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove("active");
  document.body.classList.remove("lightbox-open");
  if (lightboxImage) {
    lightboxImage.src = "";
  }
}

galleryImages.forEach(function (image) {
  image.addEventListener("click", function () {
    if (!lightbox || !lightboxImage) return;
    lightboxImage.src = image.currentSrc || image.src;
    lightboxImage.alt = image.alt || "NS Traders gallery image";
    lightbox.classList.add("active");
    document.body.classList.add("lightbox-open");
  });
});

if (lightboxClose) {
  lightboxClose.addEventListener("click", closeLightbox);
}

if (lightbox) {
  lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });
}

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeLightbox();
  }
});

const currentYear = document.getElementById("currentYear");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

const adminButton = document.getElementById('adminButton');

if (adminButton) {
  adminButton.addEventListener('click', function(event) {
    event.preventDefault();
    const password = prompt('Enter Admin Password:');
    if (password === 'admin123') {
      window.location.href = 'upload-poster.html';
    } else if (password !== null) {
      alert('Wrong password! Please try again.');
    }
  });
}

async function loadPostersOnMainPage() {
  const postersGrid = document.getElementById('postersGrid');
  if (!postersGrid) return;

  postersGrid.innerHTML = '<p style="text-align: center; color: var(--text-muted); grid-column: 1/-1;">Loading...</p>';

  let posters = [];
  try {
    posters = await nsFetchPosters();
  } catch (err) {
    postersGrid.innerHTML = '<p style="text-align: center; color: var(--text-muted); grid-column: 1/-1;">No posters uploaded yet.</p>';
    return;
  }

  posters = (posters || []).filter(function (poster) {
    return poster.status !== 'Inactive';
  });

  if (posters.length === 0) {
    postersGrid.innerHTML = '<p style="text-align: center; color: var(--text-muted); grid-column: 1/-1;">No posters uploaded yet.</p>';
    return;
  }
  
  let postersHTML = '';
  posters.forEach(function(poster) {
    const categoryColor = poster.category === 'Offer' ? '#128c45' : poster.category === 'Product' ? '#353ebb' : poster.category === 'Service' ? '#0b2a4a' : '#170433';
    const imageSrc = poster.imageUrl || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23dce5ec" width="400" height="300"/%3E%3Ctext fill="%236b7785" font-family="Arial" font-size="20" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3ENo Image%3C/text%3E%3C/svg%3E';
    
    postersHTML += '<article class="poster-display-card reveal"><div class="poster-display-image"><img src="' + imageSrc + '" alt="' + poster.title + '"></div><div class="poster-display-content"><h3 class="poster-display-title">' + poster.title + '</h3><span class="poster-display-category" style="background-color: ' + categoryColor + '">' + poster.category + '</span><p class="poster-display-details">' + poster.details + '</p><div class="poster-display-dates">' + (poster.startDate ? 'From: ' + poster.startDate : '') + (poster.endDate ? ' | To: ' + poster.endDate : '') + '</div></div></article>';
  });
  
  postersGrid.innerHTML = postersHTML;
  
  setTimeout(() => {
    const revealItems = postersGrid.querySelectorAll('.reveal');
    revealItems.forEach(item => item.classList.add('show'));
  }, 100);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadPostersOnMainPage);
} else {
  loadPostersOnMainPage();
}
