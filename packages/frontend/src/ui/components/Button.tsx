import React from "react";
import { IconType } from "react-icons";
import { useRouter } from "next/router";

interface ButtonProps {
  title: string;
  endPoint: string;
  Icon: IconType;
  sizeOfIcon?: string;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  endPoint,
  Icon: IconType,
  sizeOfIcon = "2em",
}) => {
  const router = useRouter();
  return (
    <button
      className="bg-primary-200 p-4 sm:w-11/12 rounded-lg
     space-x-2 flex justify-center items-center focus:ring-2 focus:ring-secondary"
      onClick={() => {
        // pushing to the backend that would redirect us to the dashboard if success else to login page
        router.push(endPoint);
      }}
    >
      <IconType size={sizeOfIcon} />
      <span>{title}</span>
    </button>
  );
};
