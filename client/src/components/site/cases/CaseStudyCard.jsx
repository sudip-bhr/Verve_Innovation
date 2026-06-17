import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { fadeInUp } from '../../../lib/motionVariants';

export default function CaseStudyCard({ caseStudy, index }) {
  const isFeature = caseStudy.layout === 'feature';
  const [isHovering, setIsHovering] = useState(false);
  const videoRef = useRef(null);

  // For static hover effect as requested, we just show a static placeholder image
  // In a real app this would be caseStudy.coverImage
  const coverImage = caseStudy.coverImage || `https://picsum.photos/seed/${caseStudy.slug}/800/600`;

  return (
    <motion.div
      variants={fadeInUp}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-50px" }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={cn(
        "group relative flex flex-col bg-verve-bg-elevated border border-verve-border rounded-3xl overflow-hidden hover:border-verve-orange/50 transition-colors",
        isFeature ? "md:col-span-2 md:flex-row min-h-[500px]" : "col-span-1 min-h-[400px]"
      )}
    >
      {/* Image container */}
      <div className={cn(
        "relative overflow-hidden bg-verve-bg-secondary",
        isFeature ? "w-full md:w-3/5 h-64 md:h-auto" : "w-full h-64"
      )}>
        <img 
          src={coverImage} 
          alt={caseStudy.title}
          className={cn(
            "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105",
            isHovering && caseStudy.coverVideo ? "opacity-0" : "opacity-100"
          )}
        />
        {isHovering && caseStudy.coverVideo && (
          <video
            ref={videoRef}
            src={caseStudy.coverVideo}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
      </div>

      {/* Content container */}
      <div className={cn(
        "flex flex-col flex-1 p-8 md:p-10",
        isFeature ? "w-full md:w-2/5 justify-center" : ""
      )}>
        <div className="flex flex-wrap gap-2 mb-4">
          {caseStudy.tags?.slice(0, 3).map(tag => (
            <span key={tag} className="text-[0.65rem] font-bold tracking-wider uppercase text-verve-orange bg-verve-orange/10 px-2.5 py-1 rounded-sm">
              {tag}
            </span>
          ))}
        </div>

        <h3 className="text-2xl md:text-3xl font-display font-bold text-verve-text-primary mb-3 group-hover:text-verve-orange transition-colors">
          <Link to={`/cases/${caseStudy.slug}`} className="before:absolute before:inset-0">
            {caseStudy.title}
          </Link>
        </h3>

        <p className="text-verve-text-secondary font-body text-sm leading-relaxed mb-8 flex-1">
          {caseStudy.summary}
        </p>

        <div className="flex items-center text-verve-text-primary font-bold tracking-wider uppercase text-sm group-hover:text-verve-orange transition-colors mt-auto">
          Read Case Study
          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
}
