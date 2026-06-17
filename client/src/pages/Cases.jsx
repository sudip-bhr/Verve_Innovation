import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import api from '../lib/api';
import { staggerContainer, staggerItem } from '../lib/motionVariants';
import TagFilterBar from '../components/site/TagFilterBar';
import CaseStudyCard from '../components/site/cases/CaseStudyCard';
import { CasesGridSkeleton } from '../components/ui/Skeletons';
import GradientBand from '../components/site/GradientBand';
// revisit: switch to server-side filtering if case count > ~40


const CATEGORIES = ['All', 'Digital Products', 'Software', 'Mobile', 'Marketing'];

export default function Cases() {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    // Fetch cases; if category is not 'All', pass it as query param
    const url = activeCategory === 'All' 
      ? '/cases' 
      : `/cases?categories=${encodeURIComponent(activeCategory)}`;

    setLoading(true);
    api.get(url)
      .then(res => {
        if (res.data?.success) setCases(res.data.data);
      })
      .catch(err => console.error('Failed to load cases:', err))
      .finally(() => setLoading(false));
  }, [activeCategory]);

  return (
    <>
      <Helmet>
        <title>Our Work | Verve Innovation</title>
        <meta name="description" content="Explore our portfolio of premium digital products and software solutions." />
      </Helmet>

      {/* Hero Header */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="max-w-3xl"
          >
            <motion.h1 
              variants={staggerItem}
              className="text-5xl md:text-7xl font-display font-bold tracking-tight text-verve-text-primary mb-6"
            >
              Selected <span className="font-script italic font-normal text-verve-blue">Works</span>
            </motion.h1>
            <motion.p 
              variants={staggerItem}
              className="text-lg text-verve-text-secondary font-body mb-12"
            >
              A showcase of digital experiences designed to solve complex problems and drive business growth.
            </motion.p>

            <motion.div variants={staggerItem}>
              <TagFilterBar 
                tags={CATEGORIES} 
                activeTag={activeCategory} 
                onTagSelect={setActiveCategory} 
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Grid */}
      <section className="pb-24 px-6 min-h-[50vh]">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <CasesGridSkeleton count={4} />
          ) : cases.length === 0 ? (
            <div className="text-center py-24 border border-dashed border-verve-border rounded-3xl">
              <p className="text-verve-text-secondary font-body">No case studies found for this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {cases.map((caseStudy, idx) => (
                <CaseStudyCard 
                  key={caseStudy._id || caseStudy.slug} 
                  caseStudy={caseStudy} 
                  index={idx} 
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <GradientBand 
        headline="Have a *project* in mind?"
        buttonText="Let's Talk"
        buttonLink="/contact"
      />
    </>
  );
}
