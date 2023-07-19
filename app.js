// app.js
const express = require('express');
const app = express();
const path = require('path');

// Define the static files folder (assuming your HTML, CSS, and JS files are in the "public" folder)
app.use(express.static(path.join(__dirname, 'public')));

// Define the GET request route for serving the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
const port = 3000; // Choose the port you prefer
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
