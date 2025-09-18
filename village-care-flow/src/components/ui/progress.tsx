import * as React from 'react';

export const Progress: React.FC<{ value: number; className?: string }> = ({ value, className = '' }) => (
  <div className={`w-full h-2 bg-muted rounded ${className}`}>
    <div className="h-2 bg-primary rounded" style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
  </div>
);

export default Progress;


