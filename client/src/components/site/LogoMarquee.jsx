import { cn } from '../../lib/utils';

export default function LogoMarquee({ className }) {
  const logos = [
    { name: 'Client 1', url: 'https://res.cloudinary.com/dgcgovg0x/image/upload/v1782108977/Client1.png' },
    { name: 'Client 2', url: 'https://res.cloudinary.com/dgcgovg0x/image/upload/v1782108979/Client2.png' },
    { name: 'Client 3', url: 'https://res.cloudinary.com/dgcgovg0x/image/upload/v1782108980/Client3.png' },
    { name: 'Client 4', url: 'https://res.cloudinary.com/dgcgovg0x/image/upload/v1782108981/Client4.png' }
  ];

  // Duplicate for seamless loop
  const marqueeItems = [...logos, ...logos, ...logos, ...logos];

  return (
    <div className={cn("w-full overflow-hidden py-12 border-y border-verve-border bg-verve-bg-secondary", className)}>
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <p className="text-xs font-body font-semibold tracking-widest text-verve-text-muted uppercase text-center md:text-left">
          Some Of Our Happy Clients
        </p>
      </div>
      
      <div className="relative w-full flex overflow-x-hidden group">
        <div className="animate-marquee flex whitespace-nowrap group-hover:[animation-play-state:paused] items-center">
          {marqueeItems.map((logo, idx) => (
            <div 
              key={idx} 
              className="mx-8 md:mx-16 hover:opacity-100 opacity-60 transition-opacity cursor-default flex items-center justify-center"
            >
              <img 
                src={logo.url} 
                alt={logo.name} 
                className="h-12 md:h-16 w-auto object-contain filter grayscale hover:grayscale-0 transition-all" 
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(logo.name)}&background=random&color=fff&size=128&font-size=0.33`;
                  e.target.classList.remove('grayscale', 'filter');
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
