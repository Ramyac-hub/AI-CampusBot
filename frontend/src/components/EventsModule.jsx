import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, Filter, Search, ArrowRight, Bell, Share2 } from 'lucide-react';

const eventCategories = ['All', 'Technical', 'Cultural', 'Sports', 'Academic'];

const mockEvents = [
  {
    id: 1,
    name: 'Hack-X-Campus 2026',
    category: 'Technical',
    date: 'May 15, 2026',
    time: '09:00 AM',
    venue: 'Main Auditorium',
    desc: 'The biggest 48-hour hackathon of the year. Build, innovate, and win prizes worth ₹1,00,000!',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    countdown: '15 Days Left'
  },
  {
    id: 2,
    name: 'Rhythm Night 2026',
    category: 'Cultural',
    date: 'May 20, 2026',
    time: '06:00 PM',
    venue: 'Open Air Theatre',
    desc: 'Annual cultural fest featuring music, dance, and drama performances from various colleges.',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    countdown: '21 Days Left'
  },
  {
    id: 3,
    name: 'Inter-College Cricket',
    category: 'Sports',
    date: 'May 10, 2026',
    time: '08:00 AM',
    venue: 'College Grounds',
    desc: 'Semi-finals of the inter-college cricket tournament. Come cheer for our home team!',
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b565da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    countdown: '11 Days Left'
  },
  {
    id: 4,
    name: 'Robotics Workshop',
    category: 'Technical',
    date: 'May 12, 2026',
    time: '02:00 PM',
    venue: 'Robotics Lab',
    desc: 'Hands-on workshop on building autonomous drones and mobile robots using ROS.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    countdown: '13 Days Left'
  },
  {
    id: 5,
    name: 'Placement Seminar',
    category: 'Academic',
    date: 'May 05, 2026',
    time: '11:00 AM',
    venue: 'Seminar Hall 2',
    desc: 'Special session by top industry recruiters on how to crack technical interviews.',
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    countdown: '6 Days Left'
  }
];

export default function EventsModule() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEvents = mockEvents.filter(e => 
    (activeCategory === 'All' || e.category === activeCategory) &&
    e.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="module-container" style={{ padding: '40px', overflowY: 'auto', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
        <div>
          <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '10px' }} className="neon-text-purple">Campus Events</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Discover hackathons, fests, workshops, and sports activities.</p>
        </div>
        <div style={{ display: 'flex', gap: '15px' }}>
          <button className="primary-btn" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <Calendar size={18} />
            Sync with Google
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', flexWrap: 'wrap' }}>
        <div className="input-container" style={{ flex: 1, minWidth: '300px' }}>
          <Search size={20} color="var(--text-secondary)" />
          <input 
            type="text" 
            placeholder="Search events..." 
            className="chat-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '5px' }}>
          {eventCategories.map(cat => (
            <button 
              key={cat}
              className={`action-chip ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
              style={{ background: activeCategory === cat ? 'var(--accent-primary)' : '', color: activeCategory === cat ? 'white' : '' }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="events-grid">
        {filteredEvents.map((event, idx) => (
          <div 
            key={event.id} 
            className="glass-card" 
            style={{ padding: '0', display: 'flex', flexDirection: 'column', animation: 'slideIn 0.4s forwards', animationDelay: `${idx * 0.1}s` }}
          >
            <div style={{ position: 'relative', height: '180px', overflow: 'hidden', borderTopLeftRadius: '20px', borderTopRightRadius: '20px' }}>
              <img src={event.image} alt={event.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', top: '15px', left: '15px' }}>
                <span className="action-chip" style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)', color: 'white' }}>
                  {event.category}
                </span>
              </div>
              <div style={{ position: 'absolute', bottom: '15px', right: '15px' }}>
                <span style={{ background: 'var(--neon-purple)', padding: '6px 12px', borderRadius: '10px', fontSize: '0.75rem', fontWeight: 600, color: 'white', boxShadow: '0 0 15px rgba(168, 85, 247, 0.5)' }}>
                  {event.countdown}
                </span>
              </div>
            </div>

            <div style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 700 }}>{event.name}</h3>
                <button className="icon-button"><Share2 size={18} /></button>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  <Calendar size={14} color="var(--neon-blue)" />
                  <span>{event.date}</span>
                  <span style={{ margin: '0 5px' }}>•</span>
                  <Clock size={14} color="var(--neon-blue)" />
                  <span>{event.time}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  <MapPin size={14} color="var(--neon-green)" />
                  <span>{event.venue}</span>
                </div>
              </div>

              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '24px', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {event.desc}
              </p>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button className="primary-btn" style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                  Register Now
                  <ArrowRight size={16} />
                </button>
                <button className="icon-button glass-panel" style={{ width: '48px', height: '48px', borderRadius: '12px' }}>
                  <Bell size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
