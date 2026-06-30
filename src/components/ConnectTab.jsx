import React, { useState } from 'react';
import { Search, SlidersHorizontal, ArrowLeft, Star, Code, Terminal, Calendar, Award } from 'lucide-react';

export default function ConnectTab({ peers, selectedPeer, setSelectedPeer, onCreateBooking }) {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter toggle states
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]); // multi-select array
  const [tempFilters, setTempFilters] = useState([]);

  // Modal states for tutoring and career sync requests
  const [activeModal, setActiveModal] = useState(null); // 'tutor' | 'sync' | null
  const [tutorModule, setTutorModule] = useState('CS1231S');
  const [tutorRemarks, setTutorRemarks] = useState('');
  const [syncTopic, setSyncTopic] = useState('');
  const [syncRemarks, setSyncRemarks] = useState('');

  // Extract initials (must be exactly two capitalized letters)
  const getInitials = (name) => {
    if (!name) return 'KK';
    const clean = name.trim().toUpperCase();
    if (clean === "KALEESWARAN KRITHIGA" || clean === "KALEESWARAN'S STUDENT PROFILE") return "KK";
    if (clean === "TAN WEI JIE" || clean === "TAN WEI JIE WANTS HELP ON CS2030S JAVA STRUCTURES.") return "WJ";
    if (clean === "AISHA BINTE AHMAD") return "AA";
    if (clean === "MARCUS CHEN") return "MC";
    if (clean === "PRIYA NAIR") return "PN";
    if (clean === "DYLAN ONG") return "DO";
    
    const parts = clean.split(/\s+/);
    if (parts.length >= 2) {
      if (parts[0] === "TAN" && parts.length >= 3) {
        return parts[1][0] + parts[2][0];
      }
      return parts[0][0] + parts[parts.length - 1][0];
    }
    return clean.slice(0, 2);
  };

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

  const filterGroups = [
    {
      title: 'MODULE',
      options: [
        { id: 'CS1231S', label: 'CS1231S' },
        { id: 'CS2030S', label: 'CS2030S' },
        { id: 'CS2103T', label: 'CS2103T' }
      ]
    },
    {
      title: 'COURSE',
      options: [
        { id: 'Computer Science', label: 'Computer Science' },
        { id: 'Information Systems', label: 'Information Systems' },
        { id: 'Business Analytics', label: 'Business Analytics' },
        { id: 'Information Security', label: 'Information Security' },
        { id: 'Computer Engineering', label: 'Computer Engineering' }
      ]
    },
    {
      title: 'YEAR',
      options: [
        { id: 'Year 1', label: 'Year 1' },
        { id: 'Year 2', label: 'Year 2' },
        { id: 'Year 3', label: 'Year 3' },
        { id: 'Year 4', label: 'Year 4' }
      ]
    }
  ];

  // Filter peers in directory (search query + active filters array)
  const filteredPeers = peers.filter(peer => {
    // 1. Text Search query Match
    const textMatch = peer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      peer.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      peer.internships.toLowerCase().includes(searchQuery.toLowerCase());
      
    if (!textMatch) return false;

    // 2. Active filters Match (multi-select match)
    if (activeFilters.length > 0) {
      const selectedModules = activeFilters.filter(f => ['CS1231S', 'CS2030S', 'CS2103T'].includes(f));
      const selectedCourses = activeFilters.filter(f => ['Computer Science', 'Information Systems', 'Business Analytics', 'Information Security', 'Computer Engineering'].includes(f));
      const selectedYears = activeFilters.filter(f => ['Year 1', 'Year 2', 'Year 3', 'Year 4'].includes(f));

      if (selectedModules.length > 0) {
        const hasModule = peer.transcripts.some(t => selectedModules.includes(t.code));
        if (!hasModule) return false;
      }

      if (selectedCourses.length > 0) {
        const hasCourse = selectedCourses.some(course => peer.degree.toLowerCase().includes(course.toLowerCase()));
        if (!hasCourse) return false;
      }

      if (selectedYears.length > 0) {
        const hasYear = selectedYears.some(year => peer.degree.toLowerCase().includes(year.toLowerCase()));
        if (!hasYear) return false;
      }
    }
    
    return true;
  });

  const handleOpenModal = (type) => {
    setActiveModal(type);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
    setTutorModule('CS1231S');
    setTutorRemarks('');
    setSyncTopic('');
    setSyncRemarks('');
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();
    if (!selectedPeer) return;

    if (activeModal === 'tutor') {
      onCreateBooking({
        peerId: selectedPeer.id,
        peerName: selectedPeer.name,
        type: 'tutor',
        module: tutorModule,
        remarks: tutorRemarks
      });
    } else {
      onCreateBooking({
        peerId: selectedPeer.id,
        peerName: selectedPeer.name,
        type: 'sync',
        topic: syncTopic,
        remarks: syncRemarks
      });
    }

    handleCloseModal();
    setSelectedPeer(null); // Return to directory feed after submitting
  };

  const handleClose = () => {
    setSelectedPeer(null);
  };

  // If a peer is selected, render the full-screen "Digital Resume" View
  if (selectedPeer) {
    const initials = getInitials(selectedPeer.name);
    const isOwnProfile = selectedPeer.id === 'user-profile';
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', animation: 'fadeIn 0.2s ease-out', paddingBottom: '20px', position: 'relative' }}>
        
        {/* Digital Resume Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button 
            onClick={handleClose}
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
          
          <span 
            className="section-title-tracking" 
            style={{ fontSize: '12px', color: 'var(--text-primary)', fontWeight: '800' }}
          >
            DIGITAL RESUME
          </span>
          
          <span 
            style={{
              fontSize: '9px',
              fontWeight: '800',
              color: 'var(--accent)',
              border: '1px solid var(--accent)',
              borderRadius: '6px',
              padding: '2px 8px',
              fontFamily: 'var(--font-mono)'
            }}
          >
            nus.edu.sg
          </span>
        </div>

        {/* Student Intro Card */}
        <div className="card-premium" style={{ gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div className="profile-badge-k" style={{ width: 52, height: 52, fontSize: '18px' }}>
              {initials}
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: '800' }}>
                {selectedPeer.name.toUpperCase()}
              </h3>
              <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                {selectedPeer.degree}
              </span>
              <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                {selectedPeer.email}
              </span>
            </div>
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', margin: '4px 0' }} />

          {/* Three side-by-side metric lines */}
          <div style={{ display: 'flex', justifyContent: 'space-between', textAlign: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', fontWeight: '800', color: 'var(--text-primary)' }}>
                {selectedPeer.stats.contexts}
              </span>
              <span style={{ fontSize: '7.5px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', marginTop: '2px' }}>
                PEER CONTEXTS ANCH
              </span>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', fontWeight: '800', color: 'var(--text-primary)' }}>
                {selectedPeer.stats.hackathons}
              </span>
              <span style={{ fontSize: '7.5px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', marginTop: '2px' }}>
                HACKATHONS ANCH
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', fontWeight: '800', color: 'var(--accent)' }}>
                {selectedPeer.rating} ★
              </span>
              <span style={{ fontSize: '7.5px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', marginTop: '2px' }}>
                RATING ACED
              </span>
            </div>
          </div>
        </div>

        {/* Academic Transcripts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span className="section-title-tracking" style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>
            ACADEMIC TRANSCRIPTS
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {selectedPeer.transcripts.map((t, idx) => (
              <div 
                key={idx} 
                className="card-premium" 
                style={{ 
                  flexDirection: 'row',
                  gap: '6px',
                  padding: '6px 12px', 
                  borderRadius: '8px', 
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono)',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
              >
                <span style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{t.code}:</span>
                <span style={{ color: 'var(--accent)', fontWeight: '800' }}>{t.grade}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Verified SDE Teaching Logs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span className="section-title-tracking" style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>
            VERIFIED SDE TEACHING LOGS
          </span>
          <div 
            className="card-premium" 
            style={{ 
              flexDirection: 'row', 
              alignItems: 'center', 
              gap: '10px', 
              padding: '10px 12px',
              border: '1.5px solid rgba(124, 92, 255, 0.25)',
              background: 'rgba(124, 92, 255, 0.03)'
            }}
          >
            <Code style={{ width: 14, height: 14, color: 'var(--primary)' }} />
            <span style={{ fontSize: '11.5px', fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', fontWeight: '600' }}>
              {selectedPeer.teachingLogs}
            </span>
          </div>
        </div>

        {/* Technical Projects */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span className="section-title-tracking" style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>
            TECHNICAL PROJECTS
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {selectedPeer.tags.map((skill, idx) => (
              <span 
                key={idx} 
                className="skill-tag-capsule" 
                style={{ fontSize: '10px', padding: '4px 10px', border: '1px solid rgba(255, 255, 255, 0.1)' }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Career Experience Timeline (Visual Chronological Layout) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span className="section-title-tracking" style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>
            CAREER EXPERIENCE TIMELINE
          </span>
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '20px', paddingLeft: '22px', marginTop: '10px' }}>
            
            {/* Vertical Accent Timeline Line */}
            <div 
              style={{
                position: 'absolute',
                left: '6px',
                top: '4px',
                bottom: '4px',
                width: '2px',
                background: 'linear-gradient(180deg, var(--primary) 0%, var(--accent) 100%)',
                opacity: 0.5
              }}
            />

            {selectedPeer.timeline.map((line, idx) => {
              const parts = line.split(' - ');
              if (parts.length === 3) {
                const [role, company, date] = parts;
                return (
                  <div key={idx} style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                    {/* Node Dot with Glow */}
                    <div 
                      style={{ 
                        position: 'absolute', 
                        left: '-22px', 
                        top: '4px', 
                        width: '10px', 
                        height: '10px', 
                        borderRadius: '50%', 
                        background: idx % 2 === 0 ? 'var(--primary)' : 'var(--accent)', 
                        border: '2px solid var(--bg-app)', 
                        boxShadow: `0 0 8px ${idx % 2 === 0 ? 'var(--primary-glow)' : 'var(--accent-glow)'}`
                      }} 
                    />
                    <span style={{ fontSize: '12.5px', fontWeight: '700', color: 'var(--text-primary)', fontFamily: 'var(--font-sans)' }}>
                      {role}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '10.5px', fontFamily: 'var(--font-mono)' }}>
                      <span style={{ color: 'var(--accent)', fontWeight: '700' }}>{company.toUpperCase()}</span>
                      <span style={{ color: 'var(--text-muted)' }}>•</span>
                      <span style={{ color: 'var(--text-secondary)' }}>{date}</span>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div key={idx} style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                    <div 
                      style={{ 
                        position: 'absolute', 
                        left: '-22px', 
                        top: '4px', 
                        width: '10px', 
                        height: '10px', 
                        borderRadius: '50%', 
                        background: 'var(--primary)', 
                        border: '2px solid var(--bg-app)', 
                        boxShadow: '0 0 8px var(--primary-glow)'
                      }} 
                    />
                    <span style={{ fontSize: '12px', color: 'var(--text-primary)', fontWeight: '500', fontFamily: 'var(--font-sans)' }}>
                      {line}
                    </span>
                  </div>
                );
              }
            })}
          </div>
        </div>

        {/* Action Footer Control - Conditional Buttons */}
        {!isOwnProfile && (
          <div style={{ display: 'flex', gap: '10px', marginTop: '10px', paddingBottom: '10px' }}>
            <button 
              className="btn-primary" 
              style={{ flex: 1, padding: '12px 14px', fontSize: '11px', fontFamily: 'var(--font-mono)', background: 'var(--primary)', border: 'none' }}
              onClick={() => handleOpenModal('tutor')}
            >
              Book a tutor
            </button>
            <button 
              className="btn-secondary" 
              style={{ flex: 1, padding: '12px 14px', fontSize: '11px', fontFamily: 'var(--font-mono)' }}
              onClick={() => handleOpenModal('sync')}
            >
              Request career sync
            </button>
          </div>
        )}

        {/* Centered High-Fidelity Request Popup Overlay Modals */}
        {activeModal && (
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
              zIndex: 2000,
              padding: '16px',
              animation: 'fadeIn 0.2s ease-out'
            }}
          >
            <form 
              onSubmit={handleModalSubmit}
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
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.08em', color: 'var(--text-primary)', fontWeight: '700' }}>
                  {activeModal === 'tutor' ? 'BOOK A TUTOR REQUEST' : 'CAREER SYNC REQUEST'}
                </span>
                <button 
                  type="button" 
                  onClick={handleCloseModal}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '700'
                  }}
                >
                  ✕
                </button>
              </div>

              {/* Dynamic Form Queries */}
              {activeModal === 'tutor' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '11px', color: 'var(--text-secondary)', fontFamily: 'var(--font-sans)', fontWeight: '600' }}>
                    What modules do you want help for?
                  </label>
                  <select
                    value={tutorModule}
                    onChange={(e) => setTutorModule(e.target.value)}
                    style={{
                      background: 'var(--bg-app)',
                      border: '1px solid var(--border)',
                      borderRadius: '8px',
                      padding: '10px',
                      color: 'var(--text-primary)',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '12px',
                      outline: 'none',
                      width: '100%'
                    }}
                  >
                    <option value="CS1231S">CS1231S Discrete Structures</option>
                    <option value="CS1101S">CS1101S Programming Methodology</option>
                    <option value="CS2030S">CS2030S Programming Methodology II</option>
                    <option value="CS2040S">CS2040S Data Structures & Algorithms</option>
                  </select>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '11px', color: 'var(--text-secondary)', fontFamily: 'var(--font-sans)', fontWeight: '600' }}>
                    Where do you need mentoring for?
                  </label>
                  <input 
                    type="text"
                    placeholder="e.g. Stripe PM Intern Prep"
                    value={syncTopic}
                    onChange={(e) => setSyncTopic(e.target.value)}
                    required
                    style={{
                      background: 'var(--bg-app)',
                      border: '1px solid var(--border)',
                      borderRadius: '8px',
                      padding: '10px',
                      color: 'var(--text-primary)',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '12px',
                      outline: 'none',
                      width: '100%'
                    }}
                  />
                </div>
              )}

              {/* Remarks Textarea */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '11px', color: 'var(--text-secondary)', fontFamily: 'var(--font-sans)', fontWeight: '600' }}>
                  Any other remarks?
                </label>
                <textarea 
                  placeholder="Remarks, schedule details, or questions..."
                  value={activeModal === 'tutor' ? tutorRemarks : syncRemarks}
                  onChange={(e) => activeModal === 'tutor' ? setTutorRemarks(e.target.value) : setSyncRemarks(e.target.value)}
                  style={{
                    background: 'var(--bg-app)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    padding: '10px',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '12px',
                    outline: 'none',
                    width: '100%',
                    minHeight: '80px',
                    resize: 'vertical'
                  }}
                />
              </div>

              {/* Action Submit */}
              <button 
                type="submit"
                className="btn-primary"
                style={{
                  width: '100%',
                  background: 'var(--primary)',
                  fontFamily: 'var(--font-mono)',
                  marginTop: '6px',
                  border: 'none'
                }}
              >
                {activeModal === 'tutor' ? 'SUBMIT REQUEST' : 'SUBMIT SYNC ENGAGEMENT'}
              </button>
            </form>
          </div>
        )}

      </div>
    );
  }

  // Otherwise, render the main Connect directory Talent feed list
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', animation: 'fadeIn 0.2s ease-in' }}>
      
      {/* Search Bar Input Container */}
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', position: 'relative' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <input 
            type="text" 
            placeholder="Search talents, modules, or careers..." 
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
        
        {/* Square outline filter icon */}
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
          title="Filter Talents"
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
              gap: '12px',
              animation: 'fadeIn 0.15s ease-out',
              maxHeight: '420px',
              overflowY: 'auto'
            }}
          >
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8.5px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '6px' }}>
              SELECT FILTERS (MULTI-SELECT)
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {filterGroups.map(group => (
                <div key={group.title} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', fontWeight: '700', color: 'var(--primary)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    {group.title}
                  </span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    {group.options.map(option => {
                      const isSelected = tempFilters.includes(option.id);
                      return (
                        <div 
                          key={option.id}
                          onClick={() => toggleTempFilter(option.id)}
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
                          <span>{option.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
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

      {/* Peer Talent Cards Feed */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filteredPeers.length === 0 ? (
          <div className="card-premium" style={{ padding: '24px', textAlign: 'center', color: 'var(--text-secondary)' }}>
            No verified peers found matching your criteria.
          </div>
        ) : (
          filteredPeers.map(peer => {
            const initials = getInitials(peer.name);
            
            return (
              <div 
                key={peer.id} 
                className="card-premium"
                style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px', cursor: 'pointer' }}
                onClick={() => setSelectedPeer(peer)}
              >
                {/* Avatar / Name / Rating Row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <div 
                      className="profile-badge-k" 
                      style={{ 
                        width: 36, 
                        height: 36, 
                        fontSize: '11px', 
                        boxShadow: 'none',
                        fontFamily: 'var(--font-mono)',
                        border: '1px solid rgba(255,255,255,0.1)' 
                      }}
                    >
                      {initials}
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <h4 className="text-card-title" style={{ margin: 0 }}>
                          {peer.name}
                        </h4>
                        <span 
                          style={{
                            fontSize: '8px',
                            fontWeight: '700',
                            color: 'var(--text-secondary)',
                            border: '1px solid var(--border)',
                            borderRadius: '4px',
                            padding: '1px 4px',
                            fontFamily: 'var(--font-mono)'
                          }}
                        >
                          nus.edu.sg
                        </span>
                      </div>
                      <span className="text-card-subtext">
                        {peer.degree}
                      </span>
                    </div>
                  </div>

                  {/* Rating Block */}
                  <span 
                    className="text-card-meta"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '3px',
                      color: 'white',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid var(--border)',
                      padding: '3px 8px',
                      borderRadius: '8px'
                    }}
                  >
                    <Star style={{ width: 10, height: 10, fill: '#FFDF00', color: '#FFDF00' }} />
                    {peer.rating}
                  </span>
                </div>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', margin: '2px 0' }} />

                {/* Modules & Internships trackers */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span 
                      className="text-card-meta"
                      style={{ 
                        color: 'var(--text-muted)', 
                        width: '90px'
                      }}
                    >
                      MODULES:
                    </span>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      {peer.transcripts.map((t, idx) => (
                        <span 
                          key={idx}
                          className="text-card-meta"
                          style={{
                            background: '#1F2438',
                            color: 'white',
                            padding: '2px 6px',
                            borderRadius: '4px',
                            border: '1px solid rgba(255, 255, 255, 0.05)'
                          }}
                        >
                          {t.code}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span 
                      className="text-card-meta"
                      style={{ 
                        color: 'var(--text-muted)', 
                        width: '90px'
                      }}
                    >
                      INTERNSHIPS:
                    </span>
                    <span 
                      className="text-card-meta"
                      style={{ 
                        color: 'var(--text-primary)',
                        background: 'rgba(255, 255, 255, 0.03)',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        border: '1px solid rgba(255, 255, 255, 0.05)'
                      }}
                    >
                      {peer.internships}
                    </span>
                  </div>
                </div>

              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
