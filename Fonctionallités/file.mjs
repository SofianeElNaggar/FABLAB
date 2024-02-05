import { exec } from 'child_process';
import path from 'path';


// Function to open a file with the default program on Windows
const openFileOnWindows = (filePath) => {
  exec(`start "" "${filePath}"`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error opening the file: ${error.message}`);
    } 
  });
};


const filePath = '/chemindufichier/'
const absolutePath = path.resolve(filePath);

openFileOnWindows(absolutePath);
