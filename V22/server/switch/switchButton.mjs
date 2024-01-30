import { switchFunc } from "./switchFunc.mjs"
import { buttons } from "../Arbre/button.mjs"


export function switchButton(data, level, buttonsPath) {
    switch (data.button) {
        case "button1":
            return switchFunc(0, level, buttonsPath);
        case "button2":
            return switchFunc(1, level, buttonsPath);
        case "button3":
            return switchFunc(2, level, buttonsPath);
        case "button4":
            return switchFunc(3, level, buttonsPath);
        case "button5":
            return switchFunc(4, level, buttonsPath);
        case "button6":
            if(level > 0){
                level[0]--;
                buttonsPath.pop();
                return "back_level";
            }else{
                return switchFunc(5, level, buttonsPath);
            }
        default:
            
    }
}