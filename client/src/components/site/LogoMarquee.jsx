import { cn } from '../../lib/utils';

export default function LogoMarquee({ className }) {
  // Placeholder logos (in a real app, these would be SVGs)
  const logos = [
    'TechCorp', 'GlobalBank', 'InnovateHealth', 'RetailMax', 'LogisticsPro', 'CloudNet'
  ];

  // Duplicate for seamless loop
  const marqueeItems = [...logos, ...logos, ...logos];

  return (
    <div className={cn("w-full overflow-hidden py-12 border-y border-verve-border bg-verve-bg-secondary", className)}>
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <p className="text-xs font-body font-semibold tracking-widest text-verve-text-muted uppercase text-center md:text-left">
          Trusted by leading companies
        </p>
      </div>
      
      <div className="relative w-full flex overflow-x-hidden group">
        <div className="animate-marquee flex whitespace-nowrap group-hover:[animation-play-state:paused]">
          {marqueeItems.map((logo, idx) => (
            <div 
              key={idx} 
              className="mx-8 md:mx-16 text-2xl md:text-3xl font-display font-bold text-verve-text-muted hover:text-verve-text-primary transition-colors cursor-default"
            >
              {logo}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
