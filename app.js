const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Set up body-parser middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Route for handling GET requests to the homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route for handling POST requests
app.post('/submit', (req, res) => {
  const { name, email } = req.body;
  res.send(`Thank you for submitting! Your name is ${name} and your email is ${email}.`);
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
