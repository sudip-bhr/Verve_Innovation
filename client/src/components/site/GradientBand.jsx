import { Link } from 'react-router-dom';
import AccentHeadline from './AccentHeadline';
import { cn } from '../../lib/utils';

export default function GradientBand({ 
  headline, 
  buttonText, 
  buttonLink = '/contact', 
  className 
}) {
  return (
    <section className={cn("gradient-cta-band py-24 md:py-32 px-6 flex flex-col items-center justify-center text-center", className)}>
      <AccentHeadline
        text={headline}
        as="h2"
        className="text-4xl md:text-5xl lg:text-6xl text-white mb-10 max-w-3xl"
        accentColor="orange"
      />
      
      <Link
        to={buttonLink}
        className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold text-black uppercase tracking-wider bg-verve-orange rounded-pill hover:bg-amber-400 transition-all hover:scale-105 shadow-xl shadow-black/20"
      >
        {buttonText}
      </Link>
    </section>
  );
}
