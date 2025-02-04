import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className='border-t bg-black mt-5'>
      <div className='p-5 flex-center text-white text-center'>
        {currentYear} 'Portfolio'. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
