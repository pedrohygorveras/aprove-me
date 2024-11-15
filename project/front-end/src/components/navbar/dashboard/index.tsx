import React from "react";

import { MdApps } from "react-icons/md";
import { Link } from "react-router-dom";

interface DashboardNavbarProps {
  open: boolean;
  setOpen: (isOpen: boolean) => void;
}

const DashboardNavbar: React.FC<DashboardNavbarProps> = ({ open, setOpen }) => {
  return (
    <nav className="text-letter h-20 w-full select-none">
      <div className="bg-core-100 z-10">
        <div className="border-divider h-20 border-b">
          <div className="page flex h-full w-full items-center">
            <div className="flex items-center">
              <div className="mr-3 flex h-10 w-10 items-center justify-center md:mr-0 md:hidden">
                <button
                  className="p-0"
                  onClick={() => {
                    setOpen(!open);
                  }}
                >
                  <MdApps className="text-2xl" />
                </button>
              </div>
              <Link to="/dashboard/payables">
                <img src="/images/logo.png" alt="logo" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export { DashboardNavbar };
