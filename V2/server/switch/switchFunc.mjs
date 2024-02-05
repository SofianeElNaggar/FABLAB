import { upVolume, downVolume } from '../Fonctionallités/son.mjs';
import { brightnessDown, brightnessUp } from '../Fonctionallités/brightness.mjs';
import { buttons } from '../Arbre/button.mjs';
import { openFileOnWindows } from '../Fonctionallités/file.mjs';
import { openWebPage } from '../Fonctionallités/page_web.mjs'
import { captureAndSaveScreenshot } from '../Fonctionallités/screenshot.mjs'
import { mediaNext, mediaPlayPause, mediaPrevious} from '../Fonctionallités/multimedia.mjs'

var nbScreenshot = 0;

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
            upVolume();
            break
        case "Volume down":
            downVolume();
            break
        case "new buttons":
            level[0]++;
            buttonsPath.push(i)
            return "down_level";
        case "File":
            var option = b[i].option;
            openFileOnWindows(option);
            break
        case "Web":
            var option = b[i].option;
            openWebPage(option);
            break
        case "Screenshot":
            var name = "screenshot_" + nbScreenshot + ".png";
            captureAndSaveScreenshot(name);
            break
        case ">||":
            mediaPlayPause();
            break
        case ">|":
            mediaNext();
            break
        case "|<":
            mediaPrevious();
            break
        default:
    }
}