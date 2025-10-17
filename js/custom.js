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

// Modern Gallery Functionality
function initModernGallery() {
  // Create enhanced modal HTML if it doesn't exist
  if (!document.getElementById('galleryModal')) {
    const modalHTML = `
      <div id="galleryModal" class="modal fade" tabindex="-1" aria-labelledby="galleryModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl modal-dialog-centered">
          <div class="modal-content border-0 rounded-4">
            <div class="modal-header border-0 bg-dark text-white">
                <h5 class="modal-title" id="galleryModalLabel">
                <i class="fas fa-image me-2" aria-hidden="true">&nbsp;</i>Gallery Image
              </h5>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body p-0 position-relative">
              <img id="galleryModalImage" src="" alt="" class="img-fluid w-100" style="max-height: 70vh; object-fit: contain;">
              <div class="modal-image-controls position-absolute top-50 start-0 translate-middle-y">
                <button class="btn btn-dark btn-sm rounded-circle me-2" id="prevImageBtn">
                  <i class="fas fa-chevron-left" aria-hidden="true">&nbsp;</i>
                </button>
              </div>
              <div class="modal-image-controls position-absolute top-50 end-0 translate-middle-y">
                <button class="btn btn-dark btn-sm rounded-circle ms-2" id="nextImageBtn">
                  <i class="fas fa-chevron-right" aria-hidden="true">&nbsp;</i>
                </button>
              </div>
            </div>
            <div class="modal-footer border-0 bg-light">
              <div class="w-100">
                <h6 id="galleryModalTitle" class="mb-2"></h6>
                <p id="galleryModalDescription" class="text-muted mb-2"></p>
                <div id="galleryModalMeta" class="d-flex gap-3 small text-muted"></div>
              </div>
              <div class="ms-auto">
                <button class="btn btn-outline-primary btn-sm" id="shareImageBtn">
                  <i class="fas fa-share-alt me-1" aria-hidden="true">&nbsp;</i>Share
                </button>
                <button class="btn btn-primary btn-sm" id="downloadImageBtn">
                  <i class="fas fa-download me-1" aria-hidden="true">&nbsp;</i>Download
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
  }

  // Initialize gallery filtering
  initGalleryFiltering();

  // Initialize gallery search
  initGallerySearch();

  // Initialize view toggle
  initViewToggle();

  // Initialize modal functionality
  initGalleryModalEvents();
}

// Gallery filtering functionality
function initGalleryFiltering() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      const filter = this.getAttribute('data-filter');

      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');

      // Filter gallery items
      galleryItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          item.style.display = 'block';
          item.style.animation = 'fadeIn 0.5s ease-in';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

// Gallery search functionality
function initGallerySearch() {
  const searchInput = document.getElementById('gallerySearch');
  if (!searchInput) return;

  searchInput.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
      const title = item.querySelector('.card-title')?.textContent.toLowerCase() || '';
      const description = item.querySelector('.card-description')?.textContent.toLowerCase() || '';

      if (title.includes(searchTerm) || description.includes(searchTerm)) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
}

// View toggle functionality
function initViewToggle() {
  const viewButtons = document.querySelectorAll('[data-view]');
  const galleryGrids = document.querySelectorAll('.gallery-grid');

  viewButtons.forEach(button => {
    button.addEventListener('click', function() {
      const view = this.getAttribute('data-view');

      // Update active button
      viewButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');

      // Update grid layout
      galleryGrids.forEach(grid => {
        grid.className = 'gallery-grid';
        switch(view) {
          case 'masonry':
            grid.classList.add('masonry-view');
            break;
          case 'list':
            grid.classList.add('list-view');
            break;
          default:
            grid.classList.add('grid-view');
        }
      });
    });
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
                <i class="fas fa-video text-primary me-2" aria-hidden="true">&nbsp;</i>Video Dokumenter Desa Klabili
              </h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="row g-3">
                <div class="col-12">
                  <div class="alert alert-info d-flex align-items-center">
                    <i class="fas fa-info-circle me-2" aria-hidden="true">&nbsp;</i>
                    <div>
                      <strong>Video dokumenter sedang dalam proses produksi.</strong><br>
                      Sementara ini, Anda dapat menikmati galeri foto yang tersedia di atas.
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="card h-100 border-0 bg-light">
                    <div class="card-body text-center">
                      <i class="fas fa-camera text-primary mb-3" style="font-size: 2rem;" aria-hidden="true">&nbsp;</i>
                      <h6 class="card-title">Dokumentasi Foto</h6>
                      <p class="card-text small text-muted">Lihat koleksi foto kegiatan dan pemandangan desa</p>
                      <button class="btn btn-sm btn-outline-primary" onclick="scrollToGallery()">Lihat Galeri</button>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="card h-100 border-0 bg-light">
                    <div class="card-body text-center">
                      <i class="fas fa-play text-success mb-3" style="font-size: 2rem;" aria-hidden="true">&nbsp;</i>
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
  if (document.getElementById('scrollToTopBtn')) return;
  const btn = document.createElement('button');
  btn.id = 'scrollToTopBtn';
  btn.className = 'btn btn-success rounded-circle shadow';
  btn.style.cssText = 'position: fixed; bottom: 32px; right: 32px; z-index: 999; width: 48px; height: 48px; display: flex; align-items: center; justify-content: center;';
  btn.setAttribute('aria-label', 'Back to top');
  btn.innerHTML = '<i class="fas fa-leaf" aria-hidden="true">&nbsp;</i>';
  document.body.appendChild(btn);

  // Show/hide on scroll
  const toggle = () => {
    const y = window.pageYOffset || document.documentElement.scrollTop;
    if (y > 200) {
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
  };
  window.addEventListener('scroll', toggle);
  toggle();

  // Smooth scroll to top
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}


// Gallery modal events
function initGalleryModalEvents() {
  const modal = new bootstrap.Modal(document.getElementById('galleryModal'));
  const modalImage = document.getElementById('galleryModalImage');
  const modalTitle = document.getElementById('galleryModalTitle');
  const modalDescription = document.getElementById('galleryModalDescription');
  const modalMeta = document.getElementById('galleryModalMeta');

  let currentImageIndex = 0;
  let galleryImages = [];

  // Collect all gallery images
  function updateGalleryImages() {
    galleryImages = Array.from(document.querySelectorAll('.gallery-item:not([style*="display: none"]) .gallery-img'));
  }

  // Open modal function
  window.openGalleryModal = function(button) {
    const card = button.closest('.modern-gallery-card');
    const img = card.querySelector('.gallery-img');
    const title = card.querySelector('.card-title');
    const description = card.querySelector('.card-description');
    const metaItems = card.querySelectorAll('.meta-item');

    updateGalleryImages();
    currentImageIndex = galleryImages.indexOf(img);

    modalImage.src = img.src;
    modalImage.alt = img.alt;
    modalTitle.textContent = title.textContent;
    modalDescription.textContent = description.textContent;

    // Update meta information
    modalMeta.innerHTML = '';
    metaItems.forEach(item => {
      modalMeta.innerHTML += `<span>${item.innerHTML}</span>`;
    });

    modal.show();
  };

  // Share image function
  window.shareImage = function(button) {
    const card = button.closest('.modern-gallery-card');
    const title = card.querySelector('.card-title').textContent;
    const img = card.querySelector('.gallery-img');

    if (navigator.share) {
      navigator.share({
        title: title,
        text: `Check out this beautiful image from Desa Klabili: ${title}`,
        url: window.location.href
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${title} - ${window.location.href}`).then(() => {
        alert('Link copied to clipboard!');
      });
    }
  };

  // Navigation between images
  document.getElementById('prevImageBtn').addEventListener('click', function() {
    if (currentImageIndex > 0) {
      currentImageIndex--;
      const img = galleryImages[currentImageIndex];
      const card = img.closest('.modern-gallery-card');
      updateModalContent(card);
    }
  });

  document.getElementById('nextImageBtn').addEventListener('click', function() {
    if (currentImageIndex < galleryImages.length - 1) {
      currentImageIndex++;
      const img = galleryImages[currentImageIndex];
      const card = img.closest('.modern-gallery-card');
      updateModalContent(card);
    }
  });

  function updateModalContent(card) {
    const img = card.querySelector('.gallery-img');
    const title = card.querySelector('.card-title');
    const description = card.querySelector('.card-description');
    const metaItems = card.querySelectorAll('.meta-item');

    modalImage.src = img.src;
    modalImage.alt = img.alt;
    modalTitle.textContent = title.textContent;
    modalDescription.textContent = description.textContent;

    modalMeta.innerHTML = '';
    metaItems.forEach(item => {
      modalMeta.innerHTML += `<span>${item.innerHTML}</span>`;
    });
  }

  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (document.getElementById('galleryModal').classList.contains('show')) {
      if (e.key === 'ArrowLeft') {
        document.getElementById('prevImageBtn').click();
      } else if (e.key === 'ArrowRight') {
        document.getElementById('nextImageBtn').click();
      }
    }
  });

  // Download image
  document.getElementById('downloadImageBtn').addEventListener('click', function() {
    const link = document.createElement('a');
    link.href = modalImage.src;
    link.download = modalTitle.textContent.replace(/[^a-z0-9]/gi, '_').toLowerCase() + '.jpg';
    link.click();
  });

  // Share button
  document.getElementById('shareImageBtn').addEventListener('click', function() {
    if (navigator.share) {
      navigator.share({
        title: modalTitle.textContent,
        text: modalDescription.textContent,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(`${modalTitle.textContent} - ${window.location.href}`).then(() => {
        alert('Link copied to clipboard!');
      });
    }
  });
}

// Lazy loading for gallery images
function initLazyLoading() {
  const images = document.querySelectorAll('img[loading="lazy"]');

  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }
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
  if (window.location.pathname.includes('galeri') || document.querySelector('.modern-gallery-card')) {
    initModernGallery();
    initLazyLoading();
    initVideoPlayer();
  }
});
