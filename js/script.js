"use strict";

/*
==================================================
NS TRADERS WHATSAPP SETTINGS
==================================================

Replace this number with owner's actual WhatsApp number.

India example:
919876543210

Correct:
919876543210

Wrong:
+91 98765 43210
91-98765-43210
+919876543210
==================================================
*/

const whatsappNumber =
  "91XXXXXXXXXX";

const companyName =
  "NS Traders";

const generalMessage =
  "Hello NS Traders, I need details about your construction materials and services.";

/*
==================================================
WHATSAPP FUNCTIONS
==================================================
*/

function whatsappNumberReady() {
  return (
    whatsappNumber !==
    "91XXXXXXXXXX"
  );
}

function createWhatsAppLink(message) {
  return (
    "https://wa.me/" +
    whatsappNumber +
    "?text=" +
    encodeURIComponent(message)
  );
}

function openWhatsApp(message) {
  if (!whatsappNumberReady()) {
    window.alert(
      "Please replace the WhatsApp number in js/script.js first."
    );

    return;
  }

  const link =
    createWhatsAppLink(message);

  window.open(
    link,
    "_blank",
    "noopener,noreferrer"
  );
}

/*
==================================================
GENERAL WHATSAPP BUTTONS
==================================================
*/

const generalButtons = [
  document.getElementById("navWhatsapp"),
  document.getElementById("heroWhatsapp"),
  document.getElementById("contactWhatsapp"),
  document.getElementById("floatWhatsapp")
];

generalButtons.forEach(
  function (button) {
    if (!button) {
      return;
    }

    button.addEventListener(
      "click",
      function (event) {
        event.preventDefault();

        openWhatsApp(
          generalMessage
        );
      }
    );
  }
);

/*
==================================================
PRODUCT BUTTONS
==================================================
*/

const productButtons =
  document.querySelectorAll(
    ".product-whatsapp"
  );

productButtons.forEach(
  function (button) {
    button.addEventListener(
      "click",
      function (event) {
        event.preventDefault();

        const productName =
          button.dataset.product ||
          "construction material";

        const productMessage =
          "Hello " +
          companyName +
          ",\n\n" +
          "I need today's price for:\n" +
          productName +
          "\n\n" +
          "Please share availability, quantity and delivery details.";

        openWhatsApp(
          productMessage
        );
      }
    );
  }
);

/*
==================================================
SERVICE BUTTONS
==================================================
*/

const serviceButtons =
  document.querySelectorAll(
    ".service-whatsapp"
  );

serviceButtons.forEach(
  function (button) {
    button.addEventListener(
      "click",
      function (event) {
        event.preventDefault();

        const serviceName =
          button.dataset.service ||
          "your service";

        const serviceMessage =
          "Hello " +
          companyName +
          ",\n\n" +
          "I need details about:\n" +
          serviceName +
          "\n\n" +
          "Please share availability and quotation details.";

        openWhatsApp(
          serviceMessage
        );
      }
    );
  }
);

/*
==================================================
CONTACT FORM TO WHATSAPP
==================================================
*/

const contactForm =
  document.getElementById(
    "contactForm"
  );

const formStatus =
  document.getElementById(
    "formStatus"
  );

if (contactForm) {
  contactForm.addEventListener(
    "submit",
    function (event) {
      event.preventDefault();

      const formData =
        new FormData(contactForm);

      const name =
        String(
          formData.get("name") || ""
        ).trim();

      const phone =
        String(
          formData.get("phone") || ""
        ).trim();

      const email =
        String(
          formData.get("email") || ""
        ).trim();

      const requirement =
        String(
          formData.get("requirement") || ""
        ).trim();

      const message =
        String(
          formData.get("message") || ""
        ).trim();

      if (
        !name ||
        !phone ||
        !requirement ||
        !message
      ) {
        if (formStatus) {
          formStatus.textContent =
            "Please fill all required fields.";

          formStatus.className =
            "form-status error";
        }

        return;
      }

      if (!whatsappNumberReady()) {
        if (formStatus) {
          formStatus.textContent =
            "Please replace the WhatsApp number in js/script.js first.";

          formStatus.className =
            "form-status error";
        }

        return;
      }

      const enquiryMessage =
        "Hello " +
        companyName +
        ",\n\n" +
        "New Customer Enquiry\n" +
        "====================\n\n" +
        "Name: " +
        name +
        "\n" +
        "Phone: " +
        phone +
        "\n" +
        "Email: " +
        (
          email ||
          "Not provided"
        ) +
        "\n" +
        "Requirement: " +
        requirement +
        "\n" +
        "Message: " +
        message +
        "\n\n" +
        "Please contact me with quotation details.";

      if (formStatus) {
        formStatus.textContent =
          "Opening WhatsApp...";

        formStatus.className =
          "form-status success";
      }

      openWhatsApp(
        enquiryMessage
      );

      contactForm.reset();

      window.setTimeout(
        function () {
          if (formStatus) {
            formStatus.textContent =
              "";

            formStatus.className =
              "form-status";
          }
        },
        4000
      );
    }
  );
}

/*
==================================================
MOBILE MENU
==================================================
*/

const menuButton =
  document.getElementById(
    "menuButton"
  );

const navLinks =
  document.getElementById(
    "navLinks"
  );

