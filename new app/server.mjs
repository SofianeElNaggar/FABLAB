import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { up_Volume, down_Volume } from '../Fonctionallités/son.mjs';
import { brightnessDown, brightnessUp } from '../Fonctionallités/brightness.mjs';

const app = express();
const port = 3000;


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Utilisez le middleware express.static pour servir les fichiers statiques
app.use(express.static(path.join(__dirname), { 'extensions': ['html', 'css'] }));

app.use('/styles', express.static(path.join(__dirname, 'public')));

// Ajoutez ce middleware pour définir le bon en-tête Content-Type pour les fichiers CSS
app.use('/styles', (req, res, next) => {
  res.setHeader('Content-Type', 'text/css');
  next();
});

app.use(express.json());

// Ajoutez également un middleware pour gérer les requêtes CORS (si nécessaire)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/', async (req, res) => {
  const receivedData = req.body;
  console.log('Données JSON reçues du client :', receivedData);

  switch (receivedData.action){
    case "b_up":
      brightnessUp();
      break
    case "b_down":
      brightnessDown();
      break
    case "v_up":
      up_Volume();
      break
    case "v_down":
      down_Volume();
      break
    default:
      console.log("test");
  }

  // Faire quelque chose avec les données reçues, par exemple, les renvoyer au client
  res.json({ status: 'OK', message: 'Données reçues avec succès!' });
});


app.listen(port, () => {
  console.log(`Serveur Node.js en cours d'exécution sur http://localhost:${port}`);
});
