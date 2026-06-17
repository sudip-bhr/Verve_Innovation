import { cn } from '../../lib/utils';

export default function StatBlock({ value, suffix = '+', label, className }) {
  return (
    <div className={cn("flex flex-col items-start", className)}>
      <div className="flex items-baseline mb-2">
        <span className="font-display font-bold text-5xl md:text-6xl text-verve-text-primary">
          {value}
        </span>
        <span className="font-display font-bold text-4xl md:text-5xl text-verve-orange ml-1">
          {suffix}
        </span>
      </div>
      <p className="font-body text-xs md:text-sm font-semibold tracking-[0.15em] uppercase text-verve-text-secondary">
        {label}
      </p>
    </div>
  );
}
