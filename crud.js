// Importing necessary modules
const mysql = require('mysql');

// Function to create a reusable connection to the MySQL database
function connectToDatabase() {
    // Connection details (fictional)
    const connection = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        database: 'fictional_database',
        user: 'fictional_user',
        password: 'password123'
    });

    // Establishing connection
    connection.connect(err => {
        if (err) {
            console.error('Error connecting to database:', err);
            throw err;
        }
        console.log('Connected to MySQL database');
    });

    // Return the connection object
    return connection;
}

// Function to insert a record into the clients table and return the ID of the new record
function insertClient(firstName, lastName, email, telephone) {
    const connection = connectToDatabase(); // Establishing connection
    // SQL statement with variable binding to avoid SQL injection
    const sql = 'INSERT INTO clients (firstname, lastname, email, telephone) VALUES (?, ?, ?, ?)';
    // Parameters for the SQL query
    const values = [firstName, lastName, email, telephone];

    return new Promise((resolve, reject) => {
        connection.query(sql, values, (err, result) => {
            if (err) {
                console.error('Error inserting client:', err);
                reject(err);
            } else {
                console.log('Client inserted successfully');
                resolve(result.insertId); // Returning the ID of the new record
            }
            connection.end(); // Destroying the connection after the query is complete
        });
    });
}

// Function to select a client by email address
function selectClientByEmail(email) {
    const connection = connectToDatabase(); // Establishing connection
    // SQL statement
    const sql = 'SELECT * FROM clients WHERE email = ?';
    // Parameter for the SQL query
    const values = [email];

    return new Promise((resolve, reject) => {
        connection.query(sql, values, (err, result) => {
            if (err) {
                console.error('Error selecting client by email:', err);
                reject(err);
            } else {
                console.log('Client selected successfully');
                resolve(result);
            }
            connection.end(); // Destroying the connection after the query is complete
        });
    });
}

// Function to update a client's email address
function updateClientEmail(clientId, newEmail) {
    const connection = connectToDatabase(); // Establishing connection
    // SQL statement
    const sql = 'UPDATE clients SET email = ? WHERE id = ?';
    // Parameters for the SQL query
    const values = [newEmail, clientId];

    return new Promise((resolve, reject) => {
        connection.query(sql, values, (err, result) => {
            if (err) {
                console.error('Error updating client email:', err);
                reject(err);
            } else {
                console.log('Client email updated successfully');
                resolve(result.affectedRows); // Returning the number of affected rows
            }
            connection.end(); // Destroying the connection after the query is complete
        });
    });
}

// Function to delete a client by ID
function deleteClientById(clientId) {
    const connection = connectToDatabase(); // Establishing connection
    // SQL statement
    const sql = 'DELETE FROM clients WHERE id = ?';
    // Parameter for the SQL query
    const values = [clientId];

    return new Promise((resolve, reject) => {
        connection.query(sql, values, (err, result) => {
            if (err) {
                console.error('Error deleting client:', err);
                reject(err);
            } else {
                console.log('Client deleted successfully');
                resolve(result.affectedRows); // Returning the number of affected rows
            }
            connection.end(); // Destroying the connection after the query is complete
        });
    });
}

// Try/catch block to handle errors
(async () => {
    try {
        // Inserting a new client
        const clientId = await insertClient('John', 'Doe', 'john@example.com', '1234567890');
        console.log('New client ID:', clientId);

        // Selecting a client by email
        const selectedClient = await selectClientByEmail('john@example.com');
        console.log('Selected client:', selectedClient);

        // Updating the client's email address
        const updatedRows = await updateClientEmail(clientId, 'test-update@email.com');
        console.log('Updated rows:', updatedRows);

        // Deleting the client
        const deletedRows = await deleteClientById(clientId);
        console.log('Deleted rows:', deletedRows);
    } catch (error) {
        console.error('Error:', error);
    }
})();
