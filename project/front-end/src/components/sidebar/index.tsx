import React from "react";
import { ItemSidebar } from "./item";

import {
  MdPeopleAlt,
  MdAttachMoney,
  MdApps,
  MdDeleteSweep,
  MdOutlineSettings,
  MdFolderShared,
} from "react-icons/md";

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
  {
    label: "Configurações",
    link: "/dashboard/settings",
    icon: <MdOutlineSettings />,
  },
];

const Sidebar: React.FC<SidebarProps> = ({ open }) => {
  return (
    <aside
      className={`bg-sidebar text-white absolute left-0 top-0 z-50 h-screen w-32 transition-transform duration-300 ease-in-out md:static overflow-auto md:translate-x-0 transform ${
        open ? "absolute translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="no-scrollbar flex flex-col overflow-y-auto">
        <nav className="text-center">
          <ul className="flex flex-col">
            {menu.map((item: MenuProps, index: number) => {
              return <ItemSidebar item={item} index={index} key={item.label} />;
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export { Sidebar };
