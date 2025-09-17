// Navigation function for buttons
function navigateTo(url) {
  if (url && url !== "#") {
    console.log("Navigating to:", url); // Debug log

    // Check if URL contains a hash (section anchor)
    if (url.includes("#")) {
      const [pageUrl, sectionId] = url.split("#");
      const currentPage =
        window.location.pathname.split("/").pop() || "index.html";

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
    console.log("Invalid URL or #:", url); // Debug log
  }
}

// Function to smoothly scroll to a section
function scrollToSection(sectionId) {
  const targetElement = document.getElementById(sectionId);

  if (!targetElement) {
    console.error("Target section not found:", sectionId);
    return;
  }

  // Calculate position accounting for navbar height
  const navbarHeight = document.querySelector(".navbar")?.offsetHeight || 80;
  const targetPosition = targetElement.offsetTop - navbarHeight - 20; // Extra 20px padding

  // Smooth scroll animation
  const startPosition =
    window.pageYOffset || document.documentElement.scrollTop;
  const distance = targetPosition - startPosition;
  const duration = 1000; // 1 second duration
  let start = null;

  function animation(currentTime) {
    if (start === null) start = currentTime;
    const timeElapsed = currentTime - start;
    const progress = Math.min(timeElapsed / duration, 1);

    // Easing function (ease-in-out)
    const easeInOutQuad =
      progress < 0.5
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
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const navButtons = document.querySelectorAll(".nav-btn");

  navButtons.forEach((button) => {
    button.classList.remove("active");
    const buttonText = button.textContent.trim();

    // Set active button based on current page (Indonesian)
    if (currentPage === "index.html" && buttonText === "Beranda") {
      button.classList.add("active");
    } else if (currentPage === "fasilitas.html" && buttonText === "Fasilitas") {
      button.classList.add("active");
    } else if (
      currentPage === "tentang_kami.html" &&
      buttonText === "Tentang Kami"
    ) {
      button.classList.add("active");
    } else if (
      currentPage === "wisata_budaya.html" &&
      buttonText === "Wisata & Budaya"
    ) {
      button.classList.add("active");
    } else if (
      currentPage === "informasi.html" &&
      buttonText === "Informasi Desa"
    ) {
      button.classList.add("active");
    } else if (currentPage === "galeri.html" && buttonText === "Galeri") {
      button.classList.add("active");
    }
    // Set active button based on current page (English)
    else if (currentPage === "index_en.html" && buttonText === "Home") {
      button.classList.add("active");
    } else if (
      currentPage === "fasilitas_en.html" &&
      buttonText === "Facilities"
    ) {
      button.classList.add("active");
    } else if (
      currentPage === "tentang_kami_en.html" &&
      buttonText === "About Us"
    ) {
      button.classList.add("active");
    } else if (
      currentPage === "wisata_budaya_en.html" &&
      buttonText === "Tourism & Culture"
    ) {
      button.classList.add("active");
    } else if (
      currentPage === "informasi_en.html" &&
      buttonText === "Village Information"
    ) {
      button.classList.add("active");
    } else if (currentPage === "galeri_en.html" && buttonText === "Gallery") {
      button.classList.add("active");
    }
  });
}

// ripple efec and navigation combined
function addRippleEffectAndNavigation() {
  const buttons = document.querySelectorAll(".nav-btn, .dropdown-item");

  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      // Skip if it's a dropdown toggle button
      if (this.classList.contains("dropdown-toggle")) {
        return;
      }

      console.log("Button clicked:", this.textContent.trim()); // Debug log

      // Get the navigation URL from data attribute
      const url = this.getAttribute("data-nav-url");
      console.log("URL from data attribute:", url); // Debug log

      // Create ripple effect
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = x + "px";
      ripple.style.top = y + "px";
      ripple.classList.add("ripple");

      // Add ripple styles
      ripple.style.position = "absolute";
      ripple.style.borderRadius = "50%";
      ripple.style.background = "rgba(255, 255, 255, 0.6)";
      ripple.style.transform = "scale(0)";
      ripple.style.animation = "ripple 0.6s linear";
      ripple.style.pointerEvents = "none";

      this.appendChild(ripple);

      // Navigate after a short delay to show ripple effect
      if (url && url !== "#") {
        setTimeout(() => {
          navigateTo(url);
        }, 150); // Short delay for ripple effect
      } else {
        console.log("No navigation - URL is:", url);
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
    updateLanguageToggleState(isIndonesian ? "id" : "en");

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
  const isIndonesian = lang === "id";

  // Update switch state if checkbox exists
  if (languageSwitch) {
    languageSwitch.checked = isIndonesian;
  }
  
  // Trigger the toggle function
  updateLanguageToggleState(lang);

  // Get current page name
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  let targetPage = "";

  if (isIndonesian) {
    console.log("Language changed to Indonesian");
    // Navigate to Indonesian version
    if (currentPage.includes("_en.html")) {
      targetPage = currentPage.replace("_en.html", ".html");
    } else if (currentPage === "index_en.html") {
      targetPage = "index.html";
    } else {
      targetPage = currentPage; // Already Indonesian
    }
  } else {
    console.log("Language changed to English");
    // Navigate to English version
    if (currentPage === "index.html") {
      targetPage = "index_en.html";
    } else if (
      currentPage.includes(".html") &&
      !currentPage.includes("_en.html")
    ) {
      targetPage = currentPage.replace(".html", "_en.html");
    } else {
      targetPage = currentPage; // Already English
    }
  }

  // Navigate to the target page if it's different from current
  if (targetPage !== currentPage) {
    window.location.href = targetPage;
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
  if (lang === "id") {
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
    setLanguage("en");
  });

  flagId.addEventListener("click", function () {
    flagId.classList.add("active");
    flagId.classList.remove("inactive");
    flagEn.classList.add("inactive");
    flagEn.classList.remove("active");
    container.classList.add("id-active");
    container.classList.remove("en-active");
    setLanguage("id");
  });
}

// Sticky Navbar Functionality
function initStickyNavbar() {
  const navbar = document.querySelector(".navbar");
  let scrollThresholdElement = document.querySelector(".hero-section");

  if (!scrollThresholdElement) {
    scrollThresholdElement =
      document.querySelector(".page-title-bg") ||
      document.querySelector(".bg-primary.text-white.py-5");
  }

  if (!navbar || !scrollThresholdElement) {
    console.log("Navbar or scroll threshold element not found");
    return;
  }

  // Get the height of the scroll threshold element
  let scrollThresholdHeight = scrollThresholdElement.offsetHeight;

  function handleScroll() {
    const scrollPosition =
      window.pageYOffset || document.documentElement.scrollTop;

    if (scrollPosition > scrollThresholdHeight - 100) {
      // Start transition 100px before element ends
      if (!navbar.classList.contains("sticky")) {
        navbar.classList.add("sticky");
        document.body.classList.add("navbar-sticky");
      }
    } else {
      if (navbar.classList.contains("sticky")) {
        navbar.classList.remove("sticky");
        document.body.classList.remove("navbar-sticky");
      }
    }
  }

  // Throttle scroll events for better performance
  let ticking = false;
  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(handleScroll);
      ticking = true;
      setTimeout(() => {
        ticking = false;
      }, 16); // ~60fps
    }
  }

  // Add scroll event listener
  window.addEventListener("scroll", requestTick);

  // Handle window resize to recalculate scroll threshold height
  window.addEventListener("resize", function () {
    // Recalculate scroll threshold height on resize
    setTimeout(() => {
      scrollThresholdHeight = scrollThresholdElement.offsetHeight;
      handleScroll();
    }, 100);
  });

  // Initial check in case page is already scrolled
  handleScroll();
}

// Gallery Modal Functionality
function initGalleryModal() {
  // Create modal HTML if it doesn't exist
  if (!document.getElementById('galleryModal')) {
    const modalHTML = `
      <div id="galleryModal" class="modal fade" tabindex="-1" aria-labelledby="galleryModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header border-0">
              <h5 class="modal-title" id="galleryModalLabel">Gallery Image</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body p-0">
              <img id="galleryModalImage" src="" alt="" class="img-fluid w-100">
            </div>
            <div class="modal-footer border-0">
              <p id="galleryModalDescription" class="text-muted mb-0"></p>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
  }

  // Add click event listeners to all gallery cards
  const galleryCards = document.querySelectorAll('.gallery-card');
  const modal = new bootstrap.Modal(document.getElementById('galleryModal'));
  const modalImage = document.getElementById('galleryModalImage');
  const modalTitle = document.getElementById('galleryModalLabel');
  const modalDescription = document.getElementById('galleryModalDescription');

  galleryCards.forEach(card => {
    card.addEventListener('click', function() {
      const img = this.querySelector('.gallery-img');
      const title = this.querySelector('.card-title');
      const description = this.querySelector('.card-text');

      if (img && title) {
        modalImage.src = img.src;
        modalImage.alt = img.alt;
        modalTitle.textContent = title.textContent;
        modalDescription.textContent = description ? description.textContent : '';
        modal.show();
      }
    });

    // Add keyboard accessibility
    card.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });

    // Make cards focusable
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', 'View image in gallery');
  });
}

// Video Player Functionality
function initVideoPlayer() {
  const videoThumbnail = document.querySelector('.video-thumbnail');
  const videoPlayer = document.querySelector('.video-player');
  const iframe = document.querySelector('.video-player iframe');

  if (videoThumbnail && videoPlayer && iframe) {
    videoThumbnail.addEventListener('click', function() {
      // Example video URLs - replace with actual video URLs
      const videoUrls = [
        'https://www.youtube.com/embed/dQw4w9WgXcQ', // Example YouTube video
        'https://player.vimeo.com/video/147365861', // Example Vimeo video
      ];

      // For demonstration, we'll show a modal with video options
      showVideoModal();
    });

    // Add keyboard accessibility
    videoThumbnail.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });

    // Make video thumbnail focusable
    videoThumbnail.setAttribute('tabindex', '0');
    videoThumbnail.setAttribute('role', 'button');
    videoThumbnail.setAttribute('aria-label', 'Play video documentary');
  }
}

// Show video selection modal
function showVideoModal() {
  // Create modal if it doesn't exist
  if (!document.getElementById('videoModal')) {
    const modalHTML = `
      <div id="videoModal" class="modal fade" tabindex="-1" aria-labelledby="videoModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header border-0">
              <h5 class="modal-title" id="videoModalLabel">
                <i class="fas fa-video text-primary me-2"></i>Video Dokumenter Desa Klabili
              </h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="row g-3">
                <div class="col-12">
                  <div class="alert alert-info d-flex align-items-center">
                    <i class="fas fa-info-circle me-2"></i>
                    <div>
                      <strong>Video dokumenter sedang dalam proses produksi.</strong><br>
                      Sementara ini, Anda dapat menikmati galeri foto yang tersedia di atas.
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="card h-100 border-0 bg-light">
                    <div class="card-body text-center">
                      <i class="fas fa-camera text-primary mb-3" style="font-size: 2rem;"></i>
                      <h6 class="card-title">Dokumentasi Foto</h6>
                      <p class="card-text small text-muted">Lihat koleksi foto kegiatan dan pemandangan desa</p>
                      <button class="btn btn-sm btn-outline-primary" onclick="scrollToGallery()">Lihat Galeri</button>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="card h-100 border-0 bg-light">
                    <div class="card-body text-center">
                      <i class="fas fa-play text-success mb-3" style="font-size: 2rem;"></i>
                      <h6 class="card-title">Video Segera Hadir</h6>
                      <p class="card-text small text-muted">Video dokumenter profesional sedang dalam tahap produksi</p>
                      <button class="btn btn-sm btn-outline-success" disabled>Coming Soon</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
  }

  const modal = new bootstrap.Modal(document.getElementById('videoModal'));
  modal.show();
}

// Scroll to gallery function
function scrollToGallery() {
  const modal = bootstrap.Modal.getInstance(document.getElementById('videoModal'));
  modal.hide();

  setTimeout(() => {
    const gallerySection = document.getElementById('dokumentasi-acara');
    if (gallerySection) {
      gallerySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, 300);
}

// Back-to-top button setup
function injectBackToTop() {
  if (document.getElementById('backToTop')) return;
  const btn = document.createElement('button');
  btn.id = 'backToTop';
  btn.className = 'back-to-top btn btn-success';
  btn.setAttribute('aria-label', 'Back to top');
  btn.innerHTML = `
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <!-- Leaf icon -->
      <path d="M20 3c-7 0-11 4-11 11 0 3 2 5 5 5 7 0 8-11 6-16z" fill="currentColor"/>
      <path d="M4 20c5-5 9-7 14-9" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
    </svg>`;
  document.body.appendChild(btn);

  // Show/hide on scroll
  const toggle = () => {
    const y = window.pageYOffset || document.documentElement.scrollTop;
    btn.style.opacity = y > 300 ? '1' : '0';
    btn.style.pointerEvents = y > 300 ? 'auto' : 'none';
  };
  window.addEventListener('scroll', toggle);
  toggle();

  // Smooth scroll to top
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}


// Initialize when page loads
document.addEventListener("DOMContentLoaded", function () {
  setActiveNavButton();
  addRippleEffectAndNavigation();
  // initStickyNavbar();
  handleHashOnLoad();
  initLanguageToggle();
  injectBackToTop();

  // Initialize gallery functionality if on gallery page
  if (window.location.pathname.includes('galeri') || document.querySelector('.gallery-card')) {
    initGalleryModal();
    initVideoPlayer();
  }
});
