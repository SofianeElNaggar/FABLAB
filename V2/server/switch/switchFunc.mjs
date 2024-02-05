import { up_Volume, down_Volume } from '../Fonctionallités/son.mjs';
import { brightnessDown, brightnessUp } from '../Fonctionallités/brightness.mjs';
import { buttons } from '../Arbre/button.mjs';

export function switchFunc(i, level, buttonsPath) {
    var b = buttons.button;
    for (const p of buttonsPath) {
        b = b[p].children;
    }
    switch (b[i].value) {
        case "brightness up":
            brightnessUp();
            break
        case "brightness down":
            brightnessDown();
            break
        case "Volume up":
            up_Volume();
            break
        case "Volume down":
            down_Volume();
            break
        case "new buttons":
            level[0]++;
            buttonsPath.push(i)
            return "down_level";
        case "File":
            var option = b[i].option;
            //function(option)
            break
        default:
    }
}