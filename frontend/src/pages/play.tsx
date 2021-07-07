import { DateTime } from "luxon";
import React, { useEffect } from "react";

const play = () => {
  const date = new Date("2021-07-01T18:43:00.000+05:45");
  const dt = DateTime.fromJSDate(date);
  console.log((dt as any).ts);
  console.log(date);
  return <h1>hello</h1>;
};

export default play;
