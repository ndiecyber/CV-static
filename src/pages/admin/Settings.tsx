import { useState } from 'react';
import { fetchApi } from '@/lib/api';
import { Settings as SettingsIcon } from 'lucide-react';

export default function Settings() {
  const [newUsername, setNewUsername] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newUsername && !newPassword) {
      setMessage({ text: 'Mohon isi username baru atau password baru', type: 'error' });
      return;
    }

    if (newPassword && newPassword !== confirmPassword) {
      setMessage({ text: 'Password baru tidak cocok', type: 'error' });
      return;
    }

    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const response = await fetchApi('/api/auth/update-credentials', {
        method: 'PUT',
        body: JSON.stringify({ oldPassword, newUsername, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ text: 'Kredensial berhasil diubah', type: 'success' });
        setNewUsername('');
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setMessage({ text: data.error || 'Gagal mengubah kredensial', type: 'error' });
      }
    } catch (err) {
      setMessage({ text: 'Koneksi bermasalah', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-6 flex items-center gap-2">
        <SettingsIcon className="h-6 w-6 text-slate-700" />
        <h1 className="text-2xl font-bold text-slate-900">Pengaturan</h1>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">Ubah Kredensial Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Username Baru (Opsional)</label>
            <input
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              placeholder="Biarkan kosong jika tidak ingin mengubah username"
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Password Baru (Opsional)</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Biarkan kosong jika tidak ingin mengubah password"
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
          {newPassword && (
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Konfirmasi Password Baru</label>
              <input
                type="password"
                required={!!newPassword}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          )}

          <hr className="my-4 border-slate-200" />

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Password Saat Ini (Wajib)</label>
            <input
              type="password"
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Masukkan password saat ini untuk konfirmasi"
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          {message.text && (
            <p className={`text-sm ${message.type === 'success' ? 'text-emerald-600' : 'text-red-600'}`}>
              {message.text}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700 disabled:opacity-50"
          >
            {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
          </button>
        </form>
      </div>
    </div>
  );
}
