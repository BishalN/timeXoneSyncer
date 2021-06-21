import React from "react";
import { DateTime } from "luxon";

function core() {
  const dt = DateTime.now();
  const offset = dt.offsetNameShort; //GMT +5:45
  const country = dt.zoneName;
  const simpleTime = dt.toLocaleString(DateTime.TIME_SIMPLE);
  const dayOfWeek = dt.weekdayShort;

  return (
    <div>
      {simpleTime} {offset} {country} {dayOfWeek}
    </div>
  );
}

export default core;
