import React from 'react';
import { Calendar, Map, BookOpen, Bell, Home, LayoutDashboard, Settings, LogOut } from 'lucide-react';
import RobotMascot from './RobotMascot';

export default function Sidebar({ activeTab, setActiveTab, onLogout }) {
  return (
    <div className="sidebar">
      <div className="logo-container" style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '40px' }}>
        <div style={{ background: '#1e1b4b', padding: '8px', borderRadius: '12px', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
          <RobotMascot size={32} />
        </div>
        <h2 style={{ 
          fontSize: '1rem', 
          fontWeight: 800, 
          margin: 0, 
          lineHeight: '1.1',
          background: 'linear-gradient(to right, #3b82f6, #a855f7)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>Campus<br/>Bot</h2>
      </div>
      
      <div className="sidebar-menu">
        <div className="sidebar-title">MENU</div>
        <div 
          className={`menu-item ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          <Home size={20} />
          <span>Dashboard</span>
        </div>
        <div 
          className={`menu-item ${activeTab === 'timetable' ? 'active' : ''}`}
          onClick={() => setActiveTab('timetable')}
        >
          <Calendar size={20} />
          <span>Timetable</span>
        </div>
        <div 
          className={`menu-item ${activeTab === 'map' ? 'active' : ''}`}
          onClick={() => setActiveTab('map')}
        >
          <Map size={20} />
          <span>Map</span>
        </div>
        <div 
          className={`menu-item ${activeTab === 'events' ? 'active' : ''}`}
          onClick={() => setActiveTab('events')}
        >
          <Bell size={20} />
          <span>Events</span>
        </div>

        <div className="sidebar-title" style={{ marginTop: '20px' }}>ACCOUNT</div>
        <div 
          className="menu-item"
          onClick={onLogout}
          style={{ color: '#ef4444' }}
        >
          <LogOut size={20} />
          <span>Logout</span>
        </div>
      </div>

      <div className="announcements-section">
        <div className="sidebar-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '8px', height: '8px', background: '#ef4444', borderRadius: '50%' }}></div>
          ANNOUNCEMENTS
        </div>
        <div className="announcement-card">
          <h4 style={{ color: '#f59e0b', fontWeight: 600 }}>Library Closure</h4>
          <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>Closed this Friday for maintenance.</p>
        </div>
        <div className="announcement-card">
          <h4 style={{ color: '#f59e0b', fontWeight: 600 }}>Fees Deadline</h4>
          <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>Sem 4 last date: May 20th.</p>
        </div>
      </div>
    </div>
  );
}
