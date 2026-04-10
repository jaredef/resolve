import type { MaybePromise } from "../runtime/types";

export interface ChannelRequestContext {
  method: string;
  body: Record<string, unknown>;
}

export interface ChannelHandler {
  module(): string;
  handle(
    subPath: string,
    query: Record<string, string>,
    userId: string,
    context?: ChannelRequestContext,
  ): MaybePromise<{ status: number; data: unknown }>;
}
