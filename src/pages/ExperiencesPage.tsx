import {
  GraduationCap,
  Briefcase,
  Wrench,
  Trophy,
  MapPin,
  Download,
  BadgeCheck,
  UserRound,
} from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";

import {
  personalInformation as staticPersonalInformation,
  education as staticEducation,
  experiences as staticExperiences,
  skills as staticSkills,
  memberships as staticMemberships,
  awards as staticAwards,
} from "@/data/experiences";

export default function ExperiencesPage() {
  const personalInformation = staticPersonalInformation;
  const education = staticEducation;
  const experiences = staticExperiences;
  const skills = staticSkills;
  const memberships = staticMemberships;
  const awards = staticAwards;
  const cvUrl = "/cv.pdf";

  return (
    <>
      <PageHeader
        eyebrow="Curriculum Vitae"
        title="CV & Roles"
        description="Personal details, academic background, professional roles, competencies, memberships, and awards from CV."
      />

      <div className="mb-8 flex flex-wrap gap-3">
        <a
          href={cvUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-transform hover:-translate-y-0.5 hover:bg-emerald-700"
        >
          <Download className="h-4 w-4" /> Download CV (PDF)
        </a>
      </div>

      <section aria-labelledby="personal-title" className="mb-12">
        <div className="mb-6 flex items-center gap-2">
          <UserRound className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          <h2
            id="personal-title"
            className="text-xl font-bold text-slate-900 sm:text-2xl dark:text-slate-50"
          >
            Personal Information
          </h2>
        </div>
        <div className="section-card divide-y divide-slate-200 dark:divide-slate-800">
          {personalInformation.map((item) => (
            <div
              key={item.label}
              className="grid gap-1 py-4 first:pt-0 last:pb-0 sm:grid-cols-[180px_1fr]"
            >
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                {item.label}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="exp-title" className="mb-12">
        <div className="mb-6 flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          <h2
            id="exp-title"
            className="text-xl font-bold text-slate-900 sm:text-2xl dark:text-slate-50"
          >
            Professional Experience
          </h2>
        </div>
        <ol className="relative space-y-6 border-l-2 border-dashed border-emerald-200 pl-6 dark:border-emerald-900/60">
          {experiences.map((exp) => (
            <li key={`${exp.role}-${exp.period}`} className="relative">
              <span className="absolute -left-[34px] flex h-5 w-5 items-center justify-center rounded-full border-2 border-emerald-500 bg-white dark:bg-slate-950">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <article className="section-card">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-1.5">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
                      {exp.role}
                    </h3>
                    <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                      {exp.organization}
                    </p>
                    <p className="mt-1 flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                      <MapPin className="h-3 w-3" />
                      {exp.location}
                    </p>
                  </div>
                  <span className="chip shrink-0 self-start">{exp.period}</span>
                </div>
                {exp.description && (
                  <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                    {exp.description}
                  </p>
                )}
              </article>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="edu-title" className="mb-12">
        <div className="mb-6 flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          <h2
            id="edu-title"
            className="text-xl font-bold text-slate-900 sm:text-2xl dark:text-slate-50"
          >
            Education
          </h2>
        </div>
        <ol className="relative space-y-6 border-l-2 border-dashed border-emerald-200 pl-6 dark:border-emerald-900/60">
          {education.map((edu) => (
            <li key={`${edu.degree}-${edu.period}`} className="relative">
              <span className="absolute -left-[34px] flex h-5 w-5 items-center justify-center rounded-full border-2 border-emerald-500 bg-white dark:bg-slate-950">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <article className="section-card">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-1.5">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
                      {edu.degree}
                    </h3>
                    <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                      {edu.institution}
                    </p>
                    <p className="mt-1 flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                      <MapPin className="h-3 w-3" />
                      {edu.location}
                    </p>
                  </div>
                  <span className="chip shrink-0 self-start">{edu.period}</span>
                </div>
                {edu.description && (
                  <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                    {edu.description}
                  </p>
                )}
              </article>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="skills-title" className="mb-12">
        <div className="mb-6 flex items-center gap-2">
          <Wrench className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          <h2
            id="skills-title"
            className="text-xl font-bold text-slate-900 sm:text-2xl dark:text-slate-50"
          >
            Competencies
          </h2>
        </div>
        <div className="grid gap-4">
          {skills.map((group) => (
            <article key={group.category} className="section-card">
              <h3 className="mb-3 text-base font-semibold text-slate-900 dark:text-slate-50">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item} className="chip">
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="memberships-title" className="mb-12">
        <div className="mb-6 flex items-center gap-2">
          <BadgeCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          <h2
            id="memberships-title"
            className="text-xl font-bold text-slate-900 sm:text-2xl dark:text-slate-50"
          >
            Memberships
          </h2>
        </div>
        <div className="section-card">
          <ul className="grid gap-2">
            {memberships.map((membership) => (
              <li
                key={membership}
                className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300"
              >
                <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                <span>{membership}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="awards-title">
        <div className="mb-6 flex items-center gap-2">
          <Trophy className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          <h2
            id="awards-title"
            className="text-xl font-bold text-slate-900 sm:text-2xl dark:text-slate-50"
          >
            Awards & Achievements
          </h2>
        </div>
        <div className="section-card divide-y divide-slate-200 dark:divide-slate-800">
          {awards.map((award) => (
            <div
              key={`${award.title}-${award.year}`}
              className="flex flex-col gap-1 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-medium text-slate-900 dark:text-slate-50">
                  {award.title}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {award.issuer}
                </p>
              </div>
              <span className="chip shrink-0 self-start sm:self-center">
                {award.year}
              </span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
