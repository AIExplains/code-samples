// Import the googleapis package
const {google} = require('googleapis');

// Path to the service account credentials JSON file
const KEYFILEPATH = 'path/to/your/credentials.json';

// Specify the scopes required by the Sheets API
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

// Specify the ID of the Google Sheets spreadsheet where the data will be written
// This will be updated once the new spreadsheet is created
let spreadsheetId;

// The initial title for the new spreadsheet
const spreadsheetTitle = 'Clients';

// Data to be written to the Google Sheet: an array of client records
const clients = [
  { title: 'Mr.', firstname: 'John', lastname: 'Doe', email: 'john.doe@example.com', telephone: '1234567890' },
  { title: 'Ms.', firstname: 'Jane', lastname: 'Doe', email: 'jane.doe@example.com', telephone: '0987654321' },
  { title: 'Dr.', firstname: 'Jim', lastname: 'Beam', email: 'jim.beam@example.com', telephone: '1122334455' },
  { title: 'Prof.', firstname: 'Jill', lastname: 'Biden', email: 'jill.biden@example.com', telephone: '5566778899' },
  { title: 'Sir', firstname: 'Jack', lastname: 'Sparrow', email: 'jack.sparrow@example.com', telephone: '12344321' }
];

// Authenticate with the Google Sheets service using a service account
const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: SCOPES,
});

async function createAndPopulateSheet() {
  try {
    const sheets = google.sheets({version: 'v4', auth});

    // Create a new Google Sheet with the specified title
    const createResponse = await sheets.spreadsheets.create({
      resource: {
        properties: {
          title: spreadsheetTitle,
        },
      },
    });

    // Update the spreadsheetId with the newly created spreadsheet's id
    spreadsheetId = createResponse.data.spreadsheetId;
    console.log(`Spreadsheet ID: ${spreadsheetId}`);

    // Prepare the header row
    const headers = ['title', 'firstname', 'lastname', 'email', 'telephone'];
    
    // Write the headers to the Google Sheet
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: 'A1',
      valueInputOption: 'RAW',
      resource: {
        values: [headers],
      },
    });

    // Iterate over the clients array and write each record to the Google Sheet
    for (const client of clients) {
      const row = [client.title, client.firstname, client.lastname, client.email, client.telephone];
      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: 'A1',
        valueInputOption: 'USER_ENTERED',
        resource: {
          values: [row],
        },
      });
    }

    console.log('Data written successfully to the sheet.');
  } catch (error) {
    // Log any errors that occur during the process
    console.error('Error creating or writing to sheet:', error);
  }
}

// Run the function to create the Google Sheet and populate it with data
createAndPopulateSheet();