"use client";

import { useDeferredValue, useMemo, useState, type ChangeEvent } from "react";
import { ExternalLink, Search } from "lucide-react";
import type { Publication } from "@/data/publications";
import { sanitizeDoiHref } from "@/lib/safe-href";

const TYPES = ["All", "Journal", "Conference", "Book Chapter"] as const;
type FilterType = (typeof TYPES)[number];

const matchesQuery = (p: Publication, q: string): boolean => {
  if (!q) return true;
  return (
    p.title.toLowerCase().includes(q) ||
    p.authors.toLowerCase().includes(q) ||
    p.venue.toLowerCase().includes(q)
  );
};

export default function PublicationsList({ publications }: { publications: Publication[] }) {
  const [filter, setFilter] = useState<FilterType>("All");
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  const counts = useMemo(() => {
    const total: Record<string, number> = { All: publications.length };
    for (const p of publications) total[p.type] = (total[p.type] ?? 0) + 1;
    return total;
  }, [publications]);

  const sorted = useMemo(() => [...publications].sort((a, b) => b.year - a.year), [publications]);

  const filtered = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();
    return sorted.filter((p) => (filter === "All" || p.type === filter) && matchesQuery(p, q));
  }, [sorted, filter, deferredQuery]);

  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value);

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {TYPES.map((t) => {
            const isActive = filter === t;
            return (
              <button key={t} type="button" onClick={() => setFilter(t)}
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                  isActive
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-emerald-400 hover:text-emerald-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-emerald-700 dark:hover:text-emerald-400"
                }`}>
                {t}
                <span className={`inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] ${
                  isActive ? "bg-white/25 text-white" : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                }`}>{counts[t] ?? 0}</span>
              </button>
            );
          })}
        </div>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input type="search" value={query} onChange={handleQueryChange} placeholder="Search title, author, venue…"
            className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm text-slate-700 placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:placeholder-slate-500 sm:w-72" />
        </div>
      </div>

      <ol className="space-y-3">
        {filtered.map((p, idx) => {
          const doiHref = sanitizeDoiHref(p.doi);
          return (
            <li key={`${p.title}-${idx}`}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-emerald-700">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">{p.type}</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">{p.year}</span>
                {p.corresponding && <span className="text-[11px] font-medium text-amber-600 dark:text-amber-400">* Corresponding author</span>}
              </div>
              <h3 className="text-base font-semibold leading-snug text-slate-900 dark:text-slate-50">{p.title}</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{p.authors}</p>
              <p className="mt-1 text-sm italic text-slate-500 dark:text-slate-400">{p.venue}</p>
              {doiHref && (
                <a href={doiHref} target="_blank" rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:underline dark:text-emerald-400">
                  DOI: {p.doi}<ExternalLink className="h-3 w-3" />
                </a>
              )}
            </li>
          );
        })}
        {filtered.length === 0 && (
          <li className="rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-400">
            No publications match your search.
          </li>
        )}
      </ol>
    </div>
  );
}
