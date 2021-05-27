import React from "react";
import Container from "../ui/components/Container";
import { MainCTA } from "../ui/components/MainCTA";
import { HeroSVGMobile } from "../illustrations/Hero";
import { NavBar } from "../ui/components/NavBar";

export default function landing() {
  return (
    <Container>
      <NavBar />

      {/* Hero section */}

      <section id="HeroSection">
        <div id="sectionWrapper" className="sm:flex sm:flex-row-reverse  ">
          <HeroSVGMobile />
          <div className="mx-2 sm:my-16 sm:space-y-4 lg:space-y-5 lg:mr-32 lg:mt-40">
            <h1 className="text-secondary italic text-4xl sm:text-5xl lg:text-6xl">
              TimeXoneSyncer
            </h1>
            <p className="text-xl text-primary-300 my-2 max-w-sm">
              Lets you sync your time with anyone’s time in the world with a
              click of a button
            </p>
            <MainCTA />
          </div>
        </div>
      </section>
    </Container>
  );
}
