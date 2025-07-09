import { initCarousel, loadVideos, loadToastNotifications } from './scripts/bulma.js';
import { getEvents } from './api/eventAPI.js';
import { newSuscription } from './api/suscriptionAPI.js';

async function loadEvents () {
  const eventsGrid = document.getElementById('events-grid');
  
  const { data: events } = await getEvents();
  const maxEvents = 6;
  const displayEvents = events.slice(0, maxEvents);

  displayEvents.forEach(event => {
    const { 
      name,
      description,
      price,
      cover,
      video,
      location,
      date,
      time,
      artist
     } = event;

    const priceText = price && price > 0 ? `$${price}` : 'Gratis';
    const eventCard = document.createElement('div');
    eventCard.className = 'event-card';
    eventCard.innerHTML = `
      <div class="event-image-container">
        <img class="event-image-img" src="${cover}" alt="${name}">
        <video class="event-image-video" src="${video}" loop></video>
        <div class="event-image-text">
          <p class="event-title">${name}</p>
          <p class="event-description">${description}</p>
        </div>
        <div class="event-details">
          <p><strong>Ubicación:</strong> ${location}</p>
          <p><strong>Fecha:</strong> ${date}</p>
          <p><strong>Hora:</strong> ${time}</p>
          <p><strong>Artistas:</strong> ${artist}</p>
          <span class="event-price">${priceText}</span>
        </div>
      </div>
    `;
    eventsGrid.appendChild(eventCard);
  });
}

function loggedUser () {
  const navbarMenu = document.querySelector('.navbar-menu');
  const user = sessionStorage.getItem('name');
  let template = document.createElement('div');
  template.className = 'navbar-end';

  if (user !== null) {
    template.innerHTML = `
      <div class="navbar-item" style="gap: 0.7em;">
        <span class="navbar-user-greeting">
          <i class="fas fa-user"></i>
          Welcome, ${user}
        </span>
        <a href="#" id="logout-btn" class="nav-item logout-btn" style="padding: 0.5em 1em; margin: 0; border-top: none;">
          <span class="nav-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
              <path d="M112,216a8,8,0,0,1-8,8H48a16,16,0,0,1-16-16V48A16,16,0,0,1,48,32h56a8,8,0,0,1,0,16H48V208h56A8,8,0,0,1,112,216Zm109.66-93.66-40-40a8,8,0,0,0-11.32,11.32L196.69,120H104a8,8,0,0,0,0,16h92.69l-26.35,26.34a8,8,0,0,0,11.32,11.32l40-40A8,8,0,0,0,221.66,122.34Z"></path>
            </svg>
          </span>
          <span>Logout</span>
        </a>
      </div>
    `;
  } else {
    template.innerHTML = `
      <div class="navbar-item">
        <div class="buttons">
          <a href="./pages/login.html" class="button is-primary">
            <span>Login</span>
          </a>
        </div>
      </div>`;
  }
  navbarMenu.appendChild(template);

  if (user !== null) {
    const logoutBtn = template.querySelector('#logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        sessionStorage.clear();
        location.reload();
      });
    }
  }
  return;
}

document.addEventListener('DOMContentLoaded', async () => {
  initCarousel();
  await loadEvents();
  loadVideos('event-image-video');
  loggedUser();
  const { createToast, showToast } = loadToastNotifications();
  createToast();

  const suscribeButton = document.getElementById('subscribe-btn');

  suscribeButton.addEventListener('click', async () => {
    const emailInput = document.getElementById('footer-subscribe-input');
    const email = emailInput.value;

    if (email) {
      const suscription = { email };
      const response = await newSuscription(suscription);
      if( response && response.status) {
        showToast("Éxito", "Suscrito correctamente.");
      }
    }
  });
});
