import React from "react";

import { MdArrowBack } from "react-icons/md";
import { Link } from "react-router-dom";

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
          <Link className="btn btn-circle btn-primary mr-4" to={goBack}>
            <MdArrowBack className="text-2xl" />
          </Link>
        )}
        <div>
          <h1 className={`text-2xl font-bold text-primary ${className}`}>
            {title}
          </h1>
          {subtitle && (
            <div className={badge ? `badge badge-ghost mt-3` : `mt-2`}>
              <h2
                className={
                  badge
                    ? `text-sm font-normal ${className}`
                    : `text-sm font-normal`
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
