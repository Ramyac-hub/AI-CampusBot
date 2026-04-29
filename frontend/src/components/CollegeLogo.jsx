import React from 'react';

export default function CollegeLogo({ size = 60, className = '' }) {
  return (
    <div 
      className={className}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#60a5fa',
        fontWeight: 800,
        fontSize: `${size * 0.4}px`,
        boxShadow: '0 0 15px rgba(59, 130, 246, 0.1)'
      }}
    >
      SN
    </div>
  );
}
