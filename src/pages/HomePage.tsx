import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Cpu,
  Fingerprint,
  Network,
  ArrowRight,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";

import { site } from "@/data/site";
import {
  welcome,
  recruitment,
  researchInterests,
  highlights,
} from "@/data/home";

const iconMap = { ShieldCheck, Cpu, Fingerprint, Network } as const;

export default function HomePage() {
  const shortName = site.shortName;
  const bio = site.bio;

  const welcomeParagraphs = welcome.paragraphs;
  const recruitmentHeading = recruitment.heading;
  const recruitmentBody = recruitment.body;
  const recruitmentTags = recruitment.tags;
  const activeResearchInterests = researchInterests;
  const activeHighlights = highlights;

  return (
    <>
      {/* Hero / Welcome */}
      <section aria-labelledby="welcome-title">
        <PageHeader
          eyebrow="Hello"
          title={`I'm ${shortName}.`}
          description={bio}
        />
        <div className="section-card">
          <h2 id="welcome-title" className="sr-only">
            About me
          </h2>
          <div className="space-y-4 text-slate-600 dark:text-slate-300">
            {welcomeParagraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-transform hover:-translate-y-0.5 hover:bg-emerald-700"
            >
              Open CV PDF <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              to="/publications"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-emerald-500 hover:text-emerald-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-emerald-400 dark:hover:text-emerald-400"
            >
              Publications
            </Link>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="mt-10" aria-label="Key numbers">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          {activeHighlights.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm sm:p-6 dark:border-slate-800 dark:bg-slate-900/60"
            >
              <p className="text-2xl font-bold text-emerald-600 sm:text-3xl dark:text-emerald-400">
                {item.value}
              </p>
              <p className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-500 sm:text-sm dark:text-slate-400">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Student Recruitment */}
      <section className="mt-10" aria-labelledby="recruitment-title">
        <div className="relative overflow-hidden rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-white p-6 shadow-sm sm:p-8 dark:border-emerald-900/60 dark:from-emerald-950/40 dark:via-slate-900/60 dark:to-slate-900/60">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="relative">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              <span className="text-xs font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-300">
                Open for collaboration
              </span>
            </div>
            <h2
              id="recruitment-title"
              className="mt-2 text-xl font-bold text-slate-900 sm:text-2xl dark:text-slate-50"
            >
              {recruitmentHeading}
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">
              {recruitmentBody}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {recruitmentTags.map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Research Interests */}
      <section className="mt-10" aria-labelledby="interests-title">
        <div className="mb-6 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          <h2
            id="interests-title"
            className="text-xl font-bold text-slate-900 sm:text-2xl dark:text-slate-50"
          >
            Research Interests
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {activeResearchInterests.map((interest) => {
            const Icon = iconMap[interest.icon as keyof typeof iconMap] ?? Cpu;
            return (
              <article
                key={interest.title}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-emerald-700"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition-colors group-hover:bg-emerald-600 group-hover:text-white dark:bg-emerald-950/40 dark:text-emerald-400">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
                  {interest.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  {interest.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
