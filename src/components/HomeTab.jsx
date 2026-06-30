import React, { useState, useEffect } from 'react';
import { ArrowLeft, Trash2, Edit3, Sparkles, Info, ChevronRight } from 'lucide-react';

// Precompiled array of diverse, high-credibility tech articles
const techArticles = [
  {
    title: "The Evolution of Spatial UI Design",
    summary: "Spatial computing interfaces are transitioning from raw pixel projections to context-aware depth layers. By prioritizing depth cues and natural input vectors, spatial UI creates immersive environments that reduce cognitive fatigue while maximizing layout interactive real-estate.",
    mitigation: "Practice responsive container scaling, flex layouts, and depth-based z-index configurations. Fulfill this by exploring the specialized UI/UX workshop tracks and matching with peer UI consultants in the Connect Hub.",
    tips: [
      "Use CSS variables for dynamic depth-layer z-indexing",
      "Adopt fluid typography and rem-based margins to handle view scaling",
      "Engage with peer review sessions on spatial design layouts"
    ]
  },
  {
    title: "How Clean Code Frameworks Reshape SMB Operations",
    summary: "Modern software design patterns are no longer isolated to enterprise stacks. Small and medium business engineering operations are heavily adopting clean modular architecture to cut technical debt, accelerate deployment pipelines, and empower hybrid developer teams.",
    mitigation: "Focus on clean decoupling, modular component lines, and comprehensive helper functions. Enhance your portfolio indexing by targeting structured coding review tasks and core university SWE projects.",
    tips: [
      "Decompose large component files into focused, reusable sub-components",
      "Establish standardized state sync rules between global contexts and local states",
      "Register for code-refactoring workshops in the upcoming university mixer"
    ]
  },
  {
    title: "Green Computing Standards for 2026",
    summary: "Carbon-efficient coding practices are moving from regulatory drafts into core engine build pipelines. Modern compilers and client runtime environments are optimizing resource consumption by minimizing CPU wake cycles and reducing unnecessary network roundtrips.",
    mitigation: "Understand runtime performance, micro-optimizations, and async data-fetching patterns. Build proof capacity by attending the upcoming React Performance deep dives and systems engineering workshops.",
    tips: [
      "Minimize rendering cycles by profiling component memoization targets",
      "Favour localized state hooks over intensive global state broadcast loops",
      "Enroll in backend systems engineering opportunities to verify proof metrics"
    ]
  }
];

