<!DOCTYPE html>
<?php
session_start();
require_once 'config.php';

if (!isset($_SESSION['utilisateur_id'])) {
    header('Location: connexion.php');
    exit;
}

$id = $_SESSION['utilisateur_id'];
$requete = $pdo->prepare("SELECT * FROM utilisateurs WHERE id = ?");
$requete->execute([$id]);
$utilisateur = $requete->fetch(PDO::FETCH_ASSOC);
?>

<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Mon compte - Atelier Ranno</title>
  <link rel="stylesheet" href="style.css" />
  <style>
    body.compte-page {
      background: url("image/fond.png") center/cover no-repeat fixed;
      color: white;
      font-family: 'Clear Sans', sans-serif;
      margin: 0;
      padding: 20px;
    }

    .retour-accueil {
      position: absolute;
      top: 20px;
      left: 20px;
      background-color: rgba(255, 255, 255, 0.1);
      padding: 10px 16px;
      border-radius: 6px;
      color: white;
      text-decoration: none;
      font-weight: bold;
      font-size: 14px;
      transition: background 0.3s ease;
    }

    .retour-accueil:hover {
      background-color: rgba(255, 255, 255, 0.3);
      text-decoration: underline;
    }

    .compte-layout {
      display: flex;
      flex-wrap: wrap;
      gap: 40px;
      max-width: 1200px;
      margin: 80px auto 40px;
    }

    .compte-left, .compte-right {
      flex: 1 1 45%;
      background-color: rgba(0, 0, 0, 0.5);
      padding: 30px;
      border-radius: 15px;
    }

    .compte-left h2, .compte-right h2, .compte-section h3 {
      color: #ffcc00;
      margin-bottom: 20px;
    }

    .personal-info p, .compte-section p, .compte-section ul li {
      margin-bottom: 10px;
      font-size: 15px;
      line-height: 1.5;
    }

    .modifier-btn, .open-ticket-btn, .back-link {
      display: inline-block;
      margin-top: 15px;
      background-color: white;
      color: black;
      padding: 10px 20px;
      border-radius: 6px;
      text-decoration: none;
      font-weight: bold;
      transition: background-color 0.3s ease;
      border: none;
      cursor: pointer;
    }

    .modifier-btn:hover, .open-ticket-btn:hover, .back-link:hover {
      background-color: #ffcc00;
    }

    .compte-section {
      margin-top: 30px;
    }

    .liste-devis, .liste-factures, .liste-commandes {
      list-style: none;
      padding-left: 0;
      margin-top: 10px;
    }

    .liste-devis li, .liste-factures li, .liste-commandes li {
      margin-bottom: 8px;
    }

    .liste-devis li a, .liste-factures li a, .liste-commandes li a {
      color: #ffffff;
      text-decoration: none;
      font-size: 14px;
      transition: color 0.3s ease;
    }

    .liste-devis li a:hover, .liste-factures li a:hover, .liste-commandes li a:hover {
      color: #ffcc00;
      text-decoration: underline;
    }

    .vide {
      font-style: italic;
      font-size: 14px;
      margin-top: 10px;
    }

    .compte-support {
      max-width: 1200px;
      margin: 20px auto;
      background-color: rgba(0, 0, 0, 0.5);
      padding: 30px;
      border-radius: 15px;
    }

    .support-box {
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin-top: 20px;
    }

    .ticket {
      background-color: rgba(255, 255, 255, 0.1);
      padding: 20px;
      border-radius: 10px;
    }

    .ticket p {
      margin-bottom: 8px;
      font-size: 14px;
    }

    .atelier-response {
      margin-top: 10px;
      padding: 10px;
      background-color: rgba(255, 204, 0, 0.2);
      border-radius: 8px;
    }

    .open-ticket-box {
      margin-top: 20px;
    }

    @media (max-width: 768px) {
      .compte-layout {
        flex-direction: column;
      }
    }
  </style>
</head>

