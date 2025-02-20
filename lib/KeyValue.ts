import { KeyValueStore, Error as PlatformError } from "@effect/platform";
import { Effect, Layer, Option } from "effect";
import { Cache } from "@raycast/api";

export const KeyValue = {
  Default: Layer.sync(KeyValueStore.KeyValueStore, () => {
    const cache = new Cache({
      namespace: "effect",
    });

    return KeyValueStore.make({
      get: (key: string) => Effect.sync(() => Option.fromNullable(cache.get(key))),
      set: (key: string, value: string | Uint8Array) => Effect.sync(() => cache.set(key, value.toString())),
      has: (key: string) => Effect.sync(() => cache.has(key)),
      remove: (key: string) => Effect.sync(() => cache.remove(key)),
      clear: Effect.sync(() => cache.clear()),
      modify: (key: string, f: (value: string) => string) =>
        Effect.sync(() => {
          let v = cache.get(key);
          if (!v) {
            return Option.none();
          }
          v = f(v);
          cache.set(key, v);
          return Option.some(v);
        }),
      getUint8Array: (key: string) =>
        Effect.sync(() => {
          const value = cache.get(key);
          if (!value) {
            return Option.none();
          }
          return Option.some(new TextEncoder().encode(value));
        }),
      modifyUint8Array: (key: string, f: (value: Uint8Array) => Uint8Array) =>
        Effect.sync(() => {
          let v = cache.get(key);
          if (!v) {
            return Option.none();
          }
          v = f(new TextEncoder().encode(v)).toString();
          cache.set(key, v);
          return Option.some(new TextEncoder().encode(v));
        }),
      isEmpty: Effect.fail(
        PlatformError.SystemError({
          reason: "BadResource",
          module: "KeyValueStore",
          method: "isEmpty",
          message: "Not Implemented",
          pathOrDescriptor: 0,
        }),
      ),
      size: Effect.fail(
        PlatformError.SystemError({
          reason: "BadResource",
          module: "KeyValueStore",
          method: "size",
          message: "Not Implemented",
          pathOrDescriptor: 0,
        }),
      ),
    });
  }),
};
