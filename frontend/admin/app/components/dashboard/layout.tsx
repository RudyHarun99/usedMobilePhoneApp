import { Link, Outlet } from "react-router";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import {
  LayoutDashboard,
  Users,
  Phone,
  Settings,
  Menu,
} from "lucide-react";
import { useState } from "react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Users", href: "/dashboard/users", icon: Users },
  { name: "Phones", href: "/dashboard/phones", icon: Phone },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm lg:hidden",
          sidebarOpen ? "block" : "hidden"
        )}
        onClick={() => setSidebarOpen(false)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            setSidebarOpen(false);
          }
        }}
        tabIndex={0}
        role="button"
      />

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform bg-card p-4 transition-transform duration-200 ease-in-out lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
          "lg:static lg:z-auto lg:w-64"
        )}
      >
        <div className="flex h-16 items-center justify-between">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        <nav className="mt-8 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                "hover:bg-accent hover:text-accent-foreground",
                "data-[active=true]:bg-accent data-[active=true]:text-accent-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-40 border-b bg-background">
          <div className="flex h-16 items-center gap-4 px-4 lg:px-8">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </header>

        <main className="p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
} 