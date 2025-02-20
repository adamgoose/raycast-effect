import { Data, Effect, Option } from "effect";
import { Clipboard as RaycastClipboard } from "@raycast/api";

export class ClipboardError extends Data.TaggedError("@raycast/ClipboardError")<{ error: unknown }> {}

export class Clipboard extends Effect.Service<Clipboard>()("@raycast/clipboard", {
  accessors: true,
  succeed: {
    copy: (...args: Parameters<typeof RaycastClipboard.copy>) =>
      Effect.tryPromise({
        try: () => RaycastClipboard.copy(...args),
        catch: (error) => new ClipboardError({ error }),
      }),
    paste: (...args: Parameters<typeof RaycastClipboard.paste>) =>
      Effect.tryPromise({
        try: () => RaycastClipboard.paste(...args),
        catch: (error) => new ClipboardError({ error }),
      }),
    read: (...args: Parameters<typeof RaycastClipboard.read>) =>
      Effect.tryPromise({
        try: () => RaycastClipboard.read(...args),
        catch: (error) => new ClipboardError({ error }),
      }).pipe(Effect.map(Option.fromNullable)),
    readText: (...args: Parameters<typeof RaycastClipboard.readText>) =>
      Effect.tryPromise({
        try: () => RaycastClipboard.readText(...args),
        catch: (error) => new ClipboardError({ error }),
      }).pipe(Effect.map(Option.fromNullable)),
    clear: Effect.tryPromise({
      try: () => RaycastClipboard.clear(),
      catch: (error) => new ClipboardError({ error }),
    }),
  },
}) {}
