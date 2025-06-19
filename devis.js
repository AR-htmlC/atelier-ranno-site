// devis.js

// Ajoute un nouveau champ de support avec sa quantité
function ajouterSupport() {
    const container = document.getElementById("supports-container");

    const bloc = document.createElement("div");
    bloc.classList.add("support-bloc");

    bloc.innerHTML = `
      <input type="text" name="support[]" placeholder="Nom du support" required>
      <input type="number" name="quantite[]" placeholder="Quantité" min="1" required>
    `;

    container.appendChild(bloc);
}

// Affiche ou cache les fichiers à uploader selon la case cochée
function toggleFichierDesign() {
    const fichiers = document.getElementById("zone-fichiers");
    const caseCochee = document.getElementById("designCheck");

    fichiers.style.display = caseCochee.checked ? "block" : "none";

    // Rendre le champ fichier obligatoire si coché
    const fileInput = document.getElementById("fichier-design");
    if (fileInput) {
        fileInput.required = caseCochee.checked;
    }
}

// Vérification du formulaire avant envoi
function verifierFormulaire(event) {
    const supports = document.querySelectorAll("input[name='support[]']");
    const quantites = document.querySelectorAll("input[name='quantite[]']");
    const description = document.getElementById("description");
    const designCheck = document.getElementById("designCheck");
    const fichierDesign = document.getElementById("fichier-design");

    let formulaireValide = true;
    let messageErreur = "";

    // Vérifier au moins un support et une quantité valides
    if (supports.length === 0 || quantites.length === 0) {
        formulaireValide = false;
        messageErreur += "\n- Au moins un support et sa quantité sont requis.";
    }

    // Vérifier la description
    if (!description.value.trim()) {
        formulaireValide = false;
        messageErreur += "\n- La description de la commande est obligatoire.";
    }

    // Vérifier fichier design si coché
    if (designCheck.checked && !fichierDesign.files.length) {
        formulaireValide = false;
        messageErreur += "\n- Merci d'importer un fichier pour votre design.";
    }

    if (!formulaireValide) {
        event.preventDefault();
        alert("Veuillez corriger les erreurs suivantes :" + messageErreur);
    }
}