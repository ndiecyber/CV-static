import { useState, useEffect } from 'react';
import { fetchApi } from '@/lib/api';

export default function EditHome() {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchHome = async () => {
      setLoading(true);
      try {
        const res = await fetchApi('/api/home');
        const data = await res.json();
        setName(data.site?.name || '');
        setBio(data.site?.bio || '');
        setAvatarUrl(data.avatarUrl || '');
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchHome();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      let uploadedAvatarUrl = avatarUrl;
      
      // Upload image if selected
      if (file) {
        const formData = new FormData();
        formData.append('avatar', file);
        const uploadRes = await fetchApi('/api/upload/avatar', {
          method: 'POST',
          body: formData,
        });
        const uploadData = await uploadRes.json();
        if (uploadRes.ok) {
          uploadedAvatarUrl = uploadData.avatarUrl;
          setAvatarUrl(uploadedAvatarUrl);
        }
      }

      // Update home data
      // We only update site.name, site.bio, and avatarUrl
      // To do this, we should fetch current home, modify it, and put it back
      const res = await fetchApi('/api/home');
      const currentData = await res.json();
      
      const updatedData = {
        ...currentData,
        site: {
          ...currentData.site,
          name,
          bio
        },
        avatarUrl: uploadedAvatarUrl
      };

      await fetchApi('/api/home', {
        method: 'PUT',
        body: JSON.stringify(updatedData)
      });
      
      alert('Home data updated successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to update data.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl">
      <h1 className="mb-6 text-2xl font-bold">Edit Home</h1>
      <form onSubmit={handleSave} className="space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">Nama Lengkap</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-700 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>
        
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">Tagline / Bio</label>
          <textarea
            value={bio}
            onChange={e => setBio(e.target.value)}
            rows={4}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-700 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">Foto Profil</label>
          <div className="flex items-center gap-4">
            {preview ? (
              <img src={preview} alt="Preview" className="h-20 w-20 rounded-full object-cover border border-slate-200" />
            ) : avatarUrl ? (
              <img src={`http://localhost:3001${avatarUrl}`} alt="Avatar" className="h-20 w-20 rounded-full object-cover border border-slate-200" />
            ) : (
              <div className="h-20 w-20 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-xs text-slate-500">No Image</div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="text-xs text-slate-500 file:mr-4 file:rounded-full file:border-0 file:bg-emerald-50 file:px-4 file:py-2 file:text-xs file:font-semibold file:text-emerald-700 hover:file:bg-emerald-100"
            />
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-emerald-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-700 disabled:opacity-50"
          >
            {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
          </button>
        </div>
      </form>
    </div>
  );
}
