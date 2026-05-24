/**
 * Skeleton primitives for loading states.
 * Each renders a pulsing placeholder that matches common layout shapes.
 */

function cn(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

/** Generic rectangular shimmer block. */
export function Bone({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800',
        className,
      )}
    />
  );
}

/** Mirrors PageHeader: eyebrow, title, description. */
export function PageHeaderSkeleton() {
  return (
    <div className="mb-8">
      <Bone className="mb-2 h-4 w-24" />
      <Bone className="mb-3 h-8 w-72 max-w-full" />
      <Bone className="h-4 w-full max-w-lg" />
    </div>
  );
}

/** Mirrors section-card. */
export function CardSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      <Bone className="mb-3 h-5 w-48" />
      {Array.from({ length: lines }).map((_, i) => (
        <Bone
          key={i}
          className={cn('mb-2 h-4', i === lines - 1 ? 'w-3/4' : 'w-full')}
        />
      ))}
    </div>
  );
}

/** Timeline item skeleton (used on experiences, education). */
export function TimelineItemSkeleton() {
  return (
    <li className="relative">
      <span className="absolute -left-[34px] flex h-5 w-5 items-center justify-center rounded-full border-2 border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-950">
        <span className="h-2 w-2 rounded-full bg-slate-200 dark:bg-slate-700" />
      </span>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
        <Bone className="mb-2 h-5 w-56" />
        <Bone className="mb-1 h-4 w-40" />
        <Bone className="mt-3 h-4 w-full" />
        <Bone className="mt-2 h-4 w-3/4" />
      </div>
    </li>
  );
}

/** Section heading with icon placeholder. */
export function SectionHeadingSkeleton() {
  return (
    <div className="mb-6 flex items-center gap-2">
      <Bone className="h-5 w-5 rounded" />
      <Bone className="h-6 w-48" />
    </div>
  );
}

/** Grid of chips. */
export function ChipGroupSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="flex flex-wrap gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <Bone key={i} className="h-6 w-20 rounded-full" />
      ))}
    </div>
  );
}

/** Stat card skeleton (used in highlights, supervision). */
export function StatCardSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm sm:p-6 dark:border-slate-800 dark:bg-slate-900/60">
      <Bone className="mx-auto mb-2 h-8 w-16" />
      <Bone className="mx-auto h-3 w-24" />
    </div>
  );
}

/** Table row skeleton. */
export function TableRowSkeleton({ cols = 4 }: { cols?: number }) {
  return (
    <tr>
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-6 py-3">
          <Bone className="h-4 w-full" />
        </td>
      ))}
    </tr>
  );
}

/** Publication list item skeleton. */
export function PublicationItemSkeleton() {
  return (
    <li className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      <div className="mb-2 flex items-center gap-2">
        <Bone className="h-5 w-16 rounded-full" />
        <Bone className="h-4 w-10" />
      </div>
      <Bone className="mb-2 h-5 w-full" />
      <Bone className="mb-1 h-4 w-3/4" />
      <Bone className="h-4 w-1/2 italic" />
    </li>
  );
}
