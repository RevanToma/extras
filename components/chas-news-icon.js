import { Newspaper } from 'lucide-react';

export default function ChasNewsIcon({ size = 40 }) {
  return (
    <svg width='40' height='40' viewBox='0 0 60 60' fill='none'>
      <defs>
        <linearGradient id='gradientId' x1='0%' y1='0%' x2='100%' y2='0%'>
          <stop offset='0%' stopColor='#3b82f6' />
          <stop offset='100%' stopColor='#9333ea' />
        </linearGradient>
      </defs>

      <Newspaper size={size} fill='url(#gradientId)' stroke='currentColor' />
    </svg>
  );
}
