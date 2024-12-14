// Import necessary modules or functions
// If nameChecker is no longer needed, you can remove its import
// import { checkForName } from './nameChecker';

import { response } from "express";

const serverURL = 'https://localhost:8000/api';

const form = document.getElementById('urlForm');
form.addEventListener('submit', handleSubmit);

// Function to validate a URL
function isValidUrl(url) {
    try {
        const newUrl = new URL(url);
        return newUrl.protocol === "http:" || newUrl.protocol === "https:";
    } catch (e) {
        return false;
    }
}

function handleSubmit(event) {
    event.preventDefault();

    // Get the URL from the input field
    const formText = document.getElementById('name').value;

    // Check if the URL is valid
    if (checkForURL(formText)){
        //ithe url is valid, send it to the server
        postData('/api', {url: formText})
        .then(response => {
            console.log('server response:', response);
            //handle the response from the server
        })
        .catch(error => {
            console.error('Error:', error);
            //handle errors
        });
    }
    if (isValidUrl(formText)) {
        console.log("Valid URL:", formText);
        sendDataToServer(formText);
    } else {
        console.error("Invalid URL");
        alert("Please enter a valid URL.");
    }
}

// Function to send data to the server
async function sendDataToServer(url) {
    try {
        const response = await fetch(serverURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data }),
        });

        if (response.ok) {
            const data = await response.json();
            console.log("Response from server:", data);
            displayResults(data);
        } else {
            console.error("Server responded with an error:", response.statusText);
            alert("There was an error processing your request. Please try again later.");
        }
    } catch (error) {
        console.error("Error sending data to server:", error);
        alert("Unable to connect to the server. Please check your connection or try again later.");
    }
}

// Function to display results on the page
function displayResults(data) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerText = JSON.stringify(data, null, 2); // Display results as a formatted string
}

// Export the handleSubmit function
export { handleSubmit };
