import type { HtxParams, MaybePromise } from "../runtime/types";

export interface DynamicRouteMatch {
  template: string;
  params: HtxParams;
  siteRoot: string;
}

export interface RouteSource {
  resolve(path: string): MaybePromise<DynamicRouteMatch | null>;
}
