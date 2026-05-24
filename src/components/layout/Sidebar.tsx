import { useCallback, useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Home,
  Briefcase,
  Lightbulb,
  FileText,
  Users2,
  Award,
  Moon,
  Sun,
  X,
} from "lucide-react";
import { site, navLinks } from "@/data/site";
import {
  LinkedinIcon,
  GithubIcon,
  ScholarIcon,
  OrcidIcon,
  ResearchGateIcon,
} from "./brand-icons";
import {
  sanitizeExternalHref,
  sanitizeMailtoHref,
  sanitizeTelHref,
} from "@/lib/safe-href";

type SocialLink = {
  href: string;
  label: string;
  Icon: typeof LinkedinIcon;
};

const iconMap: Record<string, typeof Home> = {
  "/": Home,
  "/experiences": Briefcase,
  "/research": Lightbulb,
  "/projects": Award,
  "/publications": FileText,
  "/services": Users2,
};

const normalizePath = (path: string): string => {
  if (!path) return "/";
  if (path.length > 1 && path.endsWith("/")) return path.slice(0, -1);
  return path;
};

export default function Sidebar() {
  const name = site.name;
  const shortName = site.shortName;
  const title = site.title;
  const institution = site.institution;
  const department = site.department;
  const email = site.email;
  const phone = site.phone;
  const location = site.location;
  const linkedinUrl = site.socials.linkedin;
  const scholarUrl = site.socials.scholar;
  const githubUrl = site.socials.github;
  const orcidUrl = site.socials.orcid;
  const researchGateUrl = site.socials.researchGate;

  const emailHref = sanitizeMailtoHref(email);
  const phoneHref = sanitizeTelHref(phone);

  const profileSrc = "/images/profile.webp";
  const profileAlt = `${shortName} profile`;

  const socialLinks = [
    {
      href: sanitizeExternalHref(linkedinUrl),
      label: "LinkedIn",
      Icon: LinkedinIcon,
    },
    {
      href: sanitizeExternalHref(scholarUrl),
      label: "Google Scholar",
      Icon: ScholarIcon,
    },
    {
      href: sanitizeExternalHref(githubUrl),
      label: "GitHub",
      Icon: GithubIcon,
    },
    ...(orcidUrl
      ? [
          {
            href: sanitizeExternalHref(orcidUrl),
            label: "ORCID",
            Icon: OrcidIcon,
          },
        ]
      : []),
    ...(researchGateUrl
      ? [
          {
            href: sanitizeExternalHref(researchGateUrl),
            label: "ResearchGate",
            Icon: ResearchGateIcon,
          },
        ]
      : []),
  ].filter((link): link is SocialLink => Boolean(link.href));

  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [isDark, setIsDark] = useState(
    () =>
      typeof document !== "undefined" &&
      document.documentElement.classList.contains("dark"),
  );
  const activePath = normalizePath(pathname);

  useEffect(() => {
    const handleToggle = () => setOpen((prev) => !prev);
    window.addEventListener("sidebar:toggle", handleToggle);
    return () => window.removeEventListener("sidebar:toggle", handleToggle);
  }, []);

  // Lock body scroll while mobile drawer is open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  const closeSidebar = useCallback(() => setOpen(false), []);

  const toggleTheme = useCallback(() => {
    const root = document.documentElement;
    const next = !root.classList.contains("dark");
    root.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* */
    }
    setIsDark(next);
  }, []);

  return (
    <>
      {/* Mobile backdrop */}
      <div
        onClick={closeSidebar}
        aria-hidden={!open}
        className={`fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm transition-opacity lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        id="sidebar"
        aria-label="Primary navigation"
        className={`sidebar-scroll fixed inset-y-0 left-0 z-50 flex w-80 max-w-[85vw] flex-col overflow-y-auto border-r border-slate-200 bg-white shadow-xl transition-transform duration-300 lg:translate-x-0 dark:border-slate-800 dark:bg-slate-950 ${
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <button
          type="button"
          onClick={closeSidebar}
          aria-label="Close navigation"
          className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 lg:hidden dark:text-slate-400 dark:hover:bg-slate-800"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex flex-col gap-6 p-6">
          {/* Profile */}
          <div className="flex flex-col items-center text-center">
            <div className="relative">
              <div className="h-36 w-36 overflow-hidden rounded-full ring-4 ring-emerald-500/20">
                <img
                  src={profileSrc}
                  alt={profileAlt}
                  width={144}
                  height={144}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
            <h1 className="mt-4 text-xl font-bold text-slate-900 dark:text-slate-50">
              {name}
            </h1>
            <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
              {title}
            </p>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              {institution}
            </p>
            {department && (
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {department}
              </p>
            )}
          </div>

          {/* Contact */}
          <div className="space-y-2.5 text-sm text-slate-600 dark:text-slate-300">
            {emailHref && (
              <a
                href={emailHref}
                className="flex items-start gap-3 hover:text-emerald-600 dark:hover:text-emerald-400"
              >
                <Mail className="mt-0.5 h-4 w-4 shrink-0" />
                <span className="break-all">{email}</span>
              </a>
            )}
            {phone &&
              (phoneHref ? (
                <a
                  href={phoneHref}
                  className="flex items-start gap-3 hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  <Phone className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{phone}</span>
                </a>
              ) : (
                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{phone}</span>
                </div>
              ))}
            {location && (
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{location}</span>
              </div>
            )}
          </div>

          {/* Social */}
          <div className="flex items-center justify-center gap-2">
            {socialLinks.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:border-emerald-500 hover:text-emerald-600 dark:border-slate-800 dark:text-slate-300 dark:hover:border-emerald-400 dark:hover:text-emerald-400"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>

          <div className="divider" />

          {/* Nav */}
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const Icon = iconMap[link.href] ?? Home;
              const isActive = activePath === normalizePath(link.href);
              return (
                <Link
                  key={link.title}
                  to={link.href}
                  onClick={closeSidebar}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-emerald-600 text-white shadow-sm shadow-emerald-600/20"
                      : "text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 dark:text-slate-300 dark:hover:bg-emerald-950/40 dark:hover:text-emerald-300"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span>{link.title}</span>
                </Link>
              );
            })}
          </nav>

          <div className="divider" />

          {/* Theme toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 cursor-pointer"
          >
            {isDark ? (
              <>
                <Sun className="h-4 w-4" />
                <span>Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="h-4 w-4" />
                <span>Dark Mode</span>
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
