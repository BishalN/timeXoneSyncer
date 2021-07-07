import { DateTime } from "luxon";

export type mode = "businessHours" | "24hours" | "12hours";

interface CompareDifferentZoneInterface {
  mode: mode;
  rootZone: string;
  subZoneOne: string;
  subZoneTwo?: string;
}

export const compareDifferentTimeZones = ({
  mode,
  rootZone,
  subZoneOne,
  subZoneTwo,
}: CompareDifferentZoneInterface) => {
  // [{name:"Asia/kathmandu",mappings:[10am...5pm]},{name:"USA/New_york",mappings:[10pm,5am]}]
  //taking the relative time from the root time returns the relative on the particular zone
  let result = [];
  result.push({ name: rootZone });
  result.push({ name: subZoneOne });
  if (subZoneTwo) result.push({ name: subZoneTwo });
  result.forEach((item, index, arr) => {
    //assuming its a business hour mapping
    let dt = DateTime.fromObject({
      hour: mode === "businessHours" ? 10 : 6, //if business start from 10 else from 6
    }).setZone(item.name);
    item.mappings = [];
    let hours = 0;
    if (mode === "businessHours") {
      hours = 7;
    } else if (mode === "12hours") {
      hours = 12;
    } else {
      hours = 24;
    }
    for (let i = 0; i <= hours; i++) {
      item.mappings.push(dt.toLocaleString(DateTime.TIME_SIMPLE));
      dt = dt.plus({ hours: 1 });
    }
  });

  return result;
};

//mode  --> businesshourmode,24hour mode,12hour mode
//business hour mode starts with 10am and end with +8 hours forward
//24hour is complete 24 cycles starting from 6am
//12 hours is a full day hour mapping starting from 6am
