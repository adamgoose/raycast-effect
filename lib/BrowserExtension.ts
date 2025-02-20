import { Data, Effect } from "effect";
import { BrowserExtension as RaycastBrowser } from "@raycast/api";

export class BrowserExtensionError extends Data.TaggedError("@raycast/BrowserExtensionError")<{ error: unknown }> {}

export class BrowserExtension extends Effect.Service<BrowserExtension>()("@raycast/browser", {
  succeed: {
    getTabs: () =>
      Effect.tryPromise({
        try: () => RaycastBrowser.getTabs(),
        catch: (error) => new BrowserExtensionError({ error }),
      }),
    getContent: (...args: Parameters<typeof RaycastBrowser.getContent>) =>
      Effect.tryPromise({
        try: () => RaycastBrowser.getContent(...args),
        catch: (error) => new BrowserExtensionError({ error }),
      }),
  },
}) {}
