import React from 'react';
import { Home, Users, Calendar, Briefcase } from 'lucide-react';

export default function Footer({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'home', label: 'HOME', icon: Home },
    { id: 'connect', label: 'CONNECT', icon: Users },
    { id: 'events', label: 'EVENTS', icon: Calendar },
    { id: 'career', label: 'CAREERS', icon: Briefcase },
  ];

  return (
    <footer className="app-footer">
      {tabs.map((tab) => {
        const IconComponent = tab.icon;
        return (
          <button
            key={tab.id}
            className={`footer-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => onTabChange(tab.id)}
          >
            <IconComponent />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </footer>
  );
}
