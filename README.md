# Raycast Effect

This library allows you to create [Raycast Extensions][raycast] using
[Effect][effect].

## Getting Started

1. Follow the "[Create your first extension][first]" guide
2. Convert to a module (because I don't know how to properly package Typescript
   packages, plz help).
   - Add `"type": "module",` to your `package.json`
   - Change `module` to `node16` in `tsconfig.json`
   - Add `"moduleResolution": "node16",` in `tsconfig.json`
3. Create a `./src/lib/Runtime.ts` file:
   ```typescript
   import { NodeContext, NodeHttpClient } from "@effect/platform-node";
   import { Layer, ManagedRuntime } from "effect";
   import Raycast from "raycast-effect";

   // Compose your runtime here by adding services with Layer.merge
   export const Runtime = ManagedRuntime.make(
     pipe(Raycast.layer, Layer.merge(NodeContext.layer), Layer.merge(NodeHttpClient.layer)),
   );

   export const effectCommand = Raycast.command(Runtime);
   export const effectView = Raycast.view(Runtime);
   export const useEffectFn = Raycast.use(Runtime);
   ```

## Creating Views

```typescript
import { Effect } from 'effect'
import { effectView, useEffectFn } from './lib/Runtime.js'
import { LaunchProps, Arguments, Detail } from '@raycast/api'

export default effectView(
  Effect.fn(
    function* (params: LaunchProps<{ arguments: Arguments.ViewCommand }>) {
      // define a callback
      const callback = useEffectFn(
        Effect.fn(function* (/* define some arguments */) {
          // do some stuff
        },
          // Catch callback errors here with Effect.catchTag
        )
      )

      // return a view here
      return <Detail />
    },
    // Catch errors here with Effect.catchTag
  )
)
```

## Creating Commands

```typescript
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
```

[raycast]: https://developers.raycast.com/
[effect]: https://effect.website
[first]: https://developers.raycast.com/basics/create-your-first-extension
