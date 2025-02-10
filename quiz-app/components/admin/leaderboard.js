import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

const Leaderboard = ({ players }) => {
  const sortedPlayers = [...players].sort(
    (a, b) => b.correct / b.total - a.correct / a.total
  );

  return (
    <div className='container mx-auto p-2 w-full'>
      <h2 className='text-2xl font-bold mb-4'>Leaderboard</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Player</TableHead>
            <TableHead>Correct</TableHead>
            <TableHead>Total Questions</TableHead>
            <TableHead>Score %</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedPlayers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className='text-center'>
                No players available
              </TableCell>
            </TableRow>
          ) : (
            sortedPlayers.map((player, index) => (
              <TableRow key={index}>
                <TableCell className='font-bold'>{index + 1}</TableCell>
                <TableCell className='font-medium'>{player.name}</TableCell>
                <TableCell>{player.correct}</TableCell>
                <TableCell>{player.total}</TableCell>
                <TableCell>
                  {((player.correct / player.total) * 100).toFixed(1)}%
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default Leaderboard;
