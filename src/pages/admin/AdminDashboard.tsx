import React from 'react';
import { 
  Users, 
  BookOpen, 
  Award, 
  FileText, 
  Activity, 
  Briefcase, 
  Mail, 
  Bell, 
  ArrowRight, 
  Plus, 
  CheckCircle, 
  TrendingUp,
  Clock
} from 'lucide-react';

interface AdminDashboardProps {
  onNavigate: (path: string) => void;
  data: {
    students: any[];
    courses: any[];
    results: any[];
    certificates: any[];
    typingTests: any[];
    wfhApps: any[];
    enquiries: any[];
    announcements: any[];
  };
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate, data }) => {
  const activeStudents = data.students.filter(s => s.status === 'Active');
  const newEnquiries = data.enquiries.filter(e => e.status === 'New');
  const newWfh = data.wfhApps.filter(w => w.status === 'New');

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Quick Actions Bar */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900">Admin Quick Actions</h2>
          <p className="text-xs text-slate-500">Manage institute records and instantly update the public website.</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <button 
            onClick={() => onNavigate('/admin/students')}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-4 h-4" /> Add Student
          </button>
          <button 
            onClick={() => onNavigate('/admin/courses')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-4 h-4" /> Add Course
          </button>
          <button 
            onClick={() => onNavigate('/admin/results')}
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-4 h-4" /> Add Result
          </button>
          <button 
            onClick={() => onNavigate('/admin/certificates')}
            className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-4 h-4" /> Issue Certificate
          </button>
          <button 
            onClick={() => onNavigate('/admin/announcements')}
            className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-4 h-4" /> Create Announcement
          </button>
        </div>
      </div>

      {/* Statistics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Students', count: data.students.length, sub: `${activeStudents.length} Active`, icon: Users, color: 'text-blue-600 bg-blue-50', path: '/admin/students' },
          { label: 'Active Courses', count: data.courses.length, sub: 'All Published', icon: BookOpen, color: 'text-indigo-600 bg-indigo-50', path: '/admin/courses' },
          { label: 'Student Results', count: data.results.length, sub: 'Searchable database', icon: Award, color: 'text-emerald-600 bg-emerald-50', path: '/admin/results' },
          { label: 'Certificates Issued', count: data.certificates.length, sub: 'Verified credentials', icon: FileText, color: 'text-amber-600 bg-amber-50', path: '/admin/certificates' },
          { label: 'Typing Tests Recorded', count: data.typingTests.length, sub: 'Speed test practice', icon: Activity, color: 'text-orange-600 bg-orange-50', path: '/admin/typing-tests' },
          { label: 'WFH / Affiliate Apps', count: data.wfhApps.length, sub: `${newWfh.length} New applications`, icon: Briefcase, color: 'text-purple-600 bg-purple-50', path: '/admin/work-from-home' },
          { label: 'New Enquiries', count: data.enquiries.length, sub: `${newEnquiries.length} Pending response`, icon: Mail, color: 'text-rose-600 bg-rose-50', path: '/admin/enquiries' },
          { label: 'Announcements', count: data.announcements.length, sub: 'Active on homepage', icon: Bell, color: 'text-sky-600 bg-sky-50', path: '/admin/announcements' }
        ].map((card, idx) => {
          const Icon = card.icon;
          return (
            <div 
              key={idx}
              onClick={() => onNavigate(card.path)}
              className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 hover:shadow-lg hover:border-blue-300 transition-all cursor-pointer group"
            >
              <div className="flex justify-between items-start">
                <div className={`w-12 h-12 rounded-2xl ${card.color} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-slate-400 group-hover:text-blue-600 transition-colors flex items-center gap-1">
                  View <ArrowRight className="w-3 h-3" />
                </span>
              </div>
              <div className="mt-4 space-y-1">
                <h3 className="text-3xl font-extrabold text-slate-900">{card.count}</h3>
                <p className="text-sm font-bold text-slate-700">{card.label}</p>
                <p className="text-xs text-slate-500">{card.sub}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Students */}
        <div className="bg-white p-7 rounded-3xl shadow-sm border border-slate-200 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-extrabold text-slate-900">Recent Enrolled Students</h3>
            <button onClick={() => onNavigate('/admin/students')} className="text-xs font-bold text-blue-600 hover:underline">
              View All
            </button>
          </div>
          <div className="space-y-3">
            {data.students.slice(0, 4).map((st) => (
              <div key={st.id} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{st.name}</h4>
                  <p className="text-xs text-slate-500">{st.course} • Reg: {st.registrationNo}</p>
                </div>
                <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-full">
                  {st.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Enquiries */}
        <div className="bg-white p-7 rounded-3xl shadow-sm border border-slate-200 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-extrabold text-slate-900">Recent Website Enquiries</h3>
            <button onClick={() => onNavigate('/admin/enquiries')} className="text-xs font-bold text-blue-600 hover:underline">
              View All
            </button>
          </div>
          <div className="space-y-3">
            {data.enquiries.slice(0, 4).map((enq) => (
              <div key={enq.id} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{enq.name} ({enq.mobile})</h4>
                  <p className="text-xs text-slate-600 line-clamp-1">{enq.message}</p>
                </div>
                <span className="text-xs bg-orange-100 text-orange-800 font-bold px-2.5 py-1 rounded-full shrink-0">
                  {enq.status}
                </span>
              </div>
            ))}
            {data.enquiries.length === 0 && (
              <p className="text-sm text-slate-400 py-6 text-center">No new enquiries found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
