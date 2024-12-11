// app.js
const express = require('express');
const app = express();
app.set('view engine', 'ejs');
const path = require('path');
const bodyParser = require('body-parser');
const ibeam = require('./ibeamCalc');

// Define the static files folder
app.use(express.static(path.join(__dirname, 'public')));

// Use body-parser middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Define the GET request route for serving the default HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Define the POST request route for handling the form submission of
// ibeam calculation
app.post('/', (req, res) => {
  const sigma = parseFloat(req.body.sigma);
  const forceApplied = parseFloat(req.body.force_applied);
  const beamThickness = parseFloat(req.body.beam_thick);
  const numDistances = parseFloat(req.body.num_distances);
  const distances = Array.from({ length: numDistances }, (_, i) => {
    const distance = parseFloat(req.body[`distance${i + 1}`]);
    return isNaN(distance) ? 0 : parseFloat(distance);
  });

  // ibeam calculation
  const results = ibeam(sigma, forceApplied, beamThickness, distances);

  // redireting to views/distance.ejs file
  res.render('distance', {
    sigma: sigma,
    forceApplied: forceApplied,
    beamThickness: beamThickness,
    results: results
  });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
