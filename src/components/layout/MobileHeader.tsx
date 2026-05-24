import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { site } from "@/data/site";

const buildInitials = (fullName: string): string => {
  const parts = fullName
    .replace(/^(Dr\.?|Prof\.?|Mr\.?|Ms\.?|Mrs\.?)\s+/i, "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (parts.length === 0) return "—";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

export default function MobileHeader() {
  const name = site.name;
  const institution = site.institution;
  const initials = buildInitials(name);

  const avatarUrl = "/images/profile.webp";

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-white/80 px-4 py-3 backdrop-blur lg:hidden dark:border-slate-800 dark:bg-slate-950/80">
      <Link to="/" className="flex items-center gap-2">
        {avatarUrl ? (
          <div className="h-9 w-9 overflow-hidden rounded-lg">
            <img
              src={avatarUrl}
              alt={`${name} avatar`}
              width={36}
              height={36}
              className="h-full w-full object-cover"
            />
          </div>
        ) : (
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 font-bold text-white">
            {initials}
          </div>
        )}
        <div className="leading-tight">
          <p className="text-sm font-semibold">{name}</p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            {institution}
          </p>
        </div>
      </Link>
      <button
        type="button"
        aria-label="Open navigation menu"
        onClick={() => window.dispatchEvent(new CustomEvent("sidebar:toggle"))}
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-900"
      >
        <Menu className="h-5 w-5" />
      </button>
    </header>
  );
}
