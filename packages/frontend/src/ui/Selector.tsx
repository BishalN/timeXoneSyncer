import React, { useEffect, useState } from "react";
import ct from "countries-and-timezones";
import { getName as getNameOfCountry } from "country-list";
import Flag from "react-country-flag";
import Select from "react-select";
import { getCurrentTimeByZone, getUserTimeZone } from "../utils/getUserTime";
import { GenericButton } from "./components/GenericButton";
import { compareDifferentTimeZones, mode } from "../utils/func";

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
interface comparisonModeOptions {
  label: string;
  value: string;
}

export const MyComponent: React.FC = ({}) => {
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
  }, [comparisonMode]);

  const compareTimeZoneHandler = () => {
    const result = compareDifferentTimeZones({
      mode: comparisonMode.value as mode,
      rootZone: rootZone?.value.name,
      subZoneOne: subZoneOne?.value.name,
      subZoneTwo: subZoneTwo?.value.name,
    });

    if (result) setComparisonResult(result as any);
  };

  const { dayOfWeek, simpleTime } = getCurrentTimeByZone(rootZone.value.name);

  return (
    <div>
      <main className="mx-2 my-16 space-y-6">
        <div className="bg-primary-100 text-primary-300 rounded-lg max-w-lg px-4 pb-2 py-3">
          {rootZone.value?.name ? (
            <>
              <div className="absolute mr-2">
                <Flag
                  countryCode={rootZone.value?.country}
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
            </>
          ) : null}

          <div className="my-3">
            <Select
              options={options}
              value={rootZone}
              onChange={(zone) => setRootZone(zone)}
            />
          </div>
        </div>

        <div className="bg-primary-100 text-primary-300 rounded-lg max-w-lg px-4 pb-2 py-3">
          {subZoneOne.value?.name ? (
            <>
              <div className="absolute mr-2">
                <Flag
                  countryCode={subZoneOne.value.country}
                  svg
                  style={{
                    width: "2em",
                    height: "2em",
                  }}
                  title={subZoneOne.value.country}
                />
              </div>
              <div className="ml-9">
                <span>
                  {subZoneOne.label}, UTC {subZoneOne.value.utcOffsetStr}
                </span>
                <p className="text-primary-600">
                  {simpleTime} {dayOfWeek}{" "}
                </p>
              </div>
            </>
          ) : null}

          <div className="my-3">
            <Select
              options={options}
              value={subZoneOne}
              onChange={(zone) => {
                setSubZoneOne(zone);
              }}
            />
          </div>
        </div>

        {subZoneTwo ? (
          <div className="bg-primary-100 text-primary-300 rounded-lg max-w-lg px-4 pb-2 py-3">
            {subZoneTwo.value?.name ? (
              <>
                <div className="absolute mr-2">
                  <Flag
                    countryCode={subZoneTwo.value.country}
                    svg
                    style={{
                      width: "2em",
                      height: "2em",
                    }}
                    title={subZoneTwo.value.country}
                  />
                </div>
                <div className="ml-9">
                  <span>
                    {subZoneTwo.label}, UTC {subZoneTwo.value.utcOffsetStr}
                  </span>
                  <p className="text-primary-600">
                    {simpleTime} {dayOfWeek}{" "}
                  </p>
                </div>
              </>
            ) : null}

            <div className="my-3">
              <Select
                options={options}
                value={subZoneTwo}
                onChange={(zone) => {
                  setSubZoneTwo(zone);
                }}
              />
            </div>
          </div>
        ) : null}

        {rootZone && subZoneOne?.value?.name ? (
          <div className="flex items-center space-x-4 w-full">
            <Select
              className="w-36"
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
                onClick={() => setSubZoneTwo(null)}
              />
            ) : null}
          </div>
        ) : null}

        {comparisonResult.length > 1 ? (
          <div>
            <p>
              Here is the result of the comparion made between {rootZone.label}{" "}
              and {subZoneOne.label}
            </p>
            <table className="border">
              <thead>
                <tr>
                  {comparisonResult.map((item) => {
                    return (
                      <th key={item + Math.random()} className="border">
                        {item.name}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {comparisonResult[0].mappings.map(
                  (value: string, rowIndex: number, arr: []) => (
                    <tr>
                      {comparisonResult.map((item, zoneIndex, arr) => (
                        <td className="border">{item.mappings[rowIndex]}</td>
                      ))}
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        ) : null}
      </main>
    </div>
  );
};

export default MyComponent;
