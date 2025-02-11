import React from 'react';
import { AlertTriangle } from 'lucide-react';



export const ImportantMessage = ({
  title = 'Importante',
  message,
  variant = 'warning'
}) => {
  const styles = {
    warning: {
      container: 'bg-amber-50 border-amber-200',
      icon: 'text-amber-500',
      title: 'text-amber-800',
      message: 'text-amber-700'
    },
    info: {
      container: 'bg-blue-50 border-blue-200',
      icon: 'text-blue-500',
      title: 'text-blue-800',
      message: 'text-blue-700'
    }
  };

  const currentStyle = styles[variant];

  return (
  <div className={`absolute z-50 top-20 right-10 rounded-lg border p-4 h-auto  overflow-y-auto w-[300px] ${currentStyle.container}`}>
      <div className="flex items-start space-x-3">
        <div className={`mt-0.5 ${currentStyle.icon}`}>
          <AlertTriangle size={20} className="animate-pulse" />
        </div>
        <div className="flex-1">
          <h3 className={`text-sm font-medium ${currentStyle.title}`}>
            {title}
          </h3>
          <p className={`mt-1 text-sm ${currentStyle.message}`}>
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImportantMessage