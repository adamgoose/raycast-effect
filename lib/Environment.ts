import { environment } from "@raycast/api";
import { Effect } from "effect";

export class Environment extends Effect.Service<Environment>()("@raycast/environment", {
  succeed: environment,
}) {}
