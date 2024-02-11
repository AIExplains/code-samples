// Import the mysql module
const mysql = require('mysql');

// Create a connection object with your database details
const connection = mysql.createConnection({
  host: 'fictionalhost', // Replace with your database host
  port: 3306, // Replace with your database port, 3306 is the default MySQL port
  database: 'fictionaldb', // Replace with your database name
  user: 'fictionaluser', // Replace with your database username
  password: 'fictionalpassword' // Replace with your database password
});

// Connect to the MySQL database
connection.connect(err => {
  if (err) {
    // If there is a connection error, log it and exit
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }

  console.log('Connected to database as ID ' + connection.threadId);
});

// SQL statement to create a "clients" table if it does not exist
const createTableSQL = `
CREATE TABLE IF NOT EXISTS clients (
  id INT AUTO_INCREMENT PRIMARY KEY,
  firstname VARCHAR(255),
  lastname VARCHAR(255),
  email VARCHAR(255),
  telephone VARCHAR(255)
)`;

// Execute the SQL statement to create the table
connection.query(createTableSQL, (err, results) => {
  if (err) throw err; // If there is an error creating the table, throw the error

  console.log('Table "clients" created or already exists.');
});

// Function to insert a record into the "clients" table
async function insertRecord(firstname, lastname, email, telephone) {
  try {
    // SQL statement for inserting a record, using placeholder values for variable binding
    const insertSQL = `INSERT INTO clients (firstname, lastname, email, telephone) VALUES (?, ?, ?, ?)`;

    // Execute the insert SQL statement with the provided values
    connection.query(insertSQL, [firstname, lastname, email, telephone], (err, results) => {
      if (err) {
        // If there is an error during insertion, throw the error
        throw err;
      }

      // Log and return the ID of the newly inserted record
      console.log(`Record inserted with ID: ${results.insertId}`);
      return results.insertId;
    });
  } catch (err) {
    // Catch and log any errors
    console.error('An error occurred: ', err.message);
  }
}

// Example usage of the insertRecord function
// Replace 'John', 'Doe', 'john.doe@example.com', '1234567890' with actual values
insertRecord('John', 'Doe', 'john.doe@example.com', '1234567890');

// Close the connection when done
connection.end();
