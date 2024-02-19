import fs from 'fs';
import path from 'path';

// Fonction récursive pour parcourir les répertoires et trouver les fichiers .exe
function findExeForApp(directory, appName) {
    let found = false; // Variable de contrôle pour indiquer si la correspondance a été trouvée

    fs.readdir(directory, (err, files) => {
        if (err) {
            return;
        }

        files.forEach(file => {
            if (found) return; // Si la correspondance a déjà été trouvée, arrêtez de parcourir les fichiers
            
            const filePath = path.join(directory, file);
            fs.stat(filePath, (err, stats) => {
                if (err) {
                    return;
                }

                if (stats.isDirectory()) {
                    findExeForApp(filePath, appName); // Appel récursif pour les sous-répertoires
                } else if (path.extname(filePath) === '.exe' && file.startsWith(appName)) {
                    found = true; // Correspondance trouvée, mettez la variable de contrôle à true
                    console.log('Point d\'entrée pour', appName, 'trouvé:', filePath);
                    return;
                }
            });
        });
    });
}


// Chemin du répertoire à parcourir
const directoryPath = 'C:';
// Nom de l'application
const appName = 'Firefox';

// Appel de la fonction pour trouver les points d'entrée .exe pour l'application spécifiée
findExeForApp(directoryPath, appName);

