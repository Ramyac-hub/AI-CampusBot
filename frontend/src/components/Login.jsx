import React, { useState, useEffect } from 'react';
import CleanRobotMascot from './CleanRobotMascot';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [stars, setStars] = useState([]);

  useEffect(() => {
    // Generate random stars for the background
    const newStars = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      size: Math.random() * 3 + 1,
      left: Math.random() * 100,
      duration: Math.random() * 10 + 5,
      delay: Math.random() * 5
    }));
    setStars(newStars);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username.trim() && email.trim()) {
      const user = { username, email };
      localStorage.setItem('campusBotUser', JSON.stringify(user));
      onLogin(user);
    }
  };

  return (
    <div className="login-container cosmic-bg">
      {/* Background Particles */}
      {stars.map(star => (
        <div 
          key={star.id}
          className="star-particle"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            left: `${star.left}%`,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`
          }}
        />
      ))}

      <div className="login-card levitating-card" style={{ 
        width: '100%', 
        maxWidth: '440px', 
        padding: '50px 40px', 
        textAlign: 'center',
        position: 'relative',
        zIndex: 10,
        borderRadius: '32px'
      }}>
        
        {/* Mascot */}
        <div className="mascot-bob" style={{ marginBottom: '30px', display: 'flex', justifyContent: 'center' }}>
          <CleanRobotMascot size={110} />
        </div>

        {/* College Branding */}
        <div style={{ marginBottom: '35px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
          <div style={{ 
            width: '70px', 
            height: '70px', 
            borderRadius: '50%', 
            border: '2px solid #22d3ee', 
            background: '#1e3a8a', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            color: '#22d3ee', 
            fontWeight: 800, 
            fontSize: '1.4rem',
            boxShadow: '0 0 25px rgba(34, 211, 238, 0.4)'
          }}>SN</div>
          <div style={{ color: '#94a3b8', fontSize: '0.9rem', letterSpacing: '4px', fontWeight: 600 }}>SNPSU COLLEGE</div>
        </div>

        {/* App Title */}
        <div style={{ marginBottom: '40px' }}>
          <h1 className="title-glow" style={{ 
            fontSize: '3rem', 
            fontWeight: 800, 
            margin: '0', 
            background: 'linear-gradient(to right, #22d3ee, #a855f7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '2px'
          }}>CampusBot</h1>
          <p style={{ color: '#64748b', fontSize: '1.1rem', marginTop: '8px', fontWeight: 500 }}>Your AI College Assistant</p>
        </div>

        {/* Login Form */}
        <form className="login-form" onSubmit={handleLogin} style={{ textAlign: 'left' }}>
          <div className="input-group" style={{ marginBottom: '25px' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', letterSpacing: '2px', marginBottom: '10px', fontWeight: 600 }}>USERNAME</label>
            <input 
              type="text" 
              placeholder="Enter your username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="input-cosmic"
              style={{ width: '100%', padding: '16px', borderRadius: '14px', fontSize: '1rem' }}
            />
          </div>
          
          <div className="input-group" style={{ marginBottom: '40px' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', letterSpacing: '2px', marginBottom: '10px', fontWeight: 600 }}>EMAIL</label>
            <input 
              type="email" 
              placeholder="college@snpsu.edu" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-cosmic"
              style={{ width: '100%', padding: '16px', borderRadius: '14px', fontSize: '1rem' }}
            />
          </div>

          <button type="submit" className="login-btn btn-cosmic-pulse" style={{ 
            width: '100%', 
            padding: '18px', 
            borderRadius: '16px', 
            fontSize: '1.2rem',
            letterSpacing: '1px'
          }}>
            LOGIN &rarr;
          </button>
        </form>

        <div className="login-divider" style={{ margin: '30px 0', display: 'flex', alignItems: 'center', color: '#475569', fontSize: '0.9rem' }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(59, 130, 246, 0.1)' }}></div>
          <span style={{ margin: '0 20px', letterSpacing: '1px' }}>or</span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(59, 130, 246, 0.1)' }}></div>
        </div>

        <button type="button" className="google-btn" style={{ 
          width: '100%', 
          padding: '16px', 
          background: 'rgba(15, 23, 42, 0.4)', 
          border: '1px solid rgba(59, 130, 246, 0.2)', 
          borderRadius: '16px', 
          color: 'white', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          gap: '15px',
          cursor: 'pointer',
          fontSize: '1rem',
          transition: 'all 0.3s ease'
        }}>
          <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" alt="Google" style={{ width: '22px' }} />
          Continue with Google
        </button>
      </div>
    </div>
  );
}
