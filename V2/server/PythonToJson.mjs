import { spawn } from 'child_process';
import { switchButton } from './switch/switchButton.mjs';
import { buttons } from './Arbre/button.mjs';

// Commande pour exécuter le script Python
const pythonProcess = spawn('python', ['bleco.py']);

// Événement pour capturer les données de sortie du script Python
export function bleco(level, buttonsPath) {
    pythonProcess.stdout.on('data', (data) => {
        try {
            const jsonData = JSON.parse(data.toString());
            //console.log('Données reçues du script Python :', jsonData);
            switchButton(jsonData, level, buttonsPath);

            // Ajout d'un délai de 500 millisecondes avant d'afficher les boutons
            setTimeout(() => {
                buttons.printLevel(buttonsPath);
            }, 600);
        } catch (error) {
            console.error('Erreur lors de l\'analyse des données JSON :', error);
        }
    });
}

// Gestion des erreurs de sortie
pythonProcess.stderr.on('data', (data) => {
    console.error(` ${data}`);
});

// Gestion de la fin de l'exécution du script Python
pythonProcess.on('close', (code) => {
    if (code == 0) {
        console.log("Vous n'êtes pas connecté au boitier/bluetooth");
    } else if (code == 1) {
        console.log("Vous n'êtes pas connecté au bluetooth");
    } else {
        console.log(`Le script Python s'est terminé avec le code ${code}`);
    }
});

// Jaune: Bouton6
// Vert : Bouton5
