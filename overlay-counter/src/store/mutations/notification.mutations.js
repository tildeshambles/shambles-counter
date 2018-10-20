export const NOTIFICATION_DISMISS = "NOTIFICATION_DISMISS";

export const NotificationMutations = {
  [NOTIFICATION_DISMISS]: state => {
    state.notificationData = null;
  }
};
