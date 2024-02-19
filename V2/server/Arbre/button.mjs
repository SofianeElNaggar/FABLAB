import { arbre } from './arbre.mjs';

const button = [
    arbre.createTree("Bouton 1", 0),
    arbre.createTree("Bouton 2", 0),
    arbre.createTree("Bouton 3", 0),
    arbre.createTree("Bouton 4", 0),
    arbre.createTree("Bouton 5", 0),
    arbre.createTree("Bouton 6", 0),
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
    for(const p of path){
        b = b[p].children;
    }
    b[i] = arbre.createTree(newVal, d, option);
}

export var buttons = {
    button,
    print,
    modifTree,
    getButtons,
    getButtonsOptions
}