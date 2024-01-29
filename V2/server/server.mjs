import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { switchAction } from './switch/switchAction.mjs';
import { buttons } from './Arbre/button.mjs';

const app = express();
const port = 3000;

let level = [0];
let buttonsPath = [];

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Utilisez le middleware express.static pour servir les fichiers statiques
app.use(express.static(path.join(__dirname), { 'extensions': ['html', 'css'] }));

app.use(express.static(path.resolve(__dirname, '../client'), { 'extensions': ['html', 'css'] }));


app.use(express.json());

// Ajoutez également un middleware pour gérer les requêtes CORS (si nécessaire)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/index.html'));
});

app.post('/', async (req, res) => {
  const receivedData = req.body;
  console.log('Données JSON reçues du client :', receivedData);

  switchAction(receivedData, level, buttonsPath);

  console.log("-----------------");
  console.log("Level : " + level);
  console.log("-----------------")
  console.log("Path : " + buttonsPath);
  console.log("-----------------")
  buttons.print();

  if (receivedData.text === "new buttons" && receivedData.action === "clic") {
    res.json({ status: 'UPDATE', level: level,  });
  } else {
    res.json({ status: 'OK'});
  }
});


app.listen(port, () => {
  console.log(`Serveur Node.js en cours d'exécution sur http://localhost:${port}`);
});
