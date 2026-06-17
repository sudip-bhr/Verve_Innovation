import React from 'react';
import { cn } from '../../lib/utils';

/**
 * Parses a string like "We create products for *humans.*"
 * and wraps the italicized word in the appropriate spans.
 */
export default function AccentHeadline({ 
  text, 
  as: Component = 'h2', 
  className,
  accentColor = 'blue' // 'blue' or 'orange'
}) {
  // Regex to match text wrapped in asterisks
  const parts = text.split(/(\*[^*]+\*)/g);

  return (
    <Component className={cn('font-display font-bold tracking-tight text-verve-text-primary', className)}>
      {parts.map((part, index) => {
        if (part.startsWith('*') && part.endsWith('*')) {
          const accentWord = part.slice(1, -1);
          return (
            <span
              key={index}
              className={cn(
                'font-script italic font-normal tracking-normal mx-1',
                accentColor === 'blue' ? 'text-verve-accent-blue' : 'text-verve-orange'
              )}
            >
              {accentWord}
            </span>
          );
        }
        return <React.Fragment key={index}>{part}</React.Fragment>;
      })}
    </Component>
  );
}
