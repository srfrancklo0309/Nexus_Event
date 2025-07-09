export function initCarousel() {
  // Carrusel elements
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.dot');
  const leftArrow = document.querySelector('.carousel-arrow.left');
  const rightArrow = document.querySelector('.carousel-arrow.right');
  const carouselContainer = document.querySelector('.carousel-container');

  let currentSlide = 0;
  const slideInterval = 8000; // 7 segundos entre cada cambio
  let autoSlideInterval = null;

  function showSlide(index) {
    slides.forEach(slide => {
      slide.classList.remove('active');
    });
    dots.forEach(dot => {
      dot.classList.remove('active');
    });
    slides[index].classList.add('active');
    dots[index].classList.add('active');
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }

  function resetAutoSlideInterval() {
    if (autoSlideInterval) {
      clearInterval(autoSlideInterval);
      autoSlideInterval = null;
    }
    autoSlideInterval = setInterval(nextSlide, slideInterval);
  }

  // Inicializar el intervalo solo una vez
  resetAutoSlideInterval();

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentSlide = index;
      showSlide(currentSlide);
      resetAutoSlideInterval();
    });
  });

  // AddEventListeners
  // Sliding control
  carouselContainer.addEventListener('mouseenter', () => {
    if (autoSlideInterval) {
      clearInterval(autoSlideInterval);
      autoSlideInterval = null;
    }
  });
  
  carouselContainer.addEventListener('mouseleave', () => {
    resetAutoSlideInterval();
  });

  // Row navigations
  leftArrow.addEventListener('click', () => {
    prevSlide();
    resetAutoSlideInterval();
  });

  rightArrow.addEventListener('click', () => {
    nextSlide();
    resetAutoSlideInterval();
  });
}

export function loadVideos(videosID) {
  const videos = document.querySelectorAll(`.${videosID}`);
  
  function pauseVideos(currentVideo) {
    videos.forEach(video => {
      video.pause();
      video.currentTime = 0;
      if (video !== currentVideo && video._playTimeout) {
        clearTimeout(video._playTimeout);
        video._playTimeout = null;
      }
    });
  }

  videos.forEach(video => {
    video.volume = 0.1;

    video.addEventListener('mouseenter', () => {
      pauseVideos(video);

      video._playTimeout = setTimeout(() => {
        video.play();
      }, 1500);
    });

    video.addEventListener('mouseleave', () => {
      if (video._playTimeout) {
        clearTimeout(video._playTimeout);
        video._playTimeout = null;
      }

      video.pause();
      video.currentTime = 0;
    });
  });
}

export function loadToastNotifications() {

  function createToast() {
    const notificationToast = document.createElement('div');
    notificationToast.className = 'notification-toast';

    document.body.prepend(notificationToast);
  }

  function showToast(title, message, duration = 3000) {
    const notificationToast = document.querySelector('.notification-toast');

    if (!notificationToast) {
      throw new Error("No se ha creado la caja de notificaciones en el DOM.");
    }

    notificationToast.innerHTML = `
      <div class="notification-header">
          <h4 class="notification-title">${title}</h4>
          <button class="notification-close">&times;</button>
      </div>
      <p class="notification-message">${message}</p>
    `;
    notificationToast.classList.add('active');
    // notificationToast.style.display = 'block';
    setTimeout(() => {
      if (notificationToast.classList.contains('active')) {
        notificationToast.classList.remove('active');
      }
      // notificationToast.style.display = 'none';
    }, duration);
  }

  return {
    createToast,
    showToast
  }
}