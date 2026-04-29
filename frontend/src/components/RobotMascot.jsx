import React from 'react';
import mascotImg from '../assets/final-mascot.png';

export default function RobotMascot({ size = 80, className = '' }) {
  return (
    <div 
      className={`robot-mascot-container ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
      }}
    >
      {/* Subtle Glow behind robot */}
      <div style={{
        position: 'absolute',
        width: '110%',
        height: '110%',
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)',
        borderRadius: '50%',
        zIndex: 0
      }} />
      
      <img 
        src={mascotImg} 
        alt="CampusBot Mascot" 
        className="floating"
        style={{ 
          width: '100%', 
          height: '100%', 
          objectFit: 'contain',
          position: 'relative',
          zIndex: 1,
          filter: 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.3))'
        }} 
      />
    </div>
  );
}
