import { Action, ActionPanel, Detail, LaunchProps } from "@raycast/api";
import { effectView, useEffectFn } from "./lib/Runtime.js";
import { Effect } from "effect";
import { Greeter } from "./lib/Greeter.js";
import Raycast from "raycast-effect";

export default effectView(
  Effect.fn(function* (props: LaunchProps<{ arguments: Arguments.TestView }>) {
    const greeting = yield* Greeter.greet(props.arguments.name);

    const onAction = useEffectFn(
      Effect.fn(function* (action: string) {
        yield* Effect.log("Doing a thing...", action);
        yield* Raycast.Feedback.showHUD("A thing has been done");
      }),
    );

    return (
      <Detail
        markdown={`# Hello From Effect\n\n${greeting}`}
        actions={
          <ActionPanel>
            <Action title="Do a Thing" onAction={() => onAction("clicked")} />
          </ActionPanel>
        }
      />
    );
  }),
);
