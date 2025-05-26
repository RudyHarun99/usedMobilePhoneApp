import React from 'react';
import { AlertCircle, XCircle, AlertTriangle, Info } from 'lucide-react';

type ErrorSeverity = 'error' | 'warning' | 'info';

interface ErrorMessageProps {
  message: string;
  severity?: ErrorSeverity;
  className?: string;
  onDismiss?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  severity = 'error',
  className = '',
  onDismiss
}) => {
  const severityStyles = {
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800'
  };

  const icons = {
    error: <XCircle className="w-5 h-5 text-red-500" />,
    warning: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />
  };

  return (
    <div
      className={`rounded-lg border p-4 flex items-start gap-3 ${severityStyles[severity]} ${className}`}
      role="alert"
    >
      {icons[severity]}
      <div className="flex-1">
        <p className="text-sm font-medium">{message}</p>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="p-1 hover:bg-opacity-10 hover:bg-gray-900 rounded-full transition-colors"
          aria-label="Dismiss message"
        >
          <AlertCircle className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default ErrorMessage; 