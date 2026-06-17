import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, staggerItem } from '../../../lib/motionVariants';
import { Link } from 'react-router-dom';
import Hero3DModel from './Hero3DModel';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 pb-16 px-6 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 z-0 opacity-20 dark:opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-verve-orange/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-verve-blue/10 blur-[120px] pointer-events-none" />
      </div>

      {/* 3D Logo Background */}
      <Hero3DModel />

      <div className="max-w-7xl mx-auto w-full z-10">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="max-w-4xl"
        >

          <motion.h1 
            variants={staggerItem}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[1.1] tracking-tight text-verve-text-primary mb-6"
          >
            We design <span className="font-script italic font-normal text-verve-blue">digital experiences</span> that define the future.
          </motion.h1>

          <motion.p 
            variants={staggerItem}
            className="text-lg md:text-xl text-verve-text-secondary font-body max-w-2xl mb-10 leading-relaxed"
          >
            Verve Innovation partners with visionary companies to build premium software, mobile apps, and digital platforms that accelerate growth and command attention.
          </motion.p>

          <motion.div variants={staggerItem} className="flex flex-wrap items-center gap-4">
            <Link 
              to="/contact" 
              className="px-8 py-4 bg-verve-orange text-black font-bold tracking-wider uppercase text-sm rounded-pill hover:bg-amber-400 hover:scale-105 transition-all shadow-xl shadow-orange-500/20"
            >
              Start a Project
            </Link>
            <Link 
              to="/cases" 
              className="px-8 py-4 bg-transparent text-verve-text-primary font-bold tracking-wider uppercase text-sm rounded-pill border border-verve-border hover:border-verve-text-muted hover:bg-white/5 dark:hover:bg-white/5 transition-all"
            >
              View Our Work
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
