import kbmRobot  from 'kbm-robot';

// Simuler un appui sur la touche "E"
kbmRobot.pressKey('e');

// Simuler un appui sur "Ctrl+E"
kbmRobot.pressKey(['ctrl', 'e']);

// Simuler un appui sur la touche "E", la maintenir enfoncée pendant 2 secondes, puis la relâcher
kbmRobot.pressKey(['e'], 2000);
