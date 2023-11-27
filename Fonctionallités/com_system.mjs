import exec from 'child_process'; 


// Fonction pour verrouiller l'ordinateur
function verrouillerOrdinateur() {
  exec('rundll32.exe user32.dll,LockWorkStation', (error, stdout, stderr) => {
    if (error) {
      console.error(`Erreur lors du verrouillage de l'ordinateur: ${error.message}`);
      return;
    }
    console.log('Ordinateur verrouillé.');
  });
}

verrouillerOrdinateur();

