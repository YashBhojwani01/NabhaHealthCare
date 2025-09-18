import * as React from 'react';

export interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(({ className = '', ...props }, ref) => (
  <label className={`inline-flex items-center cursor-pointer ${className}`}>
    <input ref={ref} type="checkbox" className="sr-only peer" {...props} />
    <div className="w-10 h-6 bg-muted rounded-full peer-checked:bg-primary transition-colors relative">
      <div className="absolute top-0.5 left-0.5 h-5 w-5 bg-background rounded-full transition-transform peer-checked:translate-x-4" />
    </div>
  </label>
));
Switch.displayName = 'Switch';

export default Switch;


