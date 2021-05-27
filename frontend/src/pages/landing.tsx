import React from "react";
import Container from "../ui/components/Container";
import { MainCTA } from "../ui/components/MainCTA";
import { HeroSVGMobile } from "../illustrations/Hero";
import { Benefit1SVG } from "../illustrations/Benefit1";
import { Benefit2SVG } from "../illustrations/Benefit2";
import { Benefit3SVG } from "../illustrations/Benefit3";
import { NavBar } from "../ui/components/NavBar";
import { BenefitSection } from "../ui/components/BenefitSection";

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

      <BenefitSection
        title="How much of my business hour overlaps with my clients?"
        SvgElement={Benefit1SVG}
        description="With TimeXoneSyncer you can map your business hours with any
      timezones around the world you don’t event need to know which
      timezone just the name of place and you’re good to go"
        isLeft={true}
      />
      <BenefitSection
        title="What’s the current time in Butwal, Nepal?"
        SvgElement={Benefit2SVG}
        isLeft={false}
        description="With TimeXoneSyncer you can query for the current time in any part of the earth with 99.99% accuracy"
      />

      <BenefitSection
        title="Want to set the reminder?"
        isLeft={true}
        SvgElement={Benefit3SVG}
        description="With TimeXoneSyncer you can set the reminder for particular time of another timezone in your own time you will be notified with email and push notification"
      />
    </Container>
  );
}
