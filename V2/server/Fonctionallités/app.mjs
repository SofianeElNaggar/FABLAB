import { exec } from 'child_process';
import os from 'os';

// Votre code ici

// Function to list installed applications
const listInstalledApplications = () => {
  try {
    // Run a command to get a list of installed applications
    if (os.platform() === 'win32') {  // For Windows
      exec('wmic product get name, installlocation', (error, stdout, stderr) => {
        if (error) {
          console.error(`Error listing installed applications: ${stderr}`);
        } else {
          console.log("Installed Applications:");
          console.log(stdout);
        }
      });
    } else {
      throw new Error("Unsupported operating system");
    }
  } catch (error) {
    console.error(`Error listing installed applications: ${error.message}`);
  }
};

// Function to launch a specific application
const launchApplication = (applicationName) => {
  try {
    // Check if the application name ends with .exe
    if (applicationName.endsWith('.exe')) {
      // Run the application directly
      exec(`start "" "${applicationName}"`, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error launching the application: ${stderr}`);
        }
      });
    } else {
      console.log(`Launching ${applicationName}`);
    }
  } catch (error) {
    console.error(`Error launching the application: ${error.message}`);
  }
};

// Example usage
listInstalledApplications();

// Provide the application name you want to launch
const appToLaunch = "C:/Users/User/AppData/Local/Programs/Opera/launcher.exe";  // Replace with the application you want to launch
launchApplication(appToLaunch);
