// Import the necessary modules.
const ftp = require("basic-ftp"); // For FTP operations.
const fs = require("fs"); // For file system operations.

/**
 * Connects to an FTP server over TLS.
 * @param {string} host The host name or IP of the FTP server.
 * @param {string} user The username for login.
 * @param {string} password The password for login.
 * @returns {ftp.Client} An instance of the FTP client connected to the server.
 */
async function connectToFtpServer(host, user, password) {
    const client = new ftp.Client();
    client.ftp.verbose = true; // Enable verbose logging for debugging purposes.
    try {
        await client.access({
            host: host,
            user: user,
            password: password,
            secure: true, // Use TLS.
        });
        console.log("Connected to the FTP server successfully.");
    } catch (error) {
        console.error("Failed to connect to the FTP server:", error);
        throw error; // Rethrow the error to be handled by the caller.
    }
    return client;
}

/**
 * Lists the files on the connected FTP server.
 * @param {ftp.Client} client The connected FTP client instance.
 * @returns {Promise<Array>} A promise that resolves to an array of file names.
 */
async function listFiles(client) {
    try {
        const fileList = await client.list();
        console.log("Files on the server:", fileList);
        return fileList.map(file => file.name); // Return only the file names.
    } catch (error) {
        console.error("Failed to list files on the FTP server:", error);
        throw error;
    }
}

/**
 * Downloads a single file from the FTP server.
 * @param {ftp.Client} client The connected FTP client instance.
 * @param {string} fileName The name of the file to download.
 */
async function downloadSingleFile(client, fileName) {
    try {
        const localPath = `./single-ftp-files/${fileName}`;
        await client.downloadTo(localPath, fileName);
        console.log(`Downloaded ${fileName} to ${localPath}`);
    } catch (error) {
        console.error(`Failed to download file ${fileName}:`, error);
        throw error;
    }
}

/**
 * Downloads all files from the FTP server and stores them locally.
 * @param {ftp.Client} client The connected FTP client instance.
 */
async function downloadAllFiles(client) {
    try {
        const files = await listFiles(client);
        for (const file of files) {
            const localPath = `./ftp-files/${file}`;
            await client.downloadTo(localPath, file);
            console.log(`Downloaded ${file} to ${localPath}`);
        }
    } catch (error) {
        console.error("Failed to download all files:", error);
        throw error;
    }
}

/**
 * Deletes a file from the FTP server.
 * @param {ftp.Client} client The connected FTP client instance.
 * @param {string} fileName The name of the file to delete.
 */
async function deleteFile(client, fileName) {
    try {
        await client.remove(fileName);
        console.log(`Deleted ${fileName} from the FTP server.`);
    } catch (error) {
        console.error(`Failed to delete file ${fileName}:`, error);
        throw error;
    }
}

// Example usage
(async () => {
    const client = await connectToFtpServer("ftp.example.com", "yourUsername", "yourPassword");
    await listFiles(client);
    await downloadSingleFile(client, "example.pdf");
    await downloadAllFiles(client);
    await deleteFile(client, "example.pdf");
    client.close();
})();
