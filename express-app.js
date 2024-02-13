const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const requestIp = require('request-ip');

// Initialize the express application
const app = express();
const port = 8080; // Set the port for the server

// Middleware for CORS with specific origins whitelisted
const corsOptions = {
  origin: function (origin, callback) {
    if (['http://localhost:3000', 'http://localhost:3001'].indexOf(origin) !== -1) {
      callback(null, true); // Origin is in the whitelist
    } else {
      callback(new Error('Not allowed by CORS')); // Origin is not in the whitelist
    }
  },
};
app.use(cors(corsOptions));

// Middleware to parse JSON bodies with a limit of 80 MB
app.use(express.json({ limit: '80mb' }));

// Use bodyParser to transform the request body to application/json
app.use(bodyParser.json());

// Use requestIP to collect the HTTP request origin IP address
app.use(requestIp.mw());

// Middleware to check if the requester's IP is not local or blacklisted
app.use((req, res, next) => {
  const clientIp = req.clientIp;
  // Example check for local IP addresses or a specific blacklisted IP
  if (clientIp === '::1' || clientIp === 'specific.blacklisted.ip') {
    res.status(401).json({ message: 'Unauthorized IP address' });
  } else {
    next();
  }
});

// Define the main router
const router = express.Router();

// Middleware to set response headers to application/json
router.use((req, res, next) => {
  res.header('Content-Type', 'application/json');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, X-API-Key');
  next();
});

// Authentication middleware for the "/api" route
router.use('/api', (req, res, next) => {
  const apiKey = req.header('X-API-Key');
  if (apiKey === 'your_api_key_here') {
    next();
  } else {
    res.status(403).json({ message: 'Forbidden: Invalid API Key' });
  }
});

// Sub-router for the "/api" route
const apiRouter = express.Router();

// Route for "/api/submit-data" with try/catch exception handling
apiRouter.post('/submit-data', async (req, res) => {
  try {
    // Your logic here

    // Example response
    res.json({ message: 'Data submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' });
  }
});

// Mount the sub-router on the main router
router.use('/api', apiRouter);

// Use the router on the app
app.use(router);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
