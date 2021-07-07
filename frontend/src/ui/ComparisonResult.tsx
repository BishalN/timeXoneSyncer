import React, { useRef } from "react";
import ReactToPdf from "react-to-pdf";
import { GenericButton } from "./components/GenericButton";
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
  const isSubzoneTwo = subZoneTwo?.value ? true : false;
  let comparisonText: string;
  if (isSubzoneTwo)
    comparisonText = `Comparison between ${rootZone.label}, ${subZoneOne.label} and ${subZoneTwo.label}`;

  if (!subZoneTwo)
    comparisonText = `Comparison between ${rootZone.label} and ${subZoneOne.label}`;

  const tableRef = useRef();

  return (
    <div className="mt-28 text-lg text-primary-600">
      <table
        ref={tableRef}
        className=" w-full cursor-pointer table-auto border border-collapse border-primary-200"
      >
        <caption className="text-secondary">{comparisonText}</caption>
        <thead>
          <tr className="hover:bg-secondary-washed-out hover:text-button rounded-lg">
            {comparisonResult.map((item) => {
              return (
                <th
                  key={item.name + Math.random()}
                  className="p-2 border border-collapse border-primary-200"
                >
                  {item.name}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {comparisonResult[0].mappings.map((_, rowIndex: number) => (
            <tr>
              {comparisonResult.map((item) => (
                <td
                  key={item.name + Math.random()}
                  className="p-1 border border-collapse border-primary-200"
                >
                  {item.mappings[rowIndex]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <ReactToPdf
        targetRef={tableRef}
        filename="timexonesyncer_comparison_results.pdf"
        scale={0.6}
      >
        {({ toPdf }) => (
          <div className="my-3 text-sm">
            <GenericButton title="Download a pdf version" onClick={toPdf} />
          </div>
        )}
      </ReactToPdf>
    </div>
  );
};
