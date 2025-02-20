import { launchCommand } from "@raycast/api";
import { Effect } from "effect";

export class Command extends Effect.Service<Command>()("@raycast/command", {
  accessors: true,
  succeed: {
    launchCommand: (options: Parameters<typeof launchCommand>[0]) => Effect.promise(() => launchCommand(options)),
  },
}) {}
