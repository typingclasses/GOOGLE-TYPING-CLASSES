import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Courses } from './pages/Courses';
import { TypingClasses } from './pages/TypingClasses';
import { ComputerCourses } from './pages/ComputerCourses';
import { Shorthand } from './pages/Shorthand';
import { Certificates } from './pages/Certificates';
import { Results } from './pages/Results';
import { WorkFromHome } from './pages/WorkFromHome';
import { StudentLogin } from './pages/StudentLogin';
import { StudentSignup } from './pages/StudentSignup';
import { StudentDashboard } from './pages/StudentDashboard';
import { TypingTest } from './pages/TypingTest';
import { Contact } from './pages/Contact';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { Terms } from './pages/Terms';
import { Disclaimer } from './pages/Disclaimer';

// Admin imports
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminStudents } from './pages/admin/AdminStudents';
import { AdminCourses } from './pages/admin/AdminCourses';
import { AdminResults } from './pages/admin/AdminResults';
import { AdminCertificates } from './pages/admin/AdminCertificates';
import { AdminTypingTests } from './pages/admin/AdminTypingTests';
import { AdminWorkFromHome } from './pages/admin/AdminWorkFromHome';
import { AdminEnquiries } from './pages/admin/AdminEnquiries';
import { AdminAnnouncements } from './pages/admin/AdminAnnouncements';
import { AdminMedia } from './pages/admin/AdminMedia';
import { AdminContent } from './pages/admin/AdminContent';
import { AdminUsers } from './pages/admin/AdminUsers';
import { AdminLogs } from './pages/admin/AdminLogs';
import { AdminSettings } from './pages/admin/AdminSettings';

