import { getEvents, newEvent, updateEvent, deleteEvent } from "../api/eventAPI.js";
import { loadToastNotifications } from "./bulma.js";

const eventsTable = document.getElementById("events-table");
const newEventBtn = document.querySelector(".new-event-btn");
const newEventModal = document.getElementById("newEventModal");
const cancelNewEvent = document.getElementById("cancelNewEvent");
const newEventForm = document.getElementById("newEventForm");

const editEventModal = document.getElementById("editEventModal");
const closeEditEventModal = document.getElementById("closeEditEventModal");
const cancelEditEvent = document.getElementById("cancelEditEvent");
const editEventForm = document.getElementById("editEventForm");
const editEventId = document.getElementById("editEventId");
const editEventName = document.getElementById("editEventName");
const editEventDescription = document.getElementById("editEventDescription");
const editEventDate = document.getElementById("editEventDate");
const editEventTime = document.getElementById("editEventTime");
const editEventLocation = document.getElementById("editEventLocation");
const editEventCapacity = document.getElementById("editEventCapacity");
const editEventPrice = document.getElementById("editEventPrice");
const editEventGenre = document.getElementById("editEventGenre");
const editEventArtist = document.getElementById("editEventArtist");
const editEventStatus = document.getElementById("editEventStatus");

const modalBackground = document.querySelector(".modal-background");

const { createToast, showToast } = loadToastNotifications();

let allEvents = [];

// Valida que todos los campos requeridos estén completos
function validateRequiredFields(formData) {
    const requiredFields = ['name', 'description', 'date', 'time', 'location', 'capacity', 'price', 'genre', 'artist'];
    const emptyFields = [];
    
    requiredFields.forEach(field => {
        const value = formData.get(field);
        if (!value || value.trim() === '') {
            emptyFields.push(field);
        }
    });
    
    return emptyFields;
}

// Valida que la fecha del evento no sea en el pasado
function validateDate(dateString, timeString) {
    const selectedDateTime = new Date(`${dateString}T${timeString}`);
    const currentDateTime = new Date();
    
    currentDateTime.setMinutes(currentDateTime.getMinutes() - 1);
    
    return selectedDateTime > currentDateTime;
}

// Muestra errores de validación en un toast
function showValidationErrors(errors) {
    let errorMessage = "Por favor corrige los siguientes errores:\n\n";
    
    if (errors.emptyFields && errors.emptyFields.length > 0) {
        errorMessage += "Campos requeridos vacíos:\n";
        errors.emptyFields.forEach(field => {
            const fieldNames = {
                'name': 'Nombre del evento',
                'description': 'Descripción',
                'date': 'Fecha',
                'time': 'Hora',
                'location': 'Ubicación',
                'capacity': 'Capacidad',
                'price': 'Precio',
                'genre': 'Género',
                'artist': 'Artistas'
            };
            errorMessage += `- ${fieldNames[field]}\n`;
        });
        errorMessage += "\n";
    }
    
    if (errors.invalidDate) {
        errorMessage += "La fecha y hora del evento no pueden ser en el pasado.\n";
    }
    
    showToast("Error de validación", errorMessage);
}

// Muestra el modal para crear nuevo evento
function showNewEventModal() {
    newEventModal.classList.add("show");
    document.body.style.overflow = "hidden";
    
    const today = new Date().toISOString().split('T')[0];
    const eventDateInput = document.getElementById("eventDate");
    eventDateInput.min = today;
}

// Oculta el modal de nuevo evento
function hideNewEventModal() {
    newEventModal.classList.remove("show");
    document.body.style.overflow = "";
    newEventForm.reset();
}

// Muestra el modal para editar evento
function showEditEventModal() {
    editEventModal.classList.add("show");
    document.body.style.overflow = "hidden";
    
    const today = new Date().toISOString().split('T')[0];
    const editEventDateInput = document.getElementById("editEventDate");
    editEventDateInput.min = today;
}

// Oculta el modal de editar evento
function hideEditEventModal() {
    editEventModal.classList.remove("show");
    document.body.style.overflow = "";
    editEventForm.reset();
}

// Carga todos los eventos desde la API
async function loadEvents() {
    try {
        const response = await getEvents();

        if (response.status && response.data && response.data.length > 0) {
            allEvents = response.data;
            
            filterEventsByStatus('active');
        }
    } catch (error) {
        console.error("Error al cargar eventos:", error);
    }
}

// Filtra eventos por estado y los renderiza
function filterEventsByStatus(status) {
    const filteredEvents = allEvents.filter(event => event.status === status);
    
    eventsTable.innerHTML = "";
    filteredEvents.forEach(event => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${event.name}</td>
          <td>
            <button class="status-button">${event.status}</button>
          </td>
          <td>
            <div class="action-buttons">
              <a href="#" class="action-link edit-link" title="Editar evento" data-event-id="${event.id}">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M227.31,73.37,182.63,28.69a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120ZM192,76.69,147.31,32l24-24L216,52.69Z"></path>
                </svg>
              </a>
              <a href="#" class="action-link delete-link" title="Eliminar evento" data-event-id="${event.id}">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192V208Z"></path>
                </svg>
              </a>
            </div>
          </td>
          <td></td>
        `;
        eventsTable.appendChild(row);
    });

    initializeActionButtons();
}

// Carga los datos de un evento para editar
async function loadEventDataForEdit(eventId) {
    try {
        const response = await getEvents();

        if (response.status && response.data) {
            const event = response.data.find(e => e.id === eventId);

            if (event) {
                editEventId.value = event.id;
                editEventName.value = event.name;
                editEventDescription.value = event.description;
                editEventDate.value = event.date;
                editEventTime.value = event.time;
                editEventLocation.value = event.location;
                editEventCapacity.value = event.capacity;
                editEventPrice.value = event.price;
                editEventGenre.value = event.genre;
                editEventArtist.value = event.artist;
                editEventStatus.value = event.status;

                showEditEventModal();
            } else {
                showToast("Error", "Evento no encontrado");
            }
        }
    } catch (error) {
        showToast("Error", "Error al cargar los datos del evento");
    }
}

// Configura los eventos de los botones de acción
function initializeActionButtons() {
    const editButtons = document.querySelectorAll(".edit-link");
    const deleteButtons = document.querySelectorAll(".delete-link");

    editButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            const eventId = button.getAttribute("data-event-id");
            loadEventDataForEdit(eventId);
        });
    });

    deleteButtons.forEach(button => {
        button.addEventListener("click", async (e) => {
            e.preventDefault();
            const eventId = button.getAttribute("data-event-id");
            try {
                const response = await deleteEvent(eventId);
                if (response.status) {
                    showToast("Éxito", "Evento eliminado exitosamente");
                    loadEvents();
                } else {
                    showToast("Error", "Error al eliminar el evento: " + response.message);
                }
            } catch (error) {
                showToast("Error", "Error al eliminar el evento");
            }
        });
    });
}

// Maneja el envío del formulario de nuevo evento
async function handleNewEventFormSubmit(e) {
    e.preventDefault();

    const formData = new FormData(newEventForm);
    
    const emptyFields = validateRequiredFields(formData);
    
    const dateValue = formData.get("date");
    const timeValue = formData.get("time");
    const isDateValid = validateDate(dateValue, timeValue);
    
    if (emptyFields.length > 0 || !isDateValid) {
        const errors = {
            emptyFields: emptyFields,
            invalidDate: !isDateValid
        };
        showValidationErrors(errors);
        return;
    }

    const eventData = {
        name: formData.get("name"),
        description: formData.get("description"),
        date: formData.get("date"),
        time: formData.get("time"),
        location: formData.get("location"),
        capacity: parseInt(formData.get("capacity")),
        price: parseFloat(formData.get("price")),
        genre: formData.get("genre"),
        artist: formData.get("artist"),
        status: "active"
    };

    try {
        const response = await newEvent(eventData);

        if (response.status) {
            showToast("Éxito", "Evento creado exitosamente");
            hideNewEventModal();
            loadEvents();
        } else {
            showToast("Error", "Error al crear el evento: " + response.message);
        }
    } catch (error) {
        showToast("Error", "Error al crear el evento");
    }
}

// Maneja el envío del formulario de editar evento
async function handleEditEventFormSubmit(e) {
    e.preventDefault();

    const formData = new FormData(editEventForm);
    
    const emptyFields = validateRequiredFields(formData);
    
    const dateValue = formData.get("date");
    const timeValue = formData.get("time");
    const isDateValid = validateDate(dateValue, timeValue);
            
    if (emptyFields.length > 0 || !isDateValid) {
        const errors = {
            emptyFields: emptyFields,
            invalidDate: !isDateValid
        };
        showValidationErrors(errors);
        return;
    }

    const eventData = {
        id: formData.get("id"),
        name: formData.get("name"),
        description: formData.get("description"),
        date: formData.get("date"),
        time: formData.get("time"),
        location: formData.get("location"),
        capacity: parseInt(formData.get("capacity")),
        price: parseFloat(formData.get("price")),
        genre: formData.get("genre"),
        artist: formData.get("artist"),
        status: formData.get("status")
    };

    try {
        const response = await updateEvent(eventData);

        if (response.status) {
            showToast("Éxito", "Evento actualizado exitosamente");
            hideEditEventModal();
            loadEvents();
        } else {
            showToast("Error", "Error al actualizar el evento: " + response.message);
        }
    } catch (error) {
        showToast("Error", "Error al actualizar el evento");
    }
}

// Configura la funcionalidad de búsqueda
function initializeSearch() {
    const searchInput = document.querySelector(".search-input");

    searchInput.addEventListener("input", (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const tableRows = document.querySelectorAll("tbody tr");

        tableRows.forEach(row => {
            const eventName = row.querySelector("td:first-child").textContent.toLowerCase();
            if (eventName.includes(searchTerm)) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        });
    });
}

// Configura las pestañas de filtrado por estado
function initializeTabs() {
    const tabLinks = document.querySelectorAll(".tab-link");

    tabLinks.forEach(tab => {
        tab.addEventListener("click", (e) => {
            e.preventDefault();

            tabLinks.forEach(t => t.classList.remove("active"));
            
            tab.classList.add("active");

            const status = tab.getAttribute("data-status");
            console.log("Pestaña seleccionada:", status);
            
            filterEventsByStatus(status);
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
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

    initializeSearch();
    initializeTabs();
    loadEvents();
    
    newEventBtn.addEventListener("click", showNewEventModal);
    cancelNewEvent.addEventListener("click", hideNewEventModal);
    closeEditEventModal.addEventListener("click", hideEditEventModal);
    cancelEditEvent.addEventListener("click", hideEditEventModal);

    modalBackground.addEventListener("click", (e) => {
        if (e.target === modalBackground) {
            if (newEventModal.classList.contains("show")) {
                hideNewEventModal();
            } else if (editEventModal.classList.contains("show")) {
                hideEditEventModal();
            }
        }
    });

    newEventForm.addEventListener("submit", handleNewEventFormSubmit);
    editEventForm.addEventListener("submit", handleEditEventFormSubmit);

    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.removeItem('user');
            window.location.href = "./login.html";
        });
    }

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            if (newEventModal.classList.contains("show")) {
                hideNewEventModal();
            } else if (editEventModal.classList.contains("show")) {
                hideEditEventModal();
            }
        }
    });
    
    createToast();
});

