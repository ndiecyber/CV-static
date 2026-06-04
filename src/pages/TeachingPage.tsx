import { BookOpen, History, Users2 } from "lucide-react";
import { useEffect, useState } from "react";
import PageHeader from "@/components/ui/PageHeader";
import {
  CardSkeleton,
  PageHeaderSkeleton,
  SectionHeadingSkeleton,
  StatCardSkeleton,
  TableRowSkeleton,
} from "@/components/ui/Skeleton";
import { fetchTeachingData, type TeachingData } from "@/lib/api";

export default function TeachingPage() {
  const [teachingData, setTeachingData] = useState<TeachingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const data = await fetchTeachingData();
        if (active) setTeachingData(data);
      } catch (err) {
        if (active) setError("Failed to load teaching data.");
      } finally {
        if (active) setLoading(false);
      }
    };
    load();
    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return (
      <>
        <PageHeaderSkeleton />
        <SectionHeadingSkeleton />
        <div className="grid gap-4 md:grid-cols-2">
          {Array.from({ length: 2 }).map((_, i) => (
            <CardSkeleton key={i} lines={3} />
          ))}
        </div>
        <SectionHeadingSkeleton />
        <div className="section-card overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <tbody>
                {Array.from({ length: 3 }).map((_, i) => (
                  <TableRowSkeleton key={i} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <SectionHeadingSkeleton />
        <div className="grid gap-4 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <StatCardSkeleton key={i} />
          ))}
        </div>
      </>
    );
  }

  if (error || !teachingData) {
    return (
      <div className="section-card">
        <p className="text-sm text-slate-600 dark:text-slate-300">
          {error || "No content available."}
        </p>
      </div>
    );
  }

  const currentCourses = teachingData.currentCourses;
  const pastCourses = teachingData.pastCourses;
  const supervisions = teachingData.supervisions;

  return (
    <>
      <PageHeader eyebrow="Teaching" title="Courses & Supervision"
        description="Courses I currently teach, previously taught and an overview of student supervision." />

      {/* Current Courses */}
      <section aria-labelledby="current-title" className="mb-12">
        <div className="mb-6 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          <h2 id="current-title" className="text-xl font-bold text-slate-900 sm:text-2xl dark:text-slate-50">Current Courses</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {currentCourses.map((course) => (
            <article key={course.code}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-emerald-700">
              <div className="mb-3 flex items-center justify-between">
                <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">{course.code}</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">{course.level}</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">{course.title}</h3>
              <p className="mt-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">{course.semester}</p>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{course.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Past Courses */}
      <section aria-labelledby="past-title" className="mb-12">
        <div className="mb-6 flex items-center gap-2">
          <History className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          <h2 id="past-title" className="text-xl font-bold text-slate-900 sm:text-2xl dark:text-slate-50">Previously Taught</h2>
        </div>
        <div className="section-card overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500 dark:bg-slate-900/60 dark:text-slate-400">
                <tr>
                  <th scope="col" className="px-6 py-3">Code</th>
                  <th scope="col" className="px-6 py-3">Course Title</th>
                  <th scope="col" className="px-6 py-3">Level</th>
                  <th scope="col" className="px-6 py-3">Years</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {pastCourses.map((course) => (
                  <tr key={course.code} className="text-slate-600 dark:text-slate-300">
                    <td className="px-6 py-3 font-mono text-xs font-semibold text-emerald-700 dark:text-emerald-400">{course.code}</td>
                    <td className="px-6 py-3 font-medium text-slate-900 dark:text-slate-100">{course.title}</td>
                    <td className="px-6 py-3">{course.level}</td>
                    <td className="px-6 py-3">{course.years}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Student Supervision */}
      <section aria-labelledby="supervision-title">
        <div className="mb-6 flex items-center gap-2">
          <Users2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          <h2 id="supervision-title" className="text-xl font-bold text-slate-900 sm:text-2xl dark:text-slate-50">Student Supervision</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {supervisions.map((s) => (
            <article key={s.level} className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{s.level}</h3>
              <div className="mt-4 flex items-baseline justify-center gap-6">
                <div>
                  <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{s.ongoing}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Ongoing</p>
                </div>
                <div className="h-10 w-px bg-slate-200 dark:bg-slate-800" />
                <div>
                  <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">{s.completed}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Graduated</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
