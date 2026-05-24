import {
  BadgeCheck,
  BookOpenCheck,
  Calendar,
  MapPin,
  Mic,
  Users2,
} from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";

import {
  editorialRoles as staticEditorialRoles,
  invitedRoles as staticInvitedRoles,
  trainingPrograms as staticTrainingPrograms,
  memberships as staticMemberships,
  communityServices as staticCommunityServices,
} from "@/data/services";

export default function ServicesPage() {
  const editorialRoles = staticEditorialRoles;
  const invitedRoles = staticInvitedRoles;
  const trainingPrograms = staticTrainingPrograms;
  const memberships = staticMemberships;
  const communityServices = staticCommunityServices;

  return (
    <>
      <PageHeader
        eyebrow="Service"
        title="Academic & Community Service"
        description="Editorial roles, invited contributions, training, memberships, and community service from CV."
      />

      <section aria-labelledby="editorial-title" className="mb-12">
        <div className="mb-6 flex items-center gap-2">
          <BookOpenCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          <h2
            id="editorial-title"
            className="text-xl font-bold text-slate-900 sm:text-2xl dark:text-slate-50"
          >
            Editorial Roles
          </h2>
        </div>
        <div className="section-card">
          <ul className="grid gap-2">
            {editorialRoles.map((role) => (
              <li
                key={role}
                className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300"
              >
                <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                <span>{role}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="roles-title" className="mb-12">
        <div className="mb-6 flex items-center gap-2">
          <Users2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          <h2
            id="roles-title"
            className="text-xl font-bold text-slate-900 sm:text-2xl dark:text-slate-50"
          >
            Speakers & Invited Roles
          </h2>
        </div>
        <div className="section-card divide-y divide-slate-200 dark:divide-slate-800">
          {invitedRoles.map((role) => (
            <article
              key={`${role.title}-${role.location}-${role.date}`}
              className="flex flex-col gap-1 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-medium text-slate-900 dark:text-slate-50">
                  {role.title}
                </p>
                <p className="text-sm text-emerald-600 dark:text-emerald-400">
                  {role.event}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {role.location}
                </p>
              </div>
              <span className="chip shrink-0 self-start sm:self-center">
                {role.date}
              </span>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="training-title" className="mb-12">
        <div className="mb-6 flex items-center gap-2">
          <Mic className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          <h2
            id="training-title"
            className="text-xl font-bold text-slate-900 sm:text-2xl dark:text-slate-50"
          >
            Training & Professional Development
          </h2>
        </div>
        <div className="space-y-4">
          {trainingPrograms.map((program) => (
            <article key={program.title} className="section-card">
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50">
                {program.title}
              </h3>
              <p className="mt-1 text-sm text-emerald-600 dark:text-emerald-400">
                {program.organizer}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                <span className="inline-flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {program.year}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="community-title" className="mb-12">
        <div className="mb-6 flex items-center gap-2">
          <MapPin className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          <h2
            id="community-title"
            className="text-xl font-bold text-slate-900 sm:text-2xl dark:text-slate-50"
          >
            Community Service (2024 - 2026)
          </h2>
        </div>
        <div className="section-card divide-y divide-slate-200 dark:divide-slate-800">
          {communityServices.map((service) => (
            <article
              key={`${service.title}-${service.year}`}
              className="flex flex-col gap-2 py-4 first:pt-0 last:pb-0"
            >
              <h3 className="font-medium text-slate-900 dark:text-slate-50">
                {service.title}
              </h3>
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span className="chip">{service.grant}</span>
                <span>{service.year}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="memberships-title">
        <div className="mb-6 flex items-center gap-2">
          <BadgeCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          <h2
            id="memberships-title"
            className="text-xl font-bold text-slate-900 sm:text-2xl dark:text-slate-50"
          >
            Professional Memberships
          </h2>
        </div>
        <div className="section-card">
          <ul className="flex flex-wrap gap-2">
            {memberships.map((membership) => (
              <li key={membership} className="chip">
                {membership}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
