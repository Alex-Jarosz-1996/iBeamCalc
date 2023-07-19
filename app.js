// app.js
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser'); // Require body-parser
const ibeam = require('./ibeamCalc'); // Assuming ibeamCalc.js is in the same directory as app.js

// Define the static files folder (assuming your HTML, CSS, and JS files are in the "public" folder)
app.use(express.static(path.join(__dirname, 'public')));

// Use body-parser middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Define the GET request route for serving the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Define the POST request route for handling the form submission
app.post('/', (req, res) => {
  // Access form data using req.body
  const sigma = req.body.sigma;
  const forceApplied = req.body.force_applied;
  const beamThickness = req.body.beam_thick;
  const numDistances = req.body.num_distances;
  const distances = Array.from({ length: numDistances }, (_, i) => {
    const distance = parseFloat(req.body[`distance${i + 1}`]);
    return isNaN(distance) ? 0 : distance;
  });
  
  console.log('Sigma (N/mm^2):', sigma);
  console.log('Force Applied (N):', forceApplied);
  console.log('Beam Thickness (mm):', beamThickness);
  console.log('Number of Distances:', numDistances);
  console.log('Distances:', distances);

  // Process the form data as needed (you can add your logic here)
  const results = ibeam(sigma, forceApplied, beamThickness, distances);
  console.log(results); // Example: Display the results of the ibeam function

  // Respond with a confirmation message or redirect to another page
  res.send('Form submission successful!');
});

// Start the server
const port = 3000; // Choose the port you prefer
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
