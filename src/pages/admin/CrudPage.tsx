import { useState, useEffect } from 'react';
import { fetchApi } from '@/lib/api';
import { Edit2, Trash2, Plus, X } from 'lucide-react';

interface CrudPageProps {
  entity: string;
  title: string;
}

const schemas: Record<string, string[]> = {
  experiences: ['role', 'organization', 'location', 'period', 'description'],
  projects: ['title', 'agency', 'period', 'description'],
  publications: ['type', 'title', 'authors', 'venue', 'year', 'doi'],
  research: ['title', 'status', 'period', 'grant', 'tags'],
  services: ['title', 'grant', 'year'],
  teaching: ['code', 'title', 'level', 'semester', 'description'],
};

export default function CrudPage({ entity, title }: CrudPageProps) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  
  const fields = schemas[entity] || ['title', 'description'];

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetchApi(`/api/${entity}`);
      const json = await res.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [entity]);

  const handleOpenModal = (item?: any) => {
    if (item) {
      setEditingItem(item);
      setFormData(item);
    } else {
      setEditingItem(null);
      const emptyForm: any = {};
      fields.forEach(f => emptyForm[f] = '');
      setFormData(emptyForm);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setFormData({});
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingItem ? 'PUT' : 'POST';
    const url = editingItem 
      ? `/api/${entity}/${editingItem.id}` 
      : `/api/${entity}`;

    try {
      await fetchApi(url, {
        method,
        body: JSON.stringify(formData)
      });
      handleCloseModal();
      fetchData();
    } catch (error) {
      console.error(error);
      alert('Failed to save');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus data ini?')) return;
    
    try {
      await fetchApi(`/api/${entity}/${id}`, {
        method: 'DELETE'
      });
      fetchData();
    } catch (error) {
      console.error(error);
      alert('Failed to delete');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">{title}</h1>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-700"
        >
          <Plus className="h-4 w-4" /> Tambah
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm text-slate-600">
            <thead className="border-b border-slate-200 bg-slate-50 text-slate-900">
              <tr>
                {fields.slice(0, 3).map(f => (
                  <th key={f} className="px-6 py-4 text-xs font-semibold uppercase tracking-wider">{f}</th>
                ))}
                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {data.map((item: any) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  {fields.slice(0, 3).map(f => (
                    <td key={f} className="px-6 py-4">
                      {typeof item[f] === 'string' && item[f].length > 50 
                        ? item[f].substring(0, 50) + '...' 
                        : item[f]}
                    </td>
                  ))}
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleOpenModal(item)}
                        className="rounded-md bg-amber-50 p-2 text-amber-600 hover:bg-amber-100"
                        title="Edit"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="rounded-md bg-red-50 p-2 text-red-600 hover:bg-red-100"
                        title="Hapus"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {data.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                    Tidak ada data.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <h2 className="text-lg font-bold">{editingItem ? 'Edit Data' : 'Tambah Data'}</h2>
              <button onClick={handleCloseModal} className="text-slate-500 hover:text-slate-700">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="max-h-[70vh] overflow-y-auto p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {fields.map(field => (
                  <div key={field}>
                    <label className="mb-1 block text-sm font-medium capitalize text-slate-700">
                      {field}
                    </label>
                    {field === 'description' ? (
                      <textarea
                        required
                        value={formData[field] || ''}
                        onChange={(e) => handleChange(e, field)}
                        rows={3}
                        className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                    ) : (
                      <input
                        type="text"
                        required
                        value={formData[field] || ''}
                        onChange={(e) => handleChange(e, field)}
                        className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                    )}
                  </div>
                ))}
                <div className="mt-6 flex justify-end gap-3 border-t border-slate-100 pt-4">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
                  >
                    Simpan
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
