// Navigation function for buttons
function navigateTo(url) {
  if (url && url !== '#') {
    console.log('Navigating to:', url); // Debug log
    window.location.href = url;
  } else {
    console.log('Invalid URL or #:', url); // Debug log
  }
}

// Set active button based on current page
function setActiveNavButton() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navButtons = document.querySelectorAll('.nav-btn');

  navButtons.forEach(button => {
    button.classList.remove('active');
    const buttonText = button.textContent.trim().toLowerCase();

    // Set active button based on current page
    if (currentPage === 'index.html' && buttonText === 'home') {
      button.classList.add('active');
    } else if (currentPage === 'fasilitas.html' && buttonText === 'facilities') {
      button.classList.add('active');
    } else if (currentPage === 'tentang_kami.html' && buttonText === 'about us') {
      button.classList.add('active');
    } else if (currentPage === 'wisata_budaya.html' && buttonText === 'culture') {
      button.classList.add('active');
    } else if (currentPage === 'informasi.html' && buttonText === 'village information') {
      button.classList.add('active');
    } else if (currentPage === 'galeri.html' && buttonText === 'gallery') {
      button.classList.add('active');
    }
  });
}

// ripple efec and navigation combined
function addRippleEffectAndNavigation() {
  const buttons = document.querySelectorAll('.nav-btn, .dropdown-item');

  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      console.log('Button clicked:', this.textContent.trim()); // Debug log

      // Get the navigation URL from data attribute
      const url = this.getAttribute('data-nav-url');
      console.log('URL from data attribute:', url); // Debug log

      // Create ripple effect
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');

      // Add ripple styles
      ripple.style.position = 'absolute';
      ripple.style.borderRadius = '50%';
      ripple.style.background = 'rgba(255, 255, 255, 0.6)';
      ripple.style.transform = 'scale(0)';
      ripple.style.animation = 'ripple 0.6s linear';
      ripple.style.pointerEvents = 'none';

      this.appendChild(ripple);

      // Navigate after a short delay to show ripple effect
      if (url && url !== '#') {
        setTimeout(() => {
          console.log('Navigating to:', url);
          window.location.href = url;
        }, 150); // Short delay for ripple effect
      } else {
        console.log('No navigation - URL is:', url);
      }

      // Remove ripple after animation
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
}

// Enhanced language toggle with animations
function toggleLanguage() {
  const languageSwitch = document.getElementById("languageSwitch");
  const isIndonesian = languageSwitch.checked;

  updateLanguageToggleState(isIndonesian ? 'id' : 'en');

  if (isIndonesian) {
    console.log("Language changed to Indonesian");
    // Add your Indonesian language implementation here
    // Example: document.querySelector('html').setAttribute('lang', 'id');
  } else {
    console.log("Language changed to English");
    // Add your English language implementation here
    // Example: document.querySelector('html').setAttribute('lang', 'en');
  }
}

// Function to set language directly (called when clicking flags)
function setLanguage(lang) {
  const languageSwitch = document.getElementById("languageSwitch");
  const isIndonesian = lang === 'id';

  // Update switch state
  languageSwitch.checked = isIndonesian;

  // Trigger the toggle function
  updateLanguageToggleState(lang);

  if (isIndonesian) {
    console.log("Language changed to Indonesian");
    // Add your Indonesian language implementation here
  } else {
    console.log("Language changed to English");
    // Add your English language implementation here
  }
}

// Function to update the visual state with animations
function updateLanguageToggleState(lang) {
  const container = document.getElementById("languageToggleContainer");
  const flagEn = container.querySelector(".flag-en");
  const flagId = container.querySelector(".flag-id");

  // Remove existing state classes
  container.classList.remove("en-active", "id-active");
  flagEn.classList.remove("flag-active");
  flagId.classList.remove("flag-active");

  // Add new state class
  if (lang === 'id') {
    container.classList.add("id-active");
    flagId.classList.add("flag-active");
  } else {
    container.classList.add("en-active");
    flagEn.classList.add("flag-active");
  }

  // Remove the pulse animation class after animation completes
  setTimeout(() => {
    flagEn.classList.remove("flag-active");
    flagId.classList.remove("flag-active");
  }, 600);
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
  setActiveNavButton();
  addRippleEffectAndNavigation();
});
