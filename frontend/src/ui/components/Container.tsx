import React from "react";

function Container({ children }) {
  return (
    <div
      className="font-sans container mx-auto py-4"
      style={{ height: "200vh" }}
    >
      {children}
    </div>
  );
}

export default Container;
