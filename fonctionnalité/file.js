const { exec } = require('child_process');
const path = require('path');
const readline = require('readline');


// Chemin du fichier que vous souhaitez ouvrir
const filePath = 'C:/Users/User/Documents/Matéo/Récapitulatif.pdf';  // Remplacez cela par le chemin de votre fichier audio

// Construction du chemin absolu
const absolutePath = path.resolve(filePath);

// Fonction pour ouvrir le fichier avec le programme par défaut sur Windows
const openFileOnWindows = (filePath) => {
  exec(`start "" "${filePath}"`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Erreur lors de l'ouverture du fichier : ${error.message}`);
    }
  });
};
// Crée une interface pour lire les entrées de l'utilisateur
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  // Événement déclenché lorsqu'une touche est pressée
  rl.input.on('keypress', (_, key) => {
    if (key && key.name === 'm') {
        openFileOnWindows(absolutePath);
    }
  });
  
  // Active l'événement 'keypress' pour process.stdin
  rl.input.setRawMode(true);
  rl.input.resume();
  
  console.log('Appuyez sur "m" pour ouvrir le fichier. Appuyez sur Ctrl+C pour quitter.');
// Appel de la fonction avec le chemin du fichier audio

