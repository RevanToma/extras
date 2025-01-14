import * as Menu from '@radix-ui/react-menu';

const BaseMenu = () => {
  return (
    <Menu.Root>
      <Menu.Content className='bg-gray-800 rounded-md shadow-lg p-2'>
        <Menu.Item className='p-2 text-gray-300 hover:bg-gray-700 hover:text-white'>
          Dashboard
        </Menu.Item>
        <Menu.Item className='p-2 text-gray-300 hover:bg-gray-700 hover:text-white'>
          Settings
        </Menu.Item>
        <Menu.Item className='p-2 text-gray-300 hover:bg-gray-700 hover:text-white'>
          Log Out
        </Menu.Item>
      </Menu.Content>
    </Menu.Root>
  );
};

export default BaseMenu;
