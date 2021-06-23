import React, { useEffect, useState } from "react";
import Flag from "react-country-flag";
import Select from "react-select";
import { zone } from "../Selector";

interface ZoneProps {
  zone: zone;
  setZoneChange: (zone: zone) => void;
  options: any;
  simpleTime: string;
  dayOfWeek: string;
}

export const ZoneSelector: React.FC<ZoneProps> = ({
  zone,
  options,
  setZoneChange,
  dayOfWeek,
  simpleTime,
}) => {
  return (
    <div
      className="bg-primary-100
     text-primary-300 rounded-lg max-w-sm min-w-1/4  px-4 pb-2 py-3"
    >
      {zone.value?.name ? (
        <>
          <div className="absolute mr-2">
            <Flag
              countryCode={zone.value?.country}
              svg
              style={{
                width: "2em",
                height: "2em",
              }}
              title={zone.value.country}
            />
          </div>
          <div className="ml-9">
            <span>
              {zone.label}, UTC {zone.value.utcOffsetStr}
            </span>
            <p className="text-primary-600">
              {simpleTime} {dayOfWeek}
            </p>
          </div>
        </>
      ) : null}

      <div className="my-3">
        <Select
          options={options}
          value={zone}
          onChange={(zone) => setZoneChange(zone)}
        />
      </div>
    </div>
  );
};
