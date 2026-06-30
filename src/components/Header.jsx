import React from 'react';
import { MessageSquare, Bell } from 'lucide-react';

export default function Header({ 
  profile, 
  onOpenProfile, 
  onResetHome, 
  onNavigate, 
  unreadMessagesCount,
  onOpenNotifications,
  unreadNotificationsCount
}) {
  // Extract initials (must be exactly two capitalized letters)
  const getInitials = (name) => {
    if (!name) return 'KK';
    if (name === "Kaleeswaran Krithiga") return 'KK';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const initials = getInitials(profile.name);

  return (
    <header className="app-header">
      {/* Profile Initials Button */}
      <button 
        className="header-avatar-circle" 
        style={{
          background: 'var(--primary)',
          color: '#FFFFFF',
          fontSize: '11px',
          fontWeight: '700',
          fontFamily: 'var(--font-mono)',
          letterSpacing: '0.04em',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}
        onClick={onOpenProfile} 
        title="Open Student Profile Panel"
      >
        {initials}
      </button>

      {/* Brand Title Logo (Uppercase UNISPHERE) */}
      <h1 className="header-logo" onClick={onResetHome}>
        UNISPHERE
      </h1>

      {/* Actions (Messages / Notifications) */}
      <div className="header-actions">
        <button className="header-btn" onClick={() => onNavigate('chats')} title="Chats Hub">
          <MessageSquare style={{ width: 18, height: 18 }} />
          {unreadMessagesCount > 0 && (
            <span 
              className="badge-pill-red" 
              style={{ 
                background: 'var(--accent)', 
                color: '#070B19', 
                border: '1px solid var(--bg-app)',
                boxShadow: '0 0 8px var(--accent-glow)'
              }}
            >
              {unreadMessagesCount}
            </span>
          )}
        </button>
        <button className="header-btn" onClick={onOpenNotifications} title="Notifications">
          <Bell style={{ width: 18, height: 18 }} />
          {unreadNotificationsCount > 0 && (
            <span className="badge-pill-red">{unreadNotificationsCount}</span>
          )}
        </button>
      </div>
    </header>
  );
}
