const screenshot = require('screenshot-desktop');

// Définir le nom du fichier de sortie
const outputFile = 'screenshot.png';

// Capturer l'écran
screenshot().then((imgBuffer) => {
  // Enregistrer l'image sur le disque
  require('fs').writeFileSync(outputFile, imgBuffer);

  console.log(`Capture d'écran réussie. Image enregistrée sous: ${outputFile}`);
}).catch((err) => {
  console.error('Erreur lors de la capture d\'écran:', err);
});
