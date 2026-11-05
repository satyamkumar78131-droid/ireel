import { useEffect, useRef } from 'react';

const SAVE_EVERY_SEC = 5;

// Video chalata hai, last position se resume karta hai, aur progress save karta hai.
export default function VideoPlayer({ videoId, src, startAt = 0, onProgress }) {
  const ref = useRef(null);
  const lastSaved = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onLoaded = () => {
      if (startAt > 0 && startAt < el.duration - 5) el.currentTime = startAt;
    };
    el.addEventListener('loadedmetadata', onLoaded);
    return () => el.removeEventListener('loadedmetadata', onLoaded);
  }, [startAt, src]);

  const handleTimeUpdate = () => {
    const el = ref.current;
    if (!el || !onProgress) return;
    if (Math.abs(el.currentTime - lastSaved.current) >= SAVE_EVERY_SEC) {
      lastSaved.current = el.currentTime;
      onProgress({ positionSec: el.currentTime, durationSec: el.duration });
    }
  };

  const handlePause = () => {
    const el = ref.current;
    if (el && onProgress) onProgress({ positionSec: el.currentTime, durationSec: el.duration });
  };

  return (
    <video
      ref={ref}
      src={src}
      controls
      onTimeUpdate={handleTimeUpdate}
      onPause={handlePause}
      onEnded={handlePause}
    />
  );
}