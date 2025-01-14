import * as Tabs from '@radix-ui/react-tabs';

const BaseMenuTabs = () => {
  return (
    <Tabs.Root className='w-full' defaultValue='tab1'>
      <Tabs.List className='flex space-x-4 bg-gray-900 p-2 rounded-md'>
        <Tabs.Trigger
          value='tab1'
          className='px-4 py-2 text-gray-300 rounded-md hover:text-white hover:bg-gray-800'
        >
          Overview
        </Tabs.Trigger>
        <Tabs.Trigger
          value='tab2'
          className='px-4 py-2 text-gray-300 rounded-md hover:text-white hover:bg-gray-800'
        >
          Analytics
        </Tabs.Trigger>
        <Tabs.Trigger
          value='tab3'
          className='px-4 py-2 text-gray-300 rounded-md hover:text-white hover:bg-gray-800'
        >
          Reports
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value='tab1' className='p-4'>
        Overview content here.
      </Tabs.Content>
      <Tabs.Content value='tab2' className='p-4'>
        Analytics content here.
      </Tabs.Content>
      <Tabs.Content value='tab3' className='p-4'>
        Reports content here.
      </Tabs.Content>
    </Tabs.Root>
  );
};
export default BaseMenuTabs;
