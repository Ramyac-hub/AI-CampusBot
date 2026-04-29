import React from 'react';

export default function CleanRobotMascot({ size = 100 }) {
  const scale = size / 100;
  
  return (
    <div 
      style={{
        width: `${size}px`,
        height: `${size}px`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}
    >
      {/* Light Beam above head */}
      <div style={{
        position: 'absolute',
        top: '-30px',
        width: '2px',
        height: '40px',
        background: 'linear-gradient(to top, rgba(14, 165, 233, 1), rgba(14, 165, 233, 0))',
        boxShadow: '0 0 15px rgba(14, 165, 233, 0.8)'
      }} />

      {/* Robot Head */}
      <div style={{
        width: `${85 * scale}px`,
        height: `${60 * scale}px`,
        background: '#ffffff',
        borderRadius: `${15 * scale}px`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: `${12 * scale}px`,
        position: 'relative',
        zIndex: 2,
        boxShadow: `0 0 ${15 * scale}px rgba(255, 255, 255, 0.5)`
      }}>
        {/* Blue Glow Eyes */}
        <div style={{
          width: `${22 * scale}px`,
          height: `${12 * scale}px`,
          background: '#0ea5e9',
          borderRadius: `${4 * scale}px`,
          boxShadow: '0 0 10px #0ea5e9'
        }} />
        <div style={{
          width: `${22 * scale}px`,
          height: `${12 * scale}px`,
          background: '#0ea5e9',
          borderRadius: `${4 * scale}px`,
          boxShadow: '0 0 10px #0ea5e9'
        }} />
      </div>

      {/* Robot Body */}
      <div style={{
        width: `${60 * scale}px`,
        height: `${45 * scale}px`,
        background: '#ffffff',
        borderRadius: `${12 * scale}px`,
        marginTop: `${6 * scale}px`,
        display: 'flex',
        justifyContent: 'space-between',
        padding: `0 ${6 * scale}px`,
        position: 'relative',
        zIndex: 1
      }}>
        {/* Shoulders */}
        <div style={{ width: `${18 * scale}px`, height: `${28 * scale}px`, background: '#ffffff', borderRadius: `${8 * scale}px`, position: 'absolute', left: `-${12 * scale}px`, top: `${8 * scale}px` }} />
        <div style={{ width: `${18 * scale}px`, height: `${28 * scale}px`, background: '#ffffff', borderRadius: `${10 * scale}px`, position: 'absolute', right: `-${12 * scale}px`, top: `${8 * scale}px` }} />
      </div>
    </div>
  );
}
