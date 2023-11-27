const express = require('express');
const { exec } = require('child_process');
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

    const apps = stdout.split('\r\n').filter(app => app.trim() !== '').map(app => app.trim().replace('DisplayName : ', ''));
    res.json({ applications: apps });
  });
});

// Ajoutez la redirection pour toutes les autres routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'page.html'));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
