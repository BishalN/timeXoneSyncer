import { useRouter } from "next/router";
import React from "react";

interface MainCTAProps {}

export const MainCTA: React.FC<MainCTAProps> = ({}) => {
  const router = useRouter();
  return (
    <button
      className="my-2 rounded-md focus:ring-2 focus:ring-offset-secondary-washed-out
     bg-secondary p-4 text-button hover:bg-primary-300"
      role="Start using timezone syncer"
      onClick={() => router.push("/register")}
    >
      Get Started -it's Free
    </button>
  );
};
