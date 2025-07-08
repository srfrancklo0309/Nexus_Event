import { initCarousel, loadVideos } from './scripts/bulma.js';
import { getEvents, newEvent } from './api/eventAPI.js';

async function loadEvents () {
  const { data: events } = await getEvents();
  const eventsGrid = document.getElementById('events-grid');
  if (!eventsGrid) return;

  // Limpiar el contenedor
  eventsGrid.innerHTML = '';

  // Tomar solo los primeros 6 eventos
  const maxEvents = 6;
  const displayEvents = events.slice(0, maxEvents);

  displayEvents.forEach(event => {
    const priceText = event.price && event.price > 0 ? `$${event.price}` : 'Gratis';
    const eventCard = document.createElement('div');
    eventCard.className = 'event-card';
    eventCard.innerHTML = `
      <div class="event-image-container">
        <img class="event-image-img" src="${event.cover}" alt="${event.name}">
        <video class="event-image-video" src="${event.video}" loop muted></video>
        <div class="event-image-text">
          <p class="event-title">${event.name}</p>
          <p class="event-description">${event.description}</p>
        </div>
        <div class="event-details">
          <p><strong>Ubicación:</strong> ${event.location}</p>
          <p><strong>Fecha:</strong> ${event.date}</p>
          <p><strong>Hora:</strong> ${event.time}</p>
          <p><strong>Artistas:</strong> ${event.artist}</p>
          <span class="event-price">${priceText}</span>
        </div>
      </div>
    `;
    eventsGrid.appendChild(eventCard);
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  initCarousel();
  await loadEvents();
  loadVideos('event-image-video');
  
});
