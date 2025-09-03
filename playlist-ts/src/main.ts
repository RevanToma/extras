// console.log('Playlist Builder startar...');

import type { Track } from '@/types/index';

const tracks: Track[] = [];

const form = document.querySelector('#track-form') as HTMLFormElement;
const titleInput = document.querySelector('#title') as HTMLInputElement;
const durationInput = document.querySelector('#duration') as HTMLInputElement;
const list = document.querySelector('#list') as HTMLUListElement;
const totalEl = document.querySelector('#total') as HTMLSpanElement;

export const parseDuration = (duration: string): number | null => {
  const str = duration.split(':').map(Number);

  if (str.length !== 2 || str.some(isNaN)) {
    return null;
  }
  const [minutes, seconds] = str;
  return minutes! * 60 + seconds!;
};

export const formatDuration = (num: number): string => {
  const minutes = Math.floor(num / 60),
    seconds = num % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const renderTracks = () => {
  const trackElements = tracks.map((track) => {
    const li = document.createElement('li');
    li.textContent = `${track.title} - ${track.duration}`;
    return li;
  });

  list.replaceChildren(...trackElements);

  totalEl.textContent = formatDuration(
    tracks.reduce((acc, track) => acc + parseDuration(track.duration)!, 0)
  );
};

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = titleInput.value;
  const duration = durationInput.value;
  const durationNum = parseDuration(duration);
  if (durationNum === null) {
    return;
  }
  const track: Track = { title, duration: formatDuration(durationNum) };
  tracks.push(track);
  titleInput.value = '';
  durationInput.value = '';
  renderTracks();
});
