import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, Download, BookOpen, Clock, Star, ExternalLink } from 'lucide-react';

const subjects = [
  { id: 'AI', name: 'Artificial Intelligence', icon: '🤖', color: '#a855f7' },
  { id: 'ML', name: 'Machine Learning', icon: '🧠', color: '#3b82f6' },
  { id: 'DBMS', name: 'Database Management', icon: '📁', color: '#10b981' },
  { id: 'OS', name: 'Operating Systems', icon: '💻', color: '#f59e0b' },
  { id: 'WT', name: 'Web Technology', icon: '🌐', color: '#ec4899' },
  { id: 'RP', name: 'R Programming', icon: '📊', color: '#06b6d4' },
  { id: 'DS', name: 'Data Structures', icon: '🌲', color: '#8b5cf6' },
  { id: 'CN', name: 'Computer Networks', icon: '🔌', color: '#ef4444' },
  { id: 'PY', name: 'Python', icon: '🐍', color: '#eab308' },
  { id: 'JV', name: 'Java', icon: '☕', color: '#f97316' },
];

const mockSyllabusData = {
  'AI': {
    overview: 'This course provides a broad introduction to the fundamental concepts and techniques of Artificial Intelligence.',
    units: [
      { 
        id: 1, 
        title: 'Unit 1: Introduction & Problem Solving', 
        topics: ['History of AI', 'Intelligent Agents', 'Uninformed Search', 'Informed (Heuristic) Search'],
        concepts: ['State-space representation', 'A* Algorithm', 'Minimax Algorithm']
      },
      { 
        id: 2, 
        title: 'Unit 2: Knowledge & Reasoning', 
        topics: ['Propositional Logic', 'First-Order Logic', 'Inference Rules', 'Ontology'],
        concepts: ['Resolution', 'Forward/Backward Chaining']
      },
    ],
    resources: [
      { name: 'AI: A Modern Approach (Textbook)', type: 'book', link: '#' },
      { name: 'Introduction to AI (MIT OpenCourseWare)', type: 'video', link: '#' }
    ],
    tips: 'Focus on understanding search algorithms early as they form the basis for many other AI concepts.'
  }
};

export default function SyllabusModule() {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedUnit, setExpandedUnit] = useState(1);

  const filteredSubjects = subjects.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectSubject = (subject) => {
    setSelectedSubject(subject);
  };

  if (selectedSubject) {
    const data = mockSyllabusData[selectedSubject.id] || mockSyllabusData['AI'];
    
    return (
      <div className="module-container" style={{ padding: '30px', overflowY: 'auto', height: '100%' }}>
        <button 
          className="action-chip" 
          onClick={() => setSelectedSubject(null)}
          style={{ marginBottom: '20px' }}
        >
          ← Back to Subjects
        </button>

        <div className="glass-panel" style={{ padding: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '30px' }}>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <div style={{ fontSize: '3rem', background: 'rgba(0,0,0,0.2)', padding: '20px', borderRadius: '20px' }}>
                {selectedSubject.icon}
              </div>
              <div>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>{selectedSubject.name}</h1>
                <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Course Overview & Detailed Syllabus</p>
              </div>
            </div>
            <button className="primary-btn" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <Download size={18} />
              Download PDF
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
            <div>
              <section style={{ marginBottom: '40px' }}>
                <h3 style={{ marginBottom: '15px', color: 'var(--accent-primary)' }}>Subject Overview</h3>
                <p style={{ lineHeight: 1.7, color: 'var(--text-secondary)' }}>{data.overview}</p>
              </section>

              <section>
                <h3 style={{ marginBottom: '20px' }}>Units & Modules</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  {data.units.map(unit => (
                    <div 
                      key={unit.id} 
                      className="glass-card" 
                      style={{ padding: '20px', cursor: 'default' }}
                    >
                      <div 
                        style={{ display: 'flex', justifyContent: 'space-between', cursor: 'pointer' }}
                        onClick={() => setExpandedUnit(expandedUnit === unit.id ? null : unit.id)}
                      >
                        <h4 style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                          <span style={{ color: 'var(--accent-primary)' }}>Unit {unit.id}:</span>
                          {unit.title}
                        </h4>
                        {expandedUnit === unit.id ? <ChevronUp /> : <ChevronDown />}
                      </div>
                      
                      {expandedUnit === unit.id && (
                        <div style={{ marginTop: '20px', padding: '20px', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', animation: 'slideIn 0.3s' }}>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div>
                              <p style={{ fontWeight: 600, marginBottom: '10px', fontSize: '0.9rem' }}>Topics Covered:</p>
                              <ul style={{ paddingLeft: '20px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                {unit.topics.map(t => <li key={t} style={{ marginBottom: '5px' }}>{t}</li>)}
                              </ul>
                            </div>
                            <div>
                              <p style={{ fontWeight: 600, marginBottom: '10px', fontSize: '0.9rem' }}>Key Concepts:</p>
                              <ul style={{ paddingLeft: '20px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                {unit.concepts.map(c => <li key={c} style={{ marginBottom: '5px' }}>{c}</li>)}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(59, 130, 246, 0.1))' }}>
                <h3 style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '15px' }}>
                  <Star size={20} color="#f59e0b" fill="#f59e0b" />
                  AI Study Tips
                </h3>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>{data.tips}</p>
              </div>

              <div className="glass-card">
                <h3 style={{ marginBottom: '15px' }}>Progress Tracker</h3>
                <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden', marginBottom: '10px' }}>
                  <div style={{ width: '45%', height: '100%', background: 'var(--neon-green)' }}></div>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>45% Syllabus Completed</p>
              </div>

              <div className="glass-card">
                <h3 style={{ marginBottom: '15px' }}>Resources</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {data.resources.map(res => (
                    <a key={res.name} href={res.link} style={{ display: 'flex', justifyContent: 'space-between', textDecoration: 'none', color: 'inherit', padding: '10px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
                      <span style={{ fontSize: '0.85rem' }}>{res.name}</span>
                      <ExternalLink size={14} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="module-container" style={{ padding: '40px', overflowY: 'auto', height: '100%' }}>
      <div style={{ marginBottom: '40px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '10px' }} className="neon-text-purple">Curriculum & Syllabus</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Select a subject to view detailed modules, resources, and study tips.</p>
      </div>

      <div className="input-container" style={{ maxWidth: '600px', margin: '0 auto 40px auto' }}>
        <Search size={20} color="var(--text-secondary)" />
        <input 
          type="text" 
          placeholder="Search subjects..." 
          className="chat-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="syllabus-grid">
        {filteredSubjects.map((sub) => (
          <div 
            key={sub.id} 
            className="glass-card" 
            style={{ textAlign: 'center', borderBottom: `4px solid ${sub.color}` }}
            onClick={() => handleSelectSubject(sub)}
          >
            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>{sub.icon}</div>
            <h3 style={{ marginBottom: '5px' }}>{sub.name}</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>5 Units • 24 Topics</p>
          </div>
        ))}
      </div>
    </div>
  );
}
