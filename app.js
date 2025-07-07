import { initCarousel, loadVideos } from './scripts/bulma.js';
import { getEvents, newEvent } from './api/eventAPI.js';

document.addEventListener('DOMContentLoaded', async () => {
  initCarousel();
  loadVideos('event-image-video');
  
  let { data: events } = await getEvents();
  console.log(events);

  document.addEventListener('keydown', async (evt) => {
    if (evt.key === 'Enter') {
      const response = await newEvent({
        id: 16,
        name: "Rock al parque",
        description: "Festival de rock con las mejores bandas del momento. Una noche llena de energía y música en vivo.",
        date: "2024-06-15",
        time: "19:00",
        location: "La Macarena",
        capacity: 6000,
        price: 0.00,
        genre: "Rock",
        artist: "Multiple Artists",
        status: "active",
        cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop"
      });
      if (response.status) {
        const { data } = await getEvents();
        events = data;
        console.log(response.message);
      } else {
        console.error(response.message)
      }

    }
  })
});
