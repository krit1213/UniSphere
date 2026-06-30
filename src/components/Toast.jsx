import React, { useEffect } from 'react';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

export default function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="toast">
      {type === 'success' ? (
        <CheckCircle className="text-accent" style={{ color: 'var(--accent)', width: 18, height: 18 }} />
      ) : (
        <AlertCircle className="text-danger" style={{ color: 'var(--danger)', width: 18, height: 18 }} />
      )}
      <span style={{ flex: 1 }}>{message}</span>
      <button 
        onClick={onClose} 
        style={{ 
          background: 'transparent', 
          border: 'none', 
          color: 'var(--text-muted)', 
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <X style={{ width: 14, height: 14 }} />
      </button>
    </div>
  );
}
