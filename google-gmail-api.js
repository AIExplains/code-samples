const { google } = require('googleapis');
const fs = require('fs');
const { createObjectCsvWriter } = require('csv-writer');

// Function to acquire new Google API token
async function acquireNewToken(oAuth2Client, callback) {
  // Placeholder logic for acquiring a new token (e.g., OAuth flow)
  // In real-world usage, you would implement OAuth2 authentication flow
  // and store the token securely (e.g., in a database)
  // For demonstration purposes, we'll just prompt for manual input here
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question('Enter the token: ', (token) => {
    rl.close();
    oAuth2Client.setCredentials({ access_token: token });
    callback(oAuth2Client);
  });
}

// Function to connect to the fictional mailbox using fictional credentials
async function connectToMailbox() {
  try {
    // Load client secrets from a local file
    const credentials = require('./credentials.json');

    // Specify the desired Gmail API scopes
    const SCOPES = ['https://www.googleapis.com/auth/gmail.modify'];

    // Create OAuth2 client with credentials
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

    // Check if we have previously stored a token
    let token;
    try {
      token = fs.readFileSync('./token.json');
      oAuth2Client.setCredentials(JSON.parse(token));
    } catch (err) {
      // If token file doesn't exist or is invalid, acquire new token
      acquireNewToken(oAuth2Client, (auth) => {
        // Save token for future use
        fs.writeFileSync('./token.json', JSON.stringify(auth.credentials));
      });
    }

    // Create Gmail API instance
    const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

    return gmail;
  } catch (error) {
    console.error('Error connecting to mailbox:', error);
  }
}

// Function to download unread messages from the mailbox to a local directory
async function downloadUnreadMessages(gmail, directoryPath) {
  try {
    // Fetch unread messages
    const response = await gmail.users.messages.list({
      userId: 'me',
      q: 'is:unread',
    });

    // Process each message
    for (const message of response.data.messages) {
      // Fetch message details
      const messageDetails = await gmail.users.messages.get({
        userId: 'me',
        id: message.id,
      });

      // Save message raw text to a file
      const messageFilePath = `${directoryPath}/${message.id}.txt`;
      fs.writeFileSync(messageFilePath, messageDetails.data.raw);
    }

    console.log('Unread messages downloaded successfully.');
  } catch (error) {
    console.error('Error downloading unread messages:', error);
  }
}

// Function to mark unread messages as "read"
async function markMessagesAsRead(gmail, messageIds) {
  try {
    // Iterate over each message id and mark it as read
    for (const messageId of messageIds) {
      await gmail.users.messages.modify({
        userId: 'me',
        id: messageId,
        resource: {
          removeLabelIds: ['UNREAD'],
        },
      });
    }

    console.log('Messages marked as read successfully.');
  } catch (error) {
    console.error('Error marking messages as read:', error);
  }
}

// Function to delete messages by email id
async function deleteMessages(gmail, messageIds) {
  try {
    // Iterate over each message id and delete it
    for (const messageId of messageIds) {
      await gmail.users.messages.delete({
        userId: 'me',
        id: messageId,
      });
    }

    console.log('Messages deleted successfully.');
  } catch (error) {
    console.error('Error deleting messages:', error);
  }
}

// Function to move an email from inbox to archive
async function moveMessageToArchive(gmail, messageId) {
  try {
    await gmail.users.messages.modify({
      userId: 'me',
      id: messageId,
      resource: {
        removeLabelIds: ['INBOX'],
        addLabelIds: ['ARCHIVE'],
      },
    });

    console.log('Message moved to archive successfully.');
  } catch (error) {
    console.error('Error moving message to archive:', error);
  }
}

// Function to save message id and email raw text in a CSV file
function saveMessageDataToCSV(messages) {
  const csvWriter = createObjectCsvWriter({
    path: 'message_data.csv',
    header: [
      { id: 'id', title: 'Message ID' },
      { id: 'raw', title: 'Raw Email' },
    ],
  });

  csvWriter.writeRecords(messages)
    .then(() => console.log('CSV file created successfully.'))
    .catch((error) => console.error('Error creating CSV file:', error));
}

// Main function to orchestrate operations
async function main() {
  const gmail = await connectToMailbox();

  if (gmail) {
    // Example usage
    const messageIds = ['example_message_id_1', 'example_message_id_2'];
    await downloadUnreadMessages(gmail, './downloaded_messages');
    await markMessagesAsRead(gmail, messageIds);
    await deleteMessages(gmail, messageIds);
    await moveMessageToArchive(gmail, 'example_message_id');
    saveMessageDataToCSV([{ id: 'example_message_id', raw: 'example_raw_text' }]);
  }
}

main();
