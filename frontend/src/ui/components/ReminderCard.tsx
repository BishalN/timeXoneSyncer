import gql from "graphql-tag";
import React, { useEffect, useState } from "react";
import {
  GetMyRemindersDocument,
  useDeleteReminderMutation,
  useGetMyRemindersQuery,
} from "../../generated/graphql";

interface ReminderCardProps {
  id: string;
  time: string;
  setDate: string;
  description: string;
  userRemindingTime: string;
}

export const ReminderCard: React.FC<ReminderCardProps> = ({
  description,
  setDate,
  time,
  userRemindingTime,
  id,
}) => {
  const [
    deleteReminderMutation,
    { data, error, loading },
  ] = useDeleteReminderMutation({});
  //find out whether the reminder is stale by now
  //user reminding time will help us do that since it will be in
  const remindingDate = new Date(userRemindingTime);
  const currentDate = new Date();
  let isPast: boolean;

  if (remindingDate > currentDate) {
    isPast = false;
  } else {
    isPast = true;
  }

  return (
    <div id="reminderCardWrapper" className="my-1 w-full">
      {loading && "deleting the reminder"}
      <div className="bg-primary-100 rounded-md py-3 px-3 sm:py-6 sm:px-8 w-full">
        <div className="flex items-center justify-between">
          <div className="text-xs sm:text-base">
            <span className={`tracking-wide ${isPast ? "line-through" : ""}`}>
              {time}
            </span>
            <span className="ml-2 sm:ml-4 text-primary-300 mr-2">
              {setDate}
            </span>
          </div>
          <button
            className="text-accent"
            onClick={() => {
              deleteReminderMutation({
                variables: { id },
                //refetch the getmyreminderdocument
                refetchQueries: [{ query: GetMyRemindersDocument }],
              });
            }}
          >
            Delete
          </button>
        </div>
        <div className="pt-3 text-primary-300 text-sm sm:text-base">
          {description}
        </div>
        <p className=" mt-2 text-xs capitalize text-accent">
          {isPast ? "this reminder is stalled you can delete it" : ""}
        </p>
      </div>
    </div>
  );
};
