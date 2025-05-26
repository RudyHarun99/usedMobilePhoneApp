export namespace Route {
  // export type MetaArgs = Parameters<RouteConfigEntry["meta"]>[0];
  export type MetaArgs = Record<string, never>; // Placeholder until 'meta' exists on RouteConfigEntry
}

export type Route = {
  MetaArgs: Record<string, never>;
}; 