import os
import subprocess


def open_file_or_folder(directory_path):
    # Vérifie si le chemin est valide
    if not os.path.exists(directory_path):
        print(f"Le chemin '{directory_path}' n'existe pas.")
        return

    # Ouvre le fichier ou le dossier avec l'application par défaut du système
    try:
        subprocess.Popen(['open', directory_path], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        print(f"Ouverture de '{directory_path}' en cours...")
    except Exception as e:
        print(f"Erreur lors de l'ouverture de '{directory_path}': {str(e)}")

if __name__ == "__main__":
    # Demandez à l'utilisateur de saisir le chemin du fichier ou du dossier
    directory_path = input("Entrez le chemin du fichier ou du dossier à ouvrir : ")
    open_file_or_folder(directory_path)