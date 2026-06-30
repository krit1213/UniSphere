import React, { useState } from 'react';
import { Search, ArrowLeft, Calendar, Clock, MapPin, Users, Check, Sparkles, SlidersHorizontal } from 'lucide-react';

export default function EventsTab({ events, selectedEvent, setSelectedEvent, onToggleRSVP }) {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter toggle states
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]); // multi-select array
  const [tempFilters, setTempFilters] = useState([]);

  // Find selected event object from id
  const selectedEventObject = events.find(evt => evt.id === selectedEvent);

  const toggleTempFilter = (filterId) => {
    if (tempFilters.includes(filterId)) {
      setTempFilters(tempFilters.filter(f => f !== filterId));
    } else {
      setTempFilters([...tempFilters, filterId]);
    }
  };

  const handleToggleFilters = () => {
    if (!showFilters) {
      setTempFilters(activeFilters);
    }
    setShowFilters(!showFilters);
  };

  // Filter events (search text + active filters multi-select match)
  const filteredEvents = events.filter(evt => {
    // 1. Text Search Match
    const textMatch = evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.category.toLowerCase().includes(searchQuery.toLowerCase());
      
    if (!textMatch) return false;

    // 2. Active filters Match
    if (activeFilters.length > 0) {
      return activeFilters.some(filter => {
        if (filter === 'Hackathons' && evt.category === 'HACKATHON') return true;
        if (filter === 'Mixers' && evt.category === 'TECH MIXER') return true;
        if (filter === 'Workshops' && evt.category === 'WORKSHOP') return true;
        if (filter === 'Networking Events' && evt.category === 'TECH MIXER') return true;
        return false;
      });
    }

    return true;
  });

  // Full-page event abstract view
  if (selectedEventObject) {
    const isRegistered = selectedEventObject.rsvp;
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', animation: 'fadeIn 0.2s ease-out', paddingBottom: '20px' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button 
            onClick={() => setSelectedEvent(null)}
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
          <span className="section-title-tracking" style={{ fontSize: '12px' }}>
            EVENT ABSTRACT DETAILS
          </span>
        </div>

        {/* Abstract Intro */}
        <div className="card-premium" style={{ gap: '6px' }}>
          <span className="event-tag" style={{ alignSelf: 'flex-start' }}>{selectedEventObject.category}</span>
          <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '18px', fontWeight: '800' }}>
            {selectedEventObject.title.toUpperCase()}
          </h3>
          <span style={{ fontSize: '10.5px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
            Stream: {selectedEventObject.stream}
          </span>
        </div>

        {/* Abstract & Portfolio Impact */}
        <div className="card-premium" style={{ gap: '8px' }}>
          <span className="section-title-tracking" style={{ fontSize: '9px', color: 'var(--primary)' }}>
            EVENT ABSTRACT & PORTFOLIO IMPACT
          </span>
          <p style={{ fontSize: '12px', color: 'var(--text-primary)', lineHeight: '1.5' }}>
            {selectedEventObject.abstractText}
          </p>
        </div>

        {/* Event Timeline Schedule */}
        <div className="card-premium" style={{ gap: '8px' }}>
          <span className="section-title-tracking" style={{ fontSize: '9px', color: 'var(--text-secondary)' }}>
            EVENT TIMELINE SCHEDULE
          </span>
          <p style={{ fontSize: '12.5px', fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', fontWeight: '600' }}>
            {selectedEventObject.date}, {selectedEventObject.time}
          </p>
        </div>

        {/* Panelists & Speakers */}
        <div className="card-premium" style={{ gap: '8px' }}>
          <span className="section-title-tracking" style={{ fontSize: '9px', color: 'var(--text-secondary)' }}>
            PANELISTS & GUEST SPEAKERS
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {selectedEventObject.speakers.map((speaker, idx) => (
              <span 
                key={idx} 
                className="skill-tag-capsule" 
                style={{ 
                  fontSize: '11px', 
                  fontFamily: 'var(--font-mono)', 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '4px',
                  background: 'rgba(255, 255, 255, 0.02)'
                }}
              >
                🗣️ {speaker}
              </span>
            ))}
          </div>
        </div>

        {/* Prerequisite Preparation */}
        <div className="card-premium" style={{ gap: '8px' }}>
          <span className="section-title-tracking" style={{ fontSize: '9px', color: 'var(--text-secondary)' }}>
            PREREQUISITE PREPARATION
          </span>
          <p style={{ fontSize: '12px', color: 'var(--text-primary)', lineHeight: '1.4' }}>
            {selectedEventObject.prerequisites}
          </p>
        </div>

        {/* Location Row */}
        <div className="card-premium" style={{ gap: '8px' }}>
          <span className="section-title-tracking" style={{ fontSize: '9px', color: 'var(--text-secondary)' }}>
            LOCATION
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-primary)' }}>
            <MapPin style={{ width: 14, height: 14, color: 'var(--danger)' }} />
            <span style={{ fontFamily: 'var(--font-mono)' }}>{selectedEventObject.location}</span>
          </div>
        </div>

        {/* Registration Button Footer */}
        <div style={{ marginTop: '10px', paddingBottom: '10px' }}>
          {isRegistered ? (
            <button 
              className="btn-primary" 
              style={{ 
                width: '100%', 
                background: 'rgba(0, 229, 163, 0.05)', 
                border: '1.5px solid var(--success)', 
                color: 'var(--success)', 
                boxShadow: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
              onClick={() => onToggleRSVP(selectedEventObject.id)}
            >
              <Check style={{ width: 16, height: 16 }} />
              EVENT SUCCESSFULLY REGISTERED
            </button>
          ) : (
            <button 
              className="btn-primary" 
              style={{ width: '100%', background: 'var(--primary)', border: 'none' }}
              onClick={() => onToggleRSVP(selectedEventObject.id)}
            >
              REGISTER EVENT SLOT
            </button>
          )}
        </div>

      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', animation: 'fadeIn 0.2s ease-in' }}>
      
      {/* Search Input Bar */}
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', position: 'relative' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <input 
            type="text" 
            placeholder="Search campus Mixers & Hackathons..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border)',
              borderRadius: '10px',
              padding: '10px 12px 10px 38px',
              fontSize: '12.5px',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-sans)',
              outline: 'none',
              transition: 'var(--transition-snappy)'
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--border-focus)'}
            onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
          />
          <Search 
            style={{ 
              position: 'absolute', 
              left: 12, 
              top: '50%', 
              transform: 'translateY(-50%)', 
              width: 16, 
              height: 16, 
              color: 'var(--text-muted)' 
            }} 
          />
        </div>

        {/* Filter adjustments toggle button */}
        <button 
          style={{
            background: 'transparent',
            border: showFilters ? '1.5px solid var(--accent)' : '1px solid var(--border)',
            borderRadius: '10px',
            width: '38px',
            height: '38px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: showFilters ? 'var(--accent)' : 'var(--text-primary)',
            cursor: 'pointer'
          }}
          title="Filter Events"
          onClick={handleToggleFilters}
        >
          <SlidersHorizontal style={{ width: 16, height: 16 }} />
        </button>

        {/* Glassmorphic Multi-Select Search Filter Overlay */}
        {showFilters && (
          <div 
            className="glass-filter-overlay"
            style={{
              position: 'absolute',
              top: '48px',
              right: '0',
              width: '260px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              animation: 'fadeIn 0.15s ease-out'
            }}
          >
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8.5px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '6px' }}>
              SELECT FILTERS (MULTI-SELECT)
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {[
                { id: 'Hackathons', label: 'Hackathons' },
                { id: 'Mixers', label: 'Mixers' },
                { id: 'Workshops', label: 'Workshops' },
                { id: 'Networking Events', label: 'Networking Events' }
              ].map(f => {
                const isSelected = tempFilters.includes(f.id);
                return (
                  <div 
                    key={f.id}
                    onClick={() => toggleTempFilter(f.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '11px',
                      fontFamily: 'var(--font-sans)',
                      color: isSelected ? 'var(--accent)' : 'var(--text-secondary)',
                      background: isSelected ? 'rgba(0, 240, 255, 0.05)' : 'transparent',
                      border: `1px solid ${isSelected ? 'var(--accent)' : 'rgba(255,255,255,0.05)'}`,
                      borderRadius: '8px',
                      padding: '6px 10px',
                      cursor: 'pointer',
                      transition: 'var(--transition-snappy)'
                    }}
                  >
                    <input 
                      type="checkbox"
                      checked={isSelected}
                      readOnly
                      style={{ accentColor: 'var(--accent)', cursor: 'pointer' }}
                    />
                    <span>{f.label}</span>
                  </div>
                );
              })}
            </div>
            
            {/* Sticky bottom Apply Filters Button */}
            <button
              type="button"
              className="btn-primary"
              style={{
                width: '100%',
                padding: '10px 0',
                fontSize: '11px',
                fontFamily: 'var(--font-mono)',
                border: 'none',
                background: 'var(--primary)',
                borderRadius: '8px',
                color: 'white',
                fontWeight: '700',
                cursor: 'pointer',
                marginTop: '6px',
                boxShadow: '0 4px 10px var(--primary-glow)'
              }}
              onClick={() => {
                setActiveFilters(tempFilters);
                setShowFilters(false);
              }}
            >
              APPLY FILTERS
            </button>
          </div>
        )}
      </div>

      {/* Directory Events Cards List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filteredEvents.length === 0 ? (
          <div className="card-premium" style={{ padding: '24px', textAlign: 'center', color: 'var(--text-secondary)' }}>
            No events found matching your search.
          </div>
        ) : (
          filteredEvents.map(evt => (
            <div 
              key={evt.id} 
              className="card-premium"
              style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px', cursor: 'pointer' }}
              onClick={() => setSelectedEvent(evt.id)}
            >
              {/* Header Row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="event-tag" style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 'bold' }}>{evt.category}</span>
                {evt.rsvp && (
                  <span 
                    style={{ 
                      fontSize: '10px', 
                      fontWeight: '800', 
                      color: 'var(--success)', 
                      background: 'rgba(0, 229, 163, 0.1)', 
                      padding: '3px 8px', 
                      borderRadius: '6px',
                      border: '1.5px solid var(--success)',
                      fontFamily: 'var(--font-mono)'
                    }}
                  >
                    REGISTERED
                  </span>
                )}
              </div>

              {/* Typography Block */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <h3 className="text-card-title" style={{ margin: 0, color: 'var(--text-primary)' }}>
                  {evt.title.toUpperCase()}
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>📍</span>
                  <span className="text-card-subtext" style={{ color: 'var(--text-secondary)' }}>{evt.location}</span>
                </div>
              </div>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', margin: '4px 0 0 0' }} />

              {/* Footer Meta Line */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>📅</span>
                  <span className="text-card-meta" style={{ color: 'var(--text-secondary)' }}>
                    {evt.date}{evt.time ? `, ${evt.time}` : ''}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>👥</span>
                  <span className="text-card-meta" style={{ color: 'var(--text-primary)' }}>
                    {evt.joinedCount + (evt.rsvp ? 1 : 0)} joined
                  </span>
                </div>
              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
}
