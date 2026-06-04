import { useEffect, useState } from 'react';
import { fetchApi } from '@/lib/api';

export default function Overview() {
  const [stats, setStats] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const endpoints = ['experiences', 'projects', 'publications', 'research', 'services', 'teaching'];
      const newStats: Record<string, number> = {};
      
      try {
        await Promise.all(endpoints.map(async (endpoint) => {
          const res = await fetchApi(`/api/${endpoint}`);
          const data = await res.json();
          newStats[endpoint] = Array.isArray(data) ? data.length : 0;
        }));
        setStats(newStats);
      } catch (error) {
        console.error('Failed to fetch stats', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div>Loading overview...</div>;

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Overview</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Object.entries(stats).map(([key, value]) => (
          <div key={key} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{key}</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
