import { Routes, Route } from 'react-router-dom';
import PublicLayout from '@/components/layout/PublicLayout';

import HomePage from '@/pages/HomePage';
import ExperiencesPage from '@/pages/ExperiencesPage';
import ProjectsPage from '@/pages/ProjectsPage';
import PublicationsPage from '@/pages/PublicationsPage';
import ResearchPage from '@/pages/ResearchPage';
import ServicesPage from '@/pages/ServicesPage';

import AdminLogin from '@/pages/admin/AdminLogin';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import ProtectedRoute from '@/components/admin/ProtectedRoute';

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/experiences" element={<ExperiencesPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/publications" element={<PublicationsPage />} />
        <Route path="/research" element={<ResearchPage />} />
        <Route path="/services" element={<ServicesPage />} />
      </Route>
      
      <Route path="/randi">
        <Route index element={<AdminLogin />} />
        <Route path="dashboard/*" element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } />
      </Route>
    </Routes>
  );
}
