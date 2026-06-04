import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import MobileHeader from '@/components/layout/MobileHeader';
import Footer from '@/components/layout/Footer';

export default function PublicLayout() {
  return (
    <div className="min-h-screen w-full font-sans antialiased">
      <Sidebar />
      <MobileHeader />
      <main className="lg:pl-80">
        <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-12 lg:px-10">
          <Outlet />
          <Footer />
        </div>
      </main>
    </div>
  );
}
