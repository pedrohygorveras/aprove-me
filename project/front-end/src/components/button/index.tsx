import React from "react";
import { Link } from "react-router-dom";

interface iButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  href?: string;
}

const Button: React.FC<iButtonProps> = ({
  children,
  onClick,
  className = "",
  type = "button",
  disabled = false,
  href,
}) => {
  const baseClasses = `py-4 bg-primary text-white font-semibold text-sm uppercase rounded-lg min-w-52 outline-none transition-all duration-200 hover:scale-[1.020] ${className}`;

  if (href) {
    return (
      <Link to={href}>
        <button
          type="button"
          className={`${baseClasses} ${disabled ? "opacity-50" : ""}`}
          disabled={disabled}
        >
          {children}
        </button>
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={`${baseClasses} ${disabled ? "opacity-50" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {disabled && type === "submit" ? (
        <div className="flex items-center justify-center">
          Aguarde <span className="loading loading-bars loading-md ml-3"></span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export { Button };
