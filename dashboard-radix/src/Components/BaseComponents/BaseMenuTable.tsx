import { FC } from 'react';

type BaseMenuTableProps = {
  data: {
    name: string;
    email: string;
    amount: string;
  }[];
};

const BaseMenuTable: FC<BaseMenuTableProps> = ({ data }) => {
  return (
    <div className='bg-gray-800 rounded-md shadow-md p-4'>
      <h3 className='text-white font-bold mb-4'>Recent Sales</h3>
      <table className='w-full text-gray-300'>
        <thead>
          <tr>
            <th className='text-left p-2'>Name</th>
            <th className='text-left p-2'>Email</th>
            <th className='text-right p-2'>Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className='border-t border-gray-700'>
              <td className='p-2'>{row.name}</td>
              <td className='p-2'>{row.email}</td>
              <td className='p-2 text-right text-green-400'>{row.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BaseMenuTable;
