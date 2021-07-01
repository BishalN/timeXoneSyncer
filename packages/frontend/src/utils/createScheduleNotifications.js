export const createScheduledNotification = async (
  tag,
  title,
  body,
  timestamp
) => {
  const registration = await navigator.serviceWorker.getRegistration();
  await registration.showNotification(title, {
    tag: tag,
    icon:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAQAAABLCVATAAAB/ElEQVR4AdSVg44YQBRFz9reDWrFtW3btq2gthvURpz+RO02qL0OapuLl6lGKZZnosm9GT5QKogjAB8BxPEHVCODdfjYyD2q4YdWvCSHHIbiYozoL2mFh2l8Ubb2uOjEW/F8YQxWgjhIjowMOXggTVnDaVL5wBtSOcFqmhAI1OSBcu4gCI1YjivxDAlAP1Jlpo879AHKckfNjxPLbxxVwkGCSZBF3eMYccRxSs1O8Bs1eccXZgMVSFOWJ+xlMDWIJo4aDGEPj5Vym4qEcIgcPtMEje7ywClki/UrW4hBJ4YtfBU9Wx5gOXOxEsJFsT2nLS7a8lw8pwnByUKxfKYhgrBcnlQhNFKnmo+DBBUhi8G7ECxS0ZaIlVUqikL8C8kTpIt3FVZuiTgC/AsJw8V7EwuVRfpIxB8tFMlH8VfFoIcIR8G1kMYR8ffAYJII+/94of3in+T6+vV/vNB68S/6uxN9ZjMxf3qino43SmIP38jhERMIMN6oJwZV7b8m1OWCqJdpBEKE+9fghoojGwGM46nos3+Joxv+yA5yptBOXlMJCCLTF9mJvNFyzeb5mWtvScCOMnylIT4aqOxfiJMQLhRIPdIqZCw6sVqF9FKRVK1mx/2o2U+UkkpF/KgHPYm/iyTyx/R39LW79OMvCaQJa8jdYaSathVc0448AACB4jnRzrdDDgAAAABJRU5ErkJggg==",
    body: body,
    showTrigger: new TimestampTrigger(timestamp),
    vibrate: [200, 100, 200],
    silent: false,
  });
};

export const cancelScheduledNotification = async (tag) => {
  const registration = await navigator.serviceWorker.getRegistration();
  const notifications = await registration.getNotifications({
    tag: tag,
    includeTriggered: true,
  });
  notifications.forEach((notification) => notification.close());
};

export const checkIfFeatureSupported = () => {
  if (!("serviceWorker" in navigator)) {
    return alert(
      "You need a browser that supports service workers for this demo to work."
    );
  }
  if (!("showTrigger" in Notification.prototype)) {
    return alert(
      "You need a browser with Notification Triggers support for Notification to be shown"
    );
  }
};

export const registerServiceWorker = async () => {
  const serviceWorkerRegistration = await navigator.serviceWorker.register(
    "serviceworker.js"
  );
  return serviceWorkerRegistration;
};

export const askForNotificationPermission = async () => {
  let { state } = await navigator.permissions.query({
    name: "notifications",
  });
  if (state === "prompt") {
    await Notification.requestPermission();
  }
  state = (await navigator.permissions.query({ name: "notifications" })).state;
  if (state !== "granted") {
    return alert(
      "You need to grant notifications permission for this notification to work."
    );
  }
};

export const getScheduledNotifications = async () => {
  const registration = await navigator.serviceWorker.getRegistration();
  window.notifications = await registration?.getNotifications({
    includeTriggered: true,
  });

  return window.notifications;
};
