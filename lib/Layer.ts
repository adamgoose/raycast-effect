import { Layer } from "effect";
import { BrowserExtension } from "./BrowserExtension.js";
import { Clipboard } from "./Clipboard.js";
import { Command } from "./Command.js";
import { Environment } from "./Environment.js";
import { Feedback } from "./Feedback.js";
import { KeyValue } from "./KeyValue.js";
// import { Navigate } from "./Navigate.js";

export const layer = Layer.mergeAll(
  BrowserExtension.Default,
  Clipboard.Default,
  Command.Default,
  Environment.Default,
  Feedback.Default,
  KeyValue.Default,
  // Navigate.Default,
);

export type services = Layer.Layer.Success<typeof layer>;
