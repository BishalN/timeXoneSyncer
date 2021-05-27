import React from "react";
import Logo from "../../icons/logo";
import GhostCta from "./Ghost-CTA";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  return (
    <nav className="flex justify-between mx-2 items-center sticky top-2">
      <div>
        <Logo />
      </div>
      <GhostCta />
    </nav>
  );
};
