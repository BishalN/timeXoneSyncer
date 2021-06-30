import { DateTime } from "luxon";
import React from "react";

import { useGetMyRemindersQuery, useMeQuery } from "../generated/graphql";
import { Loading } from "../ui/components/Loading";
import { LoadingSpinner } from "../ui/components/LoadingSpinner";
import { ReminderCard } from "../ui/components/ReminderCard";
import { Sidebar } from "../ui/components/Sidebar";
import { useIsAuth } from "../utils/useIsAuth";
import { withApollo } from "../utils/withApollo";

interface DashProps {}

const Dash: React.FC<DashProps> = () => {
  useIsAuth();
  const { data, loading, error } = useMeQuery();
  const {
    data: myReminders,
    error: reminderError,
    loading: reminderLoading,
  } = useGetMyRemindersQuery();

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

              {reminderLoading && <LoadingSpinner />}

              <div className="space-y-4">
                {myReminders?.getMyReminders.map((reminder) => {
                  const dt = DateTime.fromISO(reminder.created_at);
                  return (
                    <ReminderCard
                      key={reminder.created_at}
                      time={reminder.userSetDate}
                      setDate={`set ${dt.toRelative()}`}
                      description={reminder.title}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default withApollo({ ssr: true })(Dash);
