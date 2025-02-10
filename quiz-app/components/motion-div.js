import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

const MotionDiv = ({ children, className }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.9 }}
      className={cn('motion-div', className)}
    >
      {children}
    </motion.div>
  );
};

export default MotionDiv;
