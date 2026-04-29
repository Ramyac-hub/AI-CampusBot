import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Sparkles, User, Calendar, BookOpen, Bell } from 'lucide-react';
import ChatMessage from './ChatMessage';
import RobotMascot from './RobotMascot';
import { processQuery } from '../utils/chatLogic';

export default function ChatArea({ onUpdateHistory }) {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      sender: 'bot', 
      data: [{ type: 'text', content: 'Here is the timetable for CS Dept Sem 4 - Monday has Data Structures at 9AM and Math III at 11AM.' }] 
    },
    {
      id: 2,
      sender: 'user',
      text: "What's my timetable?"
    },
    {
      id: 3,
      sender: 'bot',
      data: [{ type: 'text', content: 'Library is closed this Friday. Fees deadline is May 20th!' }]
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (text) => {
    if (!text.trim()) return;

    const userMsg = { id: Date.now(), sender: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const botResponseData = await processQuery(text);
    
    setIsTyping(false);
    setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', data: botResponseData }]);
  };

  return (
    <div className="chat-container" style={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column', 
      background: '#0a0f2b',
      borderLeft: '1px solid var(--panel-border)',
      borderRight: '1px solid var(--panel-border)'
    }}>
      {/* Header */}
      <div className="chat-header" style={{ 
        height: '80px', 
        padding: '0 30px', 
        borderBottom: '1px solid var(--panel-border)', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between' 
      }}>
        <div className="bot-info" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{ background: '#1e1b4b', padding: '10px', borderRadius: '15px' }}>
            <RobotMascot size={45} />
          </div>
          <div>
            <h3 style={{ 
              fontSize: '1.1rem', 
              fontWeight: 800, 
              margin: 0,
              background: 'linear-gradient(to right, #3b82f6, #a855f7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: '1.1'
            }}>CampusBot <br/> AI</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: '#10b981', marginTop: '4px' }}>
              <div style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '50%', boxShadow: '0 0 10px #10b981' }}></div>
              Online
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.8rem', color: '#717bb0' }}>Student</div>
          </div>
          <div style={{ width: '40px', height: '40px', background: 'rgba(59, 130, 246, 0.2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6' }}>
            <User size={20} />
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="chat-messages" style={{ flex: 1, overflowY: 'auto', padding: '30px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
        <div style={{ textAlign: 'center', color: '#4b5563', fontSize: '0.75rem', letterSpacing: '1px' }}>— Today —</div>
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        {isTyping && <div style={{ color: '#717bb0', fontSize: '0.8rem' }}>CampusBot is thinking...</div>}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="chat-input-area" style={{ padding: '20px 30px 30px 30px' }}>
        <div className="quick-actions" style={{ display: 'flex', gap: '12px', marginBottom: '15px' }}>
          <button className="action-chip" style={{ background: '#141b3d', border: '1px solid #1e293b', borderRadius: '15px', padding: '8px 16px', color: '#d1d5db', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={() => handleSend('Timetable')}>
            <Calendar size={14} color="#ef4444" /> Timetable
          </button>
          <button className="action-chip" style={{ background: '#141b3d', border: '1px solid #1e293b', borderRadius: '15px', padding: '8px 16px', color: '#d1d5db', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={() => handleSend('Syllabus')}>
            <BookOpen size={14} color="#f59e0b" /> Syllabus
          </button>
          <button className="action-chip" style={{ background: '#141b3d', border: '1px solid #1e293b', borderRadius: '15px', padding: '8px 16px', color: '#d1d5db', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={() => handleSend('Events')}>
            <Sparkles size={14} color="#a855f7" /> Events
          </button>
        </div>
        
        <div className="input-container" style={{ position: 'relative' }}>
          <input 
            type="text" 
            className="chat-input"
            placeholder="Ask about timetable, events..." 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend(input)}
            style={{ 
              width: '100%', 
              padding: '18px 60px 18px 25px', 
              background: '#070b1d', 
              border: '1px solid #1e293b', 
              borderRadius: '20px', 
              color: 'white',
              outline: 'none',
              fontSize: '0.95rem'
            }}
          />
          <button 
            className="send-btn" 
            onClick={() => handleSend(input)}
            style={{ 
              position: 'absolute', 
              right: '10px', 
              top: '50%', 
              transform: 'translateY(-50%)', 
              background: '#3b82f6', 
              border: 'none', 
              width: '40px', 
              height: '40px', 
              borderRadius: '12px', 
              color: 'white', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
