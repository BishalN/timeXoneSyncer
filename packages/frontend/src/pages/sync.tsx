import React, { useEffect, useState } from "react";
import Flag from "react-country-flag";
import { getName as getCountryName } from "country-list";
import Select from "react-select";

import { useMeQuery } from "../generated/graphql";
import Logo from "../icons/logo";
import { TestSvg } from "../illustrations/tt";
import Container from "../ui/components/Container";
import { LoadingSpinner } from "../ui/components/LoadingSpinner";
import { countryCodeWithIana } from "../utils/data";
import { withApollo } from "../utils/withApollo";
// import { getUsersTime } from "../utils/getUserTime";

const sync: React.FC = ({}) => {
  // const { dayOfWeek, offset, simpleTime, zoneName } = getUsersTime();

  const { data, loading, error } = useMeQuery();

  useEffect(() => {
    // setSelectedZone(defaultValue);
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
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
              Compare different time zones and gain insight now
            </p>
          </div>
          <TestSvg />
        </div>

        <main className="mx-2 my-16 space-y-6">
          <div className="bg-primary-100 text-primary-300 rounded-lg max-w-sm px-4 py-2">
            <div className="absolute mr-2">
              <Flag
                // countryCode={selectedZone.value.split("__")[0]}
                svg
                style={{
                  width: "2em",
                  height: "2em",
                }}
                // title={selectedZone.value.split("__")[0]}
              />
            </div>
            <div className="ml-9">
              <span>
                {/* {getCountryName(selectedZone.value.split("__")[0])}, */}
                {/* {selectedZone.value.split("/")[1]} UTC +5:45 */}
              </span>
              <p className="text-primary-600">8:35am Sat</p>
            </div>

            <div className="my-3">
              {/* <Select options={options} value={selectedZone} /> */}
            </div>
          </div>
          {/* <span className="flex items-center justify-start text-secondary-washed-out text-xl">
            Vs
          </span>

          <div className="bg-primary-100 flex items-center text-primary-300 rounded-lg max-w-sm p-4">
            <div>
              <span>Select another timezone to start comparing</span>
            </div>
          </div> */}
        </main>
      </Container>
    </div>
  );
};

export default withApollo({})(sync);
