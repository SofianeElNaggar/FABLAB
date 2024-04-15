import loudness from 'loudness';

// Fonction pour ajuster le volume
export const adjustVolume = async (delta) => {
  try {
    const currentVolume = await loudness.getVolume();
    const newVolume = Math.max(0, currentVolume + delta);
    await loudness.setVolume(newVolume);
    if (currentVolume == 2 && delta == -2){
            mutePCVolume();
    }
    if (currentVolume === 0 && delta > 0) {
      await unmutePCVolume();
  }
  } catch (error) {
    console.error('Error adjusting volume:', error);
  }
};


function mutePCVolume() {
    loudness.setMuted(true, function(err) {
        if (err) {
            console.error('Impossible de mettre en sourdine le son:', err);
        } else {
            console.log('Le son a été mis en sourdine avec succès.');
        }
    });
}

async function unmutePCVolume() {
  try {
      await loudness.setMuted(false);
      console.log('Le son a été réactivé avec succès.');
  } catch (error) {
      console.error('Impossible de réactiver le son:', error);
  }
}


export function downVolume() {
  adjustVolume(-2);
}

export function upVolume() {
  adjustVolume(2);
}
