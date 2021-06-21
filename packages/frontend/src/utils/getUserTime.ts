import { DateTime } from "luxon";

export const getUserTimeZone = () => {
  const dt = DateTime.now();
  const offset = dt.offsetNameShort; //GMT +5:45
  const zoneName = dt.zoneName; //make your search with zoneName
  const simpleTime = dt.toLocaleString(DateTime.TIME_SIMPLE);
  const dayOfWeek = dt.weekdayShort;

  return { offset, zoneName, simpleTime, dayOfWeek };
};

export const getCurrentTimeByZone = (zone: string) => {
  const dt = DateTime.now().setZone(zone);
  const simpleTime = dt.toLocaleString(DateTime.TIME_SIMPLE);
  const dayOfWeek = dt.weekdayShort;

  return { simpleTime, dayOfWeek };
};
