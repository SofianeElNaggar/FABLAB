
const fs = require('fs');

const contenu = "Contenu du fichier texte.";
const cheminFichier = "C:/Users/User/Documents/Matéo/School/Fablab/exemple.txt";

fs.writeFileSync(cheminFichier, contenu);

console.log(`Le fichier ${cheminFichier} a été créé avec succès.`);

// Le texte que vous souhaitez écrire dans le fichier
const texte = "Ceci est un texte généré automatiquement en utilisant Node.js.";



// Écriture du texte dans le fichier
fs.writeFile(cheminFichier, texte, (err) => {
  if (err) {
    console.error("Erreur lors de l'écriture du fichier :", err);
  } else {
    console.log(`Le texte a été écrit avec succès dans le fichier ${cheminFichier}`);
  }
});
