import React from "react";
import { MainCTA } from "../ui/components/MainCTA";
import { HeroSVGMobile } from "../illustrations/Hero";
import { Benefit3SVG } from "../illustrations/Benefit3";

interface playProps {}

const play: React.FC<playProps> = ({}) => {
  return (
    <section id="Benefit1">
      {/* by default */}
      <div id="sectionWrapper" className="sm:flex">
        <Benefit3SVG />
        <div className="mx-2 sm:my-16 sm:space-y-4 lg:space-y-5 lg:mr-32 lg:mt-40">
          <h3 className="my-2 text-secondary  text-2xl sm:text-3xl lg:text-4xl">
            How much of my business hour overlaps with my clients?
          </h3>
          <p className="text-lg text-primary-300 my-2 max-w-sm">
            With TimeXoneSyncer you can map your business hours with any
            timezones around the world you don’t event need to know which
            timezone just the name of place and you’re good to go
          </p>
          <MainCTA />
        </div>
      </div>
    </section>
  );
};

export default play;