export default function HomeTab({ 
  profile, 
  engagements, 
  onDeleteEngagement, 
  ledgerStats, 
  onNavigateToTab,
  onUpdateProfile,
  onRoadmapRedirect,
  selectedEngagement,
  setSelectedEngagement,
  homeResetKey
}) {
  const [showUpcomingSchedule, setShowUpcomingSchedule] = useState(false);
  const [showRoadmapCatalog, setShowRoadmapCatalog] = useState(false);
  const [infoModal, setInfoModal] = useState(null); // 'reviews' | 'hackathons' | 'capabilities' | null
  
  const [selectedArticle, setSelectedArticle] = useState(techArticles[0]);
  const [showBriefingOverlay, setShowBriefingOverlay] = useState(false);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * techArticles.length);
    setSelectedArticle(techArticles[randomIndex]);
  }, []);

  useEffect(() => {
    setShowUpcomingSchedule(false);
    setShowRoadmapCatalog(false);
    setShowBriefingOverlay(false);
  }, [homeResetKey]);

  // Edit Mode states for Accelerator Hub
  const [isEditing, setIsEditing] = useState(false);
  const [editSkills, setEditSkills] = useState([]);
  const [editGoals, setEditGoals] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [newGoal, setNewGoal] = useState('');

  const roadmapCatalog = [
    {
      id: 'road-1',
      title: "Review CS1231S Proofs",
      desc: "Practice mathematical induction with Marcus Chen.",
      actionText: "CONNECT NOW >",
      targetTab: 'connect',
      targetId: 'p-marcus'
    },
    {
      id: 'road-2',
      title: "GovTech SWE Internship",
      desc: "Match and sync layout competencies.",
      actionText: "VIEW ROLE >",
      targetTab: 'career',
      targetId: 'govtech-uiux'
    },
    {
      id: 'road-3',
      title: "NUS Hack & Roll 2026",
      desc: "Register for the hackathon to fulfill Stripe prereqs.",
      actionText: "EXPLORE EVENT >",
      targetTab: 'events',
      targetId: 'e-hack'
    },
    {
      id: 'road-4',
      title: "React Hooks deep dive",
      desc: "Attend performance deep dive SoC workshop.",
      actionText: "EXPLORE EVENT >",
      targetTab: 'events',
      targetId: 'e-workshop'
    },
    {
      id: 'road-5',
      title: "Grab Backend Intern",
      desc: "Requires 10 peer reviews. Match parameters.",
      actionText: "VIEW ROLE >",
      targetTab: 'career',
      targetId: 'grab-backend'
    }
  ];

  const handleStartEdit = () => {
    setIsEditing(true);
    setEditSkills([...profile.skills]);
    setEditGoals([...profile.goals]);
    setNewSkill('');
    setNewGoal('');
  };

  const handleDeleteSkill = (idx) => {
    setEditSkills(editSkills.filter((_, i) => i !== idx));
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !editSkills.includes(newSkill.trim())) {
      setEditSkills([...editSkills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleDeleteGoal = (idx) => {
    setEditGoals(editGoals.filter((_, i) => i !== idx));
  };

  const handleAddGoal = () => {
    if (newGoal.trim() && !editGoals.includes(newGoal.trim())) {
      setEditGoals([...editGoals, newGoal.trim()]);
      setNewGoal('');
    }
  };

  const handleSaveEdit = () => {
    onUpdateProfile({
      skills: editSkills,
      goals: editGoals
    });
    setIsEditing(false);
  };

  const handleCancelBooking = (e, id) => {
    e.stopPropagation();
    onDeleteEngagement(id);
    if (selectedEngagement && selectedEngagement.id === id) {
      setSelectedEngagement(null);
    }
  };

  // 1. Render Engagement Details Overlay View
  if (selectedEngagement) {
    const isAcademic = selectedEngagement.category === 'ACADEMIC REVIEW';
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', animation: 'fadeIn 0.2s ease-out', paddingBottom: '20px' }}>
        
        {/* Back navigation */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button 
            onClick={() => setSelectedEngagement(null)}
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
          <span className="section-title-tracking" style={{ fontSize: '11px' }}>
            ENGAGEMENT SUMMARY DETAILS
          </span>
        </div>

        {/* Core Metadata Card */}
        <div className="card-premium" style={{ gap: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span 
              className="event-tag" 
              style={{ 
                background: isAcademic ? 'rgba(124, 92, 255, 0.15)' : 'rgba(0, 240, 255, 0.1)', 
                color: isAcademic ? '#bfb0ff' : 'var(--accent)',
                border: `1.5px solid ${isAcademic ? 'rgba(124, 92, 255, 0.2)' : 'rgba(0, 240, 255, 0.2)'}`
              }}
            >
              {selectedEngagement.category}
            </span>
            <span 
              style={{ 
                fontSize: '9px', 
                fontWeight: '800', 
                color: selectedEngagement.status === 'Confirmed' ? 'var(--success)' : '#E6A23C',
                background: selectedEngagement.status === 'Confirmed' ? 'rgba(0, 229, 163, 0.1)' : 'rgba(230, 162, 60, 0.1)',
                border: `1px solid ${selectedEngagement.status === 'Confirmed' ? 'var(--success)' : '#E6A23C'}`,
                borderRadius: '4px',
                padding: '2px 6px',
                fontFamily: 'var(--font-mono)'
              }}
            >
              {selectedEngagement.status || 'Pending'}
            </span>
          </div>
          <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', fontWeight: '800', marginTop: '4px' }}>
            {selectedEngagement.title}
          </h3>
          <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            With {selectedEngagement.peerName}
          </span>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            📅 {selectedEngagement.date}
          </span>
        </div>

        {/* Platform Meeting Token */}
        <div className="card-premium" style={{ gap: '8px' }}>
          <span className="section-title-tracking" style={{ fontSize: '8px', color: 'var(--text-muted)' }}>
            MEETING PLATFORM TOKEN
          </span>
          <div 
            style={{ 
              background: 'var(--bg-app)', 
              border: '1px solid var(--border)', 
              borderRadius: '8px', 
              padding: '12px',
              fontFamily: 'var(--font-mono)',
              fontSize: '12.5px',
              color: 'var(--accent)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <span>{selectedEngagement.meetingToken || 'UNISPHERE-LOCAL-TOKEN'}</span>
            <span 
              style={{ fontSize: '9px', color: 'var(--text-muted)', cursor: 'pointer', textDecoration: 'underline' }}
              onClick={() => alert("Token copied to clipboard.")}
            >
              COPY
            </span>
          </div>
        </div>

        {/* Detailed Remarks */}
        <div className="card-premium" style={{ gap: '8px' }}>
          <span className="section-title-tracking" style={{ fontSize: '8px', color: 'var(--text-muted)' }}>
            SESSION REMARKS
          </span>
          <p style={{ fontSize: '12.5px', color: 'var(--text-primary)', lineHeight: '1.5' }}>
            {selectedEngagement.remarks || 'No specific remarks details provided for this engagement.'}
          </p>
        </div>

        {/* Prerequisite Parameters */}
        <div className="card-premium" style={{ gap: '8px' }}>
          <span className="section-title-tracking" style={{ fontSize: '8px', color: 'var(--text-muted)' }}>
            PORTFOLIO & PREREQUISITE PARAMETERS
          </span>
          <p style={{ fontSize: '12.5px', color: '#bfb0ff', lineHeight: '1.5' }}>
            {selectedEngagement.parameters || 'Coordinates academic transcript synchronization scores.'}
          </p>
        </div>
      </div>
    );
  }

  // 2. Render Upcoming Review Schedule View
  if (showUpcomingSchedule) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', animation: 'fadeIn 0.2s ease-out', paddingBottom: '20px' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="section-title-tracking" style={{ fontSize: '13px', color: 'var(--text-primary)', fontWeight: '800' }}>
            UPCOMING REVIEW SCHEDULE
          </span>
          <button 
            onClick={() => setShowUpcomingSchedule(false)}
            style={{
              background: 'transparent',
              border: '1px solid var(--border)',
              borderRadius: '50%',
              width: '30px',
              height: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-primary)',
              cursor: 'pointer'
            }}
          >
            ✕
          </button>
        </div>

        {/* Upcoming Cards List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {engagements.length === 0 ? (
            <div className="card-premium" style={{ padding: '24px', textAlign: 'center', color: 'var(--text-secondary)' }}>
              No upcoming schedules booked.
            </div>
          ) : (
            engagements.map((eng) => {
              const isAcademic = eng.category === 'ACADEMIC REVIEW';
              return (
                <div 
                  key={eng.id}
                  className="card-premium"
                  style={{ padding: '14px', gap: '10px', cursor: 'pointer' }}
                  onClick={() => setSelectedEngagement(eng)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span 
                      className="event-tag" 
                      style={{ 
                        background: isAcademic ? 'rgba(124, 92, 255, 0.15)' : 'rgba(0, 240, 255, 0.1)', 
                        color: isAcademic ? '#bfb0ff' : 'var(--accent)',
                        border: `1px solid ${isAcademic ? 'rgba(124, 92, 255, 0.2)' : 'rgba(0, 240, 255, 0.2)'}`
                      }}
                    >
                      {eng.category}
                    </span>
                    <span 
                      style={{
                        fontSize: '9px',
                        fontWeight: '800',
                        color: eng.status === 'Confirmed' ? 'var(--success)' : '#E6A23C',
                        background: eng.status === 'Confirmed' ? 'rgba(0, 229, 163, 0.1)' : 'rgba(230, 162, 60, 0.1)',
                        border: `1.5px solid ${eng.status === 'Confirmed' ? 'var(--success)' : '#E6A23C'}`,
                        borderRadius: '6px',
                        padding: '3px 8px',
                        fontFamily: 'var(--font-mono)'
                      }}
                    >
                      {eng.status || 'Pending'}
                    </span>
                  </div>

                  <div>
                    <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '13.5px', fontWeight: '800' }}>
                      {eng.title}
                    </h3>
                    <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                      With {eng.peerName}
                    </span>
                  </div>

                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', margin: '2px 0' }} />

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '10.5px' }}>
                    <span style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
                      📅 {eng.date}
                    </span>
                    <button 
                      onClick={(e) => handleCancelBooking(e, eng.id)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--danger)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '9px',
                        fontWeight: '700',
                        letterSpacing: '0.05em',
                        cursor: 'pointer'
                      }}
                    >
                      CANCEL BOOKING
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  }

  // 3. Render Portfolio Roadmap Suggestions Expanded Catalog
  if (showRoadmapCatalog) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', animation: 'fadeIn 0.2s ease-out', paddingBottom: '20px' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="section-title-tracking" style={{ fontSize: '13px', color: 'var(--text-primary)', fontWeight: '800' }}>
            PORTFOLIO ROADMAP SUGGESTIONS
          </span>
          <button 
            onClick={() => setShowRoadmapCatalog(false)}
            style={{
              background: 'transparent',
              border: '1px solid var(--border)',
              borderRadius: '50%',
              width: '30px',
              height: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-primary)',
              cursor: 'pointer'
            }}
          >
            ✕
          </button>
        </div>

        {/* expanded matrix catalog suggestions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {roadmapCatalog.map((road) => (
            <div 
              key={road.id}
              className="card-premium"
              style={{ cursor: 'pointer', padding: '14px', gap: '6px' }}
              onClick={() => {
                setShowRoadmapCatalog(false);
                onRoadmapRedirect(road.targetTab, road.targetId);
              }}
            >
              <span className="roadmap-title">{road.title}</span>
              <p className="roadmap-desc">{road.desc}</p>
              <span 
                className="roadmap-action" 
                style={{ 
                  color: road.targetTab === 'connect' 
                    ? 'var(--primary)' 
                    : road.targetTab === 'career' 
                      ? 'var(--accent)' 
                      : 'var(--success)' 
                }}
              >
                {road.actionText}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 3.5. Render System Intelligence Briefing Full-Screen Overlay
  if (showBriefingOverlay) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', animation: 'fadeIn 0.2s ease-out', paddingBottom: '20px' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="section-title-tracking" style={{ fontSize: '13px', color: 'var(--text-primary)', fontWeight: '800' }}>
            INTELLIGENCE PORTFOLIO COMPASS
          </span>
          <button 
            onClick={() => setShowBriefingOverlay(false)}
            style={{
              background: 'transparent',
              border: '1px solid var(--border)',
              borderRadius: '50%',
              width: '30px',
              height: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-primary)',
              cursor: 'pointer'
            }}
          >
            ✕
          </button>
        </div>

        {/* Article Headline */}
        <div className="card-premium" style={{ gap: '6px' }}>
          <span className="section-title-tracking" style={{ fontSize: '8px', color: 'var(--primary)' }}>
            LATEST ANALYSIS
          </span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: '800', lineHeight: '1.3' }}>
            {selectedArticle.title}
          </h2>
          <div style={{ display: 'flex', gap: '8px', fontSize: '10px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
            <span>Stratechery Aggregation Service</span>
            <span>•</span>
            <span>Verified Intelligence</span>
          </div>
        </div>

        {/* Blueprint Architecture / Objective Summary */}
        <div className="card-premium" style={{ gap: '8px' }}>
          <span className="section-title-tracking" style={{ fontSize: '8px', color: 'var(--text-muted)' }}>
            BLUEPRINT ARCHITECTURE SUMMARY
          </span>
          <p style={{ fontSize: '12px', color: 'var(--text-primary)', lineHeight: '1.5' }}>
            {selectedArticle.summary}
          </p>
        </div>

        {/* Portfolio Strengthening Path - Stress Mitigation */}
        <div 
          className="card-premium" 
          style={{ 
            gap: '12px', 
            border: '1.5px solid var(--primary)', 
            background: 'rgba(124, 92, 255, 0.03)' 
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sparkles style={{ width: 14, height: 14, color: 'var(--primary)' }} />
            <span className="section-title-tracking" style={{ fontSize: '9px', color: 'var(--primary)', fontWeight: '800' }}>
              PORTFOLIO STRENGTHENING PATH
            </span>
          </div>

          <p style={{ fontSize: '12px', color: 'var(--text-primary)', lineHeight: '1.45' }}>
            {selectedArticle.mitigation}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid rgba(124, 92, 255, 0.15)', paddingTop: '10px' }}>
            <span style={{ fontSize: '10px', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Actionable Strategy Milestones:
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {selectedArticle.tips.map((tip, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '6px', fontSize: '11px', color: 'var(--text-primary)', lineHeight: '1.4' }}>
                  <span style={{ color: 'var(--primary)' }}>•</span>
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    );
  }

  // 4. Default Home Tab Main View
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', animation: 'fadeIn 0.25s ease-out', position: 'relative' }}>
      
      {/* Welcome Title */}
      <div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: '800', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
          Welcome back, {profile.name.split(' ')[1] || 'Krithiga'}!
        </h2>
      </div>

      {/* System Intelligence Briefing Card */}
      <div 
        className="card-premium" 
        style={{ gap: '10px', cursor: 'pointer' }}
        onClick={() => setShowBriefingOverlay(true)}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Sparkles style={{ width: 14, height: 14, color: 'var(--primary)' }} />
          <span className="section-title-tracking" style={{ color: 'var(--primary)' }}>SYSTEM INTELLIGENCE BRIEFING</span>
        </div>
        
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '13.5px', fontWeight: '700', lineHeight: '1.4', color: 'var(--text-primary)' }}>
          {selectedArticle.title.toUpperCase()}
        </h3>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--text-secondary)' }}>
          <span>Stratechery Briefing</span>
          <span>3h ago</span>
        </div>
      </div>

      {/* Ongoing Engagements (With View Details and schedule overlay triggers) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div className="section-header-row">
          <span className="section-title-tracking">Ongoing Engagements</span>
          <span 
            className="section-title-tracking" 
            style={{ color: 'var(--primary)', cursor: 'pointer', fontSize: '9.5px' }}
            onClick={() => setShowUpcomingSchedule(true)}
          >
            VIEW MORE &gt;
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {engagements.length === 0 ? (
            <div className="card-premium" style={{ padding: '20px', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '12px' }}>
              No ongoing engagements. Book a tutor in Connect to get started.
            </div>
          ) : (
            engagements.slice(0, 2).map((eng) => (
              <div 
                key={eng.id} 
                className="card-premium" 
                style={{ 
                  flexDirection: 'row', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  borderLeft: `4px solid ${eng.category === 'ACADEMIC REVIEW' ? 'var(--primary)' : 'var(--accent)'}`,
                  cursor: 'pointer'
                }}
                onClick={() => setSelectedEngagement(eng)}
              >
                <div style={{ flex: 1, paddingRight: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span 
                      style={{ 
                        fontFamily: 'var(--font-mono)', 
                        fontSize: '9px', 
                        fontWeight: '700', 
                        padding: '2px 6px', 
                        borderRadius: '4px',
                        background: eng.category === 'ACADEMIC REVIEW' ? 'rgba(124, 92, 255, 0.15)' : 'rgba(0, 240, 255, 0.1)',
                        color: eng.category === 'ACADEMIC REVIEW' ? '#bfb0ff' : 'var(--accent)',
                        border: `1px solid ${eng.category === 'ACADEMIC REVIEW' ? 'rgba(124, 92, 255, 0.2)' : 'rgba(0, 240, 255, 0.2)'}`
                      }}
                    >
                      {eng.category}
                    </span>
                    <span style={{ fontSize: '9px', color: 'var(--text-muted)' }}>{eng.date}</span>
                  </div>
                  <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '13.5px', fontWeight: '700', color: 'var(--text-primary)' }}>
                    {eng.title}
                  </h4>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>With {eng.peerName}</span>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button 
                    onClick={(e) => handleCancelBooking(e, eng.id)}
                    style={{ 
                      background: 'transparent', 
                      border: 'none', 
                      color: 'var(--danger)', 
                      cursor: 'pointer',
                      padding: '4px',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                    title="Cancel Booking"
                  >
                    <Trash2 style={{ width: 14, height: 14 }} />
                  </button>
                  <ChevronRight style={{ width: 16, height: 16, color: 'var(--text-muted)' }} />
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Ecosystem Impact Ledger (Explaining Modals) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <span className="section-title-tracking">Ecosystem Impact Ledger</span>
        <div className="ledger-row">
          
          <div 
            className="ledger-card" 
            style={{ cursor: 'pointer', position: 'relative' }} 
            onClick={() => setInfoModal(infoModal === 'reviews' ? null : 'reviews')}
          >
            <span className="ledger-value">{ledgerStats.reviews}</span>
            <span className="ledger-label">
              Peer Reviews
              <Info style={{ width: 9, height: 9, color: 'var(--text-muted)' }} />
            </span>
            {infoModal === 'reviews' && (
              <div 
                style={{
                  position: 'absolute',
                  bottom: '100%',
                  left: '2px',
                  marginBottom: '6px',
                  width: '140px',
                  background: '#1C1A24',
                  border: '1px solid var(--border)',
                  borderRadius: '6px',
                  padding: '6px 8px',
                  color: '#FFFFFF',
                  zIndex: 100,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                  textAlign: 'left'
                }}
              >
                <p style={{ fontSize: '10px', lineHeight: '1.25', margin: 0, fontFamily: 'var(--font-sans)', fontWeight: 'normal', textTransform: 'none', letterSpacing: 'normal' }}>
                  Total peer-to-peer tutoring and mock sessions hosted.
                </p>
              </div>
            )}
          </div>

          <div 
            className="ledger-card" 
            style={{ cursor: 'pointer', position: 'relative' }} 
            onClick={() => setInfoModal(infoModal === 'hackathons' ? null : 'hackathons')}
          >
            <span className="ledger-value">{ledgerStats.hackathons}</span>
            <span className="ledger-label">
              Hackathons
              <Info style={{ width: 9, height: 9, color: 'var(--text-muted)' }} />
            </span>
            {infoModal === 'hackathons' && (
              <div 
                style={{
                  position: 'absolute',
                  bottom: '100%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  marginBottom: '6px',
                  width: '140px',
                  background: '#1C1A24',
                  border: '1px solid var(--border)',
                  borderRadius: '6px',
                  padding: '6px 8px',
                  color: '#FFFFFF',
                  zIndex: 100,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                  textAlign: 'left'
                }}
              >
                <p style={{ fontSize: '10px', lineHeight: '1.25', margin: 0, fontFamily: 'var(--font-sans)', fontWeight: 'normal', textTransform: 'none', letterSpacing: 'normal' }}>
                  Registered and verified hackathons completed.
                </p>
              </div>
            )}
          </div>

          <div 
            className="ledger-card" 
            style={{ cursor: 'pointer', position: 'relative' }} 
            onClick={() => setInfoModal(infoModal === 'capabilities' ? null : 'capabilities')}
          >
            <span className="ledger-value">{ledgerStats.capabilities}</span>
            <span className="ledger-label">
              Vetted Caps
              <Info style={{ width: 9, height: 9, color: 'var(--text-muted)' }} />
            </span>
            {infoModal === 'capabilities' && (
              <div 
                style={{
                  position: 'absolute',
                  bottom: '100%',
                  right: '2px',
                  marginBottom: '6px',
                  width: '140px',
                  background: '#1C1A24',
                  border: '1px solid var(--border)',
                  borderRadius: '6px',
                  padding: '6px 8px',
                  color: '#FFFFFF',
                  zIndex: 100,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                  textAlign: 'left'
                }}
              >
                <p style={{ fontSize: '10px', lineHeight: '1.25', margin: 0, fontFamily: 'var(--font-sans)', fontWeight: 'normal', textTransform: 'none', letterSpacing: 'normal' }}>
                  Skill credentials verified via transcript parsing.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Portfolio Accelerator Hub (Inline Edit Mode) */}
      <div className="card-premium" style={{ gap: '14px' }}>
        <div className="section-header-row" style={{ marginBottom: 0 }}>
          <span className="section-title-tracking" style={{ fontSize: '12px' }}>PORTFOLIO ACCELERATOR HUB</span>
          {!isEditing && (
            <button 
              onClick={handleStartEdit}
              style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
            >
              <Edit3 style={{ width: 14, height: 14 }} />
            </button>
          )}
        </div>

        {/* Skills Section */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Current Technical Skills
          </span>
          
          {!isEditing ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {profile.skills.map((skill, index) => (
                <span key={index} className="skill-tag-capsule">{skill}</span>
              ))}
            </div>
          ) : (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {editSkills.map((skill, index) => (
                <span 
                  key={index} 
                  className="skill-tag-capsule" 
                  style={{ background: 'rgba(124, 92, 255, 0.05)', borderColor: 'var(--primary)', paddingRight: '8px' }}
                >
                  {skill}
                  <button 
                    type="button" 
                    onClick={() => handleDeleteSkill(index)}
                    style={{ background: 'transparent', border: 'none', color: 'var(--danger)', marginLeft: '6px', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold' }}
                  >
                    ✕
                  </button>
                </span>
              ))}
              
              <div style={{ display: 'flex', gap: '4px', width: '100%', marginTop: '4px' }}>
                <input 
                  type="text" 
                  placeholder="+ Add Skill" 
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  style={{ background: 'var(--bg-app)', border: '1px solid var(--border)', borderRadius: '6px', padding: '6px 10px', color: 'var(--text-primary)', fontSize: '11px', outline: 'none', flex: 1 }}
                />
                <button 
                  type="button" 
                  onClick={handleAddSkill}
                  style={{ background: 'var(--primary)', border: 'none', borderRadius: '6px', color: '#fff', padding: '0 12px', fontSize: '11px', cursor: 'pointer', fontFamily: 'var(--font-mono)' }}
                >
                  ADD
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Goals Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Active Portfolio Goals
          </span>
          
          {!isEditing ? (
            <ul style={{ paddingLeft: '16px', fontSize: '12.5px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {profile.goals.map((goal, index) => (
                <li key={index} style={{ color: 'var(--text-primary)' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>{goal}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {editGoals.map((goal, index) => (
                <div 
                  key={index} 
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    background: 'rgba(255,255,255,0.02)', 
                    padding: '6px 10px', 
                    borderRadius: '8px', 
                    border: '1px solid var(--border)' 
                  }}
                >
                  <span style={{ fontSize: '12px', color: 'var(--text-primary)' }}>{goal}</span>
                  <button 
                    type="button" 
                    onClick={() => handleDeleteGoal(index)}
                    style={{ background: 'transparent', border: 'none', color: 'var(--danger)', cursor: 'pointer', fontSize: '12px' }}
                  >
                    ✕
                  </button>
                </div>
              ))}
              
              <div style={{ display: 'flex', gap: '4px', width: '100%', marginTop: '4px' }}>
                <input 
                  type="text" 
                  placeholder="+ Add Goal" 
                  value={newGoal}
                  onChange={(e) => setNewGoal(e.target.value)}
                  style={{ background: 'var(--bg-app)', border: '1px solid var(--border)', borderRadius: '6px', padding: '6px 10px', color: 'var(--text-primary)', fontSize: '11px', outline: 'none', flex: 1 }}
                />
                <button 
                  type="button" 
                  onClick={handleAddGoal}
                  style={{ background: 'var(--primary)', border: 'none', borderRadius: '6px', color: '#fff', padding: '0 12px', fontSize: '11px', cursor: 'pointer', fontFamily: 'var(--font-mono)' }}
                >
                  ADD
                </button>
              </div>

              <button 
                type="button" 
                className="btn-primary" 
                onClick={handleSaveEdit}
                style={{ width: '100%', border: 'none', marginTop: '10px' }}
              >
                SAVE CHANGES
              </button>
            </div>
          )}
        </div>
      </div>
      {/* Portfolio Roadmap Suggestions (deep link redirection actions) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div className="section-header-row">
          <span className="section-title-tracking">Portfolio Roadmap Suggestions</span>
          <span 
            className="section-title-tracking" 
            style={{ color: 'var(--primary)', cursor: 'pointer', fontSize: '9.5px' }}
            onClick={() => setShowRoadmapCatalog(true)}
          >
            VIEW MORE &gt;
          </span>
        </div>

        <div className="roadmap-carousel" style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '8px' }}>
          <div className="roadmap-card" onClick={() => onRoadmapRedirect('connect', 'p-marcus')} style={{ minWidth: '220px', cursor: 'pointer' }}>
            <span className="roadmap-title">Review CS1231S Proofs</span>
            <p className="roadmap-desc">Practice mathematical induction with Marcus Chen.</p>
            <span className="roadmap-action">CONNECT NOW &gt;</span>
          </div>

          <div className="roadmap-card" onClick={() => onRoadmapRedirect('career', 'govtech-uiux')} style={{ minWidth: '220px', cursor: 'pointer' }}>
            <span className="roadmap-title">GovTech SWE Internship</span>
            <p className="roadmap-desc">Match and sync layout competencies.</p>
            <span className="roadmap-action" style={{ color: 'var(--accent)' }}>CAREERS LINK &gt;</span>
          </div>

          <div className="roadmap-card" onClick={() => onRoadmapRedirect('events', 'e-hack')} style={{ minWidth: '220px', cursor: 'pointer' }}>
            <span className="roadmap-title">NUS Hack & Roll 2026</span>
            <p className="roadmap-desc">Fulfill Stripe prerequisite hackathons.</p>
            <span className="roadmap-action" style={{ color: 'var(--success)' }}>REGISTER NOW &gt;</span>
          </div>
      </div>
    </div>
  </div>
);
}
