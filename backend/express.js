//Backend. Recieves query from frontend and sends it to Google Custom Search API, 
//which is set to only include reliable websites.

//I want to thank https://shamsfiroz.medium.com/building-a-full-stack-javascript-search-engine-with-google-custom-search-api-cad796360d2c 
require('dotenv').config();

const express = require('express')
const app = express()
const axios = require('axios');
const cors = require('cors');
const path = require('path');

app.use(cors());

// Serve static files from the project root
app.use(express.static(path.join(__dirname, '..')));

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const GOOGLE_CSE_ID = process.env.GOOGLE_CSE_ID;

app.get('/search', async (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: 'Enter a query (*_*)' });

  try {
    const apiUrl = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${GOOGLE_CSE_ID}&q=${encodeURIComponent(q)}`;
    const { data } = await axios.get(apiUrl);
    res.json({ results: data.items || [] });
  } catch (e) {
    console.error('Google API error:', e.response ? e.response.data : e.message); // Log detailed error
    res.status(500).json({ error: 'Search failed', details: e.message, googleError: e.response ? e.response.data : undefined });
  }
});

app.listen(3001, () => {
  console.log('Server running at http://localhost:3001');
});


