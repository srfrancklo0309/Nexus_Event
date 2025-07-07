document.addEventListener("DOMContentLoaded", () => {
  
  
  fetch("../assets/db/db.json")
    .then(response => response.json())
    .then(data => {
      const activeEvents = data.events;
      const activeCount = activeEvents.filter(event => event.status === "active").length;
      if (activeCount === 0) {
        document.getElementById("canceled-events").innerHTML = "No events available";
        return;
      }
      const activeEventsDiv = document.getElementById("active-events");
      activeEventsDiv.innerHTML = `
        <p class="stat-label">Active Events</p>
        <p class="stat-value">${activeCount}</p>`;
    })
    .catch(error => {
      document.getElementById("active-events").innerHTML = "Error loading events";
      console.error(error);
    });

    fetch("../assets/db/db.json")
    .then(response => response.json())
    .then(data => {
      const inactiveEvents = data.events;
      const inactiveCount = inactiveEvents.filter(event => event.status === "inactive").length;
      if (inactiveCount === 0) {
        document.getElementById("canceled-events").innerHTML = "No events available";
        return;
      }
      const inactiveEventsDiv = document.getElementById("inactive-events");
      inactiveEventsDiv.innerHTML = `
        <p class="stat-label">Inactive Events</p>
        <p class="stat-value">${inactiveCount}</p>`;
    })
    .catch(error => {
      document.getElementById("active-events").innerHTML = "Error loading events";
      console.error(error);
    });

    fetch("../assets/db/db.json")
    .then(response => response.json())
    .then(data => {
      const canceledEvents = data.events;
      const canceledCount = canceledEvents.filter(event => event.status === "canceled").length;
      if (canceledCount === 0) {
        document.getElementById("canceled-events").innerHTML = "No events available";
        return;
      }
      const canceledEventsDiv = document.getElementById("canceled-events");
      canceledEventsDiv.innerHTML = `
        <p class="stat-label">Canceled Events</p>
        <p class="stat-value">${canceledCount}</p>`;
    })
    .catch(error => {
      document.getElementById("active-events").innerHTML = "Error loading events";
      console.error(error);
    });

        fetch("../assets/db/db.json")
    .then(response => response.json())
    .then(data => {
      const suscriptionsEmails = data.suscriptions;
      const suscriptionsCounter = suscriptionsEmails.length;
      if (suscriptionsCounter === 0) {
        document.getElementById("registered-emails").innerHTML = "No subscriptions available";
        return;
      }
      const registeredEmailsDiv = document.getElementById("registered-emails");
      registeredEmailsDiv.innerHTML = `
        <p class="stat-value">${suscriptionsCounter}</p>`;
    })
    .catch(error => {
      document.getElementById("active-events").innerHTML = "Error loading suscriptions";
      console.error(error);
    });

    fetch("../assets/db/db.json")
    .then(response => response.json())
    .then(data => {
      const contactMessages = data.contacts;
      const messagesCounter = contactMessages.length;
      if (messagesCounter === 0) {
        document.getElementById("contact-messages").innerHTML = "No messages available";
        return;
      }
      const registeredEmailsDiv = document.getElementById("contact-messages");
      registeredEmailsDiv.innerHTML = `
        <p class="stat-value">${messagesCounter}</p>`;
    })
    .catch(error => {
      document.getElementById("active-events").innerHTML = "Error loading messages";
      console.error(error);
    });
});