const express = require('express');
const { exec } = require('child_process');
const loudness = require('loudness');
const brightness = require('brightness');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(__dirname));

app.get('/get-apps', (req, res) => {
  exec('powershell "Get-ItemProperty HKLM:\\Software\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\* | Select-Object DisplayName"', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const apps = stdout.split('\r\n').filter(app => app.trim() !== '').map(app => app.trim().replace('', ''));
    res.json({ applications: apps });
  });
});

app.get('/open-app/:appName', (req, res) => {
  const appName = req.params.appName;

  const { exec } = require('child_process');
  exec(`start ${appName}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json({ success: true });
  });
});

app.get('/volume-down', async (req, res) => {
    try {
      // Obtient le volume actuel
      const currentVolume = await loudness.getVolume();
  
      // Baisse le volume (vous pouvez ajuster la valeur selon vos besoins)
      const newVolume = Math.max(currentVolume - 2, 0); // Baisse de 10 unités
      await loudness.setVolume(newVolume);
  
      res.json({ success: true, volume: newVolume });
    } catch (error) {
      console.error(`Error: ${error.message}`);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.get('/volume-up', async (req, res) => {
    try {
      // Obtient le volume actuel
      const currentVolume = await loudness.getVolume();
  
      // Baisse le volume (vous pouvez ajuster la valeur selon vos besoins)
      const newVolume = Math.max(currentVolume + 2, 0); // Baisse de 10 unités
      await loudness.setVolume(newVolume);
  
      res.json({ success: true, volume: newVolume });
    } catch (error) {
      console.error(`Error: ${error.message}`);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// Nouvelle route pour diminuer la luminosité
app.get('/brightness-down', async (req, res) => {
    try {
      // Obtient la luminosité actuelle
      const currentBrightness = await brightness.get();
  
      // Diminue la luminosité (vous pouvez ajuster la valeur selon vos besoins)
      const newBrightness = Math.max(currentBrightness - 0.1, 0); // Diminue de 0.1 unité
      await brightness.set(newBrightness);
  
      res.json({ success: true, brightness: newBrightness });
    } catch (error) {
      console.error(`Error: ${error.message}`);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.get('/brightness-up', async (req, res) => {
    try {
      // Obtient la luminosité actuelle
      const currentBrightness = await brightness.get();
  
      // Diminue la luminosité (vous pouvez ajuster la valeur selon vos besoins)
      const newBrightness = Math.max(currentBrightness + 0.1, 0); // Diminue de 0.1 unité
      await brightness.set(newBrightness);
  
      res.json({ success: true, brightness: newBrightness });
    } catch (error) {
      console.error(`Error: ${error.message}`);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

app.get('*', (req, res) => {
  //res.sendFile(path.join(__dirname, 'page.html'));
  res.sendFile(path.join(__dirname, 'i1.html'));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
