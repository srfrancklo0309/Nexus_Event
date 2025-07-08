document.addEventListener("DOMContentLoaded", () => {
  
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
}); 