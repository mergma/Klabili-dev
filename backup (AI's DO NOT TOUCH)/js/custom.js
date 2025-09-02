// Navigation function for buttons
function navigateTo(url) {
  if (url && url !== '#') {
    console.log('Navigating to:', url); // Debug log

    // Check if URL contains a hash (section anchor)
    if (url.includes('#')) {
      const [pageUrl, sectionId] = url.split('#');
      const currentPage = window.location.pathname.split('/').pop() || 'index.html';

      // If we're already on the target page, just scroll to the section
      if (pageUrl === currentPage || pageUrl === window.location.pathname) {
        scrollToSection(sectionId);
      } else {
        // Navigate to the page first, then scroll to section
        window.location.href = url;
      }
    } else {
      // Regular navigation without hash
      window.location.href = url;
    }
  } else {
    console.log('Invalid URL or #:', url); // Debug log
  }
}

// Function to smoothly scroll to a section
function scrollToSection(sectionId) {
  const targetElement = document.getElementById(sectionId);

  if (!targetElement) {
    console.error('Target section not found:', sectionId);
    return;
  }

  // Calculate position accounting for navbar height
  const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 80;
  const targetPosition = targetElement.offsetTop - navbarHeight - 20; // Extra 20px padding

  // Smooth scroll animation
  const startPosition = window.pageYOffset || document.documentElement.scrollTop;
  const distance = targetPosition - startPosition;
  const duration = 1000; // 1 second duration
  let start = null;

  function animation(currentTime) {
    if (start === null) start = currentTime;
    const timeElapsed = currentTime - start;
    const progress = Math.min(timeElapsed / duration, 1);

    // Easing function (ease-in-out)
    const easeInOutQuad = progress < 0.5
      ? 2 * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 2) / 2;

    const currentPosition = startPosition + distance * easeInOutQuad;
    window.scrollTo(0, currentPosition);

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  }

  requestAnimationFrame(animation);
}
// Function to handle hash navigation on page load
function handleHashOnLoad() {
  const hash = window.location.hash;
  if (hash) {
    const sectionId = hash.substring(1); // Remove the # symbol
    // Scroll immediately without delay
    scrollToSection(sectionId);
  }
}

// Set active button based on current page
function setActiveNavButton() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navButtons = document.querySelectorAll('.nav-btn');

  navButtons.forEach(button => {
    button.classList.remove('active');
    const buttonText = button.textContent.trim();

    // Set active button based on current page
    if (currentPage === 'index.html' && buttonText === 'Beranda') {
      button.classList.add('active');
    } else if (currentPage === 'fasilitas.html' && buttonText === 'Fasilitas') {
      button.classList.add('active');
    } else if (currentPage === 'tentang_kami.html' && buttonText === 'Tentang Kami') {
      button.classList.add('active');
    } else if (currentPage === 'wisata_budaya.html' && buttonText === 'Wisata & Budaya') {
      button.classList.add('active');
    } else if (currentPage === 'informasi.html' && buttonText === 'Informasi Desa') {
      button.classList.add('active');
    } else if (currentPage === 'galeri.html' && buttonText === 'Galeri') {
      button.classList.add('active');
    }
  });
}

// ripple efec and navigation combined
function addRippleEffectAndNavigation() {
  const buttons = document.querySelectorAll('.nav-btn, .dropdown-item');

  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      // Skip if it's a dropdown toggle button
      if (this.classList.contains('dropdown-toggle')) {
        return;
      }

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
          navigateTo(url);
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
  if (languageSwitch) {
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
}

// Function to set language directly (called when clicking flags)
function setLanguage(lang) {
  const languageSwitch = document.getElementById("languageSwitch");
  const isIndonesian = lang === 'id';

  // Update switch state if checkbox exists
  if (languageSwitch) {
    languageSwitch.checked = isIndonesian;
  }

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
  if (!container) return;

  const flagEn = container.querySelector(".flag-en");
  const flagId = container.querySelector(".flag-id");

  if (!flagEn || !flagId) return;

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

// Initialize language toggle for the new design
function initLanguageToggle() {
  const container = document.getElementById("languageToggleContainer");
  if (!container) return;

  const flagEn = container.querySelector(".flag-en");
  const flagId = container.querySelector(".flag-id");

  if (!flagEn || !flagId) return;

  // Add click event listeners to flags
  flagEn.addEventListener("click", function () {
    flagEn.classList.add("active");
    flagEn.classList.remove("inactive");
    flagId.classList.add("inactive");
    flagId.classList.remove("active");
    container.classList.add("en-active");
    container.classList.remove("id-active");
    setLanguage('en');
  });

  flagId.addEventListener("click", function () {
    flagId.classList.add("active");
    flagId.classList.remove("inactive");
    flagEn.classList.add("inactive");
    flagEn.classList.remove("active");
    container.classList.add("id-active");
    container.classList.remove("en-active");
    setLanguage('id');
  });
}

// Sticky Navbar Functionality
function initStickyNavbar() {
  const navbar = document.querySelector('.navbar');
  let scrollThresholdElement = document.querySelector('.hero-section');

  if (!scrollThresholdElement) {
    scrollThresholdElement = document.querySelector('.page-title-bg') || document.querySelector('.bg-primary.text-white.py-5');
  }

  if (!navbar || !scrollThresholdElement) {
    console.log('Navbar or scroll threshold element not found');
    return;
  }

  // Get the height of the scroll threshold element
  let scrollThresholdHeight = scrollThresholdElement.offsetHeight;

  function handleScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollPosition > scrollThresholdHeight - 100) { // Start transition 100px before element ends
      if (!navbar.classList.contains('sticky')) {
        navbar.classList.add('sticky');
        document.body.classList.add('navbar-sticky');
      }
    } else {
      if (navbar.classList.contains('sticky')) {
        navbar.classList.remove('sticky');
        document.body.classList.remove('navbar-sticky');
      }
    }
  }

  // Throttle scroll events for better performance
  let ticking = false;
  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(handleScroll);
      ticking = true;
      setTimeout(() => { ticking = false; }, 16); // ~60fps
    }
  }

  // Add scroll event listener
  window.addEventListener('scroll', requestTick);

  // Handle window resize to recalculate scroll threshold height
  window.addEventListener('resize', function() {
    // Recalculate scroll threshold height on resize
    setTimeout(() => {
      scrollThresholdHeight = scrollThresholdElement.offsetHeight;
      handleScroll();
    }, 100);
  });

  // Initial check in case page is already scrolled
  handleScroll();
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
  setActiveNavButton();
  addRippleEffectAndNavigation();
  initStickyNavbar();
  handleHashOnLoad();
  initLanguageToggle();
});
