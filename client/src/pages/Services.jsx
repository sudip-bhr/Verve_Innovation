import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../lib/api';
import { staggerContainer, staggerItem, fadeInUp } from '../lib/motionVariants';
import GradientBand from '../components/site/GradientBand';

export default function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    api.get('/services').then(res => setServices(res.data?.data || []));
  }, []);

  return (
    <>
      <Helmet>
        <title>Our Services | Verve Innovation</title>
        <meta name="description" content="Comprehensive digital solutions from design to deployment." />
      </Helmet>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="max-w-3xl mx-auto"
          >
            <motion.h1 
              variants={staggerItem}
              className="text-5xl md:text-7xl font-display font-bold tracking-tight text-verve-text-primary mb-6"
            >
              What we <span className="font-script italic font-normal text-verve-blue">do best</span>
            </motion.h1>
            <motion.p 
              variants={staggerItem}
              className="text-lg md:text-xl text-verve-text-secondary font-body mb-8"
            >
              We provide end-to-end digital solutions, combining strategic thinking with cutting-edge technology to deliver measurable results.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Services List */}
      <section className="pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-6">
            {services.length > 0 ? services.map((service, idx) => (
              <motion.div
                key={service._id}
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, margin: "-50px" }}
                className="group p-8 md:p-12 bg-verve-bg-elevated border border-verve-border rounded-3xl hover:border-verve-orange/50 transition-colors flex flex-col md:flex-row gap-8 items-start md:items-center"
              >
                <div className="text-5xl md:text-6xl font-display font-bold text-verve-border group-hover:text-verve-orange/30 transition-colors w-16">
                  {(idx + 1).toString().padStart(2, '0')}
                </div>
                
                <div className="flex-1">
                  <h3 className="text-3xl font-display font-bold text-verve-text-primary mb-3">
                    {service.title}
                  </h3>
                  <p className="text-verve-text-secondary font-body leading-relaxed max-w-2xl">
                    {service.description || service.shortDescription}
                  </p>
                </div>
                
                <Link to="/contact" className="inline-flex flex-shrink-0 items-center justify-center w-14 h-14 rounded-full border border-verve-border text-verve-text-primary group-hover:bg-verve-orange group-hover:text-black group-hover:border-verve-orange transition-all">
                  <ArrowRight />
                </Link>
              </motion.div>
            )) : (
              <div className="py-24 text-center">Loading services...</div>
            )}
          </div>
        </div>
      </section>

      <GradientBand 
        headline="Ready to *transform* your business?"
        buttonText="Get in Touch"
        buttonLink="/contact"
      />
    </>
  );
}
