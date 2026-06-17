import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import api from '../../../lib/api';
import { staggerContainer, fadeInUp } from '../../../lib/motionVariants';
import CaseStudyCard from '../cases/CaseStudyCard';

export default function FeaturedCases() {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/cases')
      .then(res => {
        if (res.data?.success) {
          // Take first 2 cases and make the first one a feature layout
          const featured = res.data.data.slice(0, 2).map((c, i) => ({
            ...c,
            layout: i === 0 ? 'feature' : 'standard'
          }));
          setCases(featured);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading || cases.length === 0) return null;

  return (
    <section className="py-24 px-6 bg-verve-bg-primary">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6"
        >
          <div>
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-display font-bold tracking-tight text-verve-text-primary mb-4"
            >
              Selected <span className="font-script italic font-normal text-verve-blue">Works</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-verve-text-secondary font-body max-w-lg">
              Explore some of our recent digital products and the stories behind their creation.
            </motion.p>
          </div>
          
          <motion.div variants={fadeInUp}>
            <Link 
              to="/cases" 
              className="inline-flex items-center text-verve-text-primary font-bold tracking-wider uppercase text-sm hover:text-verve-blue transition-colors group"
            >
              View all work
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cases.map((caseStudy, idx) => (
            <CaseStudyCard key={caseStudy._id || idx} caseStudy={caseStudy} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
