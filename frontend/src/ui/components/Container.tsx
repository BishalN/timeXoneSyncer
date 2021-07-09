import React from "react";

function Container({ children }) {
  //update the container to create big margins instead of padding
  return (
    <div className="font-sans container mx-auto py-4 md:px-10 xl:px-32">
      {children}
    </div>
  );
}

export default Container;
