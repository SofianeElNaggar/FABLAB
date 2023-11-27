const brightness = require('brightness');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const os = require('os');
const batteryLevel = require('battery-level');
// Fonction pour détecter si l'appareil est un ordinateur portable

  

batteryLevel().then(level => {
  if (level !== null) {
    console.log(`Le niveau de la batterie est : ${level * 100}%`);
   
  } else {
    console.log('Cet ordinateur n\'a pas de batterie.');
  }
}).catch(error => {
  console.error('Erreur lors de la récupération du niveau de la batterie :', error);
});



// Utilisation de la fonction
if (batteryLevel()) {
  console.log('Cet appareil est probablement un ordinateur portable.');
  brightness1();
} else {
  console.log('Cet appareil n\'est probablement pas un ordinateur portable.');
}
function brightness1(){
  // Fonction pour ajuster la luminosité
const adjustBrightness = async (delta) => {
  try {
    let currentBrightness = await brightness.get();
    currentBrightness = Math.max(0, Math.min(1, currentBrightness + delta));
    await brightness.set(currentBrightness);
    console.log(`Luminosité ajustée à : ${Math.round(currentBrightness * 100)}%`);
  } catch (error) {
    console.error('Erreur lors de l\'ajustement de la luminosité :', error);
  }
};

// Événement déclenché lorsqu'une touche est pressée
rl.input.on('keypress', async (_, key) => {
  if (key) {
    if (key.name === 'up') {
      await adjustBrightness(0.1); // Augmente la luminosité de 10%
    } else if (key.name === 'down') {
      await adjustBrightness(-0.1); // Diminue la luminosité de 10%
    }
  }
});

// Active l'événement 'keypress' pour process.stdin
rl.input.setRawMode(true);
rl.input.resume();

console.log('Utilisez les touches haut et bas pour ajuster la luminosité. Appuyez sur Ctrl+C pour quitter.');

}

