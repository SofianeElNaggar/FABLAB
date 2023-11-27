const { exec } = require('child_process');
const path = require('path');
const readline = require('readline');


// Chemin du fichier que vous souhaitez ouvrir
const filePath = 'C:/Users/User/Documents/Matéo/Récapitulatif.pdf';  // Remplacez cela par le chemin de votre fichier 

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
openFileOnWindows(filePath)
// Appel de la fonction avec le chemin du fichier audio

