import React, { useState } from 'react';
import { X, Shield, Lock, Check, Settings, RefreshCw, Key, ShieldCheck, ChevronRight, Link } from 'lucide-react';

export default function ProfileDrawer({ 
  isOpen, 
  onClose, 
  profile, 
  onUpdateProfile, 
  onSync,
  onViewOwnResume
}) {
  const [showGateway, setShowGateway] = useState(false);
  const [syncStage, setSyncStage] = useState('idle'); // 'idle' | 'transmitting' | 'success'

  if (!isOpen) return null;

  const handleGPAToggle = (e) => {
    onUpdateProfile({ maskGpa: e.target.checked });
  };

  const handleSyncTriggerToggle = (e) => {
    onUpdateProfile({ notificationsEnabled: e.target.checked });
  };

  const handleTriggerGateway = () => {
    setShowGateway(true);
  };

  const handleCancelGateway = () => {
    if (syncStage !== 'idle') return; // prevent close during sync
    setShowGateway(false);
  };

  // Multi-stage transmission sync engine
  const handleStartSync = () => {
    setSyncStage('transmitting');
    
    // Stage 1 -> Stage 2 (1.5 seconds loading sequence)
    setTimeout(() => {
      setSyncStage('success');
      
      // Stage 2 -> Stage 3 (0.8 seconds success presentation then close)
      setTimeout(() => {
        onSync();
        setSyncStage('idle');
        setShowGateway(false);
      }, 800);
    }, 1500);
  };

  return (
    <>
      <div className={`drawer-overlay ${isOpen ? 'open' : ''}`} onClick={onClose} />
      
      {/* VIEW 1 - Student Profile Control (Full-Page Overlay) */}
      <div className={`drawer-panel ${isOpen && !showGateway ? 'open' : ''}`}>
        <div className="drawer-header" style={{ borderBottom: '1px solid var(--border)' }}>
          <span className="drawer-title" style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: '700', letterSpacing: '0.08em' }}>
            KRITHIGA'S STUDENT PROFILE
          </span>
          <button className="drawer-close" onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
            <X style={{ width: 16, height: 16 }} />
          </button>
        </div>

        <div className="drawer-content" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Identity Card Core Module */}
          <div 
            className="card-premium" 
            style={{ 
              padding: '24px 20px', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              gap: '12px',
              borderTop: '3px solid var(--primary)', /* Violet Accent Line */
              position: 'relative'
            }}
          >
            {/* Profile Avatar Badge */}
            <div 
              className="profile-badge-k"
              style={{
                width: 54,
                height: 54,
                borderRadius: '50%',
                background: 'var(--primary)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                fontWeight: '700',
                fontFamily: 'var(--font-sans)',
                boxShadow: '0 4px 14px var(--primary-glow)'
              }}
            >
              KK
            </div>
            
            {/* User Identity Data */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', textAlign: 'center' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)', margin: 0, fontFamily: 'var(--font-sans)' }}>
                Kaleeswaran Krithiga
              </h3>
              <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontFamily: 'var(--font-sans)' }}>
                krithiga@nus.edu.sg
              </span>
            </div>
 
            {/* Resume Router Link */}
            <a 
              href="#network" 
              style={{ 
                fontFamily: 'var(--font-mono)', 
                fontSize: '11.5px', 
                fontWeight: '700', 
                color: 'var(--accent)', 
                textDecoration: 'none',
                letterSpacing: '0.04em',
                marginTop: '4px'
              }}
              onClick={(e) => {
                e.preventDefault();
                onViewOwnResume();
              }}
            >
              [ 💳 VIEW MY NETWORK PROFILE ]
            </a>
 
            {/* Academic CAP Score Status Field */}
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11.5px', color: 'var(--text-primary)', fontWeight: '700', marginTop: '2px' }}>
              CAP Score: {profile.maskGpa ? 'XX / 5.00' : '4.82 / 5.00'}
            </span>

            <div style={{ width: '100%', borderTop: '1px solid rgba(255,255,255,0.08)', margin: '8px 0' }} />

            {/* Institutional Metadata Block */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', textAlign: 'center' }}>
              <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-primary)', fontFamily: 'var(--font-sans)' }}>
                National University of Singapore
              </span>
              <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontFamily: 'var(--font-sans)' }}>
                Bachelor of Computing in Computer Science
              </span>
              <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', fontWeight: '700', letterSpacing: '0.04em', marginTop: '2px' }}>
                YEAR 1
              </span>
            </div>

          </div>

          {/* EduRec Sync Gateway Section */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', fontWeight: '700', color: 'var(--text-secondary)', letterSpacing: '0.08em' }}>
              EDUREC SYNC GATEWAY
            </span>
            <button 
              className="btn-danger-block" 
              onClick={handleTriggerGateway}
              style={{ 
                display: 'flex', 
                gap: '8px', 
                justifyContent: 'center', 
                alignItems: 'center', 
                background: '#E52E2E', 
                border: 'none', 
                width: '100%', 
                padding: '12px 16px',
                borderRadius: '8px',
                color: 'white',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                fontWeight: '750',
                letterSpacing: '0.08em',
                cursor: 'pointer'
              }}
            >
              🔒 RETRIEVE INFO FROM EDUREC
            </button>
          </div>

          {/* Preferences Configurations Frame */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', fontWeight: '700', color: 'var(--text-secondary)', letterSpacing: '0.08em' }}>
              PREFERENCES CONFIGURATIONS
            </span>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              
              {/* Row 1 (GPA Privacy Lock) */}
              <div 
                className="card-premium" 
                style={{ 
                  flexDirection: 'row', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  padding: '12px 14px' 
                }}
              >
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flex: 1 }}>
                  <Shield style={{ width: 16, height: 16, color: 'var(--text-secondary)' }} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-primary)' }}>
                      GPA privacy lock
                    </span>
                    <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>
                      Masked numerical CAP score from peers
                    </span>
                  </div>
                </div>
                
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={profile.maskGpa} 
                    onChange={handleGPAToggle}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              {/* Row 2 (Direct Sync Triggers) */}
              <div 
                className="card-premium" 
                style={{ 
                  flexDirection: 'row', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  padding: '12px 14px' 
                }}
              >
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <Settings style={{ width: 16, height: 16, color: 'var(--text-secondary)' }} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-primary)' }}>
                      Direct Sync Triggers
                    </span>
                    <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>
                      Allow instant email notifications from mentors
                    </span>
                  </div>
                </div>
              </div>

              {/* Row 3 (NUS TalentConnect Portal) */}
              <div 
                className="card-premium" 
                style={{ 
                  flexDirection: 'row', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  padding: '12px 14px' 
                }}
              >
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <Link style={{ width: 16, height: 16, color: 'var(--text-secondary)' }} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-primary)' }}>
                      NUS TalentConnect Portal
                    </span>
                    <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>
                      Live API stream verification logs
                    </span>
                  </div>
                </div>
                <span 
                  style={{ 
                    fontSize: '9px', 
                    fontWeight: '800', 
                    color: 'var(--success)', 
                    background: 'rgba(0, 229, 163, 0.1)', 
                    padding: '4px 10px', 
                    borderRadius: '20px',
                    border: '1.5px solid var(--success)',
                    fontFamily: 'var(--font-mono)'
                  }}
                >
                  CONNECTED
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* VIEW 2 - EduRec Secure Identity Gateway Modal (Full-Page Overlay) */}
      <div className={`drawer-panel ${isOpen && showGateway ? 'open' : ''}`}>
        <div className="drawer-header gateway">
          <span className="drawer-title" style={{ color: 'white' }}>EDUREC SECURE IDENTITY GATEWAY</span>
          <button className="drawer-close" onClick={handleCancelGateway} disabled={syncStage !== 'idle'}>
            <X style={{ width: 16, height: 16 }} />
          </button>
        </div>

        <div className="drawer-content" style={{ background: '#090911' }}>
          
          {/* Authentication Success Circle */}
          <div className="gateway-success-header">
            <div className="gateway-success-badge">
              <Check style={{ width: 22, height: 22 }} />
            </div>
            <h4 className="gateway-auth-title">AUTHENTICATION SUCCESS</h4>
            <p className="gateway-auth-sub">Secured connection established with NUS IT</p>
          </div>

          {/* Requested Data Sync Assets info */}
          <div className="card-premium" style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '12px', gap: '4px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', fontWeight: '700', color: 'var(--text-muted)' }}>
              REQUESTED DATA SYNC ASSETS:
            </span>
            <p style={{ fontSize: '11px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
              UniSphere Student Accelerator requests permission to retrieve verified data rows for identity token verification:
            </p>
          </div>

          {/* Particulars Table */}
          <div className="card-premium" style={{ padding: '14px' }}>
            <table className="gateway-table">
              <tbody>
                <tr>
                  <td className="gateway-td-label">Full Name</td>
                  <td className="gateway-td-val">{profile.name}</td>
                </tr>
                <tr>
                  <td className="gateway-td-label">Birthday</td>
                  <td className="gateway-td-val">29 December 2005</td>
                </tr>
                <tr>
                  <td className="gateway-td-label">Gender</td>
                  <td className="gateway-td-val">Female</td>
                </tr>
                <tr>
                  <td className="gateway-td-label">Institution</td>
                  <td className="gateway-td-val">National University of Singapore</td>
                </tr>
                <tr>
                  <td className="gateway-td-label">Faculty</td>
                  <td className="gateway-td-val">School of Computing</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Verified Transcripts (EduRec) Grid */}
          <div className="resume-section">
            <span className="resume-section-title">Verified Transcripts (EduRec)</span>
            <div className="gateway-grid">
              <div className="gateway-module-card">
                <span className="gateway-m-code">CS1101S</span>
                <span className="gateway-m-grade">A+</span>
                <span className="gateway-m-verified">(Verified)</span>
              </div>
              <div className="gateway-module-card">
                <span className="gateway-m-code">CS1231S</span>
                <span className="gateway-m-grade">A</span>
                <span className="gateway-m-verified">(Verified)</span>
              </div>
              <div className="gateway-module-card">
                <span className="gateway-m-code">CS2030S</span>
                <span className="gateway-m-grade">A+</span>
                <span className="gateway-m-verified">(Verified)</span>
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center', padding: '0 8px', marginTop: '4px' }}>
            <p style={{ fontSize: '10px', color: 'var(--text-muted)', lineHeight: '1.4' }}>
              By clicking confirm, EduRec Secure Identity Gateway will sync these variables into the UniSphere global state context and update your student verified status.
            </p>
          </div>

          {/* Confirm sync bottom button with loading sequence */}
          <div style={{ marginTop: 'auto', paddingBottom: '10px' }}>
            {syncStage === 'idle' && (
              <button 
                className="btn-primary" 
                style={{ width: '100%', gap: '8px', padding: '14px 20px', background: 'var(--primary)' }}
                onClick={handleStartSync}
              >
                <ShieldCheck style={{ width: 16, height: 16 }} />
                CONFIRM & SYNC DATA ASSETS
              </button>
            )}

            {syncStage === 'transmitting' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
                <button 
                  className="btn-primary" 
                  style={{ 
                    width: '100%', 
                    padding: '14px 20px', 
                    background: 'var(--bg-surface)', 
                    border: '1px solid var(--border)', 
                    color: 'var(--text-secondary)', 
                    cursor: 'not-allowed', 
                    boxShadow: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                  disabled
                >
                  <RefreshCw 
                    style={{ 
                      width: 14, 
                      height: 14, 
                      color: 'var(--accent)', 
                      animation: 'spin 1.5s linear infinite' 
                    }} 
                  />
                  TRANSMITTING INFORMATION...
                </button>
                <div className="sync-progress-container">
                  <div className="sync-progress-bar"></div>
                </div>
              </div>
            )}

            {syncStage === 'success' && (
              <button 
                className="btn-primary" 
                style={{ 
                  width: '100%', 
                  padding: '14px 20px', 
                  background: 'rgba(0, 229, 163, 0.1)', 
                  border: '1.5px solid var(--success)', 
                  color: 'var(--success)', 
                  boxShadow: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
                disabled
              >
                <Check style={{ width: 16, height: 16 }} />
                SUCCESS!
              </button>
            )}
          </div>

        </div>
      </div>
    </>
  );
}
