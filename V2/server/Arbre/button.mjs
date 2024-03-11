import { arbre } from './arbre.mjs';
import fs from 'fs'

const button = [
    arbre.createTree("button1", 0),
    arbre.createTree("button2", 0),
    arbre.createTree("button3", 0),
    arbre.createTree("button4", 0),
    arbre.createTree("button5", 0),
    arbre.createTree("button6", 0),
];

function getButtons(path) {
    var buttons = button;
    for (const i of path) {
        buttons = arbre.getChild(buttons[i]);
    }
    return getValues(buttons);
}

function getValues(buttons) {
    var value = [];
    for (const i of buttons) {
        value.push(i.value);
    }
    return value;
}

function getChildren(path) {
    var buttons = button;
    for (const i of path) {
        buttons = arbre.getChild(buttons[i]);
    }
    return buttons;
}

function getButtonsOptions(path) {
    var buttons = button;
    for (const i of path) {
        buttons = arbre.getChild(buttons[i]);
    }
    return getOption(buttons);
}

function getOption(buttons) {
    var value = [];
    for (const i of buttons) {
        value.push(i.option);
    }
    return value;
}

function print() {
    for (const i of button) {
        arbre.printTree(i);
    }
}

function modifTree(i, path, newVal, d, option) {
    var b = button;
    for (const p of path) {
        b = b[p].children;
    }
    b[i] = arbre.createTree(newVal, d, option);
}

function save(buttonNumber, depth, path, value, children = [], option) {
    // Charger le fichier JSON
    const lastCharT = buttonNumber.charAt(buttonNumber.length - 1); // Récupère le dernier caractère du string
    const numberT = parseInt(lastCharT);
    if (depth != 0 && numberT < 5 || depth == 0) {
        fs.readFile('./save.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }

            const lastChar = buttonNumber.charAt(buttonNumber.length - 1); // Récupère le dernier caractère du string
            const number = parseInt(lastChar);

            let json = JSON.parse(data);



            let current = json;

            console.log(current);
            if (depth > 0) {
                for (let i = 0; i < depth; i++) {
                    if (i == 0) {
                        var v = path[i] + 1;
                        var p = "button" + v;
                        console.log("p : " + p);
                        current = current[p].children; // Accéder à la prochaine profondeur
                    } else {
                        current = current[path[i]].children; // Accéder à la prochaine profondeur
                    }
                }
            }
            console.log("-----------")
            console.log(current);

            var lastIndex;
            if (depth == 0) {
                lastIndex = buttonNumber
            } else {
                console.log("path : " + path)
                lastIndex = number - 1;
            }

            // Vérifier si le numéro de bouton est valide
            if (buttonNumber in json) {
                console.log("lastIndex : " + lastIndex)
                current[lastIndex].value = value[number - 1];
                current[lastIndex].children = children[number - 1].children;
                current[lastIndex].option = option[number - 1];

                // Écrire les modifications dans le fichier JSON
                fs.writeFile('./save.json', JSON.stringify(json, null, 2), 'utf8', (err) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    console.log('Mise à jour effectuée avec succès !');
                });
            } else {
                console.log("Le numéro de bouton n'est pas valide.");
            }
        });
    }
}

export var buttons = {
    button,
    print,
    modifTree,
    getButtons,
    getButtonsOptions,
    getChildren,
    save
}