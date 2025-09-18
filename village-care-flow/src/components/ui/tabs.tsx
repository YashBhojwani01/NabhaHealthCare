import * as React from 'react';

interface TabsContextValue {
  value: string | undefined;
  setValue: (v: string) => void;
}

const TabsContext = React.createContext<TabsContextValue | null>(null);

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

export const Tabs: React.FC<TabsProps> = ({ className = '', value, defaultValue, onValueChange, children, ...props }) => {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = React.useState<string | undefined>(defaultValue);
  const currentValue = isControlled ? value : internalValue;

  const setValue = (v: string) => {
    if (!isControlled) setInternalValue(v);
    onValueChange?.(v);
  };

  return (
    <TabsContext.Provider value={{ value: currentValue, setValue }}>
      <div className={className} {...props}>{children}</div>
    </TabsContext.Provider>
  );
};

export const TabsList: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className = '', ...props }) => (
  <div className={`inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground ${className}`} {...props} />
);

interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

export const TabsTrigger: React.FC<TabsTriggerProps> = ({ className = '', value, ...props }) => {
  const ctx = React.useContext(TabsContext);
  const isActive = ctx?.value === value;
  return (
    <button
      data-state={isActive ? 'active' : 'inactive'}
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow ${className}`}
      onClick={(e) => {
        props.onClick?.(e);
        ctx?.setValue(value);
      }}
      {...props}
    />
  );
};

interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export const TabsContent: React.FC<TabsContentProps> = ({ className = '', value, children, ...props }) => {
  const ctx = React.useContext(TabsContext);
  if (ctx?.value !== value) return null;
  return (
    <div className={`mt-2 ${className}`} {...props}>{children}</div>
  );
};

export default Tabs;


