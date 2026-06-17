import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind classes with clsx for conditional class names.
 * This is the standard shadcn/ui utility.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
