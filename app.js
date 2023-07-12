// Importing the built-in 'http' module
const http = require('http');

// Creating a server object
const server = http.createServer((req, res) => {
  // Setting the response header
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  
  // Writing the response body
  res.write('Hello, World!');
  
  // Ending the response
  res.end();
});

// Listening on port 3000
server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
