
const screenshot = require('screenshot-desktop');
const fs = require('fs');
const path = require('path');

// Définir le dossier de destination
const destinationFolder = "C:/Users/User/Pictures/Screenshots/Fablab"; 

// Assurez-vous que le dossier de destination existe, sinon créez-le
if (!fs.existsSync(destinationFolder)) {
  fs.mkdirSync(destinationFolder, { recursive: true });
}

// Définir le nom du fichier de sortie
const outputFile = path.join(destinationFolder, 'screenshot.png');

// Capturer l'écran
screenshot().then((imgBuffer) => {
  // Enregistrer l'image sur le disque
  fs.writeFileSync(outputFile, imgBuffer);

  console.log(`Capture d'écran réussie. Image enregistrée sous: ${outputFile}`);
}).catch((err) => {
  console.error('Erreur lors de la capture d\'écran:', err);
});

screenshot();