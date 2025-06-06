const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Default route
app.get('/', (req, res) => {
    res.send("🚀 API is running! Use POST requests to /optimizer or /translate.");
});

// Ask API Route (Fixed question parameter)
app.post('/ask', async (req, res) => {
    const { question, language } = req.body;

    if (!question || !language) {
        return res.status(400).json({ error: "Question and language are required!" });
    }

    if (!process.env.OPENAI_API_KEY) {
        return res.status(500).json({ error: "Missing OpenAI API Key!" });
    }

    try {
        // OpenAI API request
        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: `You are a programming expert. Answer the following question in ${language}.`
                    },
                    {
                        role: "user",
                        content: question
                    }
                ]
            },
            {
                headers: {
                    "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        res.json({ answer: response.data.choices[0].message.content });
    } catch (error) {
        console.error("API Error:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to fetch response." });
    }
});

// error finder api route
app.post('/errorfinder', async (req, res) => {
    const { code, language } = req.body;

    if (!code || !language) {
        return res.status(400).json({ error: "Code and language are required!" });
    }

    if (!process.env.OPENAI_API_KEY) {
        return res.status(500).json({ error: "Missing OpenAI API Key!" });
    }

    try {
        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: `You are a programming expert specializing in ${language}. Analyze the given ${language} code and identify any syntax, logical, or runtime errors. Provide only the corrected code without any additional analysis or explanations.`
                    },
                    {
                        role: "user",
                        content: `Fix the errors in the following ${language} code and provide the corrected code only:\n\n${code}`
                    }
                ]
            },
            {
                headers: {
                    "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        const correctedCode = response.data.choices[0].message.content;
        res.json({ correctedCode });  // Send only the corrected code
    } catch (error) {
        console.error("API Error:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to fetch response." });
    }
});

//error finder api route
app.post('/errorfinder', async (req, res) => {
    const { code, language } = req.body;

    if (!code || !language) {
        return res.status(400).json({ error: "Code and language are required!" });
    }

    if (!process.env.OPENAI_API_KEY) {
        return res.status(500).json({ error: "Missing OpenAI API Key!" });
    }

    try {
        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: `You are a programming expert specializing in ${language}. Analyze the given ${language} code and identify any syntax, logical, or runtime errors. Provide a detailed explanation of the errors. Do NOT generate corrected code, only explain the errors.`
                    },
                    {
                        role: "user",
                        content: `Find errors in the following ${language} code:\n\n${code}`
                    }
                ]
            },
            {
                headers: {
                    "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        const errorExplanation = response.data.choices[0].message.content;
        res.json({ errorExplanation });  // Send only the explanation
    } catch (error) {
        console.error("API Error:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to fetch response." });
    }
});


// Code Explanation API Route (Fixed Route Name)
app.post('/explain', async (req, res) => {
    const { code } = req.body;

    if (!code) {
        return res.status(400).json({ error: "Code is required!" });
    }

    if (!process.env.OPENAI_API_KEY) {
        return res.status(500).json({ error: "Missing OpenAI API Key!" });
    }

    try {
        // OpenAI API request
        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: "You are a code explainer. Break down the given code into simple steps and provide the expected output."
                    },
                    {
                        role: "user",
                        content: `Explain this code step by step and show its output:\n\n${code}`
                    }
                ]
            },
            {
                headers: {
                    "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        if (response.data.choices && response.data.choices.length > 0) {
            res.json({ explanation: response.data.choices[0].message.content });
        } else {
            res.status(500).json({ error: "Failed to retrieve explanation from OpenAI." });
        }
    } catch (error) {
        console.error("Explanation error:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to explain code." });
    }
});
// Optimizer API Route
app.post('/optimizer', async (req, res) => {
    const { code } = req.body;

    if (!code) {
        return res.status(400).json({ error: "Code is required!" });
    }

    if (!process.env.OPENAI_API_KEY) {
        return res.status(500).json({ error: "Missing OpenAI API Key!" });
    }

    try {
        // OpenAI API request
        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: "You are a code optimizer. Improve the given code by reducing its time and space complexity while preserving its functionality."
                    },
                    {
                        role: "user",
                        content: `Optimize this code for efficiency (lower time and space complexity):\n\n${code}`
                    }
                ]
            },
            {
                headers: {
                    "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        const optimizedCode = response.data.choices[0].message.content;

        res.json({ optimizedCode });
    } catch (error) {
        console.error("Optimization error:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to optimize code" });
    }
});

// Translation API Route
app.post('/translate', async (req, res) => {
    const { code, language } = req.body;

    if (!code || !language) {
        return res.status(400).json({ error: "Code and language are required!" });
    }

    if (!process.env.OPENAI_API_KEY) {
        return res.status(500).json({ error: "Missing OpenAI API Key!" });
    }

    try {
        // OpenAI API request
        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: "You are a code translator. Convert the given code to the specified programming language."
                    },
                    {
                        role: "user",
                        content: `Translate this code to ${language}:\n\n${code}`
                    }
                ]
            },
            {
                headers: {
                    "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        const translatedCode = response.data.choices[0].message.content;

        res.json({ translatedCode });
    } catch (error) {
        console.error("Translation error:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to translate code" });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
