import { FileText, FlaskConical } from "lucide-react";
import { Link } from "react-router-dom";
import PageHeader from "@/components/ui/PageHeader";

import {
  researchProjects as staticProjects,
  publicationPreview as staticPublicationPreview,
} from "@/data/research";

export default function ResearchPage() {
  const researchProjects = staticProjects;
  const publicationPreview = staticPublicationPreview;

  return (
    <>
      <PageHeader
        eyebrow="Research"
        title="Research Projects"
        description="Research grants and publication snapshot aligned with CV."
      />

      <section aria-labelledby="projects-title" className="mb-12">
        <div className="mb-6 flex items-center gap-2">
          <FlaskConical className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          <h2
            id="projects-title"
            className="text-xl font-bold text-slate-900 sm:text-2xl dark:text-slate-50"
          >
            Ongoing & Recent Work
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {researchProjects.map((project) => (
            <article
              key={project.title}
              className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-emerald-700"
            >
              <div className="mb-3 flex items-center gap-2">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    project.status === "Ongoing"
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300"
                      : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                  }`}
                >
                  {project.status}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {project.period}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 group-hover:text-emerald-700 dark:text-slate-50 dark:group-hover:text-emerald-400">
                {project.title}
              </h3>
              <p className="mt-2 text-sm font-medium text-slate-500 dark:text-slate-400">
                Grant: {project.grant}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="chip">
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="publications-title">
        <div className="mb-6 flex items-center gap-2">
          <FileText className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          <h2
            id="publications-title"
            className="text-xl font-bold text-slate-900 sm:text-2xl dark:text-slate-50"
          >
            Publication Snapshot
          </h2>
        </div>
        <div className="section-card">
          <div className="space-y-4">
            {publicationPreview.map((item) => (
              <article
                key={item.title}
                className="border-b border-slate-200 pb-4 last:border-0 last:pb-0 dark:border-slate-800"
              >
                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {item.venue} · {item.year}
                </p>
              </article>
            ))}
          </div>
          <Link
            to="/publications"
            className="mt-6 inline-flex items-center rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-transform hover:-translate-y-0.5 hover:bg-emerald-700"
          >
            View full list
          </Link>
        </div>
      </section>
    </>
  );
}
