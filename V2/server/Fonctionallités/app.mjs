import winreg from 'winreg';

// Créer une instance de la clé de registre
const uninstallKey = new winreg({
    hive: winreg.HKLM, // HKEY_LOCAL_MACHINE
    key: '//Software//Microsoft//Windows//CurrentVersion//Uninstall'
});

// Lister les sous-clés de la clé de désinstallation
uninstallKey.keys((err, keys) => {
    if (err) {
        console.error('Erreur lors de la récupération des applications installées :', err);
        return;
    }

    // Récupérer les noms des applications à partir des sous-clés
    const applicationNames = keys.map(key => key.key);

    // Afficher les noms des applications
    console.log('Applications installées :');
    applicationNames.forEach(name => console.log(name));
});
