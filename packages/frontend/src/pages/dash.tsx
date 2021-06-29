import React from "react";

import { useMeQuery } from "../generated/graphql";
import { LoadingSpinner } from "../ui/components/LoadingSpinner";
import { ReminderCard } from "../ui/components/ReminderCard";
import { Sidebar } from "../ui/components/Sidebar";
import { useIsAuth } from "../utils/useIsAuth";
import { withApollo } from "../utils/withApollo";

interface DashProps {}

const Dash: React.FC<DashProps> = () => {
  useIsAuth();
  const { data, loading, error } = useMeQuery();
  console.log(error, data, loading);
  return (
    <div>
      {loading && <LoadingSpinner />}

      {!loading && (
        <div className="flex flex-col md:flex-row">
          <Sidebar
            username={data?.me?.username}
            profilePictureUri={data?.me?.profilePicture}
          />

          <div id="rightSideDashWrapper" className="w-ful custom-margin-left">
            <div className="mx-1 my-3 sm:mx-8 sm:my-8">
              <div className="flex flex-col space-y-3 md:space-y-12">
                <span className="capitalize text-xl sm:text-3xl text-secondary">
                  Welcome {data?.me?.username} !
                </span>
                <span className="text-lg text-primary-300">
                  Recent reminders for you:
                </span>
              </div>

              <div className="space-y-4">
                <ReminderCard
                  time="1st Feb, 10am NYC"
                  setDate="set on last friday"
                  description="Meeting with NYC client about recommendation system for MLBMS"
                />

                <ReminderCard
                  time="3rd Feb, 12am WDC"
                  setDate="set on last wednesday"
                  description="Meeting with WDC client about recommendation system for lkm"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default withApollo({ ssr: true })(Dash);
