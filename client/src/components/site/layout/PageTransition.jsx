import { motion } from 'framer-motion';

const curtainVariants = {
  initial: {
    scaleY: 1,
    transformOrigin: "top"
  },
  animate: {
    scaleY: 0,
    transformOrigin: "top",
    transition: {
      duration: 0.8,
      ease: [0.85, 0, 0.15, 1], // very smooth, premium easing
    }
  },
  exit: {
    scaleY: 1,
    transformOrigin: "bottom",
    transition: {
      duration: 0.8,
      ease: [0.85, 0, 0.15, 1],
    }
  }
};

const contentVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { delay: 0.4, duration: 0.6, ease: "easeOut" }
  },
  exit: { opacity: 0, transition: { duration: 0.3 } }
};

export default function PageTransition({ children }) {
  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-full h-full bg-verve-dark z-[100] pointer-events-none"
        variants={curtainVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      />
      <motion.div
        variants={contentVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="flex-1 flex flex-col"
      >
        {children}
      </motion.div>
    </>
  );
}
