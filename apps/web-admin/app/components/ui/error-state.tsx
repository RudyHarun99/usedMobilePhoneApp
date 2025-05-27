import { AlertCircle, XCircle } from "lucide-react";
import { Button } from "./button";

interface ErrorStateProps {
  title?: string;
  message: string;
  severity?: "error" | "warning" | "info";
  onRetry?: () => void;
  onDismiss?: () => void;
  className?: string;
}

export function ErrorState({
  title = "Error",
  message,
  severity = "error",
  onRetry,
  onDismiss,
  className = "",
}: ErrorStateProps) {
  const severityStyles = {
    error: "bg-red-50 border-red-200 text-red-800",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
    info: "bg-blue-50 border-blue-200 text-blue-800",
  };

  const icons = {
    error: <XCircle className="w-5 h-5 text-red-500" />,
    warning: <AlertCircle className="w-5 h-5 text-yellow-500" />,
    info: <AlertCircle className="w-5 h-5 text-blue-500" />,
  };

  return (
    <div className={`max-w-2xl mx-auto p-4 ${className}`}>
      <div
        className={`rounded-lg border p-6 flex flex-col items-center text-center gap-4 ${severityStyles[severity]}`}
        role="alert"
      >
        {icons[severity]}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm">{message}</p>
        </div>
        <div className="flex gap-3 mt-2">
          {onRetry && (
            <Button
              variant="outline"
              size="sm"
              onClick={onRetry}
              className="bg-white hover:bg-gray-50"
            >
              Try Again
            </Button>
          )}
          {onDismiss && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onDismiss}
              className="text-current hover:bg-opacity-10 hover:bg-current"
            >
              Dismiss
            </Button>
          )}
        </div>
      </div>
    </div>
  );
} 