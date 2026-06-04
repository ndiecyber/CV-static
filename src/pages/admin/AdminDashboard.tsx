import { Routes, Route } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import Overview from './Overview';
import EditHome from './EditHome';
import CrudPage from './CrudPage';
import Settings from './Settings';

export default function AdminDashboard() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<Overview />} />
        <Route path="home" element={<EditHome />} />
        <Route path="experiences" element={<CrudPage entity="experiences" title="Pengalaman" />} />
        <Route path="projects" element={<CrudPage entity="projects" title="Proyek" />} />
        <Route path="publications" element={<CrudPage entity="publications" title="Publikasi" />} />
        <Route path="research" element={<CrudPage entity="research" title="Riset" />} />
        <Route path="services" element={<CrudPage entity="services" title="Layanan" />} />
        <Route path="teaching" element={<CrudPage entity="teaching" title="Pengajaran" />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}
