import React from "react";
import { ItemSidebar } from "./item";

import {
  MdPeopleAlt,
  MdAttachMoney,
  MdApps,
  MdDeleteSweep,
  MdFolderShared,
  MdLogout,
} from "react-icons/md";
import { setUser } from "@/util/store";

interface SidebarProps {
  open: boolean;
}

interface MenuProps {
  label: string;
  link: string;
  icon: React.ReactNode;
}

const menu: MenuProps[] = [
  {
    label: "Cedentes",
    link: "/dashboard/assignors",
    icon: <MdPeopleAlt />,
  },
  {
    label: "Pagamentos",
    link: "/dashboard/payables",
    icon: <MdAttachMoney />,
  },
  {
    label: "Lotes",
    link: "/dashboard/batches",
    icon: <MdApps />,
  },
  {
    label: "Fila Morta",
    link: "/dashboard/dead-letter-queue",
    icon: <MdDeleteSweep />,
  },
  {
    label: "Usuários",
    link: "/dashboard/users",
    icon: <MdFolderShared />,
  },
];

const logout = () => {
  setUser(null);
  window.location.href = "/login";
};

const Sidebar: React.FC<SidebarProps> = ({ open }) => {
  return (
    <aside
      className={`absolute left-0 top-0 z-50 h-screen w-32 transform overflow-auto bg-sidebar text-white transition-transform duration-300 ease-in-out md:static md:translate-x-0 ${
        open ? "absolute translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="no-scrollbar flex flex-col overflow-y-auto">
        <nav className="text-center">
          <ul className="flex flex-col">
            {menu.map((item: MenuProps, index: number) => {
              return <ItemSidebar item={item} index={index} key={item.label} />;
            })}
            <li className="">
              <button
                onClick={logout}
                className={`group relative flex h-24 w-full flex-col items-center justify-center border-b border-slate-800 px-4 duration-300 ease-in-out hover:bg-slate-800`}
              >
                <div>
                  <div className="flex flex-col items-center text-3xl">
                    <MdLogout />
                  </div>
                  <div className="mt-3 text-xs">Logout</div>
                </div>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export { Sidebar };
