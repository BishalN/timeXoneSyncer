import React from "react";

interface ReminderCardProps {
  time: string;
  setDate: string;
  description: string;
}

export const ReminderCard: React.FC<ReminderCardProps> = ({
  description,
  setDate,
  time,
}) => {
  return (
    <div id="reminderCardWrapper" className="my-1 w-full">
      <div className="bg-primary-100 rounded-md py-3 px-3 sm:py-6 sm:px-8 w-full">
        <div className="flex items-center justify-between">
          <div className="text-xs sm:text-base">
            <span>{time}</span>
            <span className="ml-2 sm:ml-4 text-primary-300">{setDate}</span>
          </div>
          <div className="text-xs sm:text-base">
            <button className="mr-4 text-secondary">Edit</button>
            <button className="text-accent">Delete</button>
          </div>
        </div>
        <div className="pt-3 text-primary-300 text-sm sm:text-base">
          {description}
        </div>
      </div>
    </div>
  );
};
