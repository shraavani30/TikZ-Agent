const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// IMPORTANT: Replace with your actual IBM Cloud credentials and URL
const AGENT_API_URL = 'https://eu-de.ml.cloud.ibm.com/ml/v4/deployments/857e3ac7-7cb9-4afe-a7f4-54d761f15dc3/ai_service?version=2021-05-01';
const API_KEY = 'vkNRhiALI1C5xzbUGn_ejLevqEZp_JkgrVyoQYUfou-v'; // <-- Make sure your API key is correct here

// Use CORS to allow requests from your frontend
app.use(cors()); 

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Main endpoint for diagram generation
app.post('/api/generate-diagram', async (req, res) => {
    // A quick defensive check for a missing body
    if (!req.body || !req.body.prompt) {
        console.error('Error: Incoming request body is missing a prompt.');
        return res.status(400).json({ error: 'Prompt is required.' });
    }

    const { prompt } = req.body;
    console.log(`Received prompt: "${prompt}"`); // Log the prompt to confirm it's received

    try {
        // Step 1: Get the Bearer Token from the IAM endpoint
        // Using the native 'fetch' function, which is now available in Node.js 18+
        const tokenResponse = await fetch('https://iam.cloud.ibm.com/identity/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            },
            body: `apikey=${API_KEY}&grant_type=urn:ibm:params:oauth:grant-type:apikey`
        });

        if (!tokenResponse.ok) {
            const errorText = await tokenResponse.text();
            console.error(`Failed to get IAM token: ${tokenResponse.status} - ${errorText}`);
            throw new Error(`Failed to get IAM token: ${tokenResponse.status}`);
        }
        const tokenData = await tokenResponse.json();
        const accessToken = tokenData.access_token;

        // Step 2: Use the Bearer Token for the actual API call
        const apiResponse = await fetch(AGENT_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                messages: [{ content: prompt, role: 'user' }]
            })
        });

        if (!apiResponse.ok) {
            const errorText = await apiResponse.text();
            console.error(`IBM Cloud API error: ${apiResponse.status} - ${errorText}`);
            throw new Error(`IBM Cloud API error: ${apiResponse.status}`);
        }

        const data = await apiResponse.json();
        res.json(data); // Send the successful response back to the client

    } catch (error) {
        console.error('Error in proxy server:', error);
        res.status(500).json({ error: 'Failed to communicate with the AI service.' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Proxy server is running on http://localhost:${PORT}`);
});