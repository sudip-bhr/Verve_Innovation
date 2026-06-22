import { useState, useEffect } from 'react';
import SEO from '../components/site/SEO';
import { motion } from 'framer-motion';
import api from '../lib/api';
import { staggerContainer, staggerItem, fadeInUp } from '../lib/motionVariants';
import StatBlock from '../components/site/StatBlock';
import { StatBlockSkeleton, TeamGridSkeleton } from '../components/ui/Skeletons';
import GradientBand from '../components/site/GradientBand';

export default function About() {
  const [stats, setStats] = useState([]);
  const [team, setTeam] = useState([]);
  const [statsLoading, setStatsLoading] = useState(true);
  const [teamLoading, setTeamLoading] = useState(true);

  useEffect(() => {
    api.get('/stats').then(res => setStats(res.data?.data || [])).finally(() => setStatsLoading(false));
    api.get('/team').then(res => setTeam(res.data?.data || [])).finally(() => setTeamLoading(false));
  }, []);

  return (
    <>
      <SEO 
        title="About Us" 
        description="We are a team of designers, engineers, and strategists building premium digital products." 
      />

      {/* Hero */}
      <section className="pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="max-w-4xl"
          >
            <motion.h1 
              variants={staggerItem}
              className="text-5xl md:text-7xl font-display font-bold tracking-tight text-verve-text-primary mb-6"
            >
              We believe in the power of <span className="font-script italic font-normal text-verve-accent-blue">design</span> to transform business.
            </motion.h1>
            <motion.p 
              variants={staggerItem}
              className="text-xl md:text-2xl text-verve-text-secondary font-body leading-relaxed mb-16 max-w-3xl"
            >
              Verve Innovation was founded with a single goal: to bridge the gap between stunning aesthetics and robust engineering. We don't just build apps; we create digital ecosystems that empower brands to scale faster.
            </motion.p>

            <motion.div variants={staggerItem} className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-t border-verve-border">
              {statsLoading ? (
                [1,2,3,4].map(i => <StatBlockSkeleton key={i} />)
              ) : stats.length > 0 ? stats.map(stat => (
                <StatBlock key={stat.key} value={stat.value} suffix={stat.suffix} label={stat.label} />
              )) : (
                <>
                  <StatBlock value="15" suffix="+" label="Years Experience" />
                  <StatBlock value="200" suffix="+" label="Projects Delivered" />
                  <StatBlock value="35" suffix="+" label="Active Clients" />
                  <StatBlock value="40" suffix="+" label="Team Members" />
                </>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Image Band */}
      <section className="w-full h-[50vh] md:h-[60vh] bg-verve-bg-secondary px-4 md:px-6 mb-24">
        <div className="max-w-7xl mx-auto h-full rounded-3xl overflow-hidden">
          <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" alt="Team collaborating" className="w-full h-full object-cover" />
        </div>
      </section>

      {/* Team */}
      <section className="pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-verve-text-primary mb-4">
              Meet the <span className="font-script italic font-normal text-verve-blue">team</span>
            </h2>
            <p className="text-verve-text-secondary font-body max-w-xl">
              Our diverse team of experts brings decades of collective experience across design, engineering, and product strategy.
            </p>
          </div>

          {teamLoading ? (
            <TeamGridSkeleton count={4} />
          ) : team.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, i) => (
                <motion.div
                  key={member._id}
                  variants={fadeInUp}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true, margin: "-50px" }}
                  className="group"
                >
                  <div className="w-full aspect-[3/4] bg-verve-bg-elevated border border-verve-border rounded-2xl overflow-hidden mb-4 relative">
                    <img 
                      src={member.photo || `https://api.dicebear.com/7.x/notionists/svg?seed=${member.name}`} 
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                  <h3 className="text-xl font-bold font-display text-verve-text-primary">{member.name}</h3>
                  <p className="text-verve-orange text-sm font-bold tracking-widest uppercase mb-2">{member.role}</p>
                  <p className="text-verve-text-secondary font-body text-sm leading-relaxed">{member.tagline}</p>
                </motion.div>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <GradientBand 
        headline="Join our *journey* and build the future."
        buttonText="View Open Roles"
        buttonLink="/contact"
      />
    </>
  );
}
