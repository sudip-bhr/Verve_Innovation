import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminTopbar from './AdminTopbar';

export default function AdminLayout() {
  return (
    <div data-theme="dark" className="flex h-screen bg-[#0f1115] text-white font-sans overflow-hidden">
      {/* Sidebar - fixed width */}
      <AdminSidebar />
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        <AdminTopbar />
        
        <main className="flex-1 overflow-auto p-6 md:p-8">
          <div className="max-w-6xl mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
