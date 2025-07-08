import { getContacts } from '../api/contactAPI.js';

document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('contactsTableContainer');
  const searchInput = document.querySelector('.search-input');
  const newTab = document.querySelector('.tab-link:first-child');
  const oldTab = document.querySelector('.tab-link:last-child');
  
  let allContacts = [];
  let filteredContacts = [];

  // Función para renderizar la tabla
  function renderTable(contacts) {
    if (!contacts || contacts.length === 0) {
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
            ${contacts.map(({name, email, message}) => `
              <tr>
                <td>${name}</td>
                <td>${email}</td>
                <td>${message}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
    container.innerHTML = tableHTML;
  }

  // Función para filtrar contactos por email
  function filterContacts(searchTerm) {
    if (!searchTerm) {
      filteredContacts = [...allContacts];
    } else {
      filteredContacts = allContacts.filter(contact => 
        contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    renderTable(filteredContacts);
  }

  // Función para filtrar por fecha (New/Old)
  function filterByDate(isNew) {
    if (isNew) {
      // Mostrar los últimos 5 contactos como "nuevos"
      filteredContacts = allContacts.slice(-5);
    } else {
      // Mostrar el resto como "viejos"
      filteredContacts = allContacts.slice(0, -5);
    }
    renderTable(filteredContacts);
  }

  // Event listeners
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      filterContacts(e.target.value);
    });
  }

  if (newTab) {
    newTab.addEventListener('click', (e) => {
      e.preventDefault();
      newTab.classList.add('active');
      oldTab.classList.remove('active');
      filterByDate(true);
    });
  }

  if (oldTab) {
    oldTab.addEventListener('click', (e) => {
      e.preventDefault();
      oldTab.classList.add('active');
      newTab.classList.remove('active');
      filterByDate(false);
    });
  }

  // Obtener contactos de la API
  async function loadContacts() {
    container.innerHTML = '<p>Cargando contactos...</p>';
    const { status, data } = await getContacts();
    if (status) {
      allContacts = data;
      filteredContacts = [...data];
      renderTable(data);
    } else {
      container.innerHTML = '<p class="has-text-danger">Error al cargar contactos</p>';
    }
  }

  // Inicializar
  loadContacts();
}); 