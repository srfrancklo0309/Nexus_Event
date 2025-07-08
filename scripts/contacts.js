document.addEventListener("DOMContentLoaded", () => {
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