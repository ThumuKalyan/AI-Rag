import express from 'express';
import cors from 'cors';
import { crawlWebsite } from './crawler.js';
import { askQuestion } from './query.js';
import client from './database.js';

const app = express();
app.use(cors()); // Allows your React app to talk to this API
app.use(express.json());

// Endpoint 1: Get list of crawled sites for the dropdown
app.get('/api/sites', async (req, res) => {
    try {
        const collection = await client.getCollection({ name: "my_rag_collection" });
        const results = await collection.get();
        
        // Extract unique site names from metadata
        const uniqueSites = [...new Set(results.metadatas.map(m => m.site_name))];
        res.json(uniqueSites);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint 2: Trigger a crawl
app.post('/api/crawl', async (req, res) => {
    const { url, nickname } = req.body;
    try {
        await crawlWebsite(url, nickname);
        res.json({ message: `Successfully crawled ${nickname}` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint 3: Ask a question
app.post('/api/ask', async (req, res) => {
    const { siteName, question } = req.body;
    try {
        const response = await askQuestion(siteName, question);
        const textAnswer = response.content || response; 

        res.json({ answer: textAnswer });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(5000, () => console.log('🚀 API running on http://localhost:5000'));