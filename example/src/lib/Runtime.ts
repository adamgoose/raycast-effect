import { NodeContext, NodeHttpClient } from "@effect/platform-node";
import { Layer, ManagedRuntime, pipe } from "effect";
import Raycast from "raycast-effect";
import { Greeter } from "./Greeter.js";

export const Runtime = ManagedRuntime.make(
  pipe(Raycast.layer, Layer.merge(Greeter.Default), Layer.merge(NodeContext.layer), Layer.merge(NodeHttpClient.layer)),
);

export const effectCommand = Raycast.command(Runtime);
export const effectView = Raycast.view(Runtime);
export const useEffectFn = Raycast.use(Runtime);
