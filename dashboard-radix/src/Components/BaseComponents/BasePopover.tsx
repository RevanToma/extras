import * as Popover from '@radix-ui/react-popover';

const BasePopover = () => {
  return (
    <Popover.Root>
      <Popover.Trigger className='px-4 py-2 bg-gray-800 text-white rounded-md'>
        Notifications
      </Popover.Trigger>
      <Popover.Content className='bg-gray-800 rounded-md shadow-lg p-4 w-64'>
        <h3 className='text-white font-bold'>Recent Notifications</h3>
        <p className='text-gray-300'>You have 3 new notifications.</p>
      </Popover.Content>
    </Popover.Root>
  );
};

export default BasePopover;
