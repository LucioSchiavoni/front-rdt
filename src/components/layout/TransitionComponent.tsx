import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface TransitionComponentProps {
    isVisible: boolean;
    children: ReactNode;
  }

const TransitionComponent = ({ isVisible, children }: TransitionComponentProps ) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -100 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

export default TransitionComponent;