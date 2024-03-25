
import { spawn } from 'child_process';
import { switchFunc } from './switch/switchFunc.mjs';


const scriptPython = 'C:/Users/User/Documents/GitHub/V2/server/bleco.py';
export const pythonProcess = spawn('python', [scriptPython]);

pythonProcess.stdout.on('data', (data) => {
  // Convertit les données reçues de Python (bytearray) en string
  const resultat = data.toString().trim();
  console.log(`Données reçues du Pico: ${resultat}`);
});

export function bleco (level,buttonsPath){
    pythonProcess.stderr.on('data', (data) => {
  // Capturer les erreurs ou messages de débogage du script Python
  console.log(`${data}`);

  
  try {
    const jsonData = JSON.parse(data); // Convertir les données en JSON
    console.log("Données JSON reçues du Pico:", jsonData);
    
    // Utiliser les données JSON dans une fonction switch
    switchFunc(level,buttonsPath);
  } catch (error) {
    console.error("Error parsing data to JSON:", error);
    // Gérer l'erreur en conséquence
  }
});
};


pythonProcess.on('close', (code) => {
  // Gestion de la fermeture du processus Python
  if (code !== 0) {
    console.error(`Le processus Python a quitté avec le code d'erreur ${code}`);
  } else {
    console.log('Le processus Python a terminé avec succès.');
  }
});