import asyncio
import sys
from bleak import BleakClient, BleakScanner

# Définition des UUIDs pour le service UART et ses caractéristiques RX et TX.
UART_SERVICE_UUID = "6E400001-B5A3-F393-E0A9-E50E24DCCA9E"
UART_RX_CHARACTERISTIC_UUID = "6E400002-B5A3-F393-E0A9-E50E24DCCA9E"  # Pour envoyer des données au Pico.
UART_TX_CHARACTERISTIC_UUID = "6E400003-B5A3-F393-E0A9-E50E24DCCA9E"  # Pour recevoir des données du Pico.

def gestionnaire_notifications(expediteur, donnees):
    """Fonction de rappel pour recevoir des notifications."""
    # Conversion des données bytearray en string et impression pour Node.js
    message_recu = donnees.decode('utf-8')
    print(message_recu, file=sys.stderr)  # Les données sont directement imprimées pour être capturées par Node.js

async def executer_client_ble():
    dispositifs = await BleakScanner.discover()
    dispositif_cible = None

    for dispositif in dispositifs:
        uuids = dispositif.metadata.get("uuids", [])
        if any(UART_SERVICE_UUID.lower() in uuid.lower() for uuid in uuids):
            dispositif_cible = dispositif
            break

    if dispositif_cible is None:
        # Utilisation de sys.stderr pour éviter d'envoyer des logs à Node.js
        print("Dispositif non trouvé. Assurez-vous que votre dispositif est en mode publicité.", file=sys.stderr)
        return

    async with BleakClient(dispositif_cible.address) as client:
        # Logs de connexion redirigés vers stderr
        print(f"Je suis connecté à {dispositif_cible.name}", file=sys.stderr)
        
        await client.start_notify(UART_TX_CHARACTERISTIC_UUID, gestionnaire_notifications)
        await client.write_gatt_char(UART_RX_CHARACTERISTIC_UUID, b"Bonjour, Pico !")

        # Instruction pour maintenir le script en écoute, redirigée vers stderr
        print("J'écoute les données, appuyez sur Ctrl+C pour quitter...", file=sys.stderr)
        
        try:
            while True:
                await asyncio.sleep(1)
        except KeyboardInterrupt:
            await client.stop_notify(UART_TX_CHARACTERISTIC_UUID)
            print("Interruption du programme, j'ai arrêté d'écouter.", file=sys.stderr)

if __name__ == "__main__":
    loop = asyncio.get_event_loop()
    loop.run_until_complete(executer_client_ble())