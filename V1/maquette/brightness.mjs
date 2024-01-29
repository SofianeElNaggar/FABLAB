import brightness from './node_modules/brightness';

export const adjustBrightness = async (delta) => {
    try {
        let currentBrightness = await brightness.get();
        currentBrightness = Math.max(0, Math.min(1, currentBrightness + delta));
        await brightness.set(currentBrightness);
        console.log(`Luminosité ajustée à : ${Math.round(currentBrightness * 100)}%`);
    } catch (error) {
        console.error('Erreur lors de l\'ajustement de la luminosité :', error);
    }
};

export function brightnessUp() {
    adjustBrightness(0.1);
}

export function brightnessDown() {
    adjustBrightness(-0.1);
}
