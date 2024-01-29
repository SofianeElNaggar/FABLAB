import { buttons } from "../Arbre/button.mjs"

export function switchDrop(data, level, buttonsPath) {
    switch (data.button) {
        case "button1":
            editContent(0, data.text);
            break
        case "button2":
            editContent(1, data.text);
            break
        case "button3":
            editContent(2, data.text);
            break
        case "button4":
            editContent(3, data.text);
            break
        case "button5":
            editContent(4, data.text);
            break
        case "button6":
            editContent(5, data.text);
            break
        default:

    }
}

async function editContent(i, text) {
    switch (text) {
        case "new buttons":
            buttons.modifTree(i, text, 1);
            break
        default:
            buttons.modifTree(i, text, 0);
    }
}