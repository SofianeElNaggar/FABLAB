const { exec } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Fonction pour ouvrir une page web
const openWebPage = (url) => {
  exec(`start ${url}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Erreur lors de l'ouverture de la page web : ${stderr}`);
    } else {
      console.log(`La page web a été ouverte : ${url}`);
    }
  });
};

// Fonction pour interagir avec l'utilisateur
const askForWebPage = () => {
  rl.question('Entrez l\'URL de la page web que vous souhaitez ouvrir : ', (answer) => {
    openWebPage(answer);
    rl.close();
  });
};

// Commencer l'interaction
askForWebPage();
