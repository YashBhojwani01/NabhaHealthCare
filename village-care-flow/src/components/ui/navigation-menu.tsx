import * as React from 'react';

export const NavigationMenu: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className = '', ...props }) => (
  <nav className={className} {...props} />
);

export const NavigationMenuList: React.FC<React.HTMLAttributes<HTMLUListElement>> = ({ className = '', ...props }) => (
  <ul className={className} {...props} />
);

export const NavigationMenuItem: React.FC<React.LiHTMLAttributes<HTMLLIElement>> = ({ className = '', ...props }) => (
  <li className={className} {...props} />
);

export default NavigationMenu;


