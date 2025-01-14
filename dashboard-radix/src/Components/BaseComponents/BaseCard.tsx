import { FC } from 'react';

type BaseCardProps = {
  title: string;
  content: string;
  value: string;
};

const BaseCard: FC<BaseCardProps> = ({ title, content, value }) => {
  return (
    <div className='bg-gray-800 p-4 rounded-md shadow-md'>
      <h3 className='text-gray-400'>{title}</h3>
      <p className='text-2xl font-bold text-white'>{value}</p>
      <p className='text-sm text-green-400'>{content}</p>
    </div>
  );
};

export default BaseCard;
