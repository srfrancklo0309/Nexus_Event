// Inicializa el carrusel de imágenes con navegación automática
export function initCarousel() {
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.dot');
  const leftArrow = document.querySelector('.carousel-arrow.left');
  const rightArrow = document.querySelector('.carousel-arrow.right');
  const carouselContainer = document.querySelector('.carousel-container');

  let currentSlide = 0;
  const slideInterval = 8000;
  let autoSlideInterval = null;

  // Muestra la diapositiva especificada
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

  // Avanza a la siguiente diapositiva
  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  // Retrocede a la diapositiva anterior
  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }

  // Reinicia el intervalo de navegación automática
  function resetAutoSlideInterval() {
    if (autoSlideInterval) {
      clearInterval(autoSlideInterval);
      autoSlideInterval = null;
    }
    autoSlideInterval = setInterval(nextSlide, slideInterval);
  }

  resetAutoSlideInterval();

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentSlide = index;
      showSlide(currentSlide);
      resetAutoSlideInterval();
    });
  });

  carouselContainer.addEventListener('mouseenter', () => {
    if (autoSlideInterval) {
      clearInterval(autoSlideInterval);
      autoSlideInterval = null;
    }
  });
  
  carouselContainer.addEventListener('mouseleave', () => {
    resetAutoSlideInterval();
  });

  leftArrow.addEventListener('click', () => {
    prevSlide();
    resetAutoSlideInterval();
  });

  rightArrow.addEventListener('click', () => {
    nextSlide();
    resetAutoSlideInterval();
  });
}

// Configura la reproducción automática de videos al hacer hover
export function loadVideos(videosID) {
  const videos = document.querySelectorAll(`.${videosID}`);
  
  // Pausa todos los videos excepto el actual
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

// Sistema de notificaciones toast
export function loadToastNotifications() {

  // Crea el contenedor de notificaciones
  function createToast() {
    const notificationToast = document.createElement('div');
    notificationToast.className = 'notification-toast';

    document.body.prepend(notificationToast);
  }

  // Muestra una notificación toast
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
    setTimeout(() => {
      if (notificationToast.classList.contains('active')) {
        notificationToast.classList.remove('active');
      }
    }, duration);
  }

  return {
    createToast,
    showToast
  }
}