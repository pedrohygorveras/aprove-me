"use client";

import React, { useState } from "react";
import { DashboardNavbar } from "@/components/navbar/dashboard";
import { Sidebar } from "@/components/sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div>
      <div className="flex">
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-50 bg-black opacity-80 md:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        <Sidebar open={sidebarOpen} />

        <div className="relative flex h-screen flex-1 flex-col overflow-x-hidden">
          <DashboardNavbar open={sidebarOpen} setOpen={setSidebarOpen} />
          <div className="flex h-screen flex-col overflow-hidden">
            <div className="overflow-auto bg-core-100 text-letter">
              <div className="min-h-[calc(100vh_-_80px)]">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { DashboardLayout };
