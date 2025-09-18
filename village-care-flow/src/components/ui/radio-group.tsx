import * as React from 'react';

interface RadioGroupContextValue {
  value: string | undefined;
  setValue: (v: string) => void;
}

const RadioGroupContext = React.createContext<RadioGroupContextValue | null>(null);

interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({ className = '', value, defaultValue, onValueChange, children, ...props }) => {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = React.useState<string | undefined>(defaultValue);
  const currentValue = isControlled ? value : internalValue;

  const setValue = (v: string) => {
    if (!isControlled) setInternalValue(v);
    onValueChange?.(v);
  };

  return (
    <RadioGroupContext.Provider value={{ value: currentValue, setValue }}>
      <div role="radiogroup" className={className} {...props}>{children}</div>
    </RadioGroupContext.Provider>
  );
};

export interface RadioGroupItemProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
}

export const RadioGroupItem = React.forwardRef<HTMLInputElement, RadioGroupItemProps>(
  ({ className = '', value, onChange, ...props }, ref) => {
    const ctx = React.useContext(RadioGroupContext);
    const checked = ctx?.value === value;
    return (
      <input
        ref={ref}
        type="radio"
        value={value}
        checked={checked}
        onChange={(e) => {
          onChange?.(e);
          ctx?.setValue(value);
        }}
        className={`h-4 w-4 text-primary ${className}`}
        {...props}
      />
    );
  }
);
RadioGroupItem.displayName = 'RadioGroupItem';

export default RadioGroup;


