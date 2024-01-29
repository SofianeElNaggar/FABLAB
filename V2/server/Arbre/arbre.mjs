class Node {
    constructor(value) {
        this.value = value;
        this.children = [];
    }

    addChild(child) {
        this.children.push(child);
    }

    isLeaf() {
        return this.children.length === 0;
    }
}

function createTree(value, depth) {
    if (depth === 0) {
        return new Node(value);
    }

    const node = new Node(value);

    for (let i = 1; i <= 6; i++) {
        const childValue = `${value}-${i}`;
        const childNode = createTree(childValue, depth - 1);
        node.addChild(childNode);
    }

    return node;
}

function getChild(arbre){
    var childs = [];
    if(isLeafFunc(arbre)){
        return;
    }
    for (const child of arbre.children) {
        childs.push(child);
    }
    return childs;
}

function isLeafFunc(arbre){
    if(arbre.isLeaf()){
        return true;
    }
    return false;
}

function printTree(node, depth = 0) {
    const indent = '  '.repeat(depth);
    console.log(`${indent}Node: ${node.value}`);

    if (node.isLeaf()) {
        return;
    }

    for (const child of node.children) {
        printTree(child, depth + 1);
    }
}

export const arbre = {
    createTree,
    printTree,
    isLeafFunc,
    getChild
}

// Exemple d'utilisation
const root = createTree('1', 1);
printTree(root);
console.log(getChild(root));
