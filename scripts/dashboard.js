import { getEvents } from "../api/eventAPI.js";
import { getContacts } from "../api/contactAPI.js";
import { getSuscriptions } from "../api/suscriptionAPI.js";
import { loadToastNotifications } from "./bulma.js";

document.addEventListener("DOMContentLoaded", async () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user || !user.name) {
    window.location.href = "./login.html";
    return;
  }
  if (!user.admin) {
    window.location.href = "../index.html";
    return;
  }

  const welcomeMessage = document.getElementById("welcomeMessage");
  if (welcomeMessage) {
    welcomeMessage.textContent = `Welcome back, ${user.name}`;
  }
  
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem('user');
      window.location.href = "./login.html";
    });
  }
  
  const { createToast, showToast } = loadToastNotifications();
  createToast();

  // Carga y muestra el contador de eventos por estado
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
      showToast("Error", "Error al cargar eventos");
    }
  }

  // Carga y muestra el contador de mensajes de contacto
  async function loadContactsCounter() {
    try {
      const {data : contacts} = await getContacts();
      
      const contactsCounter = contacts.length;

      const contactMessages = document.getElementById("contact-messages");
      contactMessages.innerHTML = `
        <p class="stat-label recent-activity-cards">Messages</p>
        <p class="stat-value">${contactsCounter}</p>`;
    } catch (error) {
      showToast("Error", "Error al cargar mensajes de contacto");
    }
  }

  // Carga y muestra el contador de suscripciones
  async function loadSuscriptionsCounter() {
  try {
    const {data : suscriptions} = await getSuscriptions();
    
    const suscriptionsCounter = suscriptions.length;

    const registeredEmails = document.getElementById("registered-emails");
    registeredEmails.innerHTML = `
      <p class="stat-label recent-activity-cards">Suscriptions</p>
      <p class="stat-value">${suscriptionsCounter}</p>`;
  } catch (error) {
    showToast("Error", "Error al cargar suscripciones");
  }
  }

  await loadSuscriptionsCounter();
  await loadEventsCounter();
  await loadContactsCounter();
});