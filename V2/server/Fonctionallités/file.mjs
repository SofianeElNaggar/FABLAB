import { exec } from 'child_process';


// Function to open a file with the default program on Windows
export const openFileOnWindows = (filePath) => {
  exec(`start "" "${filePath}"`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error opening the file: ${error.message}`);
    } 
  });
};
