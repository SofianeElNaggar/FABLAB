const { spawn } = require('child_process');

const scriptPython = 'pythonToJS.py';
const pythonProcess = spawn('python', [scriptPython]);

let resultat;
let appList;

pythonProcess.stdout.on('data', (data) => {
  resultat = data.toString().trim();
  appList = stringToList(resultat);
  console.log(appList);
});

pythonProcess.stderr.on('data', (data) => {
  console.error(`Erreur : ${data}`);
});

pythonProcess.on('close', (code) => {
  if (code !== 0) {
    console.error(`Le processus Python a quitté avec le code d'erreur ${code}`);
  }
});


function stringToList(inputString) {
  const cleanedString = inputString.slice(1, -1);

  const elements = cleanedString.split(',').map(element => element.trim());

  return elements;
}


