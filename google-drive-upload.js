const fs = require('fs');
const { google } = require('googleapis');

// Load credentials from a JSON file
const credentials = require('./credentials.json');

// Create an OAuth2 client with the given credentials
const auth = new google.auth.GoogleAuth({
  credentials: credentials,
  scopes: ['https://www.googleapis.com/auth/drive'],
});

// Create a Google Drive client
const drive = google.drive({ version: 'v3', auth });

async function uploadCSVToDrive() {
  try {
    // Create an array of JSON objects with client data
    const clients = [
      { firstname: 'John', lastname: 'Doe', email: 'john@example.com', telephone: '1234567890' },
      { firstname: 'Jane', lastname: 'Smith', email: 'jane@example.com', telephone: '9876543210' },
    ];

    // Convert the array of JSON objects to a CSV string
    const csvData = clients.map(client => `${client.firstname},${client.lastname},${client.email},${client.telephone}`).join('\n');

    // Write the CSV data to a file
    fs.writeFileSync('clients.csv', csvData);

    // Upload the CSV file to Google Drive
    const response = await drive.files.create({
      requestBody: {
        name: 'clients.csv',
        parents: ['<YOUR_FOLDER_ID>'], // Replace '<YOUR_FOLDER_ID>' with the actual folder ID
        mimeType: 'text/csv',
      },
      media: {
        mimeType: 'text/csv',
        body: fs.createReadStream('clients.csv'),
      },
    });

    console.log('CSV file uploaded successfully:', response.data);
  } catch (error) {
    console.error('Error occurred:', error.message);
  }
}

// Call the function to upload CSV to Google Drive
uploadCSVToDrive();