import express from 'express';
import cors from 'cors';
import videoRoutes from './videos/routes.js';
import libraryRoutes from './library/routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ ok: true }));
app.use('/api/videos', videoRoutes);
app.use('/api/library', libraryRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Ireel API running on http://localhost:${PORT}`);
});