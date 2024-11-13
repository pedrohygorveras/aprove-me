import React from "react";
import { Button } from "../button";
import { MdAdd } from "react-icons/md";

interface ContentProps {
  children: React.ReactNode;
  className?: string;
  urlCreate?: string;
}

const Content: React.FC<ContentProps> = ({
  children,
  className,
  urlCreate,
}) => {
  return (
    <div className="bg-neutral-300">
      <div className="page pt-8">
        {urlCreate && (
          <div className="text-right">
            <Button href={urlCreate} className="min-w-36">
              <div className="flex items-center justify-center">
                ADICIONAR
                <MdAdd className="text-lg ml-2" />
              </div>
            </Button>
          </div>
        )}
        <div className={`bg-paper shadow-md rounded-t-lg p-6 ${className}`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export { Content };
