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

function modifAllTree(json) {
    var i = 0;
    for (var b in json) {
        button[i].value = json[b].value;
        button[i].children = json[b].children;
        button[i].option = json[b].option;
        if (json[b].children.length !== 0) {
            const lastCharT = b.charAt(b.length - 1);
            const numberT = parseInt(lastCharT);
            modifierChildren(json[b], i, [numberT-1], button[i].children);
        }
        i++;
    }
}

function modifierChildren(b, i, path, currentButtonChildren) {
    var d = 0;
    if (b.children.length !== 0) {
        d = 1;
    }
    modifTree(i, path, b.value, d, b.option, button);
    if (d === 1) {
        for(var c = 0; c < b.children.length; c++) {
            var p = path.slice();
            p.push(c);
            modifierChildren(b.children[c], i, p, currentButtonChildren[c].children);
        }
    }
}

function updateButtons(json) {
    for (var key in json) {
        var index = parseInt(key.replace("button", "")) - 1; // Extract button index
        var buttons = button[index]; // Get the button object from the list
        var value = json[key].value; // New value from JSON
        buttons.value = value; // Update button value

        // Recursively update children if they exist
        if (json[key].children.length > 0) {
            updateButtons(json[key].children, buttons.children);
        }
    }
}




function save(buttonNumber, depth, path, value, children = [], option) {
    const lastCharT = buttonNumber.charAt(buttonNumber.length - 1);
    const numberT = parseInt(lastCharT);
    if (depth != 0 && numberT < 5 || depth == 0) {
        fs.readFile('./save.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }

            const lastChar = buttonNumber.charAt(buttonNumber.length - 1);
            const number = parseInt(lastChar);

            let json = JSON.parse(data);

            let current = json;

            if (depth > 0) {
                for (let i = 0; i < depth; i++) {
                    if (i == 0) {
                        var v = path[i] + 1;
                        var p = "button" + v;
                        console.log("p : " + p);
                        current = current[p].children;
                    } else {
                        current = current[path[i]].children;
                    }
                }
            }

            var lastIndex;
            if (depth == 0) {
                lastIndex = buttonNumber
            } else {
                lastIndex = number - 1;
            }

            // Vérifier si le numéro de bouton est valide
            if (buttonNumber in json) {
                current[lastIndex].value = value[number - 1];
                current[lastIndex].children = children[number - 1].children;
                current[lastIndex].option = option[number - 1];

                // Écrire les modifications dans le fichier JSON
                fs.writeFile('./save.json', JSON.stringify(json, null, 2), 'utf8', (err) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                });
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
    modifAllTree,
    updateButtons,
    save
}