import {
  askForNotificationPermission,
  checkIfFeatureSupported,
  createScheduledNotification,
  getScheduledNotifications,
  registerServiceWorker,
} from "./createScheduleNotifications";

export const useNotificationManager = async (reminders) => {
  checkIfFeatureSupported();
  registerServiceWorker();
  askForNotificationPermission();
  console.log(reminders);
  const scheduledNotifications = await getScheduledNotifications();
  if (scheduledNotifications.length === 0) {
    for (let reminder of reminders) {
      const notificationTitleText = `Get Ready for ${reminder.title}`;
      await createScheduledNotification(
        reminder.id,
        notificationTitleText,
        `It's ${reminder.userSetDate} ${reminder.title}`,
        new Date(reminder.date)
      );
    }
  }
  if (reminders?.length > 1) {
    for (let reminder of reminders) {
      for (let scheduledNotification of scheduledNotifications) {
        if (reminder.id !== scheduledNotification.tag) {
          const notificationTitleText = `Get Ready for ${reminder.title}`;
          await createScheduledNotification(
            reminder.id,
            notificationTitleText,
            `It's ${reminder.userSetDate} ${reminder.title}`,
            new Date(reminder.date)
          );
        }
      }
    }
  }
};
