const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();

app.get('/', (req, res) => {
    res.send("NGO Bridge API Server is running!");
});
app.use(cors());
app.use(express.json());

// 1. Debug: Confirm the key is loaded
if (!process.env.GEMINI_API_KEY) {
    console.error("ERROR: GEMINI_API_KEY is not set in environment variables!");
} else {
    console.log("API Key loaded successfully.");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/api/generate', async (req, res) => {
    try {
        const { prompt } = req.body;
        console.log("Received prompt:", prompt); // See what's coming in
        
        const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" }); // Changed to stable model
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        res.json({ text: text });
    } catch (error) {
        console.error("DETAILED AI ERROR:", error); // This is where the real secret error is!
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));