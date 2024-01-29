const keypress = require('keypress');

// Permet de capturer les touches
keypress(process.stdin);

// Événement déclenché lorsqu'une touche est pressée
process.stdin.on('keypress', function (ch, key) {
  if (key && key.ctrl && key.name == 'c') {
    process.stdin.pause();
  } else {
    console.log(`Key pressed: ${key.name}`);
  }
});

// Active l'événement 'keypress' pour process.stdin
process.stdin.setRawMode(true);
process.stdin.resume();

console.log('Appuyez sur n\'importe quelle touche. Appuyez sur Ctrl+C pour quitter.');
