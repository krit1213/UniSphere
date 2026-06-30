import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Check, Send } from 'lucide-react';

export default function ChatsHubTab({ 
  onBackHome, 
  channels, 
  onJoinChannel, 
  activeDms,
  activeChatId,
  setActiveChatId,
  onReadChat
}) {
  // Local conversation simulator states
  const [typedMessage, setTypedMessage] = useState('');
  const [messages, setMessages] = useState({
    'dm-marcus': [
      { id: 1, sender: 'peer', text: 'Hey Krithiga, I saw you synced your profile. Nice work!', time: '10:40 AM' },
      { id: 2, sender: 'peer', text: 'Let me know if you want to run through CS1231S proof techniques before the workshop.', time: '10:42 AM' }
    ],
    'dm-priya': [
      { id: 1, sender: 'peer', text: 'Stripe PM mock is scheduled for Jun 22 at 4:30 PM.', time: 'Yesterday' },
      { id: 2, sender: 'user', text: 'Perfect, looking forward to it. I will prepare some product metrics case questions.', time: 'Yesterday' },
      { id: 3, sender: 'peer', text: 'Awesome, see you then!', time: 'Yesterday' }
    ],
    'dm-dylan': [
      { id: 1, sender: 'peer', text: 'Did you check the new GovTech frontend internship requirements?', time: '2 days ago' },
      { id: 2, sender: 'user', text: 'Yes, looking at it now. Prereqs are fully verified for my profile.', time: '2 days ago' }
    ]
  });

  // Local state for Technical Channel Gateway Modal
  const [gateChannel, setGateChannel] = useState(null); // channel object or null

  const chatEndRef = useRef(null);

  // Auto-scroll chat history
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, activeChatId]);

  // Mark unread DM as read when conversation is opened
  useEffect(() => {
    if (activeChatId) {
      onReadChat(activeChatId);
    }
  }, [activeChatId]);

  // Contextual reply generator
  const getSimulatedReply = (chatId) => {
    switch (chatId) {
      case 'dm-marcus':
        return "Excellent! Let's schedule that proof review. We can focus on structural induction proofs and relations matrices.";
      case 'dm-priya':
        return "Sounds solid. Be sure to review Stripe's pricing models and general product metrics structures.";
      case 'dm-dylan':
        return "Awesome! GovTech is a highly verified node for technical execution. Keep me posted on your application status.";
      default:
        return "Got it! Let's coordinate sync details soon.";
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!typedMessage.trim() || !activeChatId) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: typedMessage.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Update conversation feed
    setMessages(prev => ({
      ...prev,
      [activeChatId]: [...(prev[activeChatId] || []), userMsg]
    }));
    setTypedMessage('');

    // Simulate incoming reply after 1s
    setTimeout(() => {
      const peerMsg = {
        id: Date.now() + 1,
        sender: 'peer',
        text: getSimulatedReply(activeChatId),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => ({
        ...prev,
        [activeChatId]: [...(prev[activeChatId] || []), peerMsg]
      }));
    }, 1000);
  };

  const handleJoinClick = (channel) => {
    if (channel.joined) {
      // Allow leaving immediately
      onJoinChannel(channel.id);
    } else {
      // Trigger Gatekeeper rules modal for join confirmation
      setGateChannel(channel);
    }
  };

  const handleConfirmJoin = () => {
    if (gateChannel) {
      onJoinChannel(gateChannel.id);
      setGateChannel(null);
    }
  };

  // Find active chat details
  const activeChat = activeDms.find(dm => dm.id === activeChatId);

  // 1. Render Active DM Simulator View
  if (activeChat) {
    const currentMessages = messages[activeChatId] || [];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '12px', animation: 'fadeIn 0.2s ease-out' }}>
        
        {/* Chat Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
          <button 
            onClick={() => setActiveChatId(null)}
            style={{
              background: 'transparent',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-primary)',
              cursor: 'pointer'
            }}
          >
            <ArrowLeft style={{ width: 16, height: 16 }} />
          </button>
          
          <div className="chat-avatar-bubble" style={{ width: 34, height: 34, fontSize: '11px' }}>
            {activeChat.initials}
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', flex: 1 }}>
            <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-primary)' }}>
              {activeChat.name}
            </h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--success)', boxShadow: '0 0 6px var(--success-glow)' }} />
              <span style={{ fontSize: '9.5px', color: 'var(--text-secondary)' }}>Ecosystem Active Now</span>
            </div>
          </div>
        </div>

        {/* Message Feeds Area */}
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', paddingRight: '4px', minHeight: '380px', maxHeight: '520px' }}>
          {currentMessages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div 
                key={msg.id}
                style={{
                  display: 'flex',
                  justifyContent: isUser ? 'flex-end' : 'flex-start',
                  width: '100%'
                }}
              >
                <div 
                  style={{
                    maxWidth: '80%',
                    background: isUser ? 'var(--primary)' : 'var(--bg-surface)',
                    border: isUser ? 'none' : '1px solid var(--border)',
                    color: 'var(--text-primary)',
                    borderRadius: isUser ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                    padding: '10px 14px',
                    boxShadow: isUser ? '0 4px 12px var(--primary-glow)' : 'none'
                  }}
                >
                  <p style={{ fontSize: '12.5px', lineHeight: '1.4' }}>{msg.text}</p>
                  <span style={{ display: 'block', textAlign: 'right', fontSize: '8px', color: 'var(--text-secondary)', marginTop: '4px', fontFamily: 'var(--font-mono)' }}>
                    {msg.time}
                  </span>
                </div>
              </div>
            );
          })}
          <div ref={chatEndRef} />
        </div>

        {/* Messaging Input Footer */}
        <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '8px', borderTop: '1px solid var(--border)', paddingTop: '12px' }}>
          <input 
            type="text" 
            placeholder="Type a message..."
            value={typedMessage}
            onChange={(e) => setTypedMessage(e.target.value)}
            style={{
              flex: 1,
              background: '#070B19',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '10px 14px',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-sans)',
              fontSize: '12px',
              outline: 'none'
            }}
          />
          <button 
            type="submit"
            style={{
              background: 'var(--primary)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              width: '38px',
              height: '38px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 10px var(--primary-glow)'
            }}
          >
            <Send style={{ width: 14, height: 14 }} />
          </button>
        </form>

      </div>
    );
  }

  // 2. Default Chats Hub View
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', animation: 'fadeIn 0.2s ease-in', position: 'relative' }}>
      
      {/* Header Top Bar */}
      <div className="chats-header-row">
        <button className="chats-back-btn" onClick={onBackHome} title="Back to Dashboard">
          <ArrowLeft style={{ width: 16, height: 16 }} />
        </button>
        <span className="drawer-title" style={{ fontSize: '13px' }}>UNISPHERE CHATS HUB</span>
      </div>

      {/* Section 1 - Active DM Connections */}
      <div className="resume-section">
        <span className="resume-section-title">Active DM Connections</span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {activeDms.map((dm) => (
            <div 
              key={dm.id} 
              className="chat-user-item"
              onClick={() => setActiveChatId(dm.id)}
              style={{ cursor: 'pointer' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                <div className="chat-avatar-bubble">
                  {dm.initials}
                </div>
                <div className="chat-preview-col">
                  <h4 className="chat-user-name">{dm.name}</h4>
                  <p className="chat-preview-text" style={{ fontWeight: dm.unread ? 'bold' : 'normal', color: dm.unread ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                    {dm.preview}
                  </p>
                </div>
              </div>
              <div className="chat-time-meta">
                <span>{dm.time}</span>
                {dm.unread && <span className="dot-indicator-blue" style={{ background: 'var(--accent)', boxShadow: '0 0 6px var(--accent-glow)' }} />}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2 - Technical Channels */}
      <div className="resume-section">
        <span className="resume-section-title">Technical Channels</span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {channels.map((channel) => (
            <div key={channel.id} className="channel-item-row">
              <div className="channel-info-group">
                <h4 className="channel-hash-title">#{channel.name}</h4>
                <span className="channel-counter">{channel.members} Computing Undergraduates</span>
              </div>
              
              <button 
                className={channel.joined ? 'btn-secondary' : 'btn-primary'}
                style={{ 
                  padding: '6px 12px', 
                  fontSize: '10.5px', 
                  minWidth: '76px',
                  borderColor: channel.joined ? 'var(--success)' : '',
                  color: channel.joined ? 'var(--success)' : '',
                  border: channel.joined ? '1px solid var(--success)' : 'none',
                  background: channel.joined ? 'rgba(0, 229, 163, 0.05)' : 'var(--primary)'
                }}
                onClick={() => handleJoinClick(channel)}
              >
                {channel.joined ? (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '2px', justifyContent: 'center' }}>
                    <Check style={{ width: 12, height: 12 }} />
                    JOINED
                  </span>
                ) : (
                  'JOIN'
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Technical Channels Gatekeeper Rules Modal */}
      {gateChannel && (
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(3, 4, 9, 0.85)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 2500,
            padding: '16px'
          }}
        >
          <div 
            style={{
              width: '100%',
              maxWidth: '340px',
              background: 'var(--bg-surface)',
              border: '1.5px solid var(--border)',
              borderRadius: '16px',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.8)'
            }}
          >
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '8px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.08em', color: 'var(--accent)', fontWeight: '700' }}>
                #{gateChannel.name.toUpperCase()} GATEWAY
              </span>
              <button 
                onClick={() => setGateChannel(null)}
                style={{ background: 'transparent', border: 'none', color: '#90A0C0', cursor: 'pointer', fontSize: '14px', fontWeight: '700' }}
              >
                ✕
              </button>
            </div>

            {/* Description */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: 'var(--text-muted)' }}>CHANNEL DESCRIPTION</span>
              <p style={{ fontSize: '12px', color: 'var(--text-primary)', lineHeight: '1.4' }}>
                {gateChannel.id === 'ch-proofs' 
                  ? 'Dedicated peer study workspace for NUS CS1231S discrete mathematics, induction matrices, and logical proof sets.'
                  : gateChannel.id === 'ch-hackathon'
                    ? 'Team-forming hub for upcoming computing sandboxes and fast-track build events.'
                    : 'Interview preparation pipeline workspace targeting enterprise fintech application criteria.'}
              </p>
            </div>

            {/* Entry Rules */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: 'var(--text-muted)' }}>STRICT COMMUNITY RULES</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '11.5px', color: '#bfb0ff', lineHeight: '1.4' }}>
                {gateChannel.id === 'ch-proofs' ? (
                  <>
                    <p>1. No sharing explicit graded assignment solutions.</p>
                    <p>2. Keep code fragments readable using structured notation styles.</p>
                  </>
                ) : gateChannel.id === 'ch-hackathon' ? (
                  <>
                    <p>1. State your specific tech stack up front.</p>
                    <p>2. No ghosting teams after confirmation.</p>
                  </>
                ) : (
                  <>
                    <p>1. Maintain professional nondisclosure lines.</p>
                    <p>2. Share feedback constructively.</p>
                  </>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
              <button 
                onClick={() => setGateChannel(null)}
                className="btn-secondary"
                style={{ flex: 1, padding: '10px 0', fontSize: '11px', fontFamily: 'var(--font-mono)' }}
              >
                CANCEL
              </button>
              <button 
                onClick={handleConfirmJoin}
                className="btn-primary"
                style={{ flex: 1, padding: '10px 0', fontSize: '11px', fontFamily: 'var(--font-mono)', background: 'var(--primary)', border: 'none' }}
              >
                CONFIRM & JOIN CHANNEL
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
