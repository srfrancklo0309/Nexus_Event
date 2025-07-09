import { getContacts, deleteContact } from '../api/contactAPI.js';

import { loadToastNotifications } from './bulma.js';

document.addEventListener('DOMContentLoaded', async () => {
  const contactsTable = document.getElementById('contacts-table');
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
      contactsTable.innerHTML = '<tr><td colspan="4" class="has-text-centered">No hay contactos guardados.</td></tr>';
      return;
    }
    
    contactsTable.innerHTML = "";
    contacts.forEach(contact => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${contact.name}</td>
        <td>${contact.email}</td>
        <td>${contact.message}</td>
        <td style="text-align: center;">
          <div class="action-buttons">
            <a href="#" class="action-link delete-link" title="Eliminar contacto" data-contact-id="${contact.id}">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
                <path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192V208Z"></path>
              </svg>
            </a>
          </div>
        </td>
      `;
      contactsTable.appendChild(row);
    });

    initializeActionButtons();
  }

  // Función para inicializar los botones de acción
  function initializeActionButtons() {
    const deleteButtons = document.querySelectorAll(".delete-link");

    deleteButtons.forEach(button => {
      button.addEventListener("click", async (e) => {
        e.preventDefault();
        const contactId = button.getAttribute("data-contact-id");
        try {
          const response = await deleteContact(contactId);
          if (response.status) {
            showToast("Éxito", "Contacto eliminado exitosamente");
            loadContacts();
          } else {
            showToast("Error", "Error al eliminar el contacto: " + response.message);
          }
        } catch (error) {
          showToast("Error", "Error al eliminar el contacto");
        }
      });
    });
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
    contactsTable.innerHTML = '<tr><td colspan="4" class="has-text-centered">Cargando contactos...</td></tr>';
    const { status, data } = await getContacts();
    if (status) {
      allContacts = data;
      filteredContacts = [...data];
      renderTable(data);
    } else {
      showToast("Error", "Error al cargar contactos");
      contactsTable.innerHTML = '';
    }
  }

  // Inicializar
  loadContacts();
}); 