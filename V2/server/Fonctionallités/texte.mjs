import fs from 'fs';

// Function to create a file with content
export const createFileWithContent = (filePath, content) => {
  try {
    fs.writeFileSync(filePath, content);
    console.log(`File ${filePath} created successfully with initial content.`);
  } catch (err) {
    console.error(`Error creating the file: ${err}`);
  }
};

// File path
const filePath = "C:/Users/User/Documents/Matéo/School/Fablab/exemple.txt";

// Initial content for the file
const initialContent = ""; // You can set the initial content if needed

// Create the file with initial content
createFileWithContent(filePath, initialContent);

// Text to append to the file
const additionalText = "Ceci est un texte généré automatiquement en utilisant Node.js.";

// Function to append text to a file
const appendTextToFile = (filePath, text) => {
  fs.appendFile(filePath, text, (err) => {
    if (err) {
      console.error(`Error appending text to the file: ${err}`);
    } else {
      //console.log(`Text appended successfully to the file ${filePath}`);
    }
  });
};

// Append the text to the file
appendTextToFile(filePath, additionalText);
