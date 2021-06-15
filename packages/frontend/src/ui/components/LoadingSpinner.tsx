import React from "react";

export const LoadingSpinner = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <svg
        className="animate-spin h-32 w-32 mr-3 bg-primary-600"
        viewBox="0 0 24 24"
      ></svg>
    </div>
  );
};
