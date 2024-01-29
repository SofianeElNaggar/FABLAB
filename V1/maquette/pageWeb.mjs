import exec from 'child_process';

// Fonction pour ouvrir une page web
export const openWebPage = () => {
  // Définir l'URL de YouTube
  const youtubeUrl = 'https://www.youtube.com/';

  exec(`start ${youtubeUrl}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Erreur lors de l'ouverture de la page web : ${stderr}`);
    } else {
      console.log(`La page web a été ouverte : ${youtubeUrl}`);
    }
  });
};

// Appeler la fonction pour ouvrir la page web avec l'URL de YouTube
//openWebPage();