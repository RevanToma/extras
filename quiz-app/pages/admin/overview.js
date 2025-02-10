import Leaderboard from '../../components/admin/leaderboard';
import PlayerOverviewTable from '../../components/admin/player-overview-table';

const mockPlayers = [
  { name: 'Rivan', correct: 8, wrong: 2, total: 10 },
  { name: 'Shabboo', correct: 5, wrong: 5, total: 10 },
  { name: 'Mustaf', correct: 9, wrong: 1, total: 10 },
  { name: 'Nayyav', correct: 10, wrong: 0, total: 10 },
];

function OverView() {
  return (
    <>
      <h1 className='text-3xl font-bold mb-4 text-center'>
        Admin Game Overview
      </h1>
      <div className='p-6 grid grid-cols-1 md:grid-cols-2 items-center'>
        <PlayerOverviewTable players={mockPlayers} />
        <Leaderboard players={mockPlayers} />
      </div>
    </>
  );
}

export default OverView;
