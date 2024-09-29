require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

// Configure CORS to allow requests from your Vite frontend
const corsOptions = {
    origin: 'http://localhost:5173',  // Replace with your frontend URL
    methods: ['GET', 'POST'],
    credentials: true,  // Allow cookies and headers like authorization
};

const app = express();
app.use(cors(corsOptions)); // Only use one CORS middleware

app.get('/api/crypto-insights', async (req, res) => {
    try {
      // Your API call to CoinGecko
      const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
        params: {
          ids: 'bitcoin,ethereum',
          vs_currencies: 'usd'
        }
      });
      res.json(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Error fetching data from CoinGecko' });
    }
  });
  

// Function to fetch insights using Llama API with an API key (from .env)
async function fetchLlamaInsights(data) {
    const dataString = Object.entries(data)
        .map(([key, value]) => `Price of ${key}: $${value.usd}`)
        .join(' - ');

    const prompt = `Here's the data from CoinGecko: ${dataString}. Please provide me insights about this data?`;

    try {
        const response = await axios.post('https://phi.us.gaianet.network/v1/chat/completions', {
            model: 'phi',
            messages: [
                { role: 'system', content: 'You are a helpful assistant that analyzes cryptocurrency data and provides insights.' },
                { role: 'user', content: prompt }
            ]
        }, {
            headers: {
                'x-api-key': process.env.API_KEY // Use your API key here
            }
        });

        console.log("Insights:");
        console.log(response.data.choices[0].message.content);

        return response.data.choices[0].message.content; // Return the insights
    } catch (error) {
        console.error('Error fetching Insights:', error.message);
        throw error; // Propagate the error to the calling function
    }
}

// API endpoint to fetch and send crypto insights
app.get('/api/crypto-insights', async (req, res) => {
    try {
        const cryptoData = await fetchCryptoData();
        const insights = await fetchLlamaInsights(cryptoData);
        res.json({ insights });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'An error occurred while fetching data' });
    }
});

// Start the server on port 5000 (or the port from the .env file)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
