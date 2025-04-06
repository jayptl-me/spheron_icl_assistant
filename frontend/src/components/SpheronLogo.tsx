import React from 'react';

const SpheronLogo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <img 
      src="/assets/logo.jpg"
      alt="Spheron Logo"
      className={`rounded-full object-cover ${className || ''}`}
      width="125"
      height="32"
    />
  );
};

export default SpheronLogo;
