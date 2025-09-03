import { useState } from 'react';
import { formatDuration, parseDuration } from '../utils/duration';
import type { Track } from '../types';

const Playlist = () => {
  const [tracks, setTracks] = useState<Track[]>([]),
    [title, setTitle] = useState(''),
    [duration, setDuration] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const durationNum = parseDuration(duration);
    if (durationNum === null) {
      return;
    }

    const newTrack: Track = {
      id: Math.random().toString(36).substring(2, 15),
      title,
      duration: formatDuration(durationNum),
    };

    setTracks((prev) => [...prev, newTrack]);
    setTitle('');
    setDuration('');
  };

  const totalDuration = tracks.reduce((acc, track) => {
    const parsed = parseDuration(track.duration);
    return acc + (parsed || 0);
  }, 0);

  return (
    <div className='app'>
      <h1>Playlist Builder</h1>

      <form onSubmit={handleSubmit} className='track-form'>
        <input
          type='text'
          placeholder='Titel'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className='form-input'
        />
        <input
          type='text'
          placeholder='mm:ss'
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
          className='form-input'
        />
        <button type='submit' className='submit-btn'>
          Lägg till
        </button>
      </form>

      <ul className='track-list'>
        {tracks.map((track) => (
          <li key={track.id} className='track-item'>
            {track.title} - {track.duration}
          </li>
        ))}
      </ul>

      <p className='total-time'>
        Total tid: <span>{formatDuration(totalDuration)}</span>
      </p>
    </div>
  );
};

export default Playlist;
