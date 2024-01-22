import brightness from 'brightness';
import batteryLevel from 'battery-level';

batteryLevel().then(level => {
  if (level !== null) {
    console.log(`Le niveau de la batterie est : ${level * 100}%`);

  } else {
    console.log('Cet ordinateur n\'a pas de batterie.');
  }
}).catch(error => {
  console.error('Erreur lors de la récupération du niveau de la batterie :', error);
});

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

export function brightnessUp() {
  adjustBrightness(0.1);
}
export function brightnessDown() {
  adjustBrightness(-0.1);
}

// Utilisation de la fonction
if (batteryLevel()) {
  console.log('Cet appareil est probablement un ordinateur portable.');
  brightnessDown()
} else {
  console.log('Cet appareil n\'est probablement pas un ordinateur portable.');
}



