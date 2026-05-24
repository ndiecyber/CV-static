import { Routes, Route } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import MobileHeader from '@/components/layout/MobileHeader';
import Footer from '@/components/layout/Footer';

import HomePage from '@/pages/HomePage';
import ExperiencesPage from '@/pages/ExperiencesPage';
import ProjectsPage from '@/pages/ProjectsPage';
import PublicationsPage from '@/pages/PublicationsPage';
import ResearchPage from '@/pages/ResearchPage';
import ServicesPage from '@/pages/ServicesPage';

export default function App() {
  return (
    <div className="min-h-screen w-full font-sans antialiased">
      <Sidebar />
      <MobileHeader />
      <main className="lg:pl-80">
        <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-12 lg:px-10">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/experiences" element={<ExperiencesPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/publications" element={<PublicationsPage />} />
            <Route path="/research" element={<ResearchPage />} />
            <Route path="/services" element={<ServicesPage />} />
          </Routes>
          <Footer />
        </div>
      </main>
    </div>
  );
}
