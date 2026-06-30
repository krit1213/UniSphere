import React, { useState } from 'react';
import { Search, ArrowLeft, SlidersHorizontal, ShieldCheck, AlertCircle, Check, Award, Briefcase } from 'lucide-react';

export default function CareerTab({ profile, ledgerStats, selectedJob, setSelectedJob, onApplyJob }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [appliedJobs, setAppliedJobs] = useState([]); // Array of applied jobId
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]); // multi-select array
  const [tempFilters, setTempFilters] = useState([]);

  // Mock Career Opportunities Array
  const opportunities = [
    {
      id: 'stripe-swe',
      company: 'STRIPE',
      role: 'SOFTWARE ENGINEER INTERN (WINTER 2027)',
      track: 'Backend / Systems • Winter ATAPs',
      compensation: '$4,500 / month',
      hours: '40 hours / week',
      source: 'Source: MyCareersFuture',
      techStack: ['Ruby', 'Go', 'REST APIs', 'PostgreSQL'],
      about: 'Join Stripe\'s core API infrastructure team to design, build, and maintain stable, scalable banking integration platforms.',
      responsibilities: 'Build robust SQL schemas, optimize write latency for high-concurrency payment streams, and partner with product designers.',
      // Stripe requires 5 hackathons. User starts at 4, RSVP hackathon makes it 5
      checkPrereq: () => ledgerStats.hackathons >= 5,
      prereqLabel: 'Requires 5 hackathons conquered.',
      prereqMetText: '[ ⚔ Credentials Met ] All prerequisite review requirements verified.',
      prereqPendingText: '[ ⚠ Prerequisites Pending ] Need more Hackathons registered.',
      reviewPointsText: () => `Review Points: ${ledgerStats.hackathons}/5 hackathons completed.`
    },
    {
      id: 'grab-backend',
      company: 'GRAB',
      role: 'BACKEND SYSTEMS ATAP INTERN',
      track: 'Backend / Systems • Winter ATAPs',
      compensation: '$3,800 / month',
      hours: '40 hours / week',
      source: 'Source: NUS TalentConnect',
      techStack: ['Go', 'Redis', 'Kafka', 'MySQL'],
      about: 'Work on real-time transport pricing algorithms and high-concurrency booking engines.',
      responsibilities: 'Optimize SQL and Redis database queries in Go, debug API latency, and collaborate closely with product managers.',
      // Grab requires 10 peer reviews. User has 12 reviews, so it matches.
      checkPrereq: () => ledgerStats.reviews >= 10,
      prereqLabel: 'Requires 10 peer reviews anchored.',
      prereqMetText: '[ ⚔ Credentials Met ] All prerequisite review requirements verified.',
      prereqPendingText: '[ ⚠ Prerequisites Pending ] Need more peer reviews.',
      reviewPointsText: () => `Review Points: ${ledgerStats.reviews}/10 required sessions hosted.`
    },
    {
      id: 'govtech-uiux',
      company: 'GOVTECH',
      role: 'FRONTEND UI/UX ENGINEER INTERN',
      track: 'Frontend / UI • Summer 2027 Internships',
      compensation: '$3,500 / month',
      hours: '40 hours / week',
      source: 'Source: NUS TalentConnect',
      techStack: ['React', 'Figma', 'TypeScript', 'Tailwind CSS'],
      about: 'Help build intuitive public service portals and accessible citizen-facing dashboard layout architectures.',
      responsibilities: 'Translate high-fidelity mockups into modular React component lines and optimize rendering states.',
      checkPrereq: () => true, // Prerequisites met by default
      prereqLabel: 'Requires UI/UX competencies verified.',
      prereqMetText: '[ ⚔ Credentials Met ] All prerequisite review requirements verified.',
      prereqPendingText: '',
      reviewPointsText: () => 'Review Points: Match rate 100% verified.'
    },
    {
      id: 'nus-ta',
      company: 'NUS SCHOOL OF COMPUTING',
      role: 'UNDERGRADUATE TEACHING ASSISTANT (CS...)',
      track: 'Academic / Research • Undergraduate TA/RA Roles',
      compensation: '$25 / hour',
      hours: '15 hours / week',
      source: 'Source: NUS Academic Positions Portal',
      techStack: ['Java', 'Discrete Math', 'Python', 'Tutoring'],
      about: 'Facilitate weekly tutorial discussions, mark module assignments, and consult for core computing modules.',
      responsibilities: 'Explain complex concepts in algorithms and discrete logic, debug student code, and provide detailed grading feedback.',
      checkPrereq: () => true,
      prereqLabel: 'Requires verified A+ modular anchors.',
      prereqMetText: '[ ⚔ Credentials Met ] All prerequisite review requirements verified.',
      prereqPendingText: '',
      reviewPointsText: () => 'Review Points: Aced module transcripts matching.'
    }
  ];

  const handleApply = (job) => {
    if (appliedJobs.includes(job.id)) return;
    setAppliedJobs([...appliedJobs, job.id]);
    onApplyJob(job.company, job.role);
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
      title: 'EMPLOYMENT TYPE',
      options: [
        { id: 'Full-Time', label: 'Full-Time' },
        { id: 'Internship', label: 'Internship' },
        { id: 'Part-Time', label: 'Part-Time' }
      ]
    },
    {
      title: 'JOB TYPE',
      options: [
        { id: 'Backend', label: 'Backend' },
        { id: 'Frontend', label: 'Frontend' },
        { id: 'Fullstack', label: 'Fullstack' },
        { id: 'DevOps', label: 'DevOps' },
        { id: 'UI/UX', label: 'UI/UX' },
        { id: 'Teaching Assistant', label: 'Teaching Assistant' }
      ]
    }
  ];

  const filteredJobs = opportunities.filter(job => {
    // 1. Text Search Match
    const textMatch = job.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.techStack.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!textMatch) return false;

    // 2. Active filters Match
    if (activeFilters.length > 0) {
      const selectedEmployment = activeFilters.filter(f => ['Full-Time', 'Internship', 'Part-Time'].includes(f));
      const selectedJobTypes = activeFilters.filter(f => ['Backend', 'Frontend', 'Fullstack', 'DevOps', 'UI/UX', 'Teaching Assistant'].includes(f));

      if (selectedEmployment.length > 0) {
        const empMatch = selectedEmployment.some(type => {
          if (type === 'Internship' && job.role.toLowerCase().includes('intern')) return true;
          if (type === 'Part-Time' && (job.role.toLowerCase().includes('assistant') || job.role.toLowerCase().includes('ta') || job.hours.includes('15 hours'))) return true;
          if (type === 'Full-Time' && !job.role.toLowerCase().includes('intern') && !job.role.toLowerCase().includes('assistant')) return true;
          return false;
        });
        if (!empMatch) return false;
      }

      if (selectedJobTypes.length > 0) {
        const typeMatch = selectedJobTypes.some(type => {
          if (type === 'Backend' && (job.role.toLowerCase().includes('backend') || job.track.toLowerCase().includes('backend') || job.track.toLowerCase().includes('systems'))) return true;
          if (type === 'Frontend' && (job.role.toLowerCase().includes('frontend') || job.track.toLowerCase().includes('frontend') || job.track.toLowerCase().includes('ui'))) return true;
          if (type === 'UI/UX' && (job.role.toLowerCase().includes('ui/ux') || job.track.toLowerCase().includes('ui/ux') || job.track.toLowerCase().includes('ui'))) return true;
          if (type === 'Teaching Assistant' && (job.role.toLowerCase().includes('teaching') || job.role.toLowerCase().includes('assistant'))) return true;
          if (type === 'Fullstack' && job.role.toLowerCase().includes('fullstack')) return true;
          if (type === 'DevOps' && job.role.toLowerCase().includes('devops')) return true;
          return false;
        });
        if (!typeMatch) return false;
      }
    }

    return true;
  });

  // Find selected job object from ID prop
  const selectedJobObject = opportunities.find(job => job.id === selectedJob);

  // Full-Page Career Opportunity Detail View
  if (selectedJobObject) {
    const isApplied = appliedJobs.includes(selectedJobObject.id);
    const prereqMet = selectedJobObject.checkPrereq();
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', animation: 'fadeIn 0.2s ease-out', paddingBottom: '20px' }}>
        
        {/* Header back button */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button 
            onClick={() => setSelectedJob(null)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            ← BACK TO CAREERS
          </button>
        </div>

        {/* Main Headline Card */}
        <div className="card-premium" style={{ gap: '6px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="event-tag" style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}>
              {selectedJobObject.company}
            </span>
            <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              {selectedJobObject.source}
            </span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: '800', marginTop: '4px' }}>
            {selectedJobObject.role}
          </h2>
          <span style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>
            {selectedJobObject.track}
          </span>
        </div>

        {/* Parameters Row */}
        <div className="card-premium" style={{ flexDirection: 'row', gap: '16px', padding: '14px' }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span className="section-title-tracking" style={{ fontSize: '8px', color: 'var(--text-muted)' }}>
              EST. COMPENSATION
            </span>
            <span style={{ fontSize: '14px', fontWeight: '700', color: 'var(--accent)' }}>
              {selectedJobObject.compensation}
            </span>
          </div>
          <div style={{ width: 1, background: 'rgba(255,255,255,0.08)' }} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span className="section-title-tracking" style={{ fontSize: '8px', color: 'var(--text-muted)' }}>
              EXPECTED HOURS
            </span>
            <span style={{ fontSize: '14px', fontWeight: '700', color: '#bfb0ff' }}>
              {selectedJobObject.hours}
            </span>
          </div>
        </div>

        {/* Technical Stack Grid */}
        <div className="card-premium" style={{ gap: '8px' }}>
          <span className="section-title-tracking" style={{ fontSize: '8px', color: 'var(--text-muted)' }}>
            CORE TECHNICAL STACK
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {selectedJobObject.techStack.map((tech, idx) => (
              <span 
                key={idx} 
                className="skill-tag-capsule" 
                style={{ 
                  fontSize: '11px', 
                  fontFamily: 'var(--font-mono)', 
                  background: 'rgba(255, 255, 255, 0.02)',
                  padding: '4px 10px',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* About Opportunity */}
        <div className="card-premium" style={{ gap: '8px' }}>
          <span className="section-title-tracking" style={{ fontSize: '8px', color: 'var(--text-muted)' }}>
            ABOUT THE INTERNSHIP
          </span>
          <p style={{ fontSize: '12px', color: 'var(--text-primary)', lineHeight: '1.5' }}>
            {selectedJobObject.about}
          </p>
        </div>

        {/* Responsibilities */}
        <div className="card-premium" style={{ gap: '8px' }}>
          <span className="section-title-tracking" style={{ fontSize: '8px', color: 'var(--text-muted)' }}>
            CORE RESPONSIBILITIES
          </span>
          <p style={{ fontSize: '12px', color: 'var(--text-primary)', lineHeight: '1.5' }}>
            {selectedJobObject.responsibilities}
          </p>
        </div>

        {/* Verification Checklist Badge */}
        {prereqMet && (
          <div 
            className="card-premium" 
            style={{ 
              gap: '8px',
              border: '1.5px solid rgba(0, 229, 163, 0.25)',
              background: 'rgba(0, 229, 163, 0.02)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', fontWeight: '700', color: 'var(--success)' }}>
              <ShieldCheck style={{ width: 14, height: 14 }} />
              <span style={{ fontFamily: 'var(--font-mono)' }}>
                {selectedJobObject.prereqMetText}
              </span>
            </div>
            <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', paddingLeft: '22px' }}>
              {selectedJobObject.reviewPointsText()}
            </span>
          </div>
        )}

        {/* Localized Inline Portfolio Advisory warning panel */}
        {!prereqMet && !isApplied && (
          <div 
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '10px', 
              padding: '14px', 
              background: 'rgba(255, 184, 0, 0.04)', 
              borderRadius: '12px', 
              border: '1.5px solid #FFB800',
              animation: 'fadeIn 0.2s ease-out',
              marginBottom: '10px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255, 184, 0, 0.15)', paddingBottom: '6px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.08em', color: '#FFB800', fontWeight: '750' }}>
                PORTFOLIO OPTIMIZATION ADVISORY
              </span>
            </div>
            
            <p style={{ fontSize: '11.5px', color: 'var(--text-primary)', lineHeight: '1.4', margin: 0 }}>
              Applying with current pending criteria may impact alignment. To increase evaluation success, optimize your portfolio path by integrating these targeted campus records:
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '11px', color: '#FFB800', lineHeight: '1.45' }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                <span>•</span>
                <span>Your baseline system engineering track meets general criteria, but your portfolio shows a gap in highly distributed state design. To optimize evaluation indexing, register for the upcoming **NUS Hack & Roll 2026** hackathon track.</span>
              </div>
              <div style={{ display: 'flex', gap: '6px' }}>
                <span>•</span>
                <span>To bridge platform competency requirements for this role, complete the specialized **React Performance & Hooks Deep-Dive Workshop** before application evaluation.</span>
              </div>
              <div style={{ display: 'flex', gap: '6px' }}>
                <span>•</span>
                <span>Ensure active enrollment metrics in the **CS1231S Discrete Structures** module are completed to formally verify theoretical proof capacities prior to core processing.</span>
              </div>
            </div>
          </div>
        )}

        {/* Apply Baseline Button with active/prerequisite states */}
        <div style={{ marginTop: '10px', paddingBottom: '10px' }}>
          {isApplied ? (
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
              disabled
            >
              <Check style={{ width: 16, height: 16 }} />
              APPLICATION TRANSMITTED
            </button>
          ) : (
            <button 
              className="btn-primary" 
              style={{ 
                width: '100%', 
                background: 'var(--primary)', 
                border: 'none', 
                boxShadow: '0 4px 12px var(--primary-glow)'
              }}
              onClick={() => handleApply(selectedJobObject)}
            >
              APPLY VIA UNISPHERE
            </button>
          )}
        </div>

      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', animation: 'fadeIn 0.2s ease-in' }}>
      
      {/* Search opportunities Bar */}
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', position: 'relative' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <input 
            type="text" 
            placeholder="Search Tech Interns & TA Roles..." 
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
            cursor: 'pointer',
            transition: 'var(--transition-snappy)'
          }}
          title="Filter Opportunities"
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

      {/* Opportunities cards feed */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filteredJobs.length === 0 ? (
          <div className="card-premium" style={{ padding: '24px', textAlign: 'center', color: 'var(--text-secondary)' }}>
            No opportunities matched your query.
          </div>
        ) : (
          filteredJobs.map(job => {
            const prereqMet = job.checkPrereq();
            return (
              <div 
                key={job.id} 
                className="card-premium"
                style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px', cursor: 'pointer' }}
                onClick={() => setSelectedJob(job.id)}
              >
                {/* Badge Tag / Prereqs status */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {job.company === "NUS SCHOOL OF COMPUTING" ? (
                    <span 
                      className="event-tag" 
                      style={{ 
                        background: 'rgba(255,255,255,0.06)', 
                        color: 'var(--text-primary)', 
                        border: '1px solid var(--border)', 
                        fontSize: '7.5px', 
                        fontFamily: 'var(--font-mono)',
                        lineHeight: '1.1',
                        padding: '3px 6px',
                        textAlign: 'left',
                        maxWidth: '85px',
                        display: 'inline-flex',
                        flexDirection: 'column'
                      }}
                    >
                      <span>NUS SCHOOL OF</span>
                      <span>COMPUTING</span>
                    </span>
                  ) : (
                    <span className="event-tag" style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--text-primary)', border: '1px solid var(--border)', fontSize: '10px', fontFamily: 'var(--font-mono)' }}>
                      {job.company}
                    </span>
                  )}
                  
                  {prereqMet ? (
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
                      ✔ Prerequisites Met
                    </span>
                  ) : (
                    <span 
                      style={{ 
                        fontSize: '10px', 
                        fontWeight: '800', 
                        color: '#FFB800', 
                        background: 'rgba(255, 184, 0, 0.1)', 
                        padding: '3px 8px', 
                        borderRadius: '6px',
                        border: '1.5px solid #FFB800',
                        fontFamily: 'var(--font-mono)'
                      }}
                    >
                      ⚡ Prerequisites Pending
                    </span>
                  )}
                </div>

                {/* Title & Subtext */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <h3 className="text-card-title" style={{ margin: 0, color: 'var(--text-primary)' }}>
                    {job.role}
                  </h3>
                  <span className="text-card-subtext">
                    {job.track.split('•')[0]}
                  </span>
                </div>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', margin: '2px 0' }} />

                {/* Comp / Source row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="text-card-meta" style={{ color: 'var(--text-primary)' }}>
                    {job.compensation}
                  </span>
                  <span className="text-card-meta" style={{ color: 'var(--text-muted)' }}>
                    {job.source.split(':')[1] || job.source}
                  </span>
                </div>

              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
