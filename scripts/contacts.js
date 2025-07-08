document.addEventListener("DOMContentLoaded", () => {
  
  // Obtener el nombre del usuario desde sessionStorage
  const userName = sessionStorage.getItem('name') || 'Admin';
  const welcomeMessage = document.getElementById("welcomeMessage");
  if (welcomeMessage) {
    welcomeMessage.textContent = `Welcome back, ${userName}`;
  }
  
  // Event listener para el botón de logout
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      
      // Limpiar session storage
      sessionStorage.clear();
      
      // Redirigir al login
      window.location.href = "./login.html";
    });
  }
}); 