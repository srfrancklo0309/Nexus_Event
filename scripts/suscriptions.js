import { getSuscriptions, deleteSuscriptions } from "../api/suscriptionAPI.js";
import { loadToastNotifications } from "./bulma.js";

document.addEventListener("DOMContentLoaded", async () => {
    const userName = sessionStorage.getItem('name');

    if (!userName) {
        window.location.href = "./login.html";
        return;
    }

    const welcomeMessage = document.getElementById("welcomeMessage");
    if (welcomeMessage) {
        welcomeMessage.textContent = `Welcome back, ${userName}`;
    }

    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", (e) => {
            e.preventDefault();
            sessionStorage.clear();
            window.location.href = "./login.html";
        });
    }

    const { createToast, showToast } = loadToastNotifications();
    createToast();

    await showSuscriptions();

    async function showSuscriptions() {
        try {
            const { data: suscriptions } = await getSuscriptions();
            const cardSuscriptor = document.getElementById("subscriptions-grid");
            let suscriptor = "";

            if (suscriptions.length > 0) {
                suscriptions.forEach((suscription) => {
                    suscriptor += `
                <div class="subscription-card">
                    <div class="subscription-info">
                        <span class="subscription-id" data-id="${suscription.id}">ID: ${suscription.id}</span>
                        <span class="subscription-email">${suscription.email}</span>
                    </div>
                    <div class="subscription-details">
                        <button class="status-button delete-btn" data-id="${suscription.id}">Delete</button>
                    </div>
                </div>`;
                });
            } else {
                suscriptor = `
                <div class="subscription-card">
                    <div class="subscription-info">
                        <span class="subscription-id">No subscriptions registered</span>
                    </div>
                </div>`
            }

            cardSuscriptor.innerHTML = suscriptor;
        } catch (error) {
            showToast("Error", "Error al cargar suscripciones");
        }
    };

    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const dataId = button.getAttribute('data-id');
            try {
                await deleteSuscriptions(dataId);
                showToast("Éxito", "Suscripción eliminada correctamente");
                await showSuscriptions();
            } catch (error) {
                showToast("Error", "Error al eliminar la suscripción");
            }
        });
    });
});