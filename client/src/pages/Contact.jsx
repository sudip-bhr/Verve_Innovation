import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Mail, MapPin, Phone } from 'lucide-react';
import api from '../lib/api';
import { staggerContainer, staggerItem, fadeInUp } from '../lib/motionVariants';

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    companyName: '',
    projectType: '',
    budgetRange: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await api.post('/contact', formData);
      if (res.data?.success) {
        toast.success("Thank you! We'll be in touch soon.");
        setFormData({
          firstName: '', lastName: '', email: '', companyName: '',
          projectType: '', budgetRange: '', message: ''
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | Verve Innovation</title>
        <meta name="description" content="Get in touch to start your next digital project." />
      </Helmet>

      <section className="pt-32 pb-24 px-6 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            
            {/* Left Col: Info */}
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="flex flex-col justify-center"
            >
              <motion.h1 variants={staggerItem} className="text-5xl md:text-7xl font-display font-bold tracking-tight text-verve-text-primary mb-6">
                Let's build something <span className="font-script italic font-normal text-verve-blue">incredible.</span>
              </motion.h1>
              <motion.p variants={staggerItem} className="text-xl text-verve-text-secondary font-body mb-12 max-w-md">
                Whether you have a fully formed idea or just a concept, our team is ready to help you bring it to life.
              </motion.p>
              
              <motion.div variants={staggerItem} className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-verve-bg-elevated border border-verve-border flex items-center justify-center text-verve-orange flex-shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-verve-text-primary mb-1">Email Us</h4>
                    <p className="text-verve-text-secondary font-body">hello@verveinnovation.com.np</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-verve-bg-elevated border border-verve-border flex items-center justify-center text-verve-orange flex-shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-verve-text-primary mb-1">Visit Us</h4>
                    <p className="text-verve-text-secondary font-body">Kathmandu, Nepal<br />Innovation Hub, 4th Floor</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-verve-bg-elevated border border-verve-border flex items-center justify-center text-verve-orange flex-shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-verve-text-primary mb-1">Call Us</h4>
                    <p className="text-verve-text-secondary font-body">+977 1 4XXXXXX</p>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={staggerItem} className="mt-12 rounded-2xl overflow-hidden border border-verve-border w-full max-w-md">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2136.3624699392635!2d85.31564805000004!3d27.7098156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19019876a7f5%3A0xbb5ed6acf03f1089!2sJamal%2C%20Kathmandu%2044600!5e1!3m2!1sen!2snp!4v1781679672617!5m2!1sen!2snp" 
                  width="100%" 
                  height="250" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Company Location"
                />
              </motion.div>
            </motion.div>

            {/* Right Col: Form */}
            <motion.div 
              initial="initial"
              animate="animate"
              variants={fadeInUp}
              className="bg-verve-bg-elevated border border-verve-border p-8 md:p-12 rounded-3xl"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="text-sm font-bold text-verve-text-secondary">First Name *</label>
                    <input 
                      type="text" id="firstName" name="firstName" required
                      value={formData.firstName} onChange={handleChange}
                      className="w-full bg-transparent border-b border-verve-border py-3 text-verve-text-primary focus:outline-none focus:border-verve-orange transition-colors"
                      placeholder="Jane"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="text-sm font-bold text-verve-text-secondary">Last Name *</label>
                    <input 
                      type="text" id="lastName" name="lastName" required
                      value={formData.lastName} onChange={handleChange}
                      className="w-full bg-transparent border-b border-verve-border py-3 text-verve-text-primary focus:outline-none focus:border-verve-orange transition-colors"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-bold text-verve-text-secondary">Email Address *</label>
                    <input 
                      type="email" id="email" name="email" required
                      value={formData.email} onChange={handleChange}
                      className="w-full bg-transparent border-b border-verve-border py-3 text-verve-text-primary focus:outline-none focus:border-verve-orange transition-colors"
                      placeholder="jane@company.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="companyName" className="text-sm font-bold text-verve-text-secondary">Company</label>
                    <input 
                      type="text" id="companyName" name="companyName"
                      value={formData.companyName} onChange={handleChange}
                      className="w-full bg-transparent border-b border-verve-border py-3 text-verve-text-primary focus:outline-none focus:border-verve-orange transition-colors"
                      placeholder="Your Company"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="projectType" className="text-sm font-bold text-verve-text-secondary">Project Type</label>
                  <select 
                    id="projectType" name="projectType"
                    value={formData.projectType} onChange={handleChange}
                    className="w-full bg-transparent border-b border-verve-border py-3 text-verve-text-primary focus:outline-none focus:border-verve-orange transition-colors appearance-none"
                  >
                    <option value="" disabled className="bg-verve-bg-elevated text-verve-text-secondary">Select an option</option>
                    <option value="Web Development" className="bg-verve-bg-elevated text-black dark:text-white">Web Development</option>
                    <option value="Mobile App" className="bg-verve-bg-elevated text-black dark:text-white">Mobile App</option>
                    <option value="UX/UI Design" className="bg-verve-bg-elevated text-black dark:text-white">UX/UI Design</option>
                    <option value="E-commerce" className="bg-verve-bg-elevated text-black dark:text-white">E-commerce</option>
                    <option value="Other" className="bg-verve-bg-elevated text-black dark:text-white">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-bold text-verve-text-secondary">Tell us about your project *</label>
                  <textarea 
                    id="message" name="message" rows="4" required
                    value={formData.message} onChange={handleChange}
                    className="w-full bg-transparent border-b border-verve-border py-3 text-verve-text-primary focus:outline-none focus:border-verve-orange transition-colors resize-none"
                    placeholder="Brief description of what you're looking to achieve..."
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full py-4 mt-4 bg-verve-orange text-black font-bold uppercase tracking-wider rounded-pill hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </motion.div>

          </div>
        </div>
      </section>
    </>
  );
}
