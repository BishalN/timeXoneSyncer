import React, { useState } from "react";
import ct from "countries-and-timezones";
import { getName as getNameOfCountry } from "country-list";
import Select from "react-select";

import { useMeQuery } from "../generated/graphql";
import Logo from "../icons/logo";
import { ReminderIllustration } from "../illustrations/reminderPage";
import Container from "../ui/components/Container";
import { GenericButton } from "../ui/components/GenericButton";
import { LoadingSpinner } from "../ui/components/LoadingSpinner";
import { withApollo } from "../utils/withApollo";

const reminder = () => {
  const options = [
    {
      label: "select a time zone",
      value: null,
    },
  ];
  const timeZones = ct.getAllTimezones();
  for (let timezone in timeZones) {
    if (timeZones[timezone].country) {
      let label =
        getNameOfCountry(timeZones[timezone].country) + " " + timezone;
      options.push({ label, value: timeZones[timezone] });
    }
  }

  const { data, loading, error } = useMeQuery();
  const [showReminder, setShowReminder] = useState(false);
  const [title, setTitle] = useState("");
  const [dateAndTime, setDateAndTime] = useState(null);
  const [selectedZone, setSelectedZone] = useState(options[0]);

  const handleSetReminder = () => {
    //make sure all the input are filled in properly validate the values as we aspect it to be
    //the date given should be of future time,title should be of at least 3 char long,zone should have value
    //convert the given zones equivalent to users time i.e local time of user
    //make a mutation to set reminder
    //if successful then push back to dash board with success alert else fail alert on same page
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="mx-1 sm:mx-0">
      <Container>
        <div id="NavBar" className="flex justify-between items-center mx-2">
          <Logo />
          <img
            className="rounded-full ring-4 ring-primary-100 h-20 w-20"
            src={data.me.profilePicture}
            alt={data.me.username}
          />
        </div>
        <div
          id="welcomeContentWrapper"
          className="mx-2 mt-10 xl:mt-16 text-primary-600
           text-lg space-y-2 flex justify-between items-center"
        >
          <div className="space-y-1 leading-7">
            <span>Hi {data.me.username}!</span>
            <p className="max-w-sm text-4xl font-bold text-secondary xl:text-5xl xl:max-w-lg">
              Remind me when it's 4th june, 4:35am at New York
            </p>
          </div>
          <ReminderIllustration />
        </div>
        {!showReminder && (
          <GenericButton
            title="set reminder"
            onClick={() => setShowReminder(!showReminder)}
          />
        )}

        {showReminder && (
          <div id="reminderWrapper" className="my-3">
            <form action="" className="flex flex-col max-w-md space-y-3">
              <input
                type="text"
                placeholder="e.g Meeting with NYC client"
                className="border-primary-200"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                type="datetime-local"
                value={dateAndTime}
                onChange={(e) => setDateAndTime(e.target.value)}
                className="border-primary-200"
              />
              <Select
                options={options}
                placeholder="select a timezone"
                value={selectedZone}
                onChange={(e) => setSelectedZone(e)}
              />
            </form>
          </div>
        )}

        {showReminder && (
          <div className="space-x-3">
            <GenericButton title="set reminder" />
            <GenericButton title="cancel" />
          </div>
        )}
      </Container>
    </div>
  );
};

export default withApollo({})(reminder);
