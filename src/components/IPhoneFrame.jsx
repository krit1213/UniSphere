import React, { useState, useEffect } from 'react';
import { Wifi, Battery, Signal } from 'lucide-react';

export default function IPhoneFrame({ children }) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // hour '0' should be '12'
      setTime(`${hours}:${minutes} ${ampm}`);
    };
    
    updateClock();
    const interval = setInterval(updateClock, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="phone-wrapper">
      <div className="phone-frame">
        {/* Dynamic Island Notch */}
        <div className="phone-notch">
          <div className="notch-camera"></div>
          <div className="notch-speaker"></div>
        </div>

        {/* Status Bar */}
        <div className="phone-status-bar">
          <span style={{ fontSize: '11px', letterSpacing: '-0.1px' }}>{time || "12:09 PM"}</span>
          <div className="status-right">
            <Signal style={{ width: 14, height: 14 }} />
            <Wifi style={{ width: 14, height: 14 }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
              <span style={{ fontSize: '9px', fontWeight: '700' }}>94%</span>
              <Battery style={{ width: 16, height: 16, strokeWidth: 1.5 }} />
            </div>
          </div>
        </div>

        {/* Screen Viewport */}
        <div className="phone-screen">
          {children}
        </div>

        {/* Bottom Home Indicator */}
        <div className="phone-home-indicator"></div>
      </div>
    </div>
  );
}
