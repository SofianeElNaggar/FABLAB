const loudness = require('loudness');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Fonction pour ajuster le volume
const adjustVolume = async (delta) => {
  try {
    const currentVolume = await loudness.getVolume();
    const newVolume = Math.max(0, Math.min(100, currentVolume + delta));
    await loudness.setVolume(newVolume);
    console.log(`Volume adjusted to: ${newVolume}`);
  } catch (error) {
    console.error('Error adjusting volume:', error);
  }
};

// Événement déclenché lorsqu'une touche est pressée
rl.input.on('keypress', async (_, key) => {
  if (key) {
    if (key.name === 'up') {
      await adjustVolume(5); // Augmente le volume de 5
    } else if (key.name === 'down') {
      await adjustVolume(-5); // Diminue le volume de 5
    }
  }
});

// Active l'événement 'keypress' pour process.stdin
rl.input.setRawMode(true);
rl.input.resume();

console.log('Appuyez sur les touches haut et bas pour ajuster le volume. Appuyez sur Ctrl+C pour quitter.');
