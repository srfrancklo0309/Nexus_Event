import { getContacts } from '../api/contactAPI.js';
import { loadToastNotifications } from './bulma.js';

document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('contactsTableContainer');
  const searchInput = document.querySelector('.search-input');
  
  const userName = sessionStorage.getItem('name');

  if (!userName) {
    window.location.href = "./login.html";
    return;
  }

  const welcomeMessage = document.getElementById("welcomeMessage");
  if (welcomeMessage) {
    welcomeMessage.textContent = `Welcome back, ${userName}`;
  }
  
  // Event listener para el botón de logout
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      
      sessionStorage.clear();
      window.location.href = "./login.html";
    });
  }

  let allContacts = [];
  let filteredContacts = [];

  const { createToast, showToast } = loadToastNotifications();
  createToast();

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

  // Event listeners
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      filterContacts(e.target.value);
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
      showToast("Error", "Error al cargar contactos");
      container.innerHTML = '';
    }
  }

  // Inicializar
  loadContacts();
}); 