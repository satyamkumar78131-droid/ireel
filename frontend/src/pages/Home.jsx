import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [continueWatching, setContinueWatching] = useState([]);

  useEffect(() => {
    fetch('/api/videos').then((r) => r.json()).then(setVideos);
    fetch('/api/library/continue-watching').then((r) => r.json()).then(setContinueWatching);
  }, []);

  return (
    <>
      {continueWatching.length > 0 && (
        <section className="section">
          <h2>Continue Watching</h2>
          <div className="video-grid">
            {continueWatching.map((item) => (
              <Link key={item.videoId} to={`/watch/${item.videoId}`} className="card">
                <strong>{item.videoId}</strong>
                <div className="progress-bar">
                  <span style={{ width: `${(item.positionSec / item.durationSec) * 100}%` }} />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="section">
        <h2>Videos</h2>
        <div className="video-grid">
          {videos.map((v) => (
            <Link key={v.id} to={`/watch/${v.id}`} className="card">
              {v.title}
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}