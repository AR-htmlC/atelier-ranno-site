
// === CARROUSEL AVIS INFINI ===
const slider = document.getElementById('avis-slider');

if (slider) {
  const duplicate = slider.innerHTML;
  slider.innerHTML += duplicate;

  let scrollAmount = 0;
  const speed = 1;

  function scrollAvis() {
    scrollAmount += speed;

    if (scrollAmount >= slider.scrollWidth / 2) {
      scrollAmount = 0;
    }

    slider.style.transform = `translateX(-${scrollAmount}px)`;
    requestAnimationFrame(scrollAvis);
  }

  scrollAvis();
}

// === CONNEXION / DECONNEXION VISUELLE ===
let isLoggedIn = false;

function updateAccountArea() {
  const accountArea = document.getElementById('account-area');
  if (!accountArea) return;

  if (isLoggedIn) {
    accountArea.innerHTML = `
      <img src="image/compte-icon.png" alt="Mon compte" style="height: 30px;">
    `;
  } else {
    accountArea.innerHTML = `
      <a href="connexion.html" class="auth-link">Connexion</a> /
      <a href="inscription.html" class="auth-link">Inscription</a>
    `;
  }
}

function toggleLogin() {
  isLoggedIn = !isLoggedIn;
  updateAccountArea();
}

// === SAISONS ANIMÉES ===
function createFloatingElement(emoji, sizeRange = [14, 24], durationRange = [4, 10]) {
  const el = document.createElement('div');
  el.classList.add('season-anim');
  el.innerText = emoji;
  el.style.left = Math.random() * 100 + 'vw';
  el.style.fontSize = (Math.random() * (sizeRange[1] - sizeRange[0]) + sizeRange[0]) + 'px';
  el.style.animationDuration = (Math.random() * (durationRange[1] - durationRange[0]) + durationRange[0]) + 's';
  document.getElementById('seasonEffect')?.appendChild(el);
  setTimeout(() => el.remove(), 15000);
}

function launchSeasonEffect() {
  const now = new Date();
  const month = now.getMonth(); // 0 = janvier
  const day = now.getDate();
  const weekday = now.getDay(); // 0 = dimanche

  function isWeekend() {
    return weekday === 0 || weekday === 6;
  }

  // 🎯 TEST SPECIAL : toujours afficher aujourd'hui un emoji temporaire
  setInterval(() => createFloatingElement('❤️'), 500);

  // 🎆 Nouvel An (1 janvier❤️✅)
  if (month === 0 && day === 1) {
    setInterval(() => createFloatingElement('🎆'), 300);
  }

  // 🎁 Noël (25 décembre)
  else if (month === 11 && day === 25) {
    setInterval(() => createFloatingElement('🎁'), 300);
  }

  // 🦇 Halloween (31 octobre)
  else if (month === 9 && day === 31) {
    setInterval(() => createFloatingElement('🦇'), 400);
  }

  // ❤️ Saint-Valentin (14 février)
  else if (month === 1 && day === 14) {
    setInterval(() => createFloatingElement('❤️'), 400);
  }

  // 🎉 Carnaval (exemple : 13 février)
  else if (month === 1 && day === 13) {
    setInterval(() => createFloatingElement('🎉'), 400);
  }

  // 🥚 Pâques (weekend en mars/avril)
  else if ((month === 2 || month === 3) && isWeekend()) {
    setInterval(() => {
      const eggs = ['🥚', '🐣', '🐰', '🌈'];
      createFloatingElement(eggs[Math.floor(Math.random() * eggs.length)]);
    }, 500);
  }

  // 🎇 Fêtes nationales (14 juillet FR / 21 juillet BE)
  else if (month === 6 && (day === 14 || day === 21)) {
    setInterval(() => createFloatingElement('🎇'), 400);
  }

  // 🌸 Fleurs pour printemps et fêtes
  else if (
    (month === 2 && day === 21) || // 21 mars (printemps)
    (month === 4 && (day === 26 || day === 9)) // Fête des mères/pères
  ) {
    setInterval(() => createFloatingElement('🌸'), 400);
  }

  // ❄️ Hiver classique (si rien d'autre en décembre, janvier, février)
  else if ([11, 0, 1].includes(month)) {
    setInterval(() => createFloatingElement('❄️'), 300);
  }

  // ☀️ Soleil en été
  if ([6, 7].includes(month)) {
    const sun = document.createElement('div');
    sun.innerText = '☀️';
    sun.style.position = 'fixed';
    sun.style.top = '20px';
    sun.style.right = '30px';
    sun.style.fontSize = '40px';
    sun.style.zIndex = '9999';
    document.getElementById('seasonEffect')?.appendChild(sun);
  }
}

