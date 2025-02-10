import React from 'react';
import Loader from '../styles/loader.gif';
import Image from 'next/image';

const LoadingPage = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Image src={Loader} alt='Loading...' width={150} height={150} />
    </div>
  );
};

export default LoadingPage;
