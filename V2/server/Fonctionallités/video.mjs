const { exec } = require('child_process');
const path = require('path');

// Chemin complet vers le fichier vidéo
const videoPath = "C:/Users/User/Videos/Captures/Mixer de volume - Haut-parleurs (Realtek(R) Audio) 2021-04-23 17-54-16.mp4";

// Commande pour ouvrir le lecteur vidéo par défaut (selon le système d'exploitation)
let command;

if (process.platform === 'win32') {
  command = `start "" "${videoPath}"`;
} else if (process.platform === 'darwin') {
  command = `open "${videoPath}"`;
} else {
  command = `xdg-open "${videoPath}"`;
}

// Exécution de la commande
exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Erreur lors de l'ouverture de la vidéo : ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Erreur lors de l'ouverture de la vidéo : ${stderr}`);
    return;
  }
  console.log(`La vidéo a été ouverte avec succès.`);
});
