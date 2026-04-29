import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, User, Download, ChevronRight, Share2 } from 'lucide-react';

const years = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
const branches = ['CSE', 'AIML', 'Data Science', 'IT', 'ECE'];
const sections = ['A', 'B', 'C'];

const mockTimetable = [
  { time: '09:00 AM - 10:30 AM', mon: 'Data Structures', tue: 'Operating Systems', wed: 'Math III', thu: 'Computer Networks', fri: 'DBMS', faculty: 'Dr. Ramesh', room: 'LH-301' },
  { time: '10:45 AM - 12:15 PM', mon: 'DBMS', tue: 'Computer Networks', wed: 'OS Lab', thu: 'Data Structures Lab', fri: 'Math III', faculty: 'Prof. Sunita', room: 'Lab-4' },
  { time: '12:15 PM - 01:15 PM', mon: 'LUNCH BREAK', tue: 'LUNCH BREAK', wed: 'LUNCH BREAK', thu: 'LUNCH BREAK', fri: 'LUNCH BREAK', isBreak: true },
  { time: '01:15 PM - 02:45 PM', mon: 'Web Technology', tue: 'Python Lab', wed: 'Soft Skills', thu: 'Web Tech Lab', fri: 'AI Basics', faculty: 'Mr. Anil', room: 'LH-202' },
  { time: '03:00 PM - 04:30 PM', mon: 'Club Activity', tue: 'Sports', wed: 'Seminar', thu: 'Library', fri: 'Project Work', faculty: 'Various', room: 'Campus' },
];

export default function TimetableModule() {
  const [selection, setSelection] = useState({ year: '', branch: '', section: '' });
  const [showGrid, setShowGrid] = useState(false);
  const [currentDay, setCurrentDay] = useState('mon');

  const days = [
    { id: 'mon', label: 'Monday' },
    { id: 'tue', label: 'Tuesday' },
    { id: 'wed', label: 'Wednesday' },
    { id: 'thu', label: 'Thursday' },
    { id: 'fri', label: 'Friday' },
  ];

  const handleGenerate = () => {
    if (selection.year && selection.branch && selection.section) {
      setShowGrid(true);
    }
  };

  if (!showGrid) {
    return (
      <div className="module-container" style={{ padding: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '10px' }} className="neon-text-blue">Dynamic Timetable</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>Configure your academic schedule in seconds.</p>
        </div>

        <div className="glass-panel" style={{ padding: '40px', width: '100%', maxWidth: '600px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            <div className="input-group">
              <label>SELECT ACADEMIC YEAR</label>
              <select 
                className="chat-input glass-panel" 
                style={{ width: '100%', background: 'rgba(0,0,0,0.3)', padding: '12px' }}
                value={selection.year}
                onChange={(e) => setSelection({...selection, year: e.target.value})}
              >
                <option value="">Choose Year</option>
                {years.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>

            <div className="input-group">
              <label>SELECT BRANCH</label>
              <select 
                className="chat-input glass-panel" 
                style={{ width: '100%', background: 'rgba(0,0,0,0.3)', padding: '12px' }}
                value={selection.branch}
                onChange={(e) => setSelection({...selection, branch: e.target.value})}
              >
                <option value="">Choose Branch</option>
                {branches.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>

            <div className="input-group">
              <label>SELECT SECTION</label>
              <select 
                className="chat-input glass-panel" 
                style={{ width: '100%', background: 'rgba(0,0,0,0.3)', padding: '12px' }}
                value={selection.section}
                onChange={(e) => setSelection({...selection, section: e.target.value})}
              >
                <option value="">Choose Section</option>
                {sections.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <button 
              className="primary-btn" 
              style={{ padding: '18px', fontSize: '1.1rem' }}
              onClick={handleGenerate}
              disabled={!selection.year || !selection.branch || !selection.section}
            >
              Generate Timetable →
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="module-container" style={{ padding: '30px', overflowY: 'auto', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <button className="action-chip" onClick={() => setShowGrid(false)}>← Change Class</button>
          <h2 style={{ fontSize: '2rem', marginTop: '10px' }}>{selection.year} {selection.branch} - Sec {selection.section}</h2>
        </div>
        <div style={{ display: 'flex', gap: '15px' }}>
          <button className="icon-button glass-panel" style={{ padding: '12px' }}><Share2 size={20} /></button>
          <button className="primary-btn" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <Download size={18} />
            Download Schedule
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '30px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="glass-panel" style={{ padding: '24px', borderLeft: '4px solid var(--neon-blue)' }}>
            <h3 style={{ color: 'var(--neon-blue)', fontSize: '0.9rem', marginBottom: '10px' }}>CURRENTLY ONGOING</h3>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>Data Structures</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Clock size={14} /> Ends in 45 mins
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '24px', borderLeft: '4px solid var(--neon-purple)' }}>
            <h3 style={{ color: 'var(--neon-purple)', fontSize: '0.9rem', marginBottom: '10px' }}>UPCOMING NEXT</h3>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>DBMS</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Clock size={14} /> Starts at 10:45 AM
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '20px' }}>
            <h3 style={{ marginBottom: '15px' }}>Select Day</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {days.map(day => (
                <div 
                  key={day.id}
                  className={`menu-item ${currentDay === day.id ? 'active' : ''}`}
                  onClick={() => setCurrentDay(day.id)}
                  style={{ justifyContent: 'space-between' }}
                >
                  <span>{day.label}</span>
                  {currentDay === day.id && <ChevronRight size={16} />}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '30px' }}>
          <div style={{ overflowX: 'auto' }}>
            <table className="timetable-grid">
              <thead>
                <tr style={{ textAlign: 'left' }}>
                  <th style={{ padding: '15px', color: 'var(--text-secondary)' }}>TIME</th>
                  <th style={{ padding: '15px', color: 'var(--text-secondary)' }}>SUBJECT & DETAILS</th>
                </tr>
              </thead>
              <tbody>
                {mockTimetable.map((row, idx) => (
                  <tr key={idx} style={{ animation: 'slideIn 0.3s forwards', animationDelay: `${idx * 0.1}s` }}>
                    <td style={{ padding: '20px', width: '200px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Clock size={16} color="var(--accent-primary)" />
                        <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{row.time}</span>
                      </div>
                    </td>
                    <td style={{ padding: '10px' }}>
                      <div className={`timetable-cell ${idx === 0 ? 'active' : ''}`} style={{ background: row.isBreak ? 'rgba(255,255,255,0.05)' : '' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <h4 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>{row[currentDay]}</h4>
                            {!row.isBreak && (
                              <div style={{ display: 'flex', gap: '15px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><User size={12} /> {row.faculty}</span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={12} /> {row.room}</span>
                              </div>
                            )}
                          </div>
                          {idx === 0 && <span className="action-chip" style={{ background: 'var(--neon-green)', color: 'white', border: 'none', fontSize: '0.7rem' }}>ONGOING</span>}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
