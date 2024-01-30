import { buttons } from "../Arbre/button.mjs"

export function switchDrop(data, level, buttonsPath) {
    switch (data.button) {
        case "button1":
            return editContent(0, buttonsPath, data.text);
        case "button2":
            return editContent(1, buttonsPath, data.text);
        case "button3":
            return editContent(2, buttonsPath, data.text);
        case "button4":
            return editContent(3, buttonsPath, data.text);
        case "button5":
            return editContent(4, buttonsPath, data.text);
        case "button6":
            return editContent(5, buttonsPath, data.text);
        default:

    }
}

async function editContent(i, path, text) {
    switch (text) {
        case "new buttons":
            buttons.modifTree(i, path, text, 1);
            break
        default:
            buttons.modifTree(i, path, text, 0);
            break
    }
}