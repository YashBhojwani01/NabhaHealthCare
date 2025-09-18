import * as React from 'react';

export const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = ({ className = '', children, ...props }) => (
  <select className={`h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${className}`} {...props}>
    {children}
  </select>
);

export const SelectTrigger: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className = '', ...props }) => (
  <div className={`relative ${className}`} {...props} />
);

export const SelectContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className = '', ...props }) => (
  <div className={`absolute z-50 mt-1 w-full rounded-md border bg-popover text-popover-foreground shadow-md ${className}`} {...props} />
);

export const SelectItem: React.FC<React.LiHTMLAttributes<HTMLLIElement>> = ({ className = '', ...props }) => (
  <li className={`cursor-pointer px-3 py-2 hover:bg-accent ${className}`} {...props} />
);

export const SelectValue: React.FC<{ placeholder?: string; className?: string }> = ({ placeholder, className = '' }) => (
  <span className={`text-sm text-muted-foreground ${className}`}>{placeholder}</span>
);

export default Select;


