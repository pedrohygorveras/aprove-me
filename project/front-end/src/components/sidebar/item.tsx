import React from "react";
import { Link, useLocation } from "react-router-dom";

interface ItemSidebarProps {
  item: {
    label: string;
    link: string;
    icon: React.ReactNode;
  };
  index: number;
}

const ItemSidebar: React.FC<ItemSidebarProps> = ({ item }) => {
  const location = useLocation();
  const isActive = location.pathname.includes(item.link);

  return (
    <li>
      <Link
        to={item.link}
        className={`group relative flex h-24 flex-col items-center justify-center border-b border-slate-800 px-4 duration-300 ease-in-out ${isActive ? "bg-primary" : "hover:bg-slate-800"}`}
      >
        <div>
          <div className="flex flex-col items-center text-3xl">{item.icon}</div>
          <div className="mt-3 text-xs">{item.label}</div>
        </div>
      </Link>
    </li>
  );
};

export { ItemSidebar };
