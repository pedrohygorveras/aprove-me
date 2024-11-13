import React from "react";
import Image from "next/image";
import Link from "next/link";

import { MdApps } from "react-icons/md";

interface DashboardNavbarProps {
  open: boolean;
  setOpen: (isOpen: boolean) => void;
}

const DashboardNavbar: React.FC<DashboardNavbarProps> = ({ open, setOpen }) => {
  return (
    <nav className="h-20 w-full select-none text-letter">
      <div className="z-10 bg-core-100">
        <div className="h-20 border-b border-divider">
          <div className="page h-full w-full flex items-center">
            <div className="flex items-center">
              <div className="md:hidden flex items-center justify-center w-10 h-10 mr-3 md:mr-0">
                <button
                  className="p-0"
                  onClick={() => {
                    setOpen(!open);
                  }}
                >
                  <MdApps className="text-2xl" />
                </button>
              </div>
              <Link href="/dashboard/payables">
                <Image
                  src="/images/logo.png"
                  width={109}
                  height={24}
                  alt="logo"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export { DashboardNavbar };
