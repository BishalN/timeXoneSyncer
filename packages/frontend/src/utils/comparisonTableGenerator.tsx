import React from "react";

interface comparisonTableGeneratorProps {
  rootZone: string;
  subZoneOne: string;
  subZoneTwo?: string;
}

export const comparisonTableGenerator: React.FC<comparisonTableGeneratorProps> = ({
  rootZone,
  subZoneOne,
  subZoneTwo,
}) => {
  return (
    <div>
      {rootZone} {subZoneOne} {subZoneTwo} comparison is made successful
    </div>
  );
};
