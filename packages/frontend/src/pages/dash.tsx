import React from "react";

import { useMeQuery } from "../generated/graphql";
import { LoadingSpinner } from "../ui/components/LoadingSpinner";
import { Sidebar } from "../ui/components/Sidebar";
import { useIsAuth } from "../utils/useIsAuth";
import { withApollo } from "../utils/withApollo";

interface DashProps {}

const Dash: React.FC<DashProps> = () => {
  useIsAuth();
  const { data, loading, error } = useMeQuery();
  return (
    <div>
      {loading && <LoadingSpinner />}

      {!loading && (
        <div className="flex flex-col md:flex-row">
          <Sidebar
            username={data.me.username}
            profilePictureUri={data.me.profilePicture}
          />

          <div id="rightSideDashWrapper" className="w-ful custom-margin-left">
            <div className="mx-1 my-3 sm:mx-8 sm:my-8">
              <div className="flex flex-col space-y-3 md:space-y-12">
                <span className="capitalize text-xl sm:text-3xl text-secondary">
                  Welcome {data.me?.username} !
                </span>
                <span className="text-lg text-primary-300">
                  Recent reminders for you:
                </span>
              </div>

              <div className="space-y-4">
                <div id="reminderCardWrapper" className="my-1 w-full">
                  <div className="bg-primary-100 rounded-md py-3 px-3 sm:py-6 sm:px-8 w-full">
                    <div className="flex items-center justify-between">
                      <div className="text-xs sm:text-base">
                        <span>1st Feb, 10am NYC</span>
                        <span className="ml-2 sm:ml-4 text-primary-300">
                          set on last friday
                        </span>
                      </div>
                      <div className="text-xs sm:text-base">
                        <button className="mr-4 text-secondary">Edit</button>
                        <button className="text-accent">Delete</button>
                      </div>
                    </div>
                    <div className="pt-3 text-primary-300 text-sm sm:text-base">
                      Meeting with NYC client about recommendation system for
                      MLBMS. this is
                    </div>
                  </div>
                </div>

                {/* end */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default withApollo({})(Dash);
