import React, { useState } from 'react';
import { User, Award, Activity, BookOpen, LogOut, CheckCircle, FileText, ArrowRight, Camera, Upload } from 'lucide-react';

interface StudentDashboardProps {
  user: any;
  onNavigate: (path: string) => void;
  onLogout: () => void;
  onUpdateUser?: (updatedUser: any) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ user, onNavigate, onLogout, onUpdateUser }) => {
  const [activeTab, setActiveTab] = useState<'course' | 'tests' | 'results' | 'certificates' | 'profile'>('course');
  const [photoPreview, setPhotoPreview] = useState<string>(user?.photo || '');
  const [notification, setNotification] = useState<string>('');

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setPhotoPreview(result);
          const updated = { ...user, photo: result };
          localStorage.setItem('gtc_student_user', JSON.stringify(updated));
          
          // Also update in gtc_students list if present
          const savedStudents = localStorage.getItem('gtc_students');
          if (savedStudents) {
            try {
              let studentsList = JSON.parse(savedStudents);
              studentsList = studentsList.map((st: any) => 
                st.id === user.id || st.email === user.email || st.mobile === user.mobile ? updated : st
              );
              localStorage.setItem('gtc_students', JSON.stringify(studentsList));
            } catch (err) {}
          }

          if (onUpdateUser) {
            onUpdateUser(updated);
          }
          setNotification('Profile photo uploaded successfully!');
          setTimeout(() => setNotification(''), 3000);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 text-center space-y-4 max-w-md">
          <h2 className="text-xl font-bold text-slate-900">Please Login</h2>
          <p className="text-sm text-slate-600">You must be logged in to view your student dashboard.</p>
          <button
            onClick={() => onNavigate('/student-login')}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold shadow-md"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Profile Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="relative group">
              <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-2xl font-extrabold shadow-lg overflow-hidden border-2 border-white/20">
                {photoPreview ? (
                  <img src={photoPreview} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  user.name.charAt(0)
                )}
              </div>
              <label className="absolute -bottom-1 -right-1 bg-blue-500 hover:bg-blue-600 text-white p-1.5 rounded-full shadow-md cursor-pointer transition-colors" title="Upload Photo">
                <Camera className="w-3.5 h-3.5" />
                <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
              </label>
            </div>
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 bg-blue-500/20 px-3 py-0.5 rounded-full text-xs font-bold text-blue-300">
                Student ID: {user.id}
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Welcome, {user.name}!</h1>
              <p className="text-slate-300 text-sm">Course: <strong className="text-white">{user.course}</strong> • Reg No: {user.registrationNo}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('/typing-test')}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-3 rounded-xl shadow-md transition-all text-sm flex items-center gap-2"
            >
              <Activity className="w-4 h-4" />
              <span>Take Typing Test</span>
            </button>
            <button
              onClick={onLogout}
              className="bg-white/10 hover:bg-white/20 text-white font-bold px-4 py-3 rounded-xl backdrop-blur-md transition-all text-sm flex items-center gap-1.5"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {notification && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-2xl text-sm font-bold flex items-center gap-2 shadow-sm">
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{notification}</span>
          </div>
        )}

        {/* Dashboard Navigation Tabs */}
        <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-2 overflow-x-auto">
          {[
            { id: 'course', label: 'My Course', icon: BookOpen },
            { id: 'tests', label: 'My Typing Tests', icon: Activity },
            { id: 'results', label: 'My Results', icon: Award },
            { id: 'certificates', label: 'My Certificates', icon: FileText },
            { id: 'profile', label: 'My Profile', icon: User }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all shrink-0 ${activeTab === tab.id ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'course' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-slate-200 space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-extrabold text-slate-900">Enrolled Course Progress</h3>
                  <span className="bg-emerald-100 text-emerald-800 text-xs font-extrabold px-3 py-1 rounded-full">Active Batch</span>
                </div>

                <div className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <div className="flex justify-between items-center text-sm font-bold text-slate-800">
                    <span>{user.course}</span>
                    <span className="text-blue-600">65% Completed</span>
                  </div>
                  <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full rounded-full w-[65%]"></div>
                  </div>
                  <p className="text-xs text-slate-500">Institute Location: Tripolia Kathak, Patna, Bihar – 800007</p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-bold text-slate-900">Course Syllabus & Modules:</h4>
                  {[
                    "Module 1: Keyboard Layout & Finger Placement (Completed)",
                    "Module 2: Speed & Accuracy Drills (Completed)",
                    "Module 3: Advanced Passage Typing (In Progress)",
                    "Module 4: Final Assessment & Certification (Pending)"
                  ].map((m, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-slate-700 bg-white p-3.5 rounded-xl border border-slate-200">
                      <CheckCircle className={`w-4 h-4 ${i < 2 ? 'text-emerald-500' : 'text-slate-300'}`} />
                      <span>{m}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 space-y-6">
                <h3 className="text-xl font-extrabold text-slate-900">Quick Actions</h3>
                <div className="space-y-3">
                  <button 
                    onClick={() => onNavigate('/typing-test')}
                    className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold p-4 rounded-xl text-sm flex items-center justify-between transition-colors border border-blue-200"
                  >
                    <span>Start Practice Test</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setActiveTab('certificates')}
                    className="w-full bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold p-4 rounded-xl text-sm flex items-center justify-between transition-colors border border-amber-200"
                  >
                    <span>View Certificate Status</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => onNavigate('/contact')}
                    className="w-full bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold p-4 rounded-xl text-sm flex items-center justify-between transition-colors border border-slate-200"
                  >
                    <span>Contact Institute Office</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tests' && (
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-extrabold text-slate-900">Recent Typing Test Practice</h3>
                <button 
                  onClick={() => onNavigate('/typing-test')}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-xl text-sm shadow-md"
                >
                  Take New Test
                </button>
              </div>
              <div className="space-y-3">
                {[
                  { date: '25 Sep 2026', mode: 'English', wpm: 46, accuracy: '97.5%', errors: 2 },
                  { date: '23 Sep 2026', mode: 'English', wpm: 42, accuracy: '95.0%', errors: 4 },
                  { date: '20 Sep 2026', mode: 'Hindi (Kruti Dev)', wpm: 35, accuracy: '94.2%', errors: 5 }
                ].map((test, idx) => (
                  <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="space-y-1">
                      <div className="font-bold text-slate-900">{test.mode} Typing Test</div>
                      <div className="text-xs text-slate-500">Date: {test.date}</div>
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                      <div><span className="text-slate-400 text-xs block">Speed</span><strong className="text-blue-600 text-base">{test.wpm} WPM</strong></div>
                      <div><span className="text-slate-400 text-xs block">Accuracy</span><strong className="text-emerald-600 text-base">{test.accuracy}</strong></div>
                      <div><span className="text-slate-400 text-xs block">Errors</span><strong className="text-red-500 text-base">{test.errors}</strong></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'results' && (
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 space-y-6">
              <h3 className="text-xl font-extrabold text-slate-900">My Examination Results</h3>
              <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-emerald-900">{user.course}</span>
                  <span className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full">Passed / Distinction</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-slate-700 pt-2 border-t border-emerald-200">
                  <div><span className="text-slate-500 block text-xs">Registration No</span><strong>{user.registrationNo}</strong></div>
                  <div><span className="text-slate-500 block text-xs">Typing Speed</span><strong>48 WPM</strong></div>
                  <div><span className="text-slate-500 block text-xs">Accuracy</span><strong>98.5%</strong></div>
                  <div><span className="text-slate-500 block text-xs">Status</span><strong className="text-emerald-700">Certified</strong></div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'certificates' && (
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 space-y-6">
              <h3 className="text-xl font-extrabold text-slate-900">Course Completion Certificate</h3>
              <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl space-y-4">
                <div className="flex items-center gap-3">
                  <Award className="w-8 h-8 text-amber-600" />
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-lg">Google Typing Classes Certificate</h4>
                    <p className="text-xs text-slate-600">Registration: {user.registrationNo} • Student ID: {user.id}</p>
                  </div>
                </div>
                <p className="text-sm text-slate-700">
                  Your course completion certificate is currently verified and available for collection at our Patna institute office (Tripolia Kathak, Patna – 800007).
                </p>
                <div className="pt-2">
                  <button 
                    onClick={() => alert('Certificate PDF preview is ready. You can download or print from the institute office.')}
                    className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-6 py-2.5 rounded-xl text-sm shadow-md transition-all"
                  >
                    View Certificate Details
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 space-y-6 max-w-2xl">
              <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-100">
                <div className="w-20 h-20 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-3xl font-extrabold shadow-lg overflow-hidden border-2 border-slate-200 shrink-0">
                  {photoPreview ? (
                    <img src={photoPreview} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    user.name.charAt(0)
                  )}
                </div>
                <div className="space-y-2 text-center sm:text-left">
                  <h4 className="font-extrabold text-slate-900 text-lg">Student Passport Photo</h4>
                  <p className="text-xs text-slate-500">Upload or change your profile photo (JPEG, PNG). This will update your student ID card & dashboard.</p>
                  <label className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md cursor-pointer transition-all">
                    <Upload className="w-4 h-4" />
                    <span>Upload New Photo</span>
                    <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                  </label>
                </div>
              </div>

              <h3 className="text-xl font-extrabold text-slate-900">Student Profile Information</h3>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between py-3 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Full Name</span>
                  <span className="font-bold text-slate-900">{user.name}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Student ID</span>
                  <span className="font-bold text-slate-900">{user.id}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Date of Birth (DOB)</span>
                  <span className="font-bold text-blue-600">{user.dob || '12/05/2005'}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Registration Number</span>
                  <span className="font-bold text-blue-600">{user.registrationNo}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Mobile Number</span>
                  <span className="font-bold text-slate-900">{user.mobile}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Enrolled Course</span>
                  <span className="font-bold text-slate-900">{user.course}</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-slate-500 font-medium">Institute Address</span>
                  <span className="font-bold text-slate-900">Tripolia Kathak, Patna – 800007</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
