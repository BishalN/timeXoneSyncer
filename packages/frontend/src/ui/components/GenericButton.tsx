import React from "react";
import { Loading } from "./Loading";

interface GenericButtonProps {
  title: string;
  onClick?: () => void;
  isLoading?: boolean;
}

export const GenericButton: React.FC<GenericButtonProps> = ({
  title,
  onClick,
  isLoading,
}) => {
  return (
    <button
      className="my-1 rounded-md focus:ring-2 
  bg-secondary p-2 text-button hover:bg-primary-300 relative"
      role={`Click here to ${title}`}
      onClick={onClick}
    >
      {isLoading && (
        <svg
          className={`animate-spin text-button h-4 w-4 absolute `}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      <span> {title}</span>
    </button>
  );
};
