
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import { useAuth } from '@/hooks/useAuth';
import ConsumerSidebar from './consumer/ConsumerSidebar';
import ProducerSidebar from './producer/ProducerSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

const DashboardLayout: React.FC = () => {
  const { user } = useAuth();
  const userType = user?.user_type || 'consumer';

  return (
    <div className="flex flex-col min-h-screen bg-natural-50">
      <Header />
      <SidebarProvider>
        <div className="flex flex-1 w-full">
          {userType === 'producer' ? <ProducerSidebar /> : <ConsumerSidebar />}
          <main className="flex-1 p-4 md:p-6">
            <Outlet />
          </main>
        </div>
      </SidebarProvider>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
