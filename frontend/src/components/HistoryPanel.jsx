import React, { useState } from 'react';
import { MessageSquare, ChevronRight, ChevronLeft } from 'lucide-react';

export default function HistoryPanel({ history, onLoadSession }) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className={`history-panel ${isExpanded ? 'expanded' : 'collapsed'}`} style={{ background: '#070b1d', borderLeft: '1px solid var(--panel-border)', padding: '24px', width: isExpanded ? '240px' : '60px' }}>
      <div className="history-header" style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {isExpanded && <h3 style={{ fontSize: '0.85rem', color: '#4b5563', letterSpacing: '2px', margin: 0 }}>HISTORY</h3>}
        <button 
          className="icon-button" 
          onClick={() => setIsExpanded(!isExpanded)}
          style={{ background: 'transparent', border: 'none', color: '#4b5563', cursor: 'pointer' }}
        >
          {isExpanded ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>
      
      <div className="history-list">
        {history.length === 0 ? (
          isExpanded && <div className="no-history">No past conversations</div>
        ) : (
          history.map((session) => (
            <div 
              key={session.id} 
              className="history-item"
              onClick={() => onLoadSession(session.messages)}
              style={{ padding: '16px', background: '#111827', border: '1px solid var(--panel-border)', borderRadius: '12px', marginBottom: '12px', cursor: 'pointer' }}
            >
              {isExpanded ? (
                <div>
                  <div className="history-title" style={{ fontSize: '0.85rem', color: '#d1d5db', marginBottom: '4px' }}>{session.title}</div>
                  <div className="history-date" style={{ fontSize: '0.75rem', color: '#4b5563' }}>{session.date}</div>
                </div>
              ) : (
                <div style={{ textAlign: 'center' }}>•</div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
