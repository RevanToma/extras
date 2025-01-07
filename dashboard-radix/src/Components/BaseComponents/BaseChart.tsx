import { CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar } from 'recharts';

const data = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 2000 },
  { name: 'Apr', value: 2780 },
];

const BaseChart = () => {
  return (
    <div className='bg-gray-800 p-4 rounded-md shadow-md'>
      <h3 className='text-white font-bold mb-4'>Overview</h3>
      <BarChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray='3 3' stroke='#555555' />
        <XAxis dataKey='name' stroke='#dddddd' />
        <YAxis stroke='#dddddd' />
        <Tooltip />
        <Bar dataKey='value' fill='#8884d8' />
      </BarChart>
    </div>
  );
};

export default BaseChart;
