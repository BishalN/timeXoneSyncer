import React from "react";
import { zone } from "./Selector";

interface ComparisonResultProps {
  comparisonResult: any;
  rootZone: zone;
  subZoneOne: zone;
  subZoneTwo?: zone;
}

export const ComparisonResult: React.FC<ComparisonResultProps> = ({
  comparisonResult,
  rootZone,
  subZoneOne,
  subZoneTwo,
}) => {
  return (
    <div>
      <p>
        Here is the result of the comparion made between {rootZone.label} and{" "}
        {subZoneOne.label}
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
          {comparisonResult[0].mappings.map((_, rowIndex: number, __) => (
            <tr>
              {comparisonResult.map((item, _, __) => (
                <td className="border">{item.mappings[rowIndex]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
