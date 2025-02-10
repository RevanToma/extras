import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

const PlayerOverviewTable = ({ players }) => {
  return (
    <div className='container mx-auto p-2'>
      <h2 className='text-2xl font-bold mb-4'>Player Overview</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Player</TableHead>
            <TableHead>Correct Answers</TableHead>
            <TableHead>Wrong Answers</TableHead>
            <TableHead>Total Questions</TableHead>
            <TableHead>Score %</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {players.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className='text-center'>
                No players available
              </TableCell>
            </TableRow>
          ) : (
            players.map((player, index) => (
              <TableRow key={index}>
                <TableCell className='font-medium'>{player.name}</TableCell>
                <TableCell>{player.correct}</TableCell>
                <TableCell>{player.wrong}</TableCell>
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

export default PlayerOverviewTable;
