"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ItemSidebarProps {
  item: {
    label: string;
    link: string;
    icon: React.ReactNode;
  };
  index: number;
}

const ItemSidebar: React.FC<ItemSidebarProps> = ({ item }) => {
  const pathname = usePathname();
  const isActive = pathname.includes(item.link);

  return (
    <li>
      <Link
        href={item.link}
        passHref
        className={`group relative flex flex-col items-center justify-center h-24 px-4 duration-300 ease-in-out border-b border-slate-800 
          ${isActive ? "bg-primary" : "hover:bg-slate-800"}`}
      >
        <div>
          <div className="flex flex-col items-center text-3xl">{item.icon}</div>
          <div className="text-xs mt-3">{item.label}</div>
        </div>
      </Link>
    </li>
  );
};

export { ItemSidebar };
