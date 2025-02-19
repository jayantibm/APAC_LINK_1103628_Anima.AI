require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

// Serve static files (for HTML UI)
app.use(express.static('public'));

function parseJSONLResponse(jsonlString) {
    try {
        return jsonlString
            .split("\n")
            .filter(line => line.trim()) // Ignore empty lines
            .map(line => {
                try {
                    const parsed = JSON.parse(line);
                    return Array.isArray(parsed) && typeof parsed[1] === "string" ? parsed[1] : "";
                } catch (err) {
                    console.warn("Skipping invalid JSON line:", line);
                    return "";
                }
            })
            .join("")
            .trim();
    } catch (error) {
        console.error("Parsing Error:", error);
        return "Error processing response.";
    }
}


// API Endpoint for AI Search
app.post('/api/search', async (req, res) => {
    const { query } = req.body;
    // console.log('query:++++++++', req.body);
    if (!query) {
        // console.log('failed:++++++++', error);
        return res.status(400).json({ error: 'Please provide a query.' });
    }

    try {
        const response = await axios.post(
            "https://d18n68ssusgr7r.cloudfront.net/v1/chat/completions",
            {
                model: "granite-3-8b-instruct",
                messages: [{ role: "user", content: query }]
            },
            {
                headers: {
                    Authorization: "Bearer test",
                    "Content-Type": "application/json"
                }
            }
        );
        const resData = parseJSONLResponse(response.data);
        const result = resData?.trim() || ""; // Ensure result is a string

 
        // Check if result has content before sending response
        if (result.length > 0) {
            return res.status(200).json({ output: result });
        } else {
            throw new Error("Empty AI response");
        }
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch AI response.' });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
