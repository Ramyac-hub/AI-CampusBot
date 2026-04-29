import React from 'react';

const actions = [
  "What's my timetable?",
  "Show me the syllabus",
  "Upcoming events",
  "Where is the library?"
];

export default function QuickActions({ onSelect }) {
  return (
    <div className="quick-actions">
      {actions.map((action, idx) => (
        <button 
          key={idx} 
          className="action-chip"
          onClick={() => onSelect(action)}
        >
          {action}
        </button>
      ))}
    </div>
  );
}
