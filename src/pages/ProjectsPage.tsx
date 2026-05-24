import { Award, Calendar, Landmark, Rocket } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";

import {
  fundings as staticFundings,
  intellectualProperties as staticIntellectualProperties,
} from "@/data/projects";

export default function ProjectsPage() {
  const fundings = staticFundings;
  const intellectualProperties = staticIntellectualProperties;

  return (
    <>
      <PageHeader
        eyebrow="Grants & IP"
        title="Research Grants & Intellectual Property"
        description="Funded research portfolio and intellectual property outputs from CV."
      />

      <section aria-labelledby="funding-title" className="mb-12">
        <div className="mb-6 flex items-center gap-2">
          <Award className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          <h2
            id="funding-title"
            className="text-xl font-bold text-slate-900 sm:text-2xl dark:text-slate-50"
          >
            Research Grants
          </h2>
        </div>
        <div className="space-y-4">
          {fundings.map((grant) => (
            <article key={grant.title} className="section-card">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
                    {grant.title}
                  </h3>
                  <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                    <span className="inline-flex items-center gap-1">
                      <Landmark className="h-3.5 w-3.5" />
                      {grant.agency}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {grant.period}
                    </span>
                  </div>
                </div>
              </div>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                {grant.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="ip-title">
        <div className="mb-6 flex items-center gap-2">
          <Rocket className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          <h2
            id="ip-title"
            className="text-xl font-bold text-slate-900 sm:text-2xl dark:text-slate-50"
          >
            Intellectual Property
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {intellectualProperties.map((item) => (
            <article
              key={item.title}
              className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-emerald-700"
            >
              <span className="mb-2 text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                {item.year}
              </span>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
                {item.title}
              </h3>
              <p className="mt-2 flex-1 text-sm text-slate-600 dark:text-slate-300">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
