import React, { Component } from "react";
import Select from "react-select";
import { countryCodeWithIana } from "../utils/data";
import { getName } from "country-list";

interface TimeZoneSelectorProps {
  selectedZone: string;
  onChange: (e) => void;
}
const options = [];
countryCodeWithIana.map((ci) => {
  options.push({
    value: ci,
    label: getName(ci.split("__")[0]) + "  " + ci.split("__")[1],
  });
});

export const MyComponent: React.FC<TimeZoneSelectorProps> = ({
  onChange,
  selectedZone,
}) => (
  <Select options={options} value={selectedZone as any} onChange={onChange} />
);

export default MyComponent;
