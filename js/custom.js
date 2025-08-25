// Navigation function for buttons
function navigateTo(url) {
  if (url && url !== '#') {
    window.location.href = url;
  }
}

// Set active button based on current page
function setActiveNavButton() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navButtons = document.querySelectorAll('.nav-btn');
  
  navButtons.forEach(button => {
    button.classList.remove('active');
    const buttonText = button.textContent.trim().toLowerCase();
    
    if (currentPage === 'index.html' && buttonText === 'home') {
      button.classList.add('active');
    }
    // Add more conditions here for other pages when you create them
  });
}

// Add ripple effect to buttons
function addRippleEffect() {
  const buttons = document.querySelectorAll('.nav-btn');
  
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      // Create ripple element
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
      
      // Remove ripple after animation
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
}

// Language toggle function
function toggleLanguage() {
  const languageSwitch = document.getElementById("languageSwitch");
  const isIndonesian = languageSwitch.checked;

  if (isIndonesian) {
    // Switch to Indonesian
    console.log("Language changed to Indonesian");
    // Add your Indonesian language implementation here
    // Example: document.querySelector('html').setAttribute('lang', 'id');
  } else {
    // Switch to English
    console.log("Language changed to English");
    // Add your English language implementation here
    // Example: document.querySelector('html').setAttribute('lang', 'en');
  }

  // You can add more language switching logic here
  // For example, changing text content, loading different content, etc.
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
  setActiveNavButton();
  addRippleEffect();
});
