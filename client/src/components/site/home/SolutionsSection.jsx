import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import api from '../../../lib/api';
import { fadeInUp } from '../../../lib/motionVariants';
import { SolutionsSkeleton } from '../../ui/Skeletons';

export default function SolutionsSection() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/services')
      .then(res => {
        if (res.data?.success) {
          setServices(res.data.data.slice(0, 4));
        }
      })
      .catch(err => console.error('Failed to load services:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-24 px-6 border-t border-verve-border">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.h2 
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-display font-bold tracking-tight text-verve-text-primary mb-4"
            >
              Comprehensive <span className="font-script italic font-normal text-verve-blue">capabilities</span>
            </motion.h2>
            <p className="text-verve-text-secondary font-body">
              From ideation to deployment, we provide end-to-end solutions that transform your business.
            </p>
          </div>
          
          <Link to="/services" className="inline-flex items-center text-verve-text-primary font-bold tracking-wider uppercase text-sm hover:text-verve-orange transition-colors group">
            View All Services
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <SolutionsSkeleton count={4} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service._id || index}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeInUp}
                className="group relative p-8 md:p-10 rounded-2xl bg-verve-bg-elevated border border-verve-border hover:border-verve-orange/50 transition-colors"
              >
                <div className="text-4xl font-display text-verve-border font-bold mb-6 group-hover:text-verve-orange/30 transition-colors">
                  {(index + 1).toString().padStart(2, '0')}
                </div>
                <h3 className="text-2xl font-display font-bold text-verve-text-primary mb-3">
                  {service.title}
                </h3>
                <p className="text-verve-text-secondary font-body leading-relaxed mb-8">
                  {service.shortDescription}
                </p>
                <Link to="/services" className="inline-flex items-center text-verve-orange font-medium text-sm hover:text-amber-400 transition-colors">
                  Learn more <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
