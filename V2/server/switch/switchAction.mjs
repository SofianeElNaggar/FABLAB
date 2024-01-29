import { switchDrop } from "./switchDrop.mjs";
import { switchButton } from "./switchButton.mjs";

export function switchAction(data, level, buttonsPath) {
    switch (data.action) {
        case "clic":
            switchButton(data, level, buttonsPath);
            break
        case "drop":
            switchDrop(data, level, buttonsPath);
            break
        default:

    }
}