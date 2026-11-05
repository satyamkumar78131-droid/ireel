import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import VideoPlayer from '../components/VideoPlayer.jsx';

export default function Watch() {
  const { id } = useParams();
  const [startAt, setStartAt] = useState(0);
  const [ready, setReady] = useState(false);
  const latest = useRef(null);

  useEffect(() => {
    setReady(false);
    fetch(`/api/library/progress/${id}`)
      .then((r) => r.json())
      .then((p) => {
        setStartAt(p.positionSec || 0);
        setReady(true);
      });
  }, [id]);

  // Progress backend par save karo
  const saveProgress = ({ positionSec, durationSec }) => {
    latest.current = { positionSec, durationSec };
    fetch(`/api/library/progress/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ positionSec, durationSec }),
    });
  };

  if (!ready) return <p>Loading...</p>;

  return (
    <div>
      <VideoPlayer
        videoId={id}
        src={`/api/videos/${id}/stream`}
        startAt={startAt}
        onProgress={saveProgress}
      />
    </div>
  );
}