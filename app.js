import express from 'express';
import * as path from "node:path";
import fetch from 'node-fetch';
const app = express();

import { fileURLToPath } from 'url';
import { dirname } from 'path';

// These two lines will simulate the behavior of `__dirname` in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/xkcd-info', async (req, res) => {
    try {
        const response = await fetch('https://xkcd.com/info.0.json');
        const latestComic = await response.json();
        res.json(latestComic);
    } catch (error) {
        res.status(500).send('Error fetching XKCD comic');
    }
});

app.listen(3000, () => {
    console.log('CORS proxy running on port 3000');
});
