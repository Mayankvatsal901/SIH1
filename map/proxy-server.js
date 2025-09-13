const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = 3000;

const ARGOVIS_API_KEY = "da2d6629ef1215b1d1a8c13c70e2432bd5d5c204";
const headers = { 'x-argokey': ARGOVIS_API_KEY };

app.use(cors());

// Generic error handler for API requests
async function handleApiRequest(url, res) {
    try {
        console.log(`Forwarding request to: ${url}`);
        const apiResponse = await fetch(url, { headers });
        if (!apiResponse.ok) {
            throw new Error(`API responded with status: ${apiResponse.status}`);
        }
        const data = await apiResponse.json();
        res.json(data);
    } catch (error) {
        console.error(`Proxy server error for ${url}:`, error);
        res.status(500).json({ error: error.message });
    }
}

// Route for Argo Floats: Gets the last known position of ALL floats.
app.get('/api/argo', async (req, res) => {
    const apiUrl = 'https://argovis-api.colorado.edu/argo?most_recent=1';
    await handleApiRequest(apiUrl, res);
});

// Route for Drifters: Gets drifter data for the last year.
app.get('/api/drifters', async (req, res) => {
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    const startDate = oneYearAgo.toISOString();
    const apiUrl = `https://argovis-api.colorado.edu/drifters?startDate=${startDate}`;
    await handleApiRequest(apiUrl, res);
});

// Route for Tropical Cyclones: Gets TC data for the last year.
app.get('/api/tc', async (req, res) => {
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    const startDate = oneYearAgo.toISOString();
    const apiUrl = `https://argovis-api.colorado.edu/tc?startDate=${startDate}`;
    await handleApiRequest(apiUrl, res);
});

app.listen(PORT, () => {
    console.log(`🌊 Argo AI Multi-Dataset Proxy Server listening on http://localhost:${PORT}`);
});
