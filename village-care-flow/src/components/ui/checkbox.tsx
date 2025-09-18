import * as React from 'react';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onCheckedChange?: (checked: boolean) => void;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className = '', onCheckedChange, checked, defaultChecked, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onCheckedChange?.(e.target.checked);
      props.onChange?.(e as any);
    };

    return (
      <input
        ref={ref}
        type="checkbox"
        className={`h-4 w-4 rounded border-input text-primary focus:ring-2 focus:ring-ring ${className}`}
        onChange={handleChange}
        checked={checked}
        defaultChecked={defaultChecked}
        {...props}
      />
    );
  }
);
Checkbox.displayName = 'Checkbox';

export default Checkbox;


