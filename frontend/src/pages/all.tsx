import React from "react";
import ct from "countries-and-timezones";
import { getName as getNameOfCountry } from "country-list";
import Flag from "react-country-flag";

import Container from "../ui/components/Container";

import { Footer } from "../ui/components/Footer";
import { getCurrentTimeByZone } from "../utils/getUserTime";
import { GenericButton } from "../ui/components/GenericButton";
import { useRouter } from "next/router";

export default function landing() {
  const router = useRouter();
  const timeZones = ct.getAllTimezones();
  const timezoneArr = [];
  for (let timezone in timeZones) {
    if (timeZones[timezone].country) {
      let label =
        getNameOfCountry(timeZones[timezone].country) + " " + timezone;
      timezoneArr.push({ label, value: timeZones[timezone] });
    }
  }
  return (
    <>
      <Container>
        <GenericButton title="Go Back" onClick={() => router.push("/")} />
        <section id="supportedZoneSection">
          <div>
            <h3 className="text-secondary text-center leading-7 mt-16 mb-5">
              Supported timezones
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
        </section>
      </Container>
      <Footer />
    </>
  );
}
