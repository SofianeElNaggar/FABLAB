import { switchFunc } from "./switchFunc.mjs"
import { buttons } from "../Arbre/button.mjs"


export function switchButton(data, level, buttonsPath) {
    switch (data.button) {
        case "button1":
            switchFunc(0, level, buttonsPath);
            break
        case "button2":
            switchFunc(1, level, buttonsPath);
            break
        case "button3":
            switchFunc(2, level, buttonsPath);
            break
        case "button4":
            switchFunc(3, level, buttonsPath);
            break
        case "button5":
            switchFunc(4, level, buttonsPath);
            break
        case "button6":
            switchFunc(5, level, buttonsPath);
            break
        default:
            
    }
}