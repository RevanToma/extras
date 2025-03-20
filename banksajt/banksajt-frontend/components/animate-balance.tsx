import { useAnimation } from 'motion/react';
import { useEffect } from 'react';
import CurrencySelector from './currency-selector';

const AnimateBalance = ({ balance }: { balance: number }) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: [0, 1],
      scale: [0.9, 1],
      y: [10, 0],
      transition: { duration: 0.5, ease: 'easeOut' },
    });
  }, [balance, controls]);

  return (
    <h2 className='sm:text-2xl md:text-4xl font-bold'>
      <CurrencySelector baseAmount={balance} />
    </h2>
  );
};

export default AnimateBalance;
