import React from "react";

interface GenericButtonProps {
  title: string;
  onClick?: () => void;
}

export const GenericButton: React.FC<GenericButtonProps> = ({
  title,
  onClick,
}) => {
  return (
    <button
      className="my-1 rounded-md focus:ring-2 
  bg-secondary p-2 text-button hover:bg-primary-300"
      role={`Click here to ${title}`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};
