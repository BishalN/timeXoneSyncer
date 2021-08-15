import React from "react";
import ct from "countries-and-timezones";
import { getName as getNameOfCountry } from "country-list";
import Flag from "react-country-flag";

import Container from "../ui/components/Container";
import { MainCTA } from "../ui/components/MainCTA";
import { HeroSVGMobile } from "../illustrations/Hero";
import { Benefit1SVG } from "../illustrations/Benefit1";
import { Benefit2SVG } from "../illustrations/Benefit2";
import { Benefit3SVG } from "../illustrations/Benefit3";
import { NavBar } from "../ui/components/NavBar";
import { BenefitSection } from "../ui/components/BenefitSection";
import { TestimonialCard } from "../ui/components/TestimonialCard";
import Link from "next/link";
import { Footer } from "../ui/components/Footer";
import { getCurrentTimeByZone } from "../utils/getUserTime";
import { GenericButton } from "../ui/components/GenericButton";
import { useRouter } from "next/router";
import { useCheckIfAlreadyLogin } from "../utils/useCheckIfAlreadyLogin";
import { withApollo } from "../utils/withApollo";
import Head from 'next/head'

function landing() {
  useCheckIfAlreadyLogin();
  const router = useRouter();
  const timeZones = ct.getAllTimezones();
  const timezoneArr = [];
  let counter = 0;
  for (let timezone in timeZones) {
    if (timeZones[timezone].country) {
      let label =
        getNameOfCountry(timeZones[timezone].country) + " " + timezone;
      timezoneArr.push({ label, value: timeZones[timezone] });
    }
    counter++;
    if (counter > 10) break;
  }
  return (
    <>
    <Head>

<script async src="https://www.googletagmanager.com/gtag/js?id=G-SSCP12E8QL"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-SSCP12E8QL');
</script>
    </Head>
      <Container>
        <NavBar />

        {/* Hero section */}

        <section id="HeroSection">
          <div
            id="sectionWrapper"
            className="sm:flex sm:flex-row-reverse sm:justify-between"
          >
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

        <section id="benefit" className="space-y-32">
          <BenefitSection
            title="How much of my business hour overlaps with my clients?"
            SvgElement={Benefit1SVG}
            description="With TimeXoneSyncer you can map your business hours with any
      timezones around the world"
            isLeft={true}
          />
          <BenefitSection
            title="What’s the current time in Butwal, Nepal?"
            SvgElement={Benefit2SVG}
            isLeft={false}
            description="With TimeXoneSyncer you can query for the current time in any part of the earth with 99% accuracy"
          />

          <BenefitSection
            title="Want to set the reminder?"
            isLeft={true}
            SvgElement={Benefit3SVG}
            description="With TimeXoneSyncer you can set the reminder for particular time of another timezone in your own time"
          />
        </section>

        {/* <section id="testimonialSection" className="mb-10">
          <div className="flex justify-center items-center mt-32">
            <h3 className="text-secondary text-center leading-7">
              What do TimeXoneSyncer user say about it?
            </h3>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center mt-20"
            id="testimonialWrapper"
          >
            <TestimonialCard
              name="Alex"
              title="ML engineer"
              imageSrc="/images/testimony_1.jpg"
              description="I always wished that a product like
              TimeXoneSyncer existed and finally got
              it. I am very happy to say that the TimeXoneSyncer is the best platform to sync international
              time set the reminder and all other important stuff for us freelancers having international  clients staying update with international time  has never been easy"
            />
            <TestimonialCard
              name="Dawyne"
              title="actor"
              imageSrc="/images/testimony_2.jpg"
              description="timeXoneSyncer is the best I love the product so much so i use it every day and night to schdule meetings or whatever"
            />
            <TestimonialCard
              name="Alex"
              title="ML engineer"
              imageSrc="/images/testimony_1.jpg"
              description="I always wished that a product like
              TimeXoneSyncer existed and finally got
              it. I am very happy to say that the TimeXoneSyncer is the best platform to sync international
              time set the reminder and all other important stuff for us freelancers having international  clients staying update with international time  has never been easy"
            />
          </div>
          <div className="flex items-center justify-center">
            <Link href="https://github.com/bishaln/timexonesyncer">
              <a
                target="_blank"
                className="text-secondary cursor-pointer focus:text-accent"
              >
                See all testimonials
              </a>
            </Link>
          </div>
        </section> */}

        <section id="supportedZoneSection">
          <div>
            <h3 className="text-secondary text-center leading-7 mt-16 mb-5">
              Some of the supported timezones
            </h3>
          </div>
          <div
            id="supportedZoneWrapper"
            className="flex flex-wrap item-center mb-5"
          >
            {timezoneArr.map((timezone) => {
              const { dayOfWeek, simpleTime } = getCurrentTimeByZone(
                timezone.value.name
              );
              return (
                <div
                  key={timezone.label}
                  className="bg-primary-100 mx-2 my-2 
              text-primary-300 rounded-lg max-w-sm  px-4 pb-2 py-3"
                >
                  <div className="absolute mr-2">
                    <Flag
                      countryCode={timezone.value?.country}
                      svg
                      style={{
                        width: "2em",
                        height: "2em",
                      }}
                      title={timezone.value.country}
                    />
                  </div>
                  <div className="ml-9">
                    <span>
                      {timezone.label}, UTC {timezone.value.utcOffsetStr}
                    </span>
                    <p className="text-primary-600">
                      {simpleTime} {dayOfWeek}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mb-32">
            <GenericButton
              title="See all supported timezones"
              onClick={() => router.push("/all")}
            />
          </div>
        </section>
      </Container>
      <Footer />
    </>
  );
}

export default withApollo({})(landing);
