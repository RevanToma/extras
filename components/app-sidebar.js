import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from '@/components/ui/sidebar';
import Navbar from './navBar';

export function AppSidebar() {
  return (
    <div>
      <div className='absolute w-full'>
        <Navbar />
      </div>
      <Sidebar side='right' className='z-50'>
        <SidebarHeader />
        <SidebarContent>
          <SidebarGroup />
          <SidebarGroup />
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
    </div>
  );
}
