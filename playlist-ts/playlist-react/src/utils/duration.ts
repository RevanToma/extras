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
