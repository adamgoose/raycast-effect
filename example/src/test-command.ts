import { Toast } from "@raycast/api";
import { effectCommand } from "./lib/Runtime.js";
import { Effect } from "effect";
import Raycast from "raycast-effect";

export default effectCommand(
  Effect.fn(
    function* () {
      const now = new Date();
      yield* Raycast.Clipboard.copy(now.toLocaleDateString());
      yield* Raycast.Feedback.showHUD("Copied date to clipboard");
    },
    Effect.catchTag("@raycast/ClipboardError", (e) =>
      Raycast.Feedback.showToast({
        title: "Something went wrong...",
        message: e.message,
        style: Toast.Style.Failure,
      }),
    ),
  ),
);
