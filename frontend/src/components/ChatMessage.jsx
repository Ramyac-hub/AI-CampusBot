import React from 'react';
import RobotMascot from './RobotMascot';

export default function ChatMessage({ message }) {
  const isBot = message.sender === 'bot';

  const renderContent = (contentData) => {
    switch (contentData.type) {
      case 'text':
        return <p style={{ margin: 0 }}>{contentData.content}</p>;
      default:
        return null;
    }
  };

  return (
    <div className={`message-wrapper ${isBot ? 'bot' : 'user'}`} style={{ 
      display: 'flex', 
      flexDirection: isBot ? 'row' : 'row-reverse',
      gap: '12px',
      alignItems: 'flex-start',
      maxWidth: '85%',
      alignSelf: isBot ? 'flex-start' : 'flex-end'
    }}>
      {isBot && (
        <div className="avatar bot" style={{ 
          background: 'white', 
          width: '32px', 
          height: '32px', 
          borderRadius: '8px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          flexShrink: 0,
          marginTop: '5px'
        }}>
          <RobotMascot size={24} />
        </div>
      )}
      
      <div className="message-content" style={{ 
        padding: '16px 20px', 
        borderRadius: '20px', 
        fontSize: '0.95rem', 
        lineHeight: '1.6',
        background: isBot ? '#141b3d' : '#1e1b4b',
        color: 'white',
        border: '1px solid rgba(59, 130, 246, 0.1)',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
      }}>
        {message.data ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {message.data.map((item, idx) => (
              <React.Fragment key={idx}>
                {renderContent(item)}
              </React.Fragment>
            ))}
          </div>
        ) : (
          <p style={{ margin: 0 }}>{message.text}</p>
        )}
      </div>
    </div>
  );
}
