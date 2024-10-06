// Handle dark mode
const setDarkMode = () => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };
  
  // Alpine.js components
  document.addEventListener('alpine:init', () => {
    Alpine.data('imageModal', () => ({
      activeModal: null,
      closeModal() {
        this.activeModal = null;
      }
    }));
  
    Alpine.data('scrollToTop', () => ({
      showToTop: false,
      init() {
        window.addEventListener('scroll', () => {
          this.showToTop = window.pageYOffset > 100;
        });
      },
      scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }));
  });
  
  // Smooth scroll for anchor links
  const smoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      });
    });
  };
  
  // Promo modal and button functionality
  const initPromo = () => {
    const modal = document.getElementById('promoModal');
    const closeButton = document.getElementById('closeModal');
    const promoButton = document.getElementById('promoButton');
    const roomCount = document.getElementById('roomCount');
    let count = 10;
  
    const updateRoomCount = () => {
      if (count > 1) {
        count--;
        roomCount.textContent = count;
      }
    };
  
    const showModal = () => {
      modal.classList.remove('hidden');
      modal.classList.add('animate-fadeIn');
    };
  
    const hideModal = () => {
      modal.classList.add('hidden');
      promoButton.classList.remove('hidden');
    };
  
    const adjustButtonPosition = () => {
      const button = promoButton;
      button.style.right = '16px';
      button.style.bottom = '16px';
  
      if (button.offsetLeft < 0) {
        button.style.right = 'auto';
        button.style.left = '16px';
      }
      if (button.offsetTop < 0) {
        button.style.bottom = 'auto';
        button.style.top = '16px';
      }
    };
  
    setInterval(updateRoomCount, 30000);
    setTimeout(showModal, 12000);
  
    closeButton.addEventListener('click', hideModal);
    promoButton.addEventListener('click', () => {
      showModal();
      promoButton.classList.add('hidden');
    });
  
    window.addEventListener('load', adjustButtonPosition);
    window.addEventListener('resize', adjustButtonPosition);
  
    promoButton.addEventListener('mouseenter', () => promoButton.style.transform = 'scale(1.1)');
    promoButton.addEventListener('mouseleave', () => promoButton.style.transform = 'scale(1)');
  };
  
  // Initialize everything when DOM is loaded
  document.addEventListener('DOMContentLoaded', () => {
    setDarkMode();
    smoothScroll();
    initPromo();
  });