<?php
require_once 'config.php';

// Récupérer les données du formulaire
$prenom         = $_POST['prenom'];
$nom            = $_POST['nom'];
$email          = $_POST['email'];
$mot_de_passe   = password_hash($_POST['password'], PASSWORD_BCRYPT); // sécurité !
$adresse        = $_POST['adresse'];
$numero         = $_POST['numero'];
$code_postal    = $_POST['code-postal'];
$ville          = $_POST['ville'];
$pays           = $_POST['pays'];

// Générer le numéro unique
$requeteCount = $pdo->query("SELECT COUNT(*) FROM utilisateurs");
$nbUtilisateurs = $requeteCount->fetchColumn();
$numero_identification = str_pad($nbUtilisateurs + 1, 4, '0', STR_PAD_LEFT);

// Requête SQL d’insertion
$requete = $pdo->prepare("INSERT INTO utilisateurs 
(prenom, nom, email, mot_de_passe, adresse, numero, code_postal, ville, pays, numero_identification)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

$requete->execute([
    $prenom,
    $nom,
    $email,
    $mot_de_passe,
    $adresse,
    $numero,
    $code_postal,
    $ville,
    $pays,
    $numero_identification
]);

// Redirection ou message de confirmation
header("Location: compte.php"); // ou un message si tu préfères
exit;
?>