import { arbre } from './arbre.mjs';

const button = [
    arbre.createTree("Bouton 1", 0),
    arbre.createTree("Bouton 2", 0),
    arbre.createTree("Bouton 3", 0),
    arbre.createTree("Bouton 4", 0),
    arbre.createTree("Bouton 5", 0),
    arbre.createTree("Bouton 6", 0),
  ];

function print() {
    for(const i of button){
        arbre.printTree(i);
    }
}

function modifTree(i, newVal, d) {
    button[i] = arbre.createTree(newVal, d);
}

export var buttons = {
    button,
    print,
    modifTree
}