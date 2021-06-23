import React, { useEffect, useState } from "react";
import ct from "countries-and-timezones";
import { getName as getNameOfCountry } from "country-list";
import Select from "react-select";
import { getCurrentTimeByZone, getUserTimeZone } from "../utils/getUserTime";
import { GenericButton } from "./components/GenericButton";
import {
  compareDifferentTimeZones,
  mode,
} from "../utils/compareDifferentTimezone";
import { ZoneSelector } from "./components/ZoneSelector";
import { ComparisonResult } from "./ComparisonResult";

export type zoneValue = {
  name: string;
  utcOffset: number;
  utcOffsetStr: string;
  dstOffset: number;
  dstOffsetStr: string;
  aliasOf: string | null;
  country: string | null;
};
export interface zone {
  label: string;
  value: zoneValue;
}
export interface comparisonModeOptions {
  label: string;
  value: string;
}

export const Selector: React.FC = ({}) => {
  const options = [
    {
      label: "select a time zone",
      value: null,
    },
  ];
  const timeZones = ct.getAllTimezones();
  for (let timezone in timeZones) {
    if (timeZones[timezone].country) {
      let label =
        getNameOfCountry(timeZones[timezone].country) + " " + timezone;
      options.push({ label, value: timeZones[timezone] });
    }
  }

  const comparisonModeOptions = [
    { label: "Business Hour mapping", value: "businessHours" },
    { label: "12 Hour mapping", value: "12hours" },
    { label: "24 Hour mapping", value: "24Hours" },
  ];

  const { zoneName } = getUserTimeZone();
  const index = options.findIndex((zone) =>
    zone.value?.name.includes(zoneName)
  );

  const [rootZone, setRootZone] = useState<zone>(
    index !== -1 ? options[index] : options[0]
  );
  const [subZoneOne, setSubZoneOne] = useState<zone>(options[0]);
  const [subZoneTwo, setSubZoneTwo] = useState<zone>();
  const [comparisonResult, setComparisonResult] = useState([]);
  const [comparisonMode, setComparisonMode] = useState<comparisonModeOptions>(
    comparisonModeOptions[0]
  );

  useEffect(() => {
    if (rootZone && subZoneOne?.value) {
      compareTimeZoneHandler();
    }
  }, [comparisonMode, rootZone, subZoneOne, subZoneTwo]);

  useEffect(() => {
    if (subZoneTwo?.value) {
      compareTimeZoneHandler();
    }
  }, [subZoneTwo]);

  const compareTimeZoneHandler = () => {
    const result = compareDifferentTimeZones({
      mode: comparisonMode.value as mode,
      rootZone: rootZone?.value.name,
      subZoneOne: subZoneOne?.value.name,
      subZoneTwo: subZoneTwo?.value?.name,
    });

    if (result) setComparisonResult(result as any);
  };

  const returnDayOfWeek = (zoneName) => {
    const { dayOfWeek } = getCurrentTimeByZone(zoneName);
    return dayOfWeek;
  };

  const returnSimpleTime = (zoneName) => {
    const { simpleTime } = getCurrentTimeByZone(zoneName);
    return simpleTime;
  };

  return (
    <div>
      <main className="mx-2 my-16 space-y-6">
        <div className="md:flex md:space-x-10 space-y-4 md:space-y-0">
          <ZoneSelector
            dayOfWeek={returnDayOfWeek(rootZone.value.name)}
            options={options}
            simpleTime={returnSimpleTime(rootZone.value.name)}
            zone={rootZone}
            setZoneChange={setRootZone}
          />

          <ZoneSelector
            dayOfWeek={returnDayOfWeek(subZoneOne.value?.name)}
            options={options}
            setZoneChange={setSubZoneOne}
            simpleTime={returnSimpleTime(subZoneOne.value?.name)}
            zone={subZoneOne}
          />

          {subZoneTwo ? (
            <ZoneSelector
              dayOfWeek={returnDayOfWeek(subZoneTwo.value?.name)}
              options={options}
              setZoneChange={setSubZoneTwo}
              zone={subZoneTwo}
              simpleTime={returnSimpleTime(subZoneTwo.value?.name)}
            />
          ) : null}
        </div>

        {rootZone && subZoneOne?.value?.name ? (
          <div className="flex items-center space-x-4 w-full">
            <Select
              className="w-56 bg-primary-100"
              onFocus={() => compareTimeZoneHandler()}
              options={comparisonModeOptions}
              value={comparisonMode}
              defaultValue={comparisonModeOptions[0]}
              onChange={(mode) => {
                //first change the comparison mode and fire compare
                setComparisonMode(mode);
                compareTimeZoneHandler();
              }}
            />
            {subZoneTwo ? null : (
              <GenericButton
                title="add another time zone"
                onClick={() => {
                  setSubZoneTwo(options[0]);
                }}
              />
            )}

            {subZoneTwo ? (
              <GenericButton
                title="Delete last zone"
                onClick={() => {
                  setSubZoneTwo(null);
                  compareTimeZoneHandler();
                }}
              />
            ) : null}
          </div>
        ) : null}

        {comparisonResult.length > 1 ? (
          <ComparisonResult
            comparisonResult={comparisonResult}
            rootZone={rootZone}
            subZoneOne={subZoneOne}
            subZoneTwo={subZoneTwo}
          />
        ) : null}
      </main>
    </div>
  );
};
