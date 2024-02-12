const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Function to simulate database write operation
// This is just a placeholder. You should replace it with actual database interaction logic.
async function writeToDatabase(data) {
    // Simulate database write operation
    console.log('Writing to database:', data);
    // Here, you would typically have code that interacts with your database.
}

// Middleware for API key validation
function validateApiKey(req, res, next) {
    const apiKey = req.headers['x-api-key'];
    if (!apiKey || apiKey !== 'YOUR_API_KEY_HERE') { // Replace YOUR_API_KEY_HERE with your actual API key
        // If the API key is missing or incorrect, return a 302 error
        return res.status(302).send('API Key is invalid or missing.');
    }
    next(); // Proceed to the next middleware/function if the API key is valid
}

// Function to validate email and telephone using regex
function validateEmailAndTelephone(email, telephone) {
    const emailRegex = /\S+@\S+\.\S+/;
    const telephoneRegex = /^\d{10}$/; // This regex might need to be adjusted based on the expected telephone format
    return emailRegex.test(email) && telephoneRegex.test(telephone);
}

// Endpoint to handle the POST request
app.post('/submit', validateApiKey, async (req, res) => {
    try {
        const { firstname, lastname, email, telephone } = req.body;
        
        // Check for empty values
        if (!firstname || !lastname || !email || !telephone) {
            return res.status(400).send('All fields are required.');
        }

        // Validate email and telephone
        if (!validateEmailAndTelephone(email, telephone)) {
            return res.status(400).send('Invalid email or telephone format.');
        }

        // Simulate writing to a database
        await writeToDatabase({ firstname, lastname, email, telephone });

        // Return a success message
        res.status(200).send('Submission successful.');
    } catch (error) {
        console.error('Error handling the request:', error);
        res.status(500).send('An error occurred.');
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
