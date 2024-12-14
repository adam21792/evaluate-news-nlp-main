const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

console.log(__dirname);

// You could call it aylienapi, or anything else
var textapi = new aylien({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
 });

// Variables for url and api key (These can be set via environment variables)
const serverURL = process.env.SERVER_URL || 'http://localhost:8000/api';

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res) => {
    res.send("This is the server API page, you may access its services via the client app.");
});

// POST Route to handle form submissions
app.post('/submit-url', (req, res) => {
    const { url } = req.body;

    // Validate the URL (basic example)
    if (!url || !/^https?:\/\/.+$/.test(url)) {
        return res.status(400).json({ error: 'Invalid URL' });
    }

    // Process the URL (this is just a placeholder, replace with actual processing logic)
    console.log('Received URL:', url);

    // Simulate processing and sending back a response
    res.json({ message: 'URL received', processed: url });
});

// Designates what port the app will listen to for incoming requests
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
});
