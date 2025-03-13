import { motion, useAnimation } from 'motion/react';
import { useEffect } from 'react';

const AnimateBalance = ({ balance }: { balance: number }) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: [0, 1],
      scale: [0.9, 1],
      y: [10, 0],
      transition: { duration: 0.5, ease: 'easeOut' },
    });
  }, [balance]);

  return (
    <motion.h2
      className='sm:text-2xl md:text-4xl font-bold text-green-600'
      animate={controls}
      transition={{ duration: 0.5 }}
    >
      ${balance.toFixed(2)}
    </motion.h2>
  );
};

export default AnimateBalance;
