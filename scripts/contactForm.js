import { newContact } from './api/contactAPI.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    formMessage.textContent = '';

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      formMessage.textContent = 'Por favor, completa todos los campos.';
      formMessage.style.color = 'red';
      return;
    }

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