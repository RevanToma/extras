import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className='border-t text-center'>
      <div className='p-5 flex-center'>
        {currentYear} Chas news. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
