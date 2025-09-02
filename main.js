const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const menuToggle = document.getElementById("menu-toggle");
const deodorizerCheckbox = document.getElementById("deodorizer");
const deodorizerSection = document.getElementById("deodorizer-section");
const messageField = document.getElementById("message");

// Variables to track selected service/price
let selectedService = "";
let selectedPrice = "";
let basePrice = 0;

// Toggle sidebar
menuToggle.addEventListener("click", () => {
  sidebar.classList.toggle("active");
  overlay.classList.toggle("active");
});

// Close sidebar when clicking overlay
overlay.addEventListener("click", () => {
  sidebar.classList.remove("active");
  overlay.classList.remove("active");
});

// Navigation links + CTA button
document.querySelectorAll("#sidebar ul li, .cta-btn").forEach(item => {
  item.addEventListener("click", () => {
    const sectionId = item.getAttribute("data-section");
    if (sectionId) {
      document.querySelectorAll("main section").forEach(sec => sec.classList.remove("active"));
      document.getElementById(sectionId).classList.add("active");

      sidebar.classList.remove("active");
      overlay.classList.remove("active");

      // Reset deodorizer if opening contact normally
      if (sectionId === "contact") {
        deodorizerSection.style.display = "none";
        deodorizerCheckbox.checked = false;
      }
    }
  });
});

// Pricing card → open form with service
document.querySelectorAll('.pricing-card').forEach(card => {
  card.addEventListener('click', () => {
    selectedService = card.getAttribute('data-service');
    selectedPrice = card.getAttribute('data-price');
    basePrice = parseInt(selectedPrice); // extract number

    // Switch to contact
    document.querySelectorAll("main section").forEach(sec => sec.classList.remove("active"));
    document.getElementById("contact").classList.add("active");

    // Prefill message
    messageField.value = `Hello, I am interested in the ${selectedService} plan ($${basePrice}${selectedPrice.includes("Month") ? " per Month" : ""}). Please provide more details.`;

    // Show deodorizer option
    deodorizerSection.style.display = "flex";
  });
});

// Update message when deodorizer toggled
deodorizerCheckbox.addEventListener("change", () => {
  if (!selectedService) return; // Only works if came from pricing

  let total = basePrice;
  if (deodorizerCheckbox.checked) {
    total += 15;
    messageField.value = `Hello, I am interested in the ${selectedService} plan ($${total}${selectedPrice.includes("Month") ? " per Month" : ""}) with the Pet & Lawn Safe Deodorizer (+$15 per service). Please provide more details.`;
  } else {
    messageField.value = `Hello, I am interested in the ${selectedService} plan ($${basePrice}${selectedPrice.includes("Month") ? " per Month" : ""}). Please provide more details.`;
  }
});

// Contact form submit
document.getElementById("contact-form").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Thank you for contacting Bee Scooping! We’ll buzz back to you soon.");
  e.target.reset();

  // Reset deodorizer
  deodorizerSection.style.display = "none";
  deodorizerCheckbox.checked = false;
  selectedService = "";
  selectedPrice = "";
  basePrice = 0;
});
