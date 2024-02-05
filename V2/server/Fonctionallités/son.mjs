import loudness from 'loudness';

// Fonction pour ajuster le volume
const adjustVolume = async (delta) => {
  try {
    const currentVolume = await loudness.getVolume();
    const newVolume = Math.max(0, currentVolume + delta);
    await loudness.setVolume(newVolume);
    console.log(`Volume adjusted to: ${newVolume}`);
  } catch (error) {
    console.error('Error adjusting volume:', error);
  }
};

export function downVolume() {
  adjustVolume(-2);
}

export function upVolume() {
  adjustVolume(2);
}
