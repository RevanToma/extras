import BaseCard from './BaseComponents/BaseCard';
import BaseChart from './BaseComponents/BaseChart';
import BaseMenu from './BaseComponents/BaseMenu';
import BaseMenuTable from './BaseComponents/BaseMenuTable';
import BaseMenuTabs from './BaseComponents/BaseMenuTabs';

const recentSales = [
  { name: 'Olivia Martin', email: 'olivia@email.com', amount: '$1999.00' },
  { name: 'Jackson Lee', email: 'jackson@email.com', amount: '$39.00' },
  { name: 'Isabella Nguyen', email: 'isabella@email.com', amount: '$299.00' },
];

const Dashboard = () => {
  return (
    <div className='min-h-screen bg-gray-900 text-white p-6'>
      <header className='flex justify-between items-center mb-6'>
        <h1 className='text-3xl font-bold'>Dashboard</h1>
        <BaseMenu />
      </header>
      <BaseMenuTabs />
      <div className='grid grid-cols-4 gap-4 mt-6'>
        <BaseCard
          title='Total Revenue'
          value='$45,231.89'
          content='+20.1% from last month'
        />
        <BaseCard
          title='Subscriptions'
          value='+2350'
          content='+180.1% from last month'
        />
        <BaseCard
          title='Sales'
          value='+12,234'
          content='+19% from last month'
        />
        <BaseCard
          title='Active Now'
          value='+573'
          content='+201 since last hour'
        />
      </div>
      <div className='flex space-x-2 mt-6'>
        <BaseChart />
        <BaseMenuTable data={recentSales} />
      </div>
    </div>
  );
};

export default Dashboard;
