import { useRouter } from "next/router";
import React from "react";

function GhostCTA() {
  const router = useRouter();
  return (
    <>
      <button
        className="text-center p-4 text-secondary hover:bg-secondary-washed-out hover:text-button
     rounded-md focus:ring-2 cursor-pointer focus:ring-offset-secondary-washed-out "
        onClick={() => router.push("/register")}
        role="Start using timezone syncer"
      >
        Get Started - it's Free
      </button>
    </>
  );
}

export default GhostCTA;