import { 
  INITIAL_COURSES, 
  INITIAL_STUDENTS, 
  INITIAL_RESULTS, 
  INITIAL_CERTIFICATES, 
  INITIAL_WFH_APPLICATIONS, 
  INITIAL_ENQUIRIES, 
  INITIAL_ANNOUNCEMENTS, 
  INITIAL_MEDIA, 
  INITIAL_LOGS, 
  INITIAL_SETTINGS,
  INITIAL_TYPING_PASSAGES
} from './data/mockData';
import { TypingPassage } from './types';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>('/');
  const [user, setUser] = useState<any>(() => {
    const saved = localStorage.getItem('gtc_student_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [adminUser, setAdminUser] = useState<any>(() => {
    const saved = localStorage.getItem('gtc_admin_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Persistent website data synced between Admin and Public
  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem('gtc_courses');
    return saved ? JSON.parse(saved) : INITIAL_COURSES;
  });

  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('gtc_students');
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
  });

  const [results, setResults] = useState(() => {
    const saved = localStorage.getItem('gtc_results');
    return saved ? JSON.parse(saved) : INITIAL_RESULTS;
  });

  const [certificates, setCertificates] = useState(() => {
    const saved = localStorage.getItem('gtc_certificates');
    return saved ? JSON.parse(saved) : INITIAL_CERTIFICATES;
  });

  const [typingTests, setTypingTests] = useState(() => {
    const saved = localStorage.getItem('gtc_typing_tests');
    return saved ? JSON.parse(saved) : [];
  });

  const [typingPassages, setTypingPassages] = useState<TypingPassage[]>(() => {
    const saved = localStorage.getItem('gtc_typing_passages');
    return saved ? JSON.parse(saved) : INITIAL_TYPING_PASSAGES;
  });

  const [wfhApps, setWfhApps] = useState(() => {
    const saved = localStorage.getItem('gtc_wfh_apps');
    return saved ? JSON.parse(saved) : INITIAL_WFH_APPLICATIONS;
  });

  const [enquiries, setEnquiries] = useState(() => {
    const saved = localStorage.getItem('gtc_enquiries');
    return saved ? JSON.parse(saved) : INITIAL_ENQUIRIES;
  });

  const [announcements, setAnnouncements] = useState(() => {
    const saved = localStorage.getItem('gtc_announcements');
    return saved ? JSON.parse(saved) : INITIAL_ANNOUNCEMENTS;
  });

  const [media, setMedia] = useState(() => {
    const saved = localStorage.getItem('gtc_media');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // If old unsplash image exists, update it to new official banner
        if (Array.isArray(parsed) && parsed.some((m: any) => m.url && m.url.includes('unsplash.com/photo-1517694712202'))) {
          localStorage.setItem('gtc_media', JSON.stringify(INITIAL_MEDIA));
          return INITIAL_MEDIA;
        }
        return parsed;
      } catch (e) {
        return INITIAL_MEDIA;
      }
    }
    return INITIAL_MEDIA;
  });

  const [logs, setLogs] = useState(() => {
    const saved = localStorage.getItem('gtc_logs');
    return saved ? JSON.parse(saved) : INITIAL_LOGS;
  });

  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('gtc_settings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (!parsed.email || parsed.email === 'support@googletypingclasses.com') {
          parsed.email = 'maasitaniwas@gmail.com';
          localStorage.setItem('gtc_settings', JSON.stringify({ ...INITIAL_SETTINGS, ...parsed }));
        }
        return { ...INITIAL_SETTINGS, ...parsed };
      } catch (e) {
        return INITIAL_SETTINGS;
      }
    }
    return INITIAL_SETTINGS;
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || '/';
      setCurrentPath(hash);
    };

    if (window.location.hash) {
      handleHashChange();
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (path: string) => {
    window.location.hash = path;
    setCurrentPath(path);
  };

  const logAction = (action: string, details: string) => {
    const newLog = {
      id: `LOG-${Date.now()}`,
      adminName: adminUser?.name || 'Administrator',
      action,
      details,
      date: new Date().toLocaleString(),
      ipAddress: '192.168.1.50'
    };
    const updated = [newLog, ...logs];
    setLogs(updated);
    localStorage.setItem('gtc_logs', JSON.stringify(updated));
  };

  const handleUpdateCourses = (newC: any[]) => {
    setCourses(newC);
    localStorage.setItem('gtc_courses', JSON.stringify(newC));
  };

  const handleUpdateStudents = (newS: any[]) => {
    setStudents(newS);
    localStorage.setItem('gtc_students', JSON.stringify(newS));
  };

  const handleUpdateResults = (newR: any[]) => {
    setResults(newR);
    localStorage.setItem('gtc_results', JSON.stringify(newR));
  };

  const handleUpdateCertificates = (newC: any[]) => {
    setCertificates(newC);
    localStorage.setItem('gtc_certificates', JSON.stringify(newC));
  };

  const handleUpdateTypingTests = (newT: any[]) => {
    setTypingTests(newT);
    localStorage.setItem('gtc_typing_tests', JSON.stringify(newT));
  };

  const handleUpdateTypingPassages = (newP: TypingPassage[]) => {
    setTypingPassages(newP);
    localStorage.setItem('gtc_typing_passages', JSON.stringify(newP));
  };

  const handleUpdateWfhApps = (newW: any[]) => {
    setWfhApps(newW);
    localStorage.setItem('gtc_wfh_apps', JSON.stringify(newW));
  };

  const handleUpdateEnquiries = (newE: any[]) => {
    setEnquiries(newE);
    localStorage.setItem('gtc_enquiries', JSON.stringify(newE));
  };

  const handleUpdateAnnouncements = (newA: any[]) => {
    setAnnouncements(newA);
    localStorage.setItem('gtc_announcements', JSON.stringify(newA));
  };

  const handleUpdateMedia = (newM: any[]) => {
    setMedia(newM);
    localStorage.setItem('gtc_media', JSON.stringify(newM));
  };

  const handleUpdateSettings = (newSt: any) => {
    setSettings(newSt);
    localStorage.setItem('gtc_settings', JSON.stringify(newSt));
  };

  // Check if current path is an admin route
  const isAdminRoute = currentPath.startsWith('/admin');

  if (isAdminRoute) {
    if (currentPath === '/admin/login') {
      return (
        <AdminLogin 
          onNavigate={handleNavigate} 
          onAdminLogin={(adm) => {
            setAdminUser(adm);
            localStorage.setItem('gtc_admin_user', JSON.stringify(adm));
            logAction('Admin Login', 'Successfully logged into admin portal.');
          }} 
        />
      );
    }

    if (!adminUser) {
      // Redirect to admin login if not authenticated
      window.location.hash = '/admin/login';
      return (
        <AdminLogin 
          onNavigate={handleNavigate} 
          onAdminLogin={(adm) => {
            setAdminUser(adm);
            localStorage.setItem('gtc_admin_user', JSON.stringify(adm));
            logAction('Admin Login', 'Successfully logged into admin portal.');
          }} 
        />
      );
    }

    const renderAdminPage = () => {
      switch (currentPath) {
        case '/admin':
        case '/admin/dashboard':
          return (
            <AdminDashboard 
              onNavigate={handleNavigate} 
              data={{ students, courses, results, certificates, typingTests, wfhApps, enquiries, announcements }} 
            />
          );
        case '/admin/students':
          return <AdminStudents students={students} onUpdateStudents={handleUpdateStudents} onLogAction={logAction} />;
        case '/admin/courses':
          return <AdminCourses courses={courses} onUpdateCourses={handleUpdateCourses} onLogAction={logAction} />;
        case '/admin/results':
          return <AdminResults results={results} onUpdateResults={handleUpdateResults} onLogAction={logAction} />;
        case '/admin/certificates':
          return <AdminCertificates certificates={certificates} onUpdateCertificates={handleUpdateCertificates} onLogAction={logAction} />;
        case '/admin/typing-tests':
          return (
            <AdminTypingTests 
              typingTests={typingTests} 
              onUpdateTypingTests={handleUpdateTypingTests} 
              typingPassages={typingPassages}
              onUpdateTypingPassages={handleUpdateTypingPassages}
              onLogAction={logAction} 
            />
          );
        case '/admin/work-from-home':
          return <AdminWorkFromHome wfhApps={wfhApps} onUpdateWfhApps={handleUpdateWfhApps} onLogAction={logAction} />;
        case '/admin/enquiries':
          return <AdminEnquiries enquiries={enquiries} onUpdateEnquiries={handleUpdateEnquiries} onLogAction={logAction} />;
        case '/admin/announcements':
          return <AdminAnnouncements announcements={announcements} onUpdateAnnouncements={handleUpdateAnnouncements} onLogAction={logAction} />;
        case '/admin/media':
          return <AdminMedia media={media} onUpdateMedia={handleUpdateMedia} onLogAction={logAction} />;
        case '/admin/content':
          return <AdminContent onLogAction={logAction} />;
        case '/admin/users':
          return <AdminUsers onLogAction={logAction} />;
        case '/admin/logs':
          return <AdminLogs logs={logs} />;
        case '/admin/settings':
          return <AdminSettings settings={settings} onUpdateSettings={handleUpdateSettings} onLogAction={logAction} />;
        default:
          return (
            <AdminDashboard 
              onNavigate={handleNavigate} 
              data={{ students, courses, results, certificates, typingTests, wfhApps, enquiries, announcements }} 
            />
          );
      }
    };

    return (
      <AdminLayout 
        currentPath={currentPath} 
        onNavigate={handleNavigate} 
        adminUser={adminUser}
        onAdminLogout={() => {
          logAction('Admin Logout', 'Logged out of admin console.');
          setAdminUser(null);
          localStorage.removeItem('gtc_admin_user');
          handleNavigate('/admin/login');
        }}
      >
        {renderAdminPage()}
      </AdminLayout>
    );
  }

  // Public Website Routes
  const renderPublicPage = () => {
    switch (currentPath) {
      case '/':
        return <Home onNavigate={handleNavigate} courses={courses} announcements={announcements} media={media} />;
      case '/courses':
        return <Courses onNavigate={handleNavigate} courses={courses} />;
      case '/typing':
        return <TypingClasses onNavigate={handleNavigate} />;
      case '/computer-courses':
        return <ComputerCourses onNavigate={handleNavigate} />;
      case '/shorthand':
        return <Shorthand onNavigate={handleNavigate} />;
      case '/certificates':
        return <Certificates onNavigate={handleNavigate} certificates={certificates} />;
      case '/results':
        return <Results onNavigate={handleNavigate} results={results} />;
      case '/work-from-home':
        return <WorkFromHome onNavigate={handleNavigate} wfhApps={wfhApps} onAddWfhApp={(app) => {
          const updated = [app, ...wfhApps];
          setWfhApps(updated);
          localStorage.setItem('gtc_wfh_apps', JSON.stringify(updated));
        }} />;
      case '/student-login':
        return <StudentLogin onNavigate={handleNavigate} onLogin={(userData) => {
          setUser(userData);
          localStorage.setItem('gtc_student_user', JSON.stringify(userData));
        }} />;
      case '/student-signup':
        return <StudentSignup onNavigate={handleNavigate} courses={courses} onLogin={(userData) => {
          setUser(userData);
          localStorage.setItem('gtc_student_user', JSON.stringify(userData));
          const newSt = { ...userData, status: 'Active' };
          const updatedSt = [newSt, ...students];
          setStudents(updatedSt);
          localStorage.setItem('gtc_students', JSON.stringify(updatedSt));
        }} />;
      case '/student-dashboard':
        return <StudentDashboard user={user} onNavigate={handleNavigate} onLogout={() => {
          setUser(null);
          localStorage.removeItem('gtc_student_user');
          handleNavigate('/');
        }} />;
      case '/typing-test':
        return <TypingTest onNavigate={handleNavigate} user={user} passages={typingPassages} onSaveTestScore={(score) => {
          const updated = [score, ...typingTests];
          setTypingTests(updated);
          localStorage.setItem('gtc_typing_tests', JSON.stringify(updated));
        }} />;
      case '/contact':
        return <Contact onNavigate={handleNavigate} settings={settings} onAddEnquiry={(enq) => {
          const updated = [enq, ...enquiries];
          setEnquiries(updated);
          localStorage.setItem('gtc_enquiries', JSON.stringify(updated));
        }} />;
      case '/privacy-policy':
        return <PrivacyPolicy onNavigate={handleNavigate} />;
      case '/terms':
        return <Terms onNavigate={handleNavigate} />;
      case '/disclaimer':
        return <Disclaimer onNavigate={handleNavigate} />;
      default:
        return <Home onNavigate={handleNavigate} courses={courses} announcements={announcements} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-['Plus_Jakarta_Sans',sans-serif]">
      <Navbar 
        currentPath={currentPath} 
        onNavigate={handleNavigate} 
        user={user} 
        settings={settings}
        onLogout={() => {
          setUser(null);
          localStorage.removeItem('gtc_student_user');
          handleNavigate('/');
        }} 
      />
      
      <main className="flex-grow">
        {renderPublicPage()}
      </main>

      <Footer onNavigate={handleNavigate} settings={settings} />
    </div>
  );
}
