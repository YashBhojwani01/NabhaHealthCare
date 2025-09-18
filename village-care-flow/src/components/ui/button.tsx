import * as React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

const base = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
const variants: Record<string, string> = {
  default: 'bg-primary text-primary-foreground hover:bg-primary/90',
  outline: 'border border-input bg-transparent hover:bg-accent hover:text-accent-foreground',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
};
const sizes: Record<string, string> = {
  sm: 'h-8 px-3 py-1',
  md: 'h-10 px-4 py-2',
  lg: 'h-11 px-6 py-3'
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'default', size = 'md', ...props }, ref) => {
    const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`.trim();
    return <button ref={ref} className={cls} {...props} />;
  }
);
Button.displayName = 'Button';

export default Button;


