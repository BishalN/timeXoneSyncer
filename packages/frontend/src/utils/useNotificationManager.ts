import { DateTime } from "luxon";
import {
  askForNotificationPermission,
  checkIfFeatureSupported,
  createScheduledNotification,
  getScheduledNotifications,
  registerServiceWorker,
} from "./createScheduleNotifications";
import { isServer } from "./isServer";

export const useNotificationManager = async (reminders) => {
  if (!isServer) {
    checkIfFeatureSupported();
    registerServiceWorker();
    askForNotificationPermission();
    const scheduledNotifications = await getScheduledNotifications();

    if (scheduledNotifications?.length === 0) {
      for (let reminder of reminders) {
        const date = new Date(reminder.date);
        const dt: any = DateTime.fromJSDate(date);
        const notificationTitleText = `Get Ready for ${reminder.title}`;
        await createScheduledNotification(
          reminder.id,
          notificationTitleText,
          `It's ${reminder.userSetDate} ${reminder.title}`,
          dt.ts
        );
      }
    }

    if (reminders?.length > 0) {
      for (let reminder of reminders) {
        let isRegistered = false;
        for (let notification of scheduledNotifications) {
          if (reminder.id === notification.tag) {
            //reminder is already registered
            isRegistered = true;
          }
        }
        //a reminder is not registered so register it
        if (!isRegistered) {
          const date = new Date(reminder.date);
          const dt: any = DateTime.fromJSDate(date);
          const notificationTitleText = `Get Ready for ${reminder.title}`;
          await createScheduledNotification(
            reminder.id,
            notificationTitleText,
            `It's ${reminder.userSetDate} ${reminder.title}`,
            dt.ts
          );
        }
      }
    }
  }
};
