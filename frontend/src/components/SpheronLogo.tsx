import React from 'react';
import logo from '/assets/logo.jpg';

const SpheronLogo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <img 
      src={logo}
      alt="Spheron Logo"
      className={`rounded-full object-cover ${className || ''}`}
      width="125"
      height="32"
    />
  );
};

export default SpheronLogo;
