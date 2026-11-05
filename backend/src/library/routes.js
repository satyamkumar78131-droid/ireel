import { Router } from 'express';
import { randomUUID } from 'node:crypto';

// Scaffold: in-memory store. Server restart par data chala jaayega.
// Production me PostgreSQL use hoga.
const progress = new Map();    // key: `${userId}:${videoId}`
const collections = new Map(); // key: userId -> [{ id, name, videoIds }]

// Abhi auth nahi hai, isliye header se user id lete hain (default: guest)
const getUserId = (req) => req.headers['x-user-id'] || 'guest';

const router = Router();

// Watch progress save karo
router.put('/progress/:videoId', (req, res) => {
  const { positionSec, durationSec } = req.body;
  if (typeof positionSec !== 'number' || positionSec < 0) {
    return res.status(400).json({ error: 'positionSec invalid hai' });
  }
  progress.set(`${getUserId(req)}:${req.params.videoId}`, {
    videoId: req.params.videoId,
    positionSec,
    durationSec: typeof durationSec === 'number' ? durationSec : null,
    updatedAt: Date.now(),
  });
  res.json({ ok: true });
});

// Ek video ka progress (resume ke liye)
router.get('/progress/:videoId', (req, res) => {
  const entry = progress.get(`${getUserId(req)}:${req.params.videoId}`);
  res.json(entry ?? { videoId: req.params.videoId, positionSec: 0 });
});

// Continue Watching: adhoore videos, latest pehle
router.get('/continue-watching', (req, res) => {
  const uid = getUserId(req);
  const items = [...progress.entries()]
    .filter(([key, v]) => key.startsWith(`${uid}:`) && v.durationSec && v.positionSec < v.durationSec - 10)
    .map(([, v]) => v)
    .sort((a, b) => b.updatedAt - a.updatedAt);
  res.json(items);
});

// Saved Collections
router.get('/collections', (req, res) => {
  res.json(collections.get(getUserId(req)) ?? []);
});

router.post('/collections', (req, res) => {
  const { name } = req.body;
  if (!name || typeof name !== 'string') {
    return res.status(400).json({ error: 'name zaroori hai' });
  }
  const uid = getUserId(req);
  const list = collections.get(uid) ?? [];
  const collection = { id: randomUUID(), name, videoIds: [] };
  list.push(collection);
  collections.set(uid, list);
  res.status(201).json(collection);
});

router.post('/collections/:id/items', (req, res) => {
  const { videoId } = req.body;
  const list = collections.get(getUserId(req)) ?? [];
  const collection = list.find((c) => c.id === req.params.id);
  if (!collection) return res.status(404).json({ error: 'Collection nahi mila' });
  if (!collection.videoIds.includes(videoId)) collection.videoIds.push(videoId);
  res.json(collection);
});

export default router;