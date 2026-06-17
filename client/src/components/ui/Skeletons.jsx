import { cn } from '../../lib/utils';

/* ──────────────────────────────────────────────────
   Shared shimmer base — pulsing gradient matching
   the brand's dark elevated card aesthetic
   ────────────────────────────────────────────────── */
function Shimmer({ className }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-verve-bg-elevated border border-verve-border rounded-3xl",
        "after:absolute after:inset-0 after:translate-x-[-100%]",
        "after:bg-gradient-to-r after:from-transparent after:via-white/5 after:to-transparent",
        "after:animate-[shimmer_1.8s_infinite]",
        className
      )}
    />
  );
}

/* ──────────────────────────────────────────────────
   CaseStudyCard Skeleton
   ────────────────────────────────────────────────── */
export function CaseCardSkeleton({ feature = false }) {
  return (
    <div
      className={cn(
        "relative flex flex-col bg-verve-bg-elevated border border-verve-border rounded-3xl overflow-hidden",
        feature ? "md:col-span-2 md:flex-row min-h-[500px]" : "col-span-1 min-h-[400px]"
      )}
    >
      {/* Image placeholder */}
      <div
        className={cn(
          "relative overflow-hidden bg-verve-bg-secondary",
          feature ? "w-full md:w-3/5 h-64 md:h-auto" : "w-full h-64"
        )}
      >
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-verve-bg-elevated to-verve-bg-secondary" />
        {/* Verve orange corner accent */}
        <div className="absolute bottom-4 left-4 h-2 w-12 rounded-full bg-verve-orange/20 animate-pulse" />
      </div>

      {/* Content placeholder */}
      <div className={cn("flex flex-col flex-1 p-8 md:p-10 gap-3", feature ? "justify-center" : "")}>
        {/* Tags */}
        <div className="flex gap-2 mb-2">
          <div className="h-5 w-20 rounded-sm bg-verve-orange/10 animate-pulse" />
          <div className="h-5 w-16 rounded-sm bg-verve-orange/10 animate-pulse" />
        </div>
        {/* Title */}
        <div className="h-8 w-3/4 rounded-xl bg-verve-border animate-pulse" />
        <div className="h-8 w-1/2 rounded-xl bg-verve-border animate-pulse" />
        {/* Summary */}
        <div className="mt-2 space-y-2 flex-1">
          <div className="h-4 w-full rounded-lg bg-verve-border/60 animate-pulse" />
          <div className="h-4 w-full rounded-lg bg-verve-border/60 animate-pulse" />
          <div className="h-4 w-2/3 rounded-lg bg-verve-border/60 animate-pulse" />
        </div>
        {/* CTA */}
        <div className="flex items-center gap-2 mt-4">
          <div className="h-4 w-28 rounded-lg bg-verve-border animate-pulse" />
          <div className="h-4 w-4 rounded-full bg-verve-border animate-pulse" />
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────
   CasesGrid Skeleton — matches a 2-col grid
   ────────────────────────────────────────────────── */
export function CasesGridSkeleton({ count = 4 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <CaseCardSkeleton key={i} feature={i === 0} />
      ))}
    </div>
  );
}

/* ──────────────────────────────────────────────────
   ServiceCard Skeleton — matches SolutionsSection cards
   ────────────────────────────────────────────────── */
export function ServiceCardSkeleton() {
  return (
    <div className="relative p-8 md:p-10 rounded-2xl bg-verve-bg-elevated border border-verve-border">
      {/* Number index */}
      <div className="h-10 w-12 rounded-lg bg-verve-border animate-pulse mb-6" />
      {/* Title */}
      <div className="h-7 w-2/3 rounded-xl bg-verve-border animate-pulse mb-3" />
      {/* Description */}
      <div className="space-y-2 mb-8">
        <div className="h-4 w-full rounded-lg bg-verve-border/60 animate-pulse" />
        <div className="h-4 w-full rounded-lg bg-verve-border/60 animate-pulse" />
        <div className="h-4 w-4/5 rounded-lg bg-verve-border/60 animate-pulse" />
      </div>
      {/* Link */}
      <div className="h-4 w-24 rounded-lg bg-verve-orange/20 animate-pulse" />
    </div>
  );
}

/* ──────────────────────────────────────────────────
   SolutionsSection Skeleton — 2x2 grid
   ────────────────────────────────────────────────── */
export function SolutionsSkeleton({ count = 4 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <ServiceCardSkeleton key={i} />
      ))}
    </div>
  );
}

/* ──────────────────────────────────────────────────
   StatBlock Skeleton
   ────────────────────────────────────────────────── */
export function StatBlockSkeleton() {
  return (
    <div className="flex flex-col items-start gap-2">
      {/* Value + suffix */}
      <div className="flex items-baseline gap-1">
        <div className="h-14 w-20 rounded-xl bg-verve-border animate-pulse" />
        <div className="h-10 w-6 rounded-lg bg-verve-orange/20 animate-pulse" />
      </div>
      {/* Label */}
      <div className="h-3 w-28 rounded-lg bg-verve-border/60 animate-pulse" />
    </div>
  );
}

/* ──────────────────────────────────────────────────
   TeamMember Skeleton — portrait card
   ────────────────────────────────────────────────── */
export function TeamMemberSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      {/* Photo */}
      <div className="w-full aspect-[3/4] bg-verve-bg-elevated border border-verve-border rounded-2xl overflow-hidden animate-pulse relative">
        <div className="absolute inset-0 bg-gradient-to-br from-verve-bg-elevated to-verve-bg-secondary" />
      </div>
      {/* Name */}
      <div className="h-6 w-3/4 rounded-lg bg-verve-border animate-pulse" />
      {/* Role */}
      <div className="h-4 w-1/2 rounded-lg bg-verve-orange/20 animate-pulse" />
      {/* Tagline */}
      <div className="h-4 w-full rounded-lg bg-verve-border/60 animate-pulse" />
      <div className="h-4 w-4/5 rounded-lg bg-verve-border/60 animate-pulse" />
    </div>
  );
}

/* ──────────────────────────────────────────────────
   TeamGrid Skeleton
   ────────────────────────────────────────────────── */
export function TeamGridSkeleton({ count = 4 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <TeamMemberSkeleton key={i} />
      ))}
    </div>
  );
}
