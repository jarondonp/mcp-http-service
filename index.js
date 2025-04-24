const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const MCP_SERVER = 'https://airbnb-production-8f14.up.railway.app';

app.get('/list-tools', async (req, res) => {
  try {
    const response = await axios.get(`${MCP_SERVER}/list-tools`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error calling /list-tools', details: error.message });
  }
});

app.post('/execute-tool', async (req, res) => {
  try {
    const { tool, tool_input } = req.body;
    const response = await axios.post(`${MCP_SERVER}/execute-tool`, {
      tool,
      tool_input,
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error calling /execute-tool', details: error.message });
  }
});

app.listen(port, () => {
  console.log(`MCP proxy server running on port ${port}`);
});