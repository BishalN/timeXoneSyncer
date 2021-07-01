import { DateTime } from "luxon";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

import { useGetMyRemindersQuery, useMeQuery } from "../generated/graphql";
import { GenericButton } from "../ui/components/GenericButton";
import { LoadingSpinner } from "../ui/components/LoadingSpinner";
import { ReminderCard } from "../ui/components/ReminderCard";
import { Sidebar } from "../ui/components/Sidebar";
import { useIsAuth } from "../utils/useIsAuth";
import { useNotificationManager } from "../utils/useNotificationManager";
import { withApollo } from "../utils/withApollo";

const Dash: React.FC = () => {
  useIsAuth();
  const { data, loading, error } = useMeQuery();
  const router = useRouter();
  const {
    data: myReminders,
    error: reminderError,
    loading: reminderLoading,
  } = useGetMyRemindersQuery({ fetchPolicy: "network-only" });

  if (myReminders?.getMyReminders?.length !== 0) {
    useNotificationManager(myReminders?.getMyReminders);
  }

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
                  Recent reminders set by you:
                </span>
              </div>

              {reminderLoading && <LoadingSpinner />}

              <div className="space-y-4">
                {myReminders?.getMyReminders.length === 0 && (
                  <GenericButton
                    title="Set reminders now"
                    onClick={() => router.push("/reminder")}
                  />
                )}
                {myReminders?.getMyReminders.map((reminder) => {
                  const dt = DateTime.fromISO(reminder.created_at);
                  return (
                    <ReminderCard
                      key={reminder.created_at}
                      time={reminder.userSetDate}
                      setDate={`set ${dt.toRelative()}`}
                      description={reminder.title}
                      userRemindingTime={reminder.date}
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
