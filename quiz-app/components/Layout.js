import MainNav from './Main-nav';

const Layout = ({ children }) => {
  return (
    <>
      <MainNav />
      <main className='container mx-auto p-4'>{children}</main>
    </>
  );
};

export default Layout;
