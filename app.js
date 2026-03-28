const yearElement = document.querySelector("#year");
if (yearElement) {
  yearElement.textContent = String(new Date().getFullYear());
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll(".reveal").forEach((element, index) => {
  element.style.transitionDelay = `${index * 85}ms`;
  revealObserver.observe(element);
});

const countNodes = document.querySelectorAll("[data-count]");
const countObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting || entry.target.dataset.active === "true") {
        return;
      }

      const targetValue = Number(entry.target.getAttribute("data-count") || "0");
      const startTime = performance.now();
      const duration = 1500;

      const animateCount = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const currentValue = Math.floor(progress * targetValue);
        entry.target.textContent = currentValue.toLocaleString();

        if (progress < 1) {
          requestAnimationFrame(animateCount);
        } else {
          entry.target.textContent = targetValue.toLocaleString();
          entry.target.dataset.active = "true";
        }
      };

      requestAnimationFrame(animateCount);
    });
  },
  { threshold: 0.5 }
);

countNodes.forEach((node) => countObserver.observe(node));

const waitlistForm = document.querySelector(".waitlist-form");
const formMessage = document.querySelector(".form-message");

if (waitlistForm && formMessage) {
  waitlistForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const emailField = waitlistForm.querySelector("input[type='email']");
    if (!emailField || !(emailField instanceof HTMLInputElement)) {
      return;
    }

    if (!emailField.value.trim() || !emailField.checkValidity()) {
      formMessage.textContent = "Please enter a valid email address.";
      formMessage.style.color = "#a43b14";
      return;
    }

    formMessage.textContent = "You are on the list. We will contact you soon.";
    formMessage.style.color = "#145ee2";
    waitlistForm.reset();
  });
}
