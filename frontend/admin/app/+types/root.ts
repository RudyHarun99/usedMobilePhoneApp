export type Route = {
  MetaArgs: Record<string, never>;
  LinksFunction: () => Array<{
    rel?: string;
    href: string;
    crossOrigin?: string;
  }>;
  ErrorBoundaryProps: {
    error: unknown;
  };
}; 