import React, { useState } from 'react';
import IPhoneFrame from './components/IPhoneFrame';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeTab from './components/HomeTab';
import ConnectTab from './components/ConnectTab';
import EventsTab from './components/EventsTab';
import CareerTab from './components/CareerTab';
import ChatsHubTab from './components/ChatsHubTab';
import ProfileDrawer from './components/ProfileDrawer';
import Toast from './components/Toast';
import NotificationDrawer from './components/NotificationDrawer';

// Initial Ongoing Engagements List
const initialEngagements = [
  { 
    id: 'eng-1', 
    title: 'CS1231S Mathematical Proofs Review', 
    peerName: 'Marcus Chen', 
    category: 'ACADEMIC REVIEW', 
    date: 'June 20, 2026 at 2:00 PM',
    status: 'Confirmed',
    meetingToken: 'MEET-CS1231S-PROOFS-2026',
    remarks: 'Focusing on mathematical induction, relations, and proof methods.',
    parameters: 'CS1231S Core Academic review. Increments tutor review score.'
  },
  { 
    id: 'eng-2', 
    title: 'PM Intern Mock Interview Prep', 
    peerName: 'Priya Nair', 
    category: 'CAREER SYNC', 
    date: 'June 22, 2026 at 4:30 PM',
    status: 'Pending',
    meetingToken: 'MEET-STRIPE-PM-MOCK',
    remarks: 'Stripe PM mock interview. Target metrics: product design, analytics.',
    parameters: 'Stripe & Grab PM Intern prep. Fulfills Career Sync requirements.'
  }
];

// Initial Peer List (for READ and Connect actions)
const initialPeers = [
  {
    id: 'p-marcus',
    name: 'Marcus Chen',
    degree: 'Computer Science • Year 4 Undergraduate',
    email: 'marcus.chen@nus.edu.sg',
    rating: 4.9,
    stats: { contexts: 24, hackathons: 4 },
    transcripts: [
      { code: 'CS1101S', grade: 'A+' },
      { code: 'CS1231S', grade: 'A+' },
      { code: 'CS2030S', grade: 'A+' }
    ],
    teachingLogs: 'CS2040C: Verified Teaching Assistant (1 Semesters)',
    tags: ['Algorithms', 'Data Structures', 'C++', 'Java', 'Proofs'],
    timeline: [
      'SWE Intern - Stripe - Summer 2026',
      'Backend Intern - Shopee - Winter 2025'
    ],
    internships: 'Stripe Software Engineer Intern'
  },
  {
    id: 'p-priya',
    name: 'Priya Nair',
    degree: 'Information Systems • Year 3 Undergraduate',
    email: 'priya.nair@nus.edu.sg',
    rating: 4.8,
    stats: { contexts: 18, hackathons: 6 },
    transcripts: [
      { code: 'CS1010S', grade: 'A' },
      { code: 'CS2030S', grade: 'A+' }
    ],
    teachingLogs: 'CS1101S: Verified Teaching Assistant (2 Semesters)',
    tags: ['UI/UX Design', 'Figma', 'Product Management', 'SQL', 'Tailwind'],
    timeline: [
      'PM Intern - Stripe - Summer 2026',
      'Product Designer - GovTech - Winter 2025'
    ],
    internships: 'Grab Product Management Intern'
  },
  {
    id: 'p-weijie',
    name: 'Tan Wei Jie',
    degree: 'Computer Science • Year 4 Undergraduate',
    email: 'weijie.tan@nus.edu.sg',
    rating: 4.7,
    stats: { contexts: 12, hackathons: 5 },
    transcripts: [
      { code: 'CS1231S', grade: 'A' },
      { code: 'CS2030S', grade: 'A+' }
    ],
    teachingLogs: 'CS2040C: Verified Teaching Assistant (1 Semesters)',
    tags: ['Quantitative Finance', 'Python', 'C++', 'Algorithms', 'Vim'],
    timeline: [
      'Quant Dev Intern - Jump Trading - Summer 2026',
      'Trading Intern - Jane Street - Winter 2025'
    ],
    internships: 'Jump Trading Quant Dev Intern'
  },
  {
    id: 'p-aisha',
    name: 'Aisha binte Ahmad',
    degree: 'Computer Engineering • Year 3 Undergraduate',
    email: 'aisha.ahmad@nus.edu.sg',
    rating: 4.6,
    stats: { contexts: 15, hackathons: 8 },
    transcripts: [
      { code: 'CS1101S', grade: 'A+' }
    ],
    teachingLogs: 'EE2026: Verified Lab Assistant (2 Semesters)',
    tags: ['Digital Logic', 'FPGA', 'Verilog', 'Systems Design', 'Rust'],
    timeline: [
      'Hardware Intern - Dyson - Summer 2026',
      'Robotics Intern - A*STAR - Winter 2025'
    ],
    internships: 'Dyson Hardware Engineer Intern'
  }
];

