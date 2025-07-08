import { getEvents } from "../api/eventAPI.js";
import { getContacts } from "../api/contactAPI.js";
import { getSuscriptions } from "../api/suscriptionAPI.js";

document.addEventListener("DOMContentLoaded", async () => {
  
  // Event listener para el botón de logout
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      
      // Limpiar session storage
      sessionStorage.clear();
      
      // Redirigir al login
      window.location.href = "./login.html";
    });
  }
  
  async function loadEventsCounter() {
    try {
      const { data: events } = await getEvents();

      const activeCount = events.filter(event => event.status === "active").length;
      const inactiveCount = events.filter(event => event.status === "inactive").length;
      const canceledCount = events.filter(event => event.status === "canceled").length;

      const activeEventsDiv = document.getElementById("active-events");
      activeEventsDiv.innerHTML = `
        <p class="stat-label">Active Events</p>
        <p class="stat-value">${activeCount}</p>`;
      
      const inactiveEventsDiv = document.getElementById("inactive-events");
      inactiveEventsDiv.innerHTML = `
        <p class="stat-label">Inactive Events</p>
        <p class="stat-value">${inactiveCount}</p>`;

      const canceledEventsDiv = document.getElementById("canceled-events");
      canceledEventsDiv.innerHTML = `
        <p class="stat-label">Canceled Events</p>
        <p class="stat-value">${canceledCount}</p>`;
    } catch (error) {
      console.error(error);
    }
  }

  async function loadContactsCounter() {
    try {
      const {data : contacts} = await getContacts();
      
      const contactsCounter = contacts.length;

      const contactMessages = document.getElementById("contact-messages");
      contactMessages.innerHTML = `
        <p class="stat-label recent-activity-cards">Messages</p>
        <p class="stat-value">${contactsCounter}</p>`;
    } catch (error) {
      console.log(error);
    }
  }

  async function loadSuscriptionsCounter() {
  try {
    const {data : suscriptions} = await getSuscriptions();
    
    const suscriptionsCounter = suscriptions.length;

    const registeredEmails = document.getElementById("registered-emails");
    registeredEmails.innerHTML = `
      <p class="stat-label recent-activity-cards">Suscriptions</p>
      <p class="stat-value">${suscriptionsCounter}</p>`;
  } catch (error) {
    console.log(error);
  }
  }

  await loadSuscriptionsCounter();
  await loadEventsCounter();
  await loadContactsCounter();
});