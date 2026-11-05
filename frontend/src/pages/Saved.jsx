import { useEffect, useState } from 'react';

// Saved Collections ka basic page. Collection create karna aur list dekhna.
export default function Saved() {
  const [collections, setCollections] = useState([]);
  const [name, setName] = useState('');

  const load = () =>
    fetch('/api/library/collections').then((r) => r.json()).then(setCollections);

  useEffect(() => {
    load();
  }, []);

  const createCollection = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    await fetch('/api/library/collections', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name.trim() }),
    });
    setName('');
    load();
  };

  return (
    <section className="section">
      <h2>Saved Collections</h2>
      <form onSubmit={createCollection} style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Collection ka naam"
        />
        <button type="submit">Create</button>
      </form>
      <div className="video-grid">
        {collections.map((c) => (
          <div key={c.id} className="card">
            <strong>{c.name}</strong>
            <p style={{ color: 'var(--muted)' }}>{c.videoIds.length} videos</p>
          </div>
        ))}
      </div>
    </section>
  );
}