import { Link } from "react-router";
import type { Route } from "./+types/welcome";

export function meta(_args: Route["MetaArgs"]) {
  return [
    { title: "Welcome - Admin Dashboard" },
    { name: "description", content: "Welcome to the admin dashboard" },
  ];
}

export default function WelcomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="mb-4 text-4xl font-bold">Welcome to Admin Dashboard</h1>
        <p className="mb-8 text-lg text-muted-foreground">
          Manage your used mobile phone inventory from one place.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/dashboard/phones"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
          >
            Manage Phones
          </Link>
        </div>
      </div>
    </div>
  );
} 