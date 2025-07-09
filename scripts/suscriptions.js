import { getSuscriptions, deleteSuscriptions } from "../api/suscriptionAPI.js";
import { loadToastNotifications } from "./bulma.js";

document.addEventListener("DOMContentLoaded", async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.name) {
        window.location.href = "./login.html";
        return;
    }

    if (!user.admin) {
        window.location.href = "../index.html";
        return
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

    await showSuscriptions();

    // Carga y muestra todas las suscripciones
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