import { newContact } from '../api/contactAPI.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');

  if (!form) return;

  // Función para validar email
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Función para validar nombre
  function isValidName(name) {
    return name.length >= 2 && /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(name);
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    formMessage.textContent = '';

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    // Validaciones
    if (!name || !email || !message) {
      formMessage.textContent = 'Por favor, completa todos los campos.';
      formMessage.style.color = 'red';
      return;
    }

    if (!isValidName(name)) {
      formMessage.textContent = 'El nombre debe tener al menos 2 caracteres y solo letras.';
      formMessage.style.color = 'red';
      return;
    }

    if (!isValidEmail(email)) {
      formMessage.textContent = 'Por favor, ingresa un email válido.';
      formMessage.style.color = 'red';
      return;
    }

    if (message.length < 10) {
      formMessage.textContent = 'El mensaje debe tener al menos 10 caracteres.';
      formMessage.style.color = 'red';
      return;
    }

    // Mostrar mensaje de carga
    formMessage.textContent = 'Enviando mensaje...';
    formMessage.style.color = 'blue';

    const contact = { name, email, message };
    const { status } = await newContact(contact);
    
    if (status) {
      formMessage.textContent = '¡Mensaje enviado exitosamente!';
      formMessage.style.color = 'green';
      form.reset();
    } else {
      formMessage.textContent = 'Ocurrió un error al enviar el mensaje.';
      formMessage.style.color = 'red';
    }
  });
}); 