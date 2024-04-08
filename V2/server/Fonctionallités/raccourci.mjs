import keytar from 'keytar';
import pkg from 'keytar';
const { press } = pkg;

export function raccourci(shortcut) {
    const keys = shortcut.split('+');
    const modifiers = keys.filter(key => key.match(/^(ctrl|control|shift|alt|meta)$/i));
    const key = keys.find(key => !key.match(/^(ctrl|control|shift|alt|meta)$/i));



    // Convertir les noms des modificateurs
    const modifierMap = {
        'ctrl': 'control',
        'control': 'control',
        'shift': 'shift',
        'alt': 'alt',
        'meta': 'meta',
    };
    const normalizedModifiers = modifiers.map(modifier => modifierMap[modifier]);

    // Envoyer les pressions de touches
    if (typeof press === 'function') {
        press(key, normalizedModifiers)
            .then(() => console.log(`Raccourci "${shortcut}" simulé avec succès !`))
            .catch(error => console.error('Erreur lors de la simulation du raccourci:', error));
    } else {
        console.error('La fonction press n\'est pas disponible dans cette version de keytar');
    }
}


