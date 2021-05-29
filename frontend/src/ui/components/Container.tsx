import React from "react";

function Container({ children }) {
  return (
    <div className="font-sans container mx-auto py-4 md:px-10">{children}</div>
  );
}

export default Container;
