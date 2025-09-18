import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <div className="text-3xl font-bold">404 - Page Not Found</div>
      <Link className="text-primary underline" to="/">Go Home</Link>
    </div>
  );
};

export default NotFound;


