import React, { useState } from 'react';
import { X, Star, Check, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function NotificationDrawer({
  isOpen,
  onClose,
  notifications,
  onAccept,
  onDecline,
  onRate,
  onClickNotification,
  onDismiss
}) {
  const [hoveredStars, setHoveredStars] = useState({});

  if (!isOpen) return null;

  return (
    <>
      <div 
        className={`drawer-overlay ${isOpen ? 'open' : ''}`} 
        onClick={onClose}
        style={{ zIndex: 1200 }}
      />
      
      <div 
        className="drawer-panel-right open"
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          height: '100%',
          background: 'var(--bg-app)',
          zIndex: 1300,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: '-10px 0 40px rgba(0,0,0,0.95)',
          animation: 'slideInRight 0.28s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Drawer Header */}
        <div 
          style={{
            padding: '16px 20px',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <span 
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              fontWeight: '700',
              letterSpacing: '0.08em',
              color: 'var(--text-primary)'
            }}
          >
            NOTIFICATION CENTER
          </span>
          <button 
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              outline: 'none'
            }}
          >
            <X style={{ width: 18, height: 18 }} />
          </button>
        </div>

        {/* Notifications list */}
        <div 
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}
        >
          {notifications.length === 0 ? (
            <div 
              style={{
                padding: '24px 0',
                textAlign: 'center',
                color: 'var(--text-secondary)',
                fontSize: '12px',
                fontFamily: 'var(--font-mono)'
              }}
            >
              NO ACTIVE NOTIFICATIONS
            </div>
          ) : (
            notifications.map((notif) => {
              const isProximity = notif.type === 'proximity_warning';
              return (
                <div 
                  key={notif.id}
                  className="card-premium"
                  onClick={() => {
                    if (isProximity) {
                      onClickNotification(notif);
                    }
                  }}
                  style={{
                    padding: '12px 14px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    border: isProximity ? '1.5px solid var(--danger)' : '1px solid var(--border)',
                    background: isProximity ? 'rgba(229, 46, 46, 0.03)' : 'var(--bg-surface)',
                    cursor: isProximity ? 'pointer' : 'default',
                    transition: 'var(--transition-snappy)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span 
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '8px',
                        fontWeight: '700',
                        letterSpacing: '0.04em',
                        color: isProximity 
                          ? 'var(--danger)' 
                          : notif.type === 'inbound_request' 
                            ? 'var(--accent)' 
                            : 'var(--text-muted)'
                      }}
                    >
                      {notif.type.toUpperCase().replace('_', ' ')}
                    </span>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {notif.status && (
                        <span 
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '8px',
                            fontWeight: '700',
                            padding: '2px 6px',
                            borderRadius: '4px',
                            border: `1px solid ${
                              notif.status === 'confirmed' || notif.status === 'accepted'
                                ? 'var(--success)'
                                : notif.status === 'declined'
                                  ? 'var(--danger)'
                                  : 'var(--warning)'
                            }`,
                            color: 
                              notif.status === 'confirmed' || notif.status === 'accepted'
                                ? 'var(--success)'
                                : notif.status === 'declined'
                                  ? 'var(--danger)'
                                  : 'var(--warning)',
                            background: 'rgba(255, 255, 255, 0.02)',
                            textTransform: 'uppercase'
                          }}
                        >
                          {notif.status}
                        </span>
                      )}
                      
                      {/* Mini dismiss close X */}
                      <button 
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDismiss(notif.id);
                        }}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: 'var(--text-muted)',
                          cursor: 'pointer',
                          fontSize: '11px',
                          fontWeight: '700',
                          padding: '2px 4px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          outline: 'none'
                        }}
                        title="Dismiss notification"
                      >
                        ✕
                      </button>
                    </div>
                  </div>

                  <p style={{ fontSize: '12px', color: 'var(--text-primary)', lineHeight: '1.4', margin: 0 }}>
                    {notif.text}
                  </p>

                  {/* 1. Inbound Request Actions */}
                  {notif.type === 'inbound_request' && notif.status === 'pending' && (
                    <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onAccept(notif.id, notif.sender, notif.module);
                        }}
                        style={{
                          flex: 1,
                          background: 'var(--primary)',
                          color: '#FFFFFF',
                          border: 'none',
                          borderRadius: '6px',
                          padding: '6px 10px',
                          fontSize: '10px',
                          fontFamily: 'var(--font-mono)',
                          fontWeight: '700',
                          cursor: 'pointer'
                        }}
                      >
                        ACCEPT
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDecline(notif.id, notif.sender);
                        }}
                        style={{
                          flex: 1,
                          background: 'transparent',
                          color: 'var(--text-secondary)',
                          border: '1px solid var(--border)',
                          borderRadius: '6px',
                          padding: '6px 10px',
                          fontSize: '10px',
                          fontFamily: 'var(--font-mono)',
                          fontWeight: '700',
                          cursor: 'pointer'
                        }}
                      >
                        DECLINE
                      </button>
                    </div>
                  )}

                  {/* 2. System Ack Detail */}
                  {notif.type === 'system_ack' && notif.detail && (
                    <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>
                      ℹ️ {notif.detail}
                    </span>
                  )}

                  {/* 3. Post-Activity rating stars */}
                  {notif.type === 'post_activity_rating' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '4px' }}>
                      {!notif.rated ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onRate(notif.id, notif.mentor, star);
                              }}
                              onMouseEnter={() => setHoveredStars(prev => ({ ...prev, [notif.id]: star }))}
                              onMouseLeave={() => setHoveredStars(prev => ({ ...prev, [notif.id]: 0 }))}
                              style={{
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '2px',
                                color: star <= (hoveredStars[notif.id] || 0) ? '#FFDF00' : 'var(--text-muted)'
                              }}
                            >
                              <Star 
                                style={{ 
                                  width: 16, 
                                  height: 16, 
                                  fill: star <= (hoveredStars[notif.id] || 0) ? '#FFDF00' : 'none' 
                                }} 
                              />
                            </button>
                          ))}
                          <span style={{ fontSize: '9px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginLeft: '4px' }}>
                            TAP TO RATE
                          </span>
                        </div>
                      ) : (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star 
                                key={star}
                                style={{ 
                                  width: 12, 
                                  height: 12, 
                                  fill: star <= notif.rating ? '#FFDF00' : 'none',
                                  color: star <= notif.rating ? '#FFDF00' : 'var(--text-muted)'
                                }} 
                              />
                            ))}
                          </div>
                          <span style={{ fontSize: '10px', color: 'var(--success)', fontWeight: '600' }}>
                            Submitted! Added to mentor scorecard.
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* 4. Proximity Warning Link Action */}
                  {isProximity && (
                    <span 
                      style={{ 
                        fontSize: '10.5px', 
                        color: 'var(--accent)', 
                        fontWeight: '700',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        marginTop: '2px'
                      }}
                    >
                      ⚡ TAP CARD TO LAUNCH MEETING ROOM
                    </span>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}