<body class="compte-page">

  <div class="compte-layout">
    <!-- Colonne gauche -->
    <div class="compte-left">
      <h2>Bienvenue dans votre espace !</h2>

      <div class="personal-info">
        <p><strong>Numéro d’identification :</strong> <?= htmlspecialchars($utilisateur['numero_identification']) ?></p>
        <p><strong>Prénom :</strong> <?= htmlspecialchars($utilisateur['prenom']) ?></p>
        <p><strong>Nom :</strong> <?= htmlspecialchars($utilisateur['nom']) ?></p>
        <p><strong>Email :</strong> <?= htmlspecialchars($utilisateur['email']) ?></p>
        <p><strong>Rue :</strong> <?= htmlspecialchars($utilisateur['rue']) ?></p>
        <p><strong>Numéro :</strong> <?= htmlspecialchars($utilisateur['numero']) ?></p>
        <p><strong>Code postal :</strong> <?= htmlspecialchars($utilisateur['code_postal']) ?></p>
        <p><strong>Ville :</strong> <?= htmlspecialchars($utilisateur['ville']) ?></p>
        <p><strong>Pays :</strong> <?= htmlspecialchars($utilisateur['pays']) ?></p>

        <a href="modifier-infos.html" class="modifier-btn">Modifier mes infos</a>
      </div>

      <div class="compte-section">
        <h3>Actions</h3>
        <button class="modifier-btn" onclick="logout()">Se déconnecter</button>

        <div class="compte-section" id="newsletter-section" style="display:none;">
          <h3>Newsletter</h3>
          <p>Vous êtes inscrit à notre newsletter.</p>
          <button class="modifier-btn" onclick="unsubscribeNewsletter()">Se désinscrire</button>
        </div>
        <a href="index.html" class="retour-accueil">← Retour à l'accueil</a>
      </div>
    </div>

    <!-- Colonne droite -->
    <div class="compte-right">
      <h2>Historique</h2>

      <div class="compte-section">
        <h3>Devis</h3>
        <ul class="liste-devis">
          <li><a href="pdf/devis-3456.pdf" download>Devis #3456 – 129€ – 21/03/2025</a></li>
          <li><a href="pdf/devis-3455.pdf" download>Devis #3455 – 90€ – 10/03/2025</a></li>
          <li><a href="pdf/devis-3454.pdf" download>Devis #3454 – 75€ – 01/03/2025</a></li>
        </ul>
        <p class="vide" id="vide-devis">Pas de devis actuellement</p>
        <a href="devis.html" class="voir-plus">Voir tous les devis</a>
      </div>

      <div class="compte-section">
        <h3>Factures</h3>
        <ul class="liste-factures">
          <li><a href="pdf/facture-876.pdf" download>Facture #876 – 89€ – 15/02/2025</a></li>
          <li><a href="pdf/facture-875.pdf" download>Facture #875 – 45€ – 01/01/2025</a></li>
          <li><a href="pdf/facture-874.pdf" download>Facture #874 – 110€ – 22/12/2024</a></li>
        </ul>
        <p class="vide" id="vide-factures">Pas de factures actuellement</p>
        <a href="factures.html" class="voir-plus">Voir toutes les factures</a>
      </div>

      <div class="compte-section">
        <h3>Commandes</h3>
        <ul class="liste-commandes">
          <li><a href="pdf/commande-12345.pdf" download>Commande #12345 – T-shirt personnalisé – 15/03/2025</a></li>
          <li><a href="pdf/commande-12258.pdf" download>Commande #12258 – Tote bag sérigraphié – 05/02/2025</a></li>
          <li><a href="pdf/commande-12231.pdf" download>Commande #12231 – Sweat personnalisé – 25/01/2025</a></li>
        </ul>
        <p class="vide" id="vide-commandes">Aucune commande passée pour le moment</p>
        <a href="commandes.html" class="voir-plus">Voir toutes les commandes</a>
      </div>
    </div>
  </div>

  <!-- Support client -->
  <div class="compte-support">
    <h2>Support client</h2>
    <div class="support-box">
      <div class="ticket">
        <p><strong>Ticket #5678</strong> – En attente</p>
        <p><em>Message :</em> Bonjour, j’ai un souci avec ma dernière commande.</p>
        <div class="atelier-response">
          <p><strong>Réponse Atelier Ranno :</strong> Bonjour, merci pour votre message. Nous allons revenir vers vous sous peu.</p>
        </div>
      </div>

      <div class="ticket">
        <p><strong>Ticket #5643</strong> – Résolu</p>
        <p><em>Message :</em> Est-ce possible d’avoir un aperçu avant impression ?</p>
        <div class="atelier-response">
          <p><strong>Réponse Atelier Ranno :</strong> Bien sûr, un aperçu PDF vous a été envoyé par mail 📩</p>
        </div>
      </div>

      <div class="open-ticket-box">
        <a href="ouvrir-ticket.html" class="open-ticket-btn">📩 Ouvrir un ticket</a>
      </div>
    </div>
  </div>

  <script src="script.js"></script>
</body>
</html>
