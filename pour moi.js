  // Empêche l'accès à la page devis si l'utilisateur n'est pas connecté

window.addEventListener("DOMContentLoaded", () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userNumber = localStorage.getItem("userNumber");
  
    if (!isLoggedIn || isLoggedIn !== "true" || !userNumber) {
      alert("Vous devez être connecté pour accéder à la demande de devis.");
      window.location.href = "connexion.html";
    } else {
      document.getElementById("user-number").value = userNumber;
    }
  });