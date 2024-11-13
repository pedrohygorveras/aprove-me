import React from "react";
import Link from "next/link";

import { MdArrowBack } from "react-icons/md";

interface iHeaderProps {
  title: string;
  subtitle?: string | null;
  className?: string;
  badge?: boolean;
  goBack?: string;
}

const Header: React.FC<iHeaderProps> = ({
  title,
  subtitle,
  className = "",
  badge = true,
  goBack,
}) => {
  return (
    <div className="border-b py-5">
      <div className="flex items-center">
        {goBack && (
          <Link className="btn btn-circle btn-primary mr-4" href={goBack}>
            <MdArrowBack className="text-2xl" />
          </Link>
        )}
        <div>
          <h1 className={`font-bold text-2xl text-primary ${className}`}>
            {title}
          </h1>
          {subtitle && (
            <div className={badge ? `badge badge-ghost mt-3` : `mt-2`}>
              <h2
                className={
                  badge
                    ? `font-normal text-sm ${className}`
                    : `font-normal text-sm`
                }
              >
                {subtitle}
              </h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export { Header };