if (menuButton && navLinks) {
  menuButton.addEventListener(
    "click",
    function () {
      const menuIsOpen =
        navLinks.classList.toggle(
          "active"
        );

      menuButton.setAttribute(
        "aria-expanded",
        String(menuIsOpen)
      );

      menuButton.setAttribute(
        "aria-label",
        menuIsOpen
          ? "Close navigation menu"
          : "Open navigation menu"
      );

      menuButton.textContent =
        menuIsOpen ? "×" : "☰";
    }
  );

  /*
    Important:
    Admin link normal navigation.
    No preventDefault() here.
  */
  navLinks
    .querySelectorAll("a")
    .forEach(
      function (link) {
        link.addEventListener(
          "click",
          function () {
            navLinks.classList.remove(
              "active"
            );

            menuButton.setAttribute(
              "aria-expanded",
              "false"
            );

            menuButton.setAttribute(
              "aria-label",
              "Open navigation menu"
            );

            menuButton.textContent =
              "☰";
          }
        );
      }
    );
}

/*
==================================================
CLOSE MOBILE MENU OUTSIDE
==================================================
*/

document.addEventListener(
  "click",
  function (event) {
    if (
      !menuButton ||
      !navLinks
    ) {
      return;
    }

    const clickedInsideNav =
      navLinks.contains(
        event.target
      );

    const clickedMenuButton =
      menuButton.contains(
        event.target
      );

    const isMenuOpen =
      navLinks.classList.contains(
        "active"
      );

    if (
      isMenuOpen &&
      !clickedInsideNav &&
      !clickedMenuButton
    ) {
      navLinks.classList.remove(
        "active"
      );

      menuButton.setAttribute(
        "aria-expanded",
        "false"
      );

      menuButton.setAttribute(
        "aria-label",
        "Open navigation menu"
      );

      menuButton.textContent =
        "☰";
    }
  }
);

/*
==================================================
CALL BUTTON
==================================================
*/

const floatCall =
  document.getElementById(
    "floatCall"
  );

if (floatCall) {
  floatCall.addEventListener(
    "click",
    function (event) {
      event.preventDefault();

      if (!whatsappNumberReady()) {
        window.alert(
          "Please replace the WhatsApp number in js/script.js first."
        );

        return;
      }

      window.location.href =
        "tel:+" +
        whatsappNumber;
    }
  );
}

/*
==================================================
PRODUCTS FLOATING BUTTON
==================================================
*/

const floatProducts =
  document.getElementById(
    "floatProducts"
  );

if (floatProducts) {
  floatProducts.addEventListener(
    "click",
    function (event) {
      event.preventDefault();

      const productsSection =
        document.getElementById(
          "products"
        );

      if (productsSection) {
        productsSection.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    }
  );
}

/*
==================================================
BACKGROUND VIDEO
==================================================
*/

const heroVideo =
  document.querySelector(
    ".hero-video"
  );

if (heroVideo) {
  heroVideo.muted = true;

  const playPromise =
    heroVideo.play();

  if (
    playPromise &&
    typeof playPromise.catch ===
      "function"
  ) {
    playPromise.catch(
      function () {
        console.log(
          "Background video autoplay was blocked."
        );
      }
    );
  }
}

/*
==================================================
SCROLL REVEAL
==================================================
*/

const revealItems =
  document.querySelectorAll(
    ".reveal"
  );

if (
  "IntersectionObserver" in window
) {
  const revealObserver =
    new IntersectionObserver(
      function (
        entries,
        observer
      ) {
        entries.forEach(
          function (entry) {
            if (
              entry.isIntersecting
            ) {
              entry.target.classList.add(
                "show"
              );

              observer.unobserve(
                entry.target
              );
            }
          }
        );
      },
      {
        threshold: 0.12
      }
    );

  revealItems.forEach(
    function (item) {
      revealObserver.observe(item);
    }
  );
} else {
  revealItems.forEach(
    function (item) {
      item.classList.add(
        "show"
      );
    }
  );
}

/*
==================================================
GALLERY LIGHTBOX
==================================================
*/

const galleryImages =
  document.querySelectorAll(
    ".gallery-item img"
  );

const lightbox =
  document.getElementById(
    "lightbox"
  );

const lightboxImage =
  document.getElementById(
    "lightboxImage"
  );

const lightboxClose =
  document.getElementById(
    "lightboxClose"
  );

function closeLightbox() {
  if (!lightbox) {
    return;
  }

  lightbox.classList.remove(
    "active"
  );

  document.body.classList.remove(
    "lightbox-open"
  );

  if (lightboxImage) {
    lightboxImage.src =
      "";
  }
}

galleryImages.forEach(
  function (image) {
    image.addEventListener(
      "click",
      function () {
        if (
          !lightbox ||
          !lightboxImage
        ) {
          return;
        }

        lightboxImage.src =
          image.currentSrc ||
          image.src;

        lightboxImage.alt =
          image.alt ||
          "NS Traders gallery image";

        lightbox.classList.add(
          "active"
        );

        document.body.classList.add(
          "lightbox-open"
        );
      }
    );
  }
);

if (lightboxClose) {
  lightboxClose.addEventListener(
    "click",
    closeLightbox
  );
}

if (lightbox) {
  lightbox.addEventListener(
    "click",
    function (event) {
      if (
        event.target === lightbox
      ) {
        closeLightbox();
      }
    }
  );
}

document.addEventListener(
  "keydown",
  function (event) {
    if (event.key === "Escape") {
      closeLightbox();
    }
  }
);

/*
==================================================
CURRENT YEAR
==================================================
*/

const currentYear =
  document.getElementById(
    "currentYear"
  );

if (currentYear) {
  currentYear.textContent =
    new Date().getFullYear();
}
