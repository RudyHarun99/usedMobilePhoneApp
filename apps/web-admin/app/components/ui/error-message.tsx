import { cn } from "~/lib/utils";
import { AlertCircle, Info, X } from "lucide-react";
import { Button } from "./button";

type Severity = "error" | "info" | "warning" | "success";

interface ErrorMessageProps {
  message: string;
  severity?: Severity;
  onDismiss?: () => void;
  className?: string;
}

export function ErrorMessage({
  message,
  severity = "error",
  onDismiss,
  className,
}: ErrorMessageProps) {
  const severityStyles = {
    error: "bg-destructive/15 text-destructive border-destructive/50",
    info: "bg-blue-50 text-blue-700 border-blue-200",
    warning: "bg-yellow-50 text-yellow-700 border-yellow-200",
    success: "bg-green-50 text-green-700 border-green-200",
  };

  const icons = {
    error: AlertCircle,
    info: Info,
    warning: AlertCircle,
    success: Info,
  };

  const Icon = icons[severity];

  return (
    <div
      className={cn(
        "relative flex items-start gap-3 rounded-lg border p-4",
        severityStyles[severity],
        className
      )}
      role="alert"
    >
      <Icon className="h-5 w-5 shrink-0" />
      <div className="flex-1">{message}</div>
      {onDismiss && (
        <Button
          variant="ghost"
          size="icon"
          className="h-5 w-5 shrink-0"
          onClick={onDismiss}
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
} 