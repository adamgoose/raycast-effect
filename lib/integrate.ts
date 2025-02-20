import { Effect } from "effect";
import { ManagedRuntime } from "effect";
import { services } from "./Layer.js";

export const command =
  <R,>(runtime: ManagedRuntime.ManagedRuntime<R | services, never>) =>
  <T,>(fn: (options: T) => Effect.Effect<void, never, R | services>) =>
  async (options: T) =>
    await fn(options).pipe(runtime.runPromise);

export const view =
  <R,>(runtime: ManagedRuntime.ManagedRuntime<R | services, never>) =>
  <P,>(fn: (props: P) => Effect.Effect<React.ReactNode, never, R | services>) =>
  (props: P): React.ReactNode =>
    fn(props).pipe(runtime.runSync);
