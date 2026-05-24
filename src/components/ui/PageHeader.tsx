type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export default function PageHeader({ eyebrow, title, description }: Props) {
  return (
    <header className="mb-8 sm:mb-10">
      {eyebrow && (
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
          {eyebrow}
        </p>
      )}
      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl dark:text-slate-50">
        {title}
      </h1>
      {description && (
        <p className="mt-3 max-w-2xl text-base text-slate-500 dark:text-slate-400">
          {description}
        </p>
      )}
      <div className="mt-4 h-1 w-16 rounded-full bg-emerald-500" />
    </header>
  );
}
