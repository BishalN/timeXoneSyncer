import React from "react";
import { Benefit1SVG } from "../../illustrations/Benefit1";
import { MainCTA } from "./MainCTA";

interface BenefitSectionProps {
  title: string;
  description: string;
  SvgElement: React.FC;
  isLeft: boolean;
}

export const BenefitSection: React.FC<BenefitSectionProps> = ({
  description,
  SvgElement,
  title,
  isLeft,
}) => {
  // row reverse is left and just
  const classes = `my-16 sm:flex ${
    isLeft ? "sm:flex-row" : "sm:flex-row-reverse"
  }`;
  return (
    <>
      <section id="Benefit1">
        {/* by default */}
        <div id="sectionWrapper" className={classes}>
          <SvgElement />
          <div className="mx-2 sm:my-16 sm:space-y-4 lg:space-y-5 lg:mr-32 lg:mt-40">
            <h3 className="my-2 text-secondary  text-2xl sm:text-3xl lg:text-4xl">
              {title}
            </h3>
            <p className="text-lg text-primary-300 my-2 max-w-sm">
              {description}
            </p>
            <MainCTA />
          </div>
        </div>
      </section>
    </>
  );
};
