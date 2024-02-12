# J'importe les bibliothèques nécessaires pour le script.
import asyncio
from bleak import BleakClient, BleakScanner

# Je définis les UUIDs pour le service UART et ses caractéristiques RX et TX.
UART_SERVICE_UUID = "6E400001-B5A3-F393-E0A9-E50E24DCCA9E"
UART_RX_CHARACTERISTIC_UUID = "6E400002-B5A3-F393-E0A9-E50E24DCCA9E"  # Pour envoyer des données au Pico.
UART_TX_CHARACTERISTIC_UUID = "6E400003-B5A3-F393-E0A9-E50E24DCCA9E"  # Pour recevoir des données du Pico.

# Cette fonction est appelée chaque fois qu'une notification est reçue de la caractéristique TX.
def gestionnaire_notifications(expediteur, donnees):
    """Fonction de rappel pour recevoir des notifications."""
    print(f"J'ai reçu des données : {donnees}")

# Fonction principale orchestrant la connexion au périphérique BLE et la communication.
async def executer_client_ble():
    # Je cherche tous les périphériques BLE disponibles autour de moi.
    dispositifs = await BleakScanner.discover()
    dispositif_cible = None
    
    # Je parcours chaque dispositif trouvé pour chercher celui offrant le service UART.
    for dispositif in dispositifs:
        uuids = dispositif.metadata.get("uuids", [])
        if any(UART_SERVICE_UUID.lower() in uuid.lower() for uuid in uuids):
            dispositif_cible = dispositif
            break
    
    # Si aucun dispositif correspondant n'est trouvé, j'affiche un message et termine le script.
    if dispositif_cible is None:
        print("Dispositif non trouvé. Assurez-vous que votre dispositif est en mode publicité.")
        return

    # Si un dispositif correspondant est trouvé, je tente de m'y connecter.
    async with BleakClient(dispositif_cible.address) as client:
        print(f"Je suis connecté à {dispositif_cible.name}")
        
        # Je demande au client de s'abonner aux notifications sur la caractéristique TX.
        await client.start_notify(UART_TX_CHARACTERISTIC_UUID, gestionnaire_notifications)
        
        # J'envoie un message au Pico en écrivant sur la caractéristique RX.
        await client.write_gatt_char(UART_RX_CHARACTERISTIC_UUID, b"Bonjour, Pico !")

        print("J'écoute les données, appuyez sur Ctrl+C pour quitter...")
        try:
            # Je maintiens le script en exécution pour continuer à écouter les notifications.
            while True:
                await asyncio.sleep(1)
        except KeyboardInterrupt:
            # Lorsque l'utilisateur interrompt le script (Ctrl+C), j'arrête proprement les notifications.
            await client.stop_notify(UART_TX_CHARACTERISTIC_UUID)
            print("Interruption du programme, j'ai arrêté d'écouter.")

# J'exécute la fonction principale dans la boucle d'événements asyncio.
loop = asyncio.get_event_loop()
loop.run_until_complete(executer_client_ble())
