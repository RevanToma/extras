import ArticelCarousel from './articel-carousel';
import Footer from './footer';
import Navbar from './navBar';

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <ArticelCarousel />
      <Footer />
    </>
  );
};

export default Layout;
