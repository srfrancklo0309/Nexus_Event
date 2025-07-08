import { getSuscriptions, deleteSuscriptions } from "../api/suscriptionAPI.js";

document.addEventListener("DOMContentLoaded", async () => {

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
                suscriptor =`
                <div class="subscription-card">
                    <div class="subscription-info">
                        <span class="subscription-id">No subscriptions registered</span>
                    </div>
                </div>`
            }

            cardSuscriptor.innerHTML = suscriptor;
        } catch (error) {
            console.error(error);
        }
    };

    await showSuscriptions();

    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const dataId = button.getAttribute('data-id');
            console.log(dataId, typeof dataId);

            await deleteSuscriptions(dataId);
        });
    });
});