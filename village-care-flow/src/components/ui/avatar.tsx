import * as React from 'react';

export const Avatar: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className = '', children, ...props }) => (
  <div className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className}`} {...props}>
    {children}
  </div>
);

export const AvatarImage: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = (props) => (
  <img className="h-full w-full object-cover" {...props} />
);

export const AvatarFallback: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({ className = '', ...props }) => (
  <span className={`flex h-full w-full items-center justify-center rounded-full bg-muted ${className}`} {...props} />
);

export default Avatar;


