import { Alert, confirmAlert, showHUD, showToast, Toast } from "@raycast/api";
import { Effect } from "effect";

export class Feedback extends Effect.Service<Feedback>()("@raycast/feedback", {
  accessors: true,
  succeed: {
    showToast: (toast: Toast.Options) => Effect.promise(() => showToast(toast)),
    confirmAlert: (alert: Alert.Options) => Effect.promise(() => confirmAlert(alert)),
    showHUD: (...args: Parameters<typeof showHUD>) => Effect.promise(() => showHUD(...args)),
  },
}) {}