// Initial DMs list for Chats Hub
const initialDms = [
  {
    id: 'dm-marcus',
    name: 'MARCUS CHEN',
    initials: 'MC',
    preview: 'Let me know if you want to run through CS123...',
    time: '10:42 AM',
    unread: true
  },
  {
    id: 'dm-priya',
    name: 'PRIYA NAIR',
    initials: 'PN',
    preview: 'Stripe PM mock is scheduled for Jun 22...',
    time: 'Yesterday',
    unread: false
  },
  {
    id: 'dm-dylan',
    name: 'DYLAN ONG',
    initials: 'DO',
    preview: 'Did you check the new GovTech frontend int...',
    time: '2 days ago',
    unread: false
  }
];

// Initial technical channels for Chats Hub
const initialChannels = [
  { id: 'ch-proofs', name: 'CS1231S-Proofs-Grind', members: 142, joined: false },
  { id: 'ch-hackathon', name: 'Hackathon-Teams-2026', members: 98, joined: false },
  { id: 'ch-stripe', name: 'Stripe-Applicants', members: 45, joined: false }
];

// Initial Events List
const initialEvents = [
  {
    id: 'e-hack',
    category: 'HACKATHON',
    title: 'NUS HACK & ROLL 2026',
    location: 'COM1-03-02, NUS Computing',
    date: 'Jan 15, 2026',
    time: 'Registration Closes • Jan 24-25, 2026: Main Event Hackathon',
    joinedCount: 842,
    rsvp: false,
    abstractText: 'Join Singapore\'s largest student-run hackathon! You will collaborate with peers over a 24-hour sprint to build innovative software solutions. Participating in NUS Hack & Roll demonstrates high-signal collaborative execution under tight constraints. Successful projects will boost your technical reputation and will be directly added as verified portfolio items in your UniSphere profile.',
    stream: 'NUS CFG Events Feed',
    speakers: ['Prof. Ben Leong (NUS)', 'Marcus Chen (NUS Hackers)'],
    prerequisites: 'Bring a laptop, basic programming knowledge. Teams of up to 4.'
  },
  {
    id: 'e-mixer',
    category: 'TECH MIXER',
    title: 'SWE TECHNICAL MIXER @ SOC',
    location: 'SoC Lobby & Terrace Area',
    date: 'June 20, 2026',
    time: '6:00 PM - 8:30 PM',
    joinedCount: 156,
    rsvp: false,
    abstractText: 'Meet engineering leads and tech recruiters from top companies in a relaxed networking mixer. Showcase your verified UniSphere Node transcript values directly via QR code scans and match with potential mentors.',
    stream: 'NUS SoC Career Office',
    speakers: ['Grab Recruiter Leads', 'Stripe Tech Directors'],
    prerequisites: 'Prepare your network profile QR codes. Open to all SoC undergraduates.'
  },
  {
    id: 'e-workshop',
    category: 'WORKSHOP',
    title: 'REACT PERFORMANCE & HOOKS DEEP-DIVE',
    location: 'SR1, COM1-02-04',
    date: 'June 22, 2026',
    time: '3:00 PM - 4:30 PM',
    joinedCount: 89,
    rsvp: false,
    abstractText: 'A highly technical, hands-on workshop detailing React render cycle optimization, dynamic UI state management, and memory leak mitigation using advanced hooks (useMemo, useCallback, and custom state trackers). This workshop directly addresses performance bottlenecks in frontend systems. Attendance satisfies core prerequisites for front-end engineering tracks on UniSphere.',
    stream: 'NUS Academic Positions Portal',
    speakers: ['NUS Web Dev Club Leads'],
    prerequisites: 'Understanding of basic React state hooks and rendering lifecycles.'
  }
];

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [homeResetKey, setHomeResetKey] = useState(0);

  React.useEffect(() => {
    const fontLinkId = 'google-fonts-unisphere-dynamic';
    if (!document.getElementById(fontLinkId)) {
      const link = document.createElement('link');
      link.id = fontLinkId;
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap';
      document.head.appendChild(link);
    }
  }, []);

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedPeer, setSelectedPeer] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [activeChatId, setActiveChatId] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [selectedEngagement, setSelectedEngagement] = useState(null);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 'notif-1',
      type: 'inbound_request',
      text: 'Peer Tutoring Request: Tan Wei Jie wants help on CS2030S Java structures.',
      sender: 'Tan Wei Jie',
      module: 'CS2030S',
      status: 'pending'
    },
    {
      id: 'notif-2',
      type: 'system_ack',
      text: 'Event Signup Acknowledged: React Performance & Hooks Deep-Dive.',
      detail: 'Attendance satisfies core TA module prerequisites.'
    },
    {
      id: 'notif-3',
      type: 'post_activity_rating',
      text: 'Activity Completed: Rate your recent discrete mathematics mentor Marcus Chen.',
      mentor: 'Marcus Chen',
      rated: false,
      rating: 0
    },
    {
      id: 'notif-4',
      type: 'proximity_warning',
      text: 'HAPPENING SOON: Your CS1231S Mathematical Proofs Review with Marcus Chen starts in 15 minutes.',
      engagementId: 'eng-1'
    },
    {
      id: 'notif-5',
      type: 'outbound_booking',
      text: 'Outbound Consultation Session: PM Intern Mock Interview Prep with Priya Nair',
      status: 'pending'
    }
  ]);

  // Mock Database state arrays (CRUD capability)
  const [profile, setProfile] = useState({
    name: "Kaleeswaran Krithiga",
    studentId: "A0253901X",
    faculty: "School of Computing",
    matricYear: "Year 1",
    verified: false, // EduRec Verified Badge status
    gpa: "4.85 / 5.00",
    maskGpa: false,
    targetRole: "Software Engineering Intern",
    preferredField: "Software Engineering",
    notificationsEnabled: true,
    skills: ["UI/UX Prototyping", "Tailwind CSS Layouts", "React Hooks"],
    goals: ["Master CS1231S Proofs", "Secure Winter 2027 SWE Intern"]
  });

  const [engagements, setEngagements] = useState(initialEngagements);
  const [ledgerStats, setLedgerStats] = useState({
    reviews: 12,
    hackathons: 3,
    capabilities: 2
  });

  const [peers, setPeers] = useState(initialPeers);
  const [activeDms, setActiveDms] = useState(initialDms);
  const [channels, setChannels] = useState(initialChannels);
  const [events, setEvents] = useState(initialEvents);

  // Toast helper
  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Profile Drawer updates (UPDATE)
  const handleUpdateProfile = (updatedFields) => {
    setProfile((prev) => ({ ...prev, ...updatedFields }));
  };

  // EduRec Secure Sync (UPDATE operation)
  const handleSyncEduRec = () => {
    setProfile((prev) => ({
      ...prev,
      verified: true,
      maskGpa: false
    }));
    
    // Increment ledger metrics after verify sync
    setLedgerStats((prev) => {
      const hasHackathonRSVP = events.find(e => e.id === 'e-hack')?.rsvp;
      return {
        ...prev,
        hackathons: hasHackathonRSVP ? 5 : 4,
        capabilities: 3    // Increments to 3 capabilities
      };
    });

    addToast("EduRec secure identity database sync complete! Profile verified.", "success");

    // Add system acknowledgement notification
    const newNotif = {
      id: `notif-${Date.now()}`,
      type: 'system_ack',
      text: 'Ecosystem Identity Synced: Verified student credentials synchronized via EduRec.',
      detail: 'Academic GPA and module transcripts verified.'
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // Booking Create (CREATE operation)
  const handleCreateBooking = (bookingData) => {
    const newEngagement = {
      id: `eng-${Date.now()}`,
      title: bookingData.type === 'tutor' 
        ? `${bookingData.module || 'CS1231S'} Tutoring Review` 
        : `${bookingData.topic || 'PM Intern'} Mentoring Sync`,
      peerName: bookingData.peerName,
      category: bookingData.type === 'tutor' ? 'ACADEMIC REVIEW' : 'CAREER SYNC',
      date: 'Scheduled for ' + new Date(Date.now() + 86400000 * 2).toLocaleDateString() + ' at 3:00 PM',
      status: 'Pending',
      meetingToken: bookingData.type === 'tutor' 
        ? `ZOOM-MEET-TUTOR-${Math.floor(1000 + Math.random()*9000)}` 
        : `MEET-CAREER-SYNC-${Math.floor(1000 + Math.random()*9000)}`,
      remarks: bookingData.remarks || 'No remarks provided.',
      parameters: bookingData.type === 'tutor' 
        ? `${bookingData.module} Peer Review Session. Increments ledger metrics.` 
        : `Career Sync targeting: ${bookingData.topic}. Highlights active portfolio goals.`
    };

    setEngagements((prev) => [newEngagement, ...prev]);
    
    // Increment Peer Reviews Ledger metric on create
    setLedgerStats((prev) => ({
      ...prev,
      reviews: prev.reviews + 1
    }));

    // Inject outbound booking request into notification feed
    const newNotification = {
      id: `notif-${Date.now()}`,
      type: 'outbound_booking',
      text: bookingData.type === 'tutor'
        ? `Outbound Tutoring Request: ${bookingData.module} review with ${bookingData.peerName}`
        : `Outbound Career Sync Request targeting: ${bookingData.topic} with ${bookingData.peerName}`,
      status: 'pending'
    };
    setNotifications((prev) => [newNotification, ...prev]);

    addToast(
      bookingData.type === 'tutor' 
        ? `Academic Review scheduled with ${bookingData.peerName}!` 
        : `Career Sync request sent to ${bookingData.peerName}!`,
      "success"
    );
  };

  // Cancel Booking (DELETE operation)
  const handleDeleteEngagement = (id) => {
    const target = engagements.find((eng) => eng.id === id);
    setEngagements((prev) => prev.filter((eng) => eng.id !== id));
    if (target) {
      addToast(`Canceled engagement with ${target.peerName}.`, "success");
    }
  };

  // Join Channel in Chats Hub (CREATE/UPDATE interaction)
  const handleJoinChannel = (channelId) => {
    setChannels((prevChannels) => 
      prevChannels.map((ch) => {
        if (ch.id === channelId) {
          const newStatus = !ch.joined;
          addToast(
            newStatus 
              ? `Joined the #${ch.name} technical channel!` 
              : `Left the #${ch.name} channel.`, 
            "success"
          );
          return {
            ...ch,
            joined: newStatus,
            members: newStatus ? ch.members + 1 : ch.members - 1
          };
        }
        return ch;
      })
    );
  };

  // RSVP to event (CREATE/DELETE)
  const handleToggleRSVP = (eventId) => {
    setEvents((prevEvents) =>
      prevEvents.map((evt) => {
        if (evt.id === eventId) {
          const newStatus = !evt.rsvp;
          addToast(
            newStatus 
              ? `RSVP confirmed for ${evt.title}!` 
              : `RSVP canceled for ${evt.title}.`,
            "success"
          );
          if (eventId === 'e-hack') {
            setLedgerStats((prev) => ({
              ...prev,
              hackathons: newStatus ? 5 : 4
            }));
          }
          if (newStatus) {
            // Inject system acknowledgment notification
            const newNotif = {
              id: `notif-${Date.now() + 2}`,
              type: 'system_ack',
              text: `Event Signup Acknowledged: ${evt.title}`,
              detail: 'RSVP slot confirmed. Added to your active review schedule.'
            };
            setNotifications(prev => [newNotif, ...prev]);
          }
          return { ...evt, rsvp: newStatus };
        }
        return evt;
      })
    );
  };

  const handleApplyJob = (company, role) => {
    const newEngagement = {
      id: `eng-${Date.now()}`,
      title: `Career Sync (Resume Review) targeting: ${company} ${role}`,
      peerName: company === 'STRIPE' ? 'Marcus Chen' : company,
      category: 'CAREER SYNC',
      date: 'Jun 24, 2026 at 3:00 PM',
      status: 'Pending',
      meetingToken: 'MEET-STRIPE-SWE-INTERN',
      remarks: `Automated token transaction for ${role} application.`,
      parameters: `Transmitted credentials verifying Stripe requirements met.`
    };
    setEngagements((prev) => [newEngagement, ...prev]);
    addToast(`Submitted secure application token to ${company} for ${role}!`, "success");

    // Inject system acknowledgement notification
    const newNotif = {
      id: `notif-${Date.now() + 3}`,
      type: 'system_ack',
      text: `Application Transmitted: ${company} ${role}`,
      detail: 'Submitted secure credential tokens directly to recruiter portal.'
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const handleViewOwnResume = () => {
    const userPeerObj = {
      id: 'user-profile',
      name: profile.name,
      degree: 'Computer Science • Year 1 Undergraduate',
      email: 'k.krithiga@u.nus.edu',
      rating: 4.8,
      stats: { contexts: 12, hackathons: ledgerStats.hackathons },
      transcripts: [
        { code: 'CS1101S', grade: 'A+' },
        { code: 'CS1231S', grade: 'A' },
        { code: 'CS2030S', grade: 'A+' }
      ],
      teachingLogs: 'CS1010S: Verified Peer Tutor (1 Semesters)',
      tags: profile.skills,
      timeline: [
        'Undergraduate Student - NUS - Current'
      ],
      internships: 'Ecosystem Node Connected'
    };
    setSelectedPeer(userPeerObj);
    setActiveTab('connect');
    setIsProfileOpen(false);
  };

  const handleReadChat = (dmId) => {
    setActiveDms(prevDms => 
      prevDms.map(dm => dm.id === dmId ? { ...dm, unread: false } : dm)
    );
  };

  // Notification actions and handlers
  const handleAcceptRequest = (notifId, sender, module) => {
    setNotifications(prev => prev.map(n => n.id === notifId ? { ...n, status: 'accepted' } : n));
    
    // Add to ongoing engagements
    const newEng = {
      id: `eng-${Date.now()}`,
      title: `${module || 'CS2030S'} Peer Tutoring Review`,
      peerName: sender,
      category: 'ACADEMIC REVIEW',
      date: 'Scheduled for ' + new Date(Date.now() + 86400000 * 3).toLocaleDateString() + ' at 4:00 PM',
      status: 'Confirmed',
      meetingToken: `ZOOM-MEET-TUTOR-${Math.floor(1000 + Math.random()*9000)}`,
      remarks: 'Accepted inbound tutoring request from peer.',
      parameters: `${module} peer review session.`
    };
    setEngagements(prev => [newEng, ...prev]);
    addToast(`Accepted tutoring request from ${sender}!`, 'success');
  };

  const handleDeclineRequest = (notifId, sender) => {
    setNotifications(prev => prev.map(n => n.id === notifId ? { ...n, status: 'declined' } : n));
    addToast(`Declined tutoring request from ${sender}.`, 'info');
  };

  const handleRateMentor = (notifId, mentor, rating) => {
    setNotifications(prev => prev.map(n => n.id === notifId ? { ...n, rated: true, rating } : n));
    
    // Increment Ledger stats Peer Reviews
    setLedgerStats(prev => ({
      ...prev,
      reviews: prev.reviews + 1
    }));
    
    addToast(`Submitted ${rating}-star rating for ${mentor}!`, 'success');
  };

  const handleNotificationClick = (notif) => {
    if (notif.type === 'proximity_warning') {
      const eng = engagements.find(e => e.id === notif.engagementId);
      if (eng) {
        setSelectedEngagement(eng);
        setActiveTab('home');
        setIsNotificationsOpen(false);
      }
    }
  };

  const handleDismissNotification = (notifId) => {
    setNotifications(prev => prev.filter(n => n.id !== notifId));
  };

  // Tab routing transitions
  const handleTabTransition = (tabId) => {
    setSelectedPeer(null);
    setSelectedJob(null);
    setSelectedEvent(null);
    setActiveChatId(null);
    setIsProfileOpen(false);
    setIsNotificationsOpen(false);
    setActiveTab(tabId);
  };

  const handleLogoReset = () => {
    setSelectedPeer(null);
    setSelectedJob(null);
    setSelectedEvent(null);
    setActiveChatId(null);
    setIsProfileOpen(false);
    setIsNotificationsOpen(false);
    setActiveTab('home');
    setHomeResetKey(prev => prev + 1);
  };

  const handleRoadmapRedirect = (targetTab, targetId) => {
    setSelectedPeer(null);
    setSelectedJob(null);
    setSelectedEvent(null);
    setActiveChatId(null);
    setIsProfileOpen(false);
    setIsNotificationsOpen(false);

    if (targetTab === 'connect') {
      const peer = peers.find(p => p.id === targetId);
      if (peer) setSelectedPeer(peer);
    } else if (targetTab === 'career') {
      setSelectedJob(targetId);
    } else if (targetTab === 'events') {
      setSelectedEvent(targetId);
    }
    setActiveTab(targetTab);
  };

  return (
    <IPhoneFrame>
      {/* App Header */}
      <Header 
        profile={profile}
        onOpenProfile={() => setIsProfileOpen(true)}
        onResetHome={handleLogoReset}
        onNavigate={handleTabTransition}
        bookingsCount={engagements.length}
        unreadMessagesCount={activeDms.filter(dm => dm.unread).length}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        unreadNotificationsCount={notifications.filter(n => n.status === 'pending' || (n.type === 'post_activity_rating' && !n.rated)).length}
      />

      {/* Main Area router */}
      <main className="app-main">
        {activeTab === 'home' && (
          <HomeTab 
            profile={profile}
            engagements={engagements}
            onDeleteEngagement={handleDeleteEngagement}
            ledgerStats={ledgerStats}
            onNavigateToTab={handleTabTransition}
            onUpdateProfile={handleUpdateProfile}
            onRoadmapRedirect={handleRoadmapRedirect}
            selectedEngagement={selectedEngagement}
            setSelectedEngagement={setSelectedEngagement}
            homeResetKey={homeResetKey}
          />
        )}
        {activeTab === 'connect' && (
          <ConnectTab 
            peers={peers}
            selectedPeer={selectedPeer}
            setSelectedPeer={setSelectedPeer}
            onCreateBooking={handleCreateBooking}
          />
        )}
        {activeTab === 'events' && (
          <EventsTab 
            events={events}
            selectedEvent={selectedEvent}
            setSelectedEvent={setSelectedEvent}
            onToggleRSVP={handleToggleRSVP}
          />
        )}
        {activeTab === 'career' && (
          <CareerTab 
            profile={profile}
            ledgerStats={ledgerStats}
            selectedJob={selectedJob}
            setSelectedJob={setSelectedJob}
            onApplyJob={handleApplyJob}
          />
        )}
        {activeTab === 'chats' && (
          <ChatsHubTab 
            onBackHome={() => handleTabTransition('home')}
            channels={channels}
            onJoinChannel={handleJoinChannel}
            activeDms={activeDms}
            activeChatId={activeChatId}
            setActiveChatId={setActiveChatId}
            onReadChat={handleReadChat}
          />
        )}
      </main>

      {/* Sticky footer tab navigation bar */}
      <Footer 
        activeTab={activeTab === 'chats' ? 'home' : activeTab} // Keep HOME highlighted if inside chats
        onTabChange={(tab) => handleTabTransition(tab)}
      />

      {/* Slide-over identity control drawer */}
      <ProfileDrawer 
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        profile={profile}
        onUpdateProfile={handleUpdateProfile}
        onSync={handleSyncEduRec}
        onViewOwnResume={handleViewOwnResume}
      />

      {/* Notification Drawer Overlay */}
      <NotificationDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onAccept={handleAcceptRequest}
        onDecline={handleDeclineRequest}
        onRate={handleRateMentor}
        onClickNotification={handleNotificationClick}
        onDismiss={handleDismissNotification}
      />
    </IPhoneFrame>
  );
}

export default App;
