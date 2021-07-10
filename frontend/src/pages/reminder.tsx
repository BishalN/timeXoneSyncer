import React, { useEffect, useState } from "react";
import ct from "countries-and-timezones";
import { getName as getNameOfCountry } from "country-list";
import Select from "react-select";

import { useMeQuery, useSetReminderMutation } from "../generated/graphql";
import Logo from "../icons/logo";
import { ReminderIllustration } from "../illustrations/reminderPage";
import Container from "../ui/components/Container";
import { GenericButton } from "../ui/components/GenericButton";
import { LoadingSpinner } from "../ui/components/LoadingSpinner";
import { withApollo } from "../utils/withApollo";
import { DateTime } from "luxon";
import { getUserTimeZone } from "../utils/getUserTime";
import { useRouter } from "next/router";

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
  const [
    setReminderMutation,
    { data: reminderData, loading: reminderLoading, error: reminderError },
  ] = useSetReminderMutation();
  const [showReminder, setShowReminder] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [dateAndTime, setDateAndTime] = useState<string>(null);
  const [selectedZone, setSelectedZone] = useState(options[0]);
  const [errorMessage, setErrorMessage] = useState({
    titleErrorMessage: "",
    dateTimeErrorMessage: "",
    zoneErrorMessage: "",
  });
  const [err, setErr] = useState("");
  const [resErr, setResErr] = useState("");
  const router = useRouter();

  const handleSetReminder = async () => {
    //clear all previous errors
    setErrorMessage({
      dateTimeErrorMessage: "",
      titleErrorMessage: "",
      zoneErrorMessage: "",
    });
    setErr("");

    //check if any item is empty
    if (
      title.length === 0 ||
      dateAndTime === null ||
      dateAndTime?.length === 0 ||
      !selectedZone.value?.name
    ) {
      setErr("All the fields are required");
      return false;
    }
    //validation
    if (title.length < 3) {
      setErrorMessage({
        ...errorMessage,
        titleErrorMessage: "title must be atleast 4 character long",
      });
      return false;
    }
    if (dateAndTime === null) {
      setErrorMessage({
        ...errorMessage,
        dateTimeErrorMessage:
          "Please set the date so that we know when to remind you",
      });
      return false;
    }
    if (!selectedZone.value?.name) {
      setErrorMessage({
        ...errorMessage,
        zoneErrorMessage: "Please select a valid timezone",
      });
      return false;
    }

    const timeOnChosenTimeZone = DateTime.fromISO(dateAndTime, {
      zone: selectedZone.value?.name,
    });

    const month = timeOnChosenTimeZone
      .toLocaleString(DateTime.DATE_FULL)
      .split(",")[0];
    const time = timeOnChosenTimeZone.toLocaleString(DateTime.TIME_SIMPLE);
    const zone = selectedZone.value?.name;
    const userSetDate = `${month},${"  "}${time}${"  "}${zone}`;

    //make sure the chosen time is on the future
    //1 min ahead from now
    //diffnow and value of returns the diff in milliseconds
    const isValidReminder = timeOnChosenTimeZone.diffNow().valueOf() > 1000 * 6;
    if (!isValidReminder) {
      setErrorMessage({
        ...errorMessage,
        dateTimeErrorMessage:
          "Invalid time make sure the time is on the future",
      });
      return false;
    }

    const { zoneName } = getUserTimeZone();
    const eqTimeOnUsersZone = timeOnChosenTimeZone.setZone(zoneName).toISO();

    //check if there is any error
    const {
      dateTimeErrorMessage,
      zoneErrorMessage,
      titleErrorMessage,
    } = errorMessage;
    if (
      dateTimeErrorMessage.length > 0 ||
      zoneErrorMessage.length > 0 ||
      titleErrorMessage.length > 0
    ) {
      return false;
    }

    const { data, errors } = await setReminderMutation({
      variables: {
        date: eqTimeOnUsersZone,
        title,
        userSetDate,
      },
    });

    if (!errors) {
      //redirect to the dashboard
      router.push("/dash");
    } else {
      //stores the name of error
      setResErr(errors.values.name);
    }
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
        <div className="mt-4">
          <GenericButton
            title="Go back to dashboard"
            onClick={() => router.push("/dash")}
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
            {err && <p className="text-xs text-accent">{err}</p>}
            {resErr && <p className="text-xs text-accent">{resErr}</p>}
            <form action="" className="flex flex-col max-w-md space-y-3">
              <input
                name="title"
                type="text"
                placeholder="e.g Meeting with NYC client"
                className="border-primary-200"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {errorMessage.titleErrorMessage.length > 1 && (
                <p className="text-xs text-accent">
                  {errorMessage.titleErrorMessage}
                </p>
              )}

              <input
                name="datetime"
                type="datetime-local"
                value={dateAndTime}
                onChange={(e) => setDateAndTime(e.target.value)}
                className="border-primary-200"
              />
              {errorMessage.dateTimeErrorMessage.length > 1 && (
                <p className="text-xs text-accent">
                  {errorMessage.dateTimeErrorMessage}
                </p>
              )}

              <Select
                options={options}
                placeholder="select a timezone"
                value={selectedZone}
                onChange={(e) => setSelectedZone(e)}
              />
              {errorMessage.zoneErrorMessage.length > 1 && (
                <p className="text-xs text-accent">
                  {errorMessage.zoneErrorMessage}
                </p>
              )}
            </form>
          </div>
        )}

        {showReminder && (
          <div className="space-x-3">
            <GenericButton
              title="set reminder"
              onClick={handleSetReminder}
              isLoading={reminderLoading}
            />
            <GenericButton
              title="cancel"
              onClick={() => setShowReminder(false)}
            />
          </div>
        )}
      </Container>
    </div>
  );
};

export default withApollo({})(reminder);
