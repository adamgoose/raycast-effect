import * as BrowserExtension from "./BrowserExtension.js";
import * as Clipboard from "./Clipboard.js";
import * as Command from "./Command.js";
import * as Environment from "./Environment.js";
import * as Feedback from "./Feedback.js";
import * as KeyValue from "./KeyValue.js";
import * as Layer from "./Layer.js";
import * as integrate from "./integrate.js";

export default {
  ...BrowserExtension,
  ...Clipboard,
  ...Command,
  ...Environment,
  ...Feedback,
  ...KeyValue,
  ...Layer,
  ...integrate,
};
