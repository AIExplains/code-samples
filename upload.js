const express = require('express');
const multer = require('multer'); // Multer is middleware for handling multipart/form-data
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Set storage engine
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        // Set destination for uploaded files
        cb(null, './client_documents');
    },
    filename: function(req, file, cb) {
        // Set filename as original uploaded name
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Initialize upload variable with multer configuration
// Set file size limit to 5MB and file filter for PDF and PNG files
const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 Megabytes limit
    fileFilter: function(req, file, cb) {
        // Validate file type
        if(file.mimetype === 'application/pdf' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            // Reject file if it does not meet the mimetype criteria
            cb(new Error('Invalid file type, only PDF and PNG are allowed!'), false);
        }
    }
}).fields([{ name: 'pdfFile', maxCount: 1 }, { name: 'imageFile', maxCount: 1 }]); // Accept a field named pdfFile and imageFile

// Create endpoint for file upload
app.post('/upload', (req, res) => {
    try {
        // Handle the file upload process
        upload(req, res, (err) => {
            if(err) {
                // If an error occurred during the multer process, handle it
                if(err instanceof multer.MulterError) {
                    // A Multer error occurred when uploading.
                    return res.status(400).send({ error: err.message });
                } else {
                    // An unknown error occurred when uploading.
                    return res.status(500).send({ error: err.message });
                }
            }
            // If no files are uploaded
            if(!req.files || Object.keys(req.files).length === 0) {
                return res.status(400).send({ error: 'No files were uploaded.' });
            }
            // If everything went fine, send a success response
            res.status(200).send({ message: 'Files uploaded successfully!' });
        });
    } catch (error) {
        // Catch any other errors and return an error message
        res.status(500).send({ error: 'Server error during file upload.' });
    }
});

// Ensure the client_documents directory exists
const dir = './client_documents';
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
