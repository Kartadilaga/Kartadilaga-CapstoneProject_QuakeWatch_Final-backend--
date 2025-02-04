'use client'
import '@/assets/globals.css';
import '@/assets/dashboard.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Inter } from "next/font/google";

import Script from '@/assets/script';

import Sidebar from '../../../components/SideBar';
import TopBar from '../../../components/TopBar';
import AuthProvider from '@/context/AuthProvider';

const inter = Inter({ subsets: ['latin'] })

export default function DashboardLayout({ children }) {
  const { showHideSidebar, setShowHideSidebar } = Script()

  return (
    // <Suspense fallback={<Loading />}>
    <AuthProvider>
      <html lang="en">
        <body className={inter.className}>
          <div className="row">
            <Sidebar sidebarShow={showHideSidebar} onClickSidebarShow={() => setShowHideSidebar(!showHideSidebar)} />

            <div className={showHideSidebar ? "content sidebar-dekstop" : "content-full sidebar-responsive"}>
              <TopBar onClickSidebarShow={() => setShowHideSidebar(!showHideSidebar)} />

              {/* Content Here */}
              {children}
            </div>
          </div>
        </body>
      </html>
    </AuthProvider>
    // </Suspense>
  );
}
