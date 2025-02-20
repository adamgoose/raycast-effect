// import { Navigation, useNavigation } from "@raycast/api";
import { Effect } from "effect";

export class Navigate extends Effect.Service<Navigate>()("@raycast/navigate", {
  accessors: true,
  succeed: {
    // pop: Effect.sync(() => useNavigation().pop()),
    // push: (...args: Parameters<Navigation["push"]>) => Effect.sync(() => useNavigation().push(...args)),
  },
}) {}
