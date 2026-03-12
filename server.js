import express from 'express';
import cors from 'cors';
import setupAtasHandler from './api/setup-atas.js';
import tgLogHandler from './api/tg-log.js';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/setup-atas', async (req, res) => {
    // Vercel Request/Response yapısını Express'e uyarlamak
    await setupAtasHandler(req, res);
});

app.post('/api/tg-log', async (req, res) => {
    await tgLogHandler(req, res);
});

app.listen(3001, () => {
  console.log('Test Backend çalışıyor: http://localhost:3001');
});
