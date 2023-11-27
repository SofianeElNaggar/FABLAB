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

function down_Volume (){
  adjustVolume(-3);
}
down_Volume();
function up_Volume (){
  adjustVolume(3);

}
up_Volume();


