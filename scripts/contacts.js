import { getContacts } from '../api/contactAPI.js';

document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('contactsTableContainer');

  // Función para renderizar la tabla
  function renderTable(data) {
    if (!data || data.length === 0) {
      container.innerHTML = '<p class="has-text-centered">No hay contactos guardados.</p>';
      return;
    }
    let tableHTML = `
      <div class="table-container">
        <table class="table is-fullwidth is-striped">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Mensaje</th>
            </tr>
          </thead>
          <tbody>
            ${data.map(contact => `
              <tr>
                <td>${contact.name}</td>
                <td>${contact.email}</td>
                <td>${contact.message}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
    container.innerHTML = tableHTML;
  }

  // Obtener contactos de la API
  async function loadContacts() {
    container.innerHTML = '<p>Cargando contactos...</p>';
    const { status, data } = await getContacts();
    if (status) {
      renderTable(data);
    } else {
      container.innerHTML = '<p class="has-text-danger">Error al cargar contactos</p>';
    }
  }

  // Inicializar
  loadContacts();
}); 