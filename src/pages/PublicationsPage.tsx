import { Calendar, Globe2 } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import PublicationsList from "@/components/publications/PublicationsList";

import {
  publications as staticPublications,
  conferenceParticipations as staticConferenceParticipations,
} from "@/data/publications";

export default function PublicationsPage() {
  const publications = staticPublications;
  const conferenceParticipations = staticConferenceParticipations;

  return (
    <>
      <PageHeader
        eyebrow="Publications"
        title="Books, Papers & Conferences"
        description="Selected publications, book chapters, and international conference participation from CV."
      />
      <section aria-labelledby="conferences-title" className="mb-12">
        <div className="mb-6 flex items-center gap-2">
          <Globe2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          <h2
            id="conferences-title"
            className="text-xl font-bold text-slate-900 sm:text-2xl dark:text-slate-50"
          >
            International Conferences & Seminars
          </h2>
        </div>
        <div className="section-card divide-y divide-slate-200 dark:divide-slate-800">
          {conferenceParticipations.map((item) => (
            <article
              key={`${item.title}-${item.location}-${item.year}`}
              className="flex flex-col gap-1 py-4 first:pt-0 last:pb-0"
            >
              <h3 className="font-medium text-slate-900 dark:text-slate-50">
                {item.title}
              </h3>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500 dark:text-slate-400">
                <span>{item.location}</span>
                <span className="inline-flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {item.year}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>
      <PublicationsList publications={publications} />
    </>
  );
}
