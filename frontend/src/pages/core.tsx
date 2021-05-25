import React from 'react';
import { DateTime, Zone } from 'luxon';

function core() {
  const myZone = DateTime.now(); //Input
  const rezoneTimeZone = myZone.setZone('America/New_York');
  console.log(rezoneTimeZone.zoneName);
  const formattedForm = rezoneTimeZone.toLocaleString({
    timeZoneName: 'short',
    weekday: 'short',
    hour12: true,
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });
  console.log(formattedForm);

  return (
    <div>
      hello this is the core app {myZone.zoneName} {myZone.weekdayShort}{' '}
      {myZone.day} {myZone.year}
    </div>
  );
}

export default core;
