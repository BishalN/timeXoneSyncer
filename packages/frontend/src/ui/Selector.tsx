import React, { Component, useState } from "react";
import ct, { getAllTimezones } from "countries-and-timezones";
import { getName as getNameOfCountry } from "country-list";
import Flag from "react-country-flag";
import Select from "react-select";
import { getCurrentTimeByZone, getUserTimeZone } from "../utils/getUserTime";

type zoneValue = {
  name: string;
  utcOffset: number;
  utcOffsetStr: string;
  dstOffset: number;
  dstOffsetStr: string;
  aliasOf: string | null;
  country: string | null;
};
interface zone {
  label: string;
  value: zoneValue;
}

export const MyComponent: React.FC = ({}) => {
  const options = [];
  const timeZones = ct.getAllTimezones();
  for (let timezone in timeZones) {
    if (timeZones[timezone].country) {
      let label =
        getNameOfCountry(timeZones[timezone].country) + " " + timezone;
      options.push({ label, value: timeZones[timezone] });
    }
  }
  const { zoneName } = getUserTimeZone();
  const index = options.findIndex((zone) => zone.value.name.includes(zoneName));

  const [rootZone, setRootZone] = useState<zone>(
    index ? options[index] : options[0]
  );
  const [subZones, setSubZones] = useState<zone[]>();
  console.log(rootZone);

  const { dayOfWeek, simpleTime } = getCurrentTimeByZone(rootZone.value.name);

  return (
    <div>
      <main className="mx-2 my-16 space-y-6">
        <div className="bg-primary-100 text-primary-300 rounded-lg max-w-lg px-4 pb-2 py-3">
          <div className="absolute mr-2">
            <Flag
              countryCode={rootZone.value.country}
              svg
              style={{
                width: "2em",
                height: "2em",
              }}
              title={rootZone.value.country}
            />
          </div>
          <div className="ml-9">
            <span>
              {rootZone.label}, UTC {rootZone.value.utcOffsetStr}
            </span>
            <p className="text-primary-600">
              {simpleTime} {dayOfWeek}{" "}
            </p>
          </div>

          <div className="my-3">
            <Select
              options={options}
              value={rootZone}
              onChange={(zone) => setRootZone(zone)}
            />
          </div>
        </div>

        <div className="bg-primary-100 text-primary-300 rounded-lg max-w-lg px-4 pb-2 py-3">
          <div className="absolute mr-2">
            <Flag
              countryCode={rootZone.value.country}
              svg
              style={{
                width: "2em",
                height: "2em",
              }}
              title={rootZone.value.country}
            />
          </div>
          <div className="ml-9">
            <span>
              {rootZone.label}, UTC {rootZone.value.utcOffsetStr}
            </span>
            <p className="text-primary-600">
              {simpleTime} {dayOfWeek}{" "}
            </p>
          </div>

          <div className="my-3">
            <Select
              options={options}
              value={rootZone}
              onChange={(zone) => setRootZone(zone)}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyComponent;
