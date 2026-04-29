import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';
import SyllabusModule from './components/SyllabusModule';
import TimetableModule from './components/TimetableModule';
import EventsModule from './components/EventsModule';
import Login from './components/Login';
import HistoryPanel from './components/HistoryPanel';
import './index.css';

function App() {
  const [user, setUser] = useState(null);
  const [history, setHistory] = useState([
    { id: 1, title: 'Timetable query', date: 'Today', messages: [] },
    { id: 2, title: 'Syllabus CS302', date: 'Yesterday', messages: [] },
    { id: 3, title: 'Fee structure', date: 'Apr 27', messages: [] },
    { id: 4, title: 'Exam schedule', date: 'Apr 25', messages: [] }
  ]);
  const [currentSessionId, setCurrentSessionId] = useState(Date.now());
  const [activeTab, setActiveTab] = useState('dashboard');

  // No auto-login on mount, force login page first
  useEffect(() => {
    // We only initialize history if we have a user (which happens after handleLogin)
    if (user) {
      loadHistory(user.email);
    }
  }, [user]);

  const loadHistory = (email) => {
    const storedHistory = localStorage.getItem(`campusBotHistory_${email}`);
    if (storedHistory) {
      try {
        setHistory(JSON.parse(storedHistory));
      } catch (e) {
        console.error("Failed to parse history");
      }
    }
  };

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    loadHistory(loggedInUser.email);
    localStorage.setItem('campusBotUser', JSON.stringify(loggedInUser)); // ← ADDED
  };

  // ← ADDED: clears session and returns to login screen
  const handleLogout = () => {
    localStorage.removeItem('campusBotUser');
    setUser(null);
  };

  const handleUpdateHistory = (messages) => {
    if (!user || messages.length <= 1) return;

    setHistory(prevHistory => {
      const existingSessionIndex = prevHistory.findIndex(h => h.id === currentSessionId);
      const firstUserMsg = messages.find(m => m.sender === 'user');
      const title = firstUserMsg ? firstUserMsg.text.substring(0, 20) + '...' : 'New Chat';

      const newSession = {
        id: currentSessionId,
        title,
        date: new Date().toISOString(),
        messages
      };

      let newHistory;
      if (existingSessionIndex >= 0) {
        newHistory = [...prevHistory];
        newHistory[existingSessionIndex] = newSession;
      } else {
        newHistory = [newSession, ...prevHistory];
      }

      localStorage.setItem(`campusBotHistory_${user.email}`, JSON.stringify(newHistory));
      return newHistory;
    });
  };

  const renderModule = () => {
    switch (activeTab) {
      case 'dashboard':
        return <ChatArea onUpdateHistory={handleUpdateHistory} />;
      case 'syllabus':
        return <SyllabusModule />;
      case 'timetable':
        return <TimetableModule />;
      case 'events':
        return <EventsModule />;
      default:
        return <ChatArea onUpdateHistory={handleUpdateHistory} />;
    }
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app-container">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout} // ← ADDED
      />
      <div className="main-content">
        {renderModule()}
      </div>
      <HistoryPanel
        history={history}
        onLoadSession={(messages) => {
          setActiveTab('dashboard');
          setCurrentSessionId(Date.now() + 1);
        }}
      />
    </div>
  );
}

export default App;