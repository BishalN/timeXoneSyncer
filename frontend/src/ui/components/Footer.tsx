import Link from "next/link";
import React from "react";

interface FooterProps {}

export const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <section id="footer">
      <div className="h-48 bg-secondary">
        <div className="container mx-auto flex flex-col space-y-3 items-center sm:items-start">
          <Link href="#">
            <a className="font-extrabold italic text-primary-100 text-7xl">
              tXs
            </a>
          </Link>

          <Link href="#">
            <a className="focus:text-accent-hover">Legal Stuff</a>
          </Link>

          <Link href="#">
            <a className="focus:text-accent-hover">Privacy Policy</a>
          </Link>
        </div>
      </div>
      <p className="text-center bg-secondary pb-4">
        Copyright © 2017-2021 TimeXoneSyncer LLC. All rights reserved
      </p>
    </section>
  );
};
