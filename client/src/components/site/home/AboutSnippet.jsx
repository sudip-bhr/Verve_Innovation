import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { staggerContainer, fadeInUp } from '../../../lib/motionVariants';

export default function AboutSnippet() {
  return (
    <section className="py-24 px-6 bg-verve-bg-secondary relative overflow-hidden">
      {/* Decorative Blur Elements */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-verve-blue/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-verve-orange/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          <div>
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight text-verve-text-primary mb-6"
            >
              We believe in <span className="font-script italic font-normal text-verve-blue">human-centric</span> engineering.
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-verve-text-secondary font-body mb-8">
              At Verve Innovation, we blend high-end design with robust engineering to create digital products that don't just look beautiful, but perform flawlessly.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex gap-4">
              <Link 
                to="/about"
                className="px-8 py-4 bg-verve-text-primary text-verve-bg-primary font-bold tracking-wider uppercase text-sm rounded-pill hover:scale-105 transition-all shadow-xl shadow-black/10"
              >
                Our Agency
              </Link>
            </motion.div>
          </div>

          <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="aspect-square rounded-3xl bg-verve-bg-elevated border border-verve-border p-8 flex flex-col justify-between">
                <span className="text-verve-blue font-display text-5xl font-bold">12+</span>
                <span className="text-verve-text-secondary font-bold uppercase tracking-widest text-xs">Years Experience</span>
              </div>
              <div className="aspect-[4/3] rounded-3xl bg-verve-bg-elevated border border-verve-border p-8 flex flex-col justify-between overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-verve-orange/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="text-verve-text-primary font-display text-4xl font-bold relative z-10">80+</span>
                <span className="text-verve-text-secondary font-bold uppercase tracking-widest text-xs relative z-10">Awards Won</span>
              </div>
            </div>
            <div className="space-y-4 pt-12">
              <div className="aspect-[4/3] rounded-3xl bg-verve-bg-elevated border border-verve-border p-8 flex flex-col justify-between overflow-hidden relative group">
                 <div className="absolute inset-0 bg-gradient-to-bl from-verve-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="text-verve-text-primary font-display text-4xl font-bold relative z-10">250+</span>
                <span className="text-verve-text-secondary font-bold uppercase tracking-widest text-xs relative z-10">Projects Shipped</span>
              </div>
              <div className="aspect-square rounded-3xl bg-verve-bg-elevated border border-verve-border p-8 flex flex-col justify-between">
                <span className="text-verve-orange font-display text-5xl font-bold">100%</span>
                <span className="text-verve-text-secondary font-bold uppercase tracking-widest text-xs">Independent</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