// === INITIALISATION AU CHARGEMENT ===
window.addEventListener("load", function () {
  updateAccountArea();
  launchSeasonEffect();

  // Loader
  const loader = document.getElementById("preloader");
  if (loader) {
    loader.style.opacity = 0;
    setTimeout(() => {
      loader.style.display = "none";
    }, 500);
  }

// MENU PEINTURE
const menuOverlay = document.getElementById("menuOverlay");
const menuTrigger = document.querySelector(".menu-icon");
const menuClose = document.querySelector(".menu-close");

function toggleMenu() {
  if (menuOverlay) {
    menuOverlay.classList.toggle("active");
  }
  if (menuTrigger) {
    menuTrigger.classList.toggle("active");
  }
}

if (menuTrigger) {
  menuTrigger.addEventListener("click", toggleMenu);
}

if (menuClose) {
  menuClose.addEventListener("click", toggleMenu);
}

// Clique sur le hamburger
if (menuTrigger && menuOverlay) {
  menuTrigger.addEventListener("click", toggleMenu);
}

// Clique sur le retour "← Retour"
if (menuClose) {
  menuClose.addEventListener("click", toggleMenu);
}

// Déconnexion
function logout() {
  localStorage.setItem("isLoggedIn", "false");
  window.location.href = "index.html";
}

// Vérifie les listes vides
function verifierListeVide(classeListe, idMessage) {
  const liste = document.querySelector(classeListe);
  const message = document.getElementById(idMessage);
  if (liste && liste.children.length === 0) {
    message.style.display = "block";
  }
}

// Appels directs
verifierListeVide('.liste-devis', 'vide-devis');
verifierListeVide('.liste-factures', 'vide-factures');
verifierListeVide('.liste-commandes', 'vide-commandes');
});

  function closeNewsletter() {
    document.getElementById('newsletter-popup').style.display = 'none';
    sessionStorage.setItem("newsletterClosed", "true");
  }

  function subscribeNewsletter() {
    const email = document.getElementById('newsletter-email').value;
    if (email && email.includes("@")) {
      localStorage.setItem("newsletterSubscribed", "true");
      alert("Merci pour votre inscription !");
      closeNewsletter();
    } else {
      alert("Veuillez entrer une adresse e-mail valide.");
    }
  }

  function unsubscribeNewsletter() {
    if (confirm("Souhaitez-vous vraiment vous désinscrire de la newsletter ?")) {
      localStorage.removeItem("newsletterSubscribed");
      alert("Vous avez été désinscrit de la newsletter.");
      document.getElementById("newsletter-section").style.display = "none";
    }
  }

  window.addEventListener("load", () => {
    const subscribed = localStorage.getItem("newsletterSubscribed") === "true";
    if (subscribed) {
      document.getElementById("newsletter-section").style.display = "block";
    }
  });

  function openContactPopup(e) {
    e.preventDefault(); // empêche le lien de recharger la page
    const popup = document.getElementById("contactPopup");
    if (popup) {
      popup.style.display = "flex"; // ou "block", selon ton style
    }
  }
  
  function closeContactPopup() {
    const popup = document.getElementById("contactPopup");
    if (popup) {
      popup.style.display = "none";
    }
  }
  
  document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();
  
    const email = document.getElementById("emailContact").value;
    const objet = document.getElementById("objetContact").value;
    const message = document.getElementById("messageContact").value;
  
    const subject = encodeURIComponent(objet);
    const body = encodeURIComponent(`De : ${email}\n\n${message}`);
  
    window.location.href = `mailto:atelierranno@gmail.com?subject=${subject}&body=${body}`;
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  });

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });

  document.querySelectorAll('.menu-bubble').forEach(bubble => {
    bubble.addEventListener('click', () => {
      document.getElementById('menuOverlay').classList.remove('active');
    });
  });
