import { Effect } from "effect";

export class Greeter extends Effect.Service<Greeter>()("@app/Greeter", {
  accessors: true,
  succeed: {
    greet: (name: string) => Effect.succeed(`Greetings, ${name}!`),
  },
}) {}
