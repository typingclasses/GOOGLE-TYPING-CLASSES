import React, { useState } from 'react';
import { User, Lock, ArrowRight, ShieldCheck } from 'lucide-react';

interface StudentLoginProps {
  onNavigate: (path: string) => void;
  onLogin: (userData: any) => void;
}

export const StudentLogin: React.FC<StudentLoginProps> = ({ onNavigate, onLogin }) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier || !password) {
      setError('Please fill in all fields');
      return;
    }

    const savedStudents = localStorage.getItem('gtc_students');
    let studentsList = [];
    if (savedStudents) {
      try {
        studentsList = JSON.parse(savedStudents);
      } catch (e) {}
    }

    const cleanInput = identifier.trim().toLowerCase();
    const foundStudent = studentsList.find((st: any) => 
      (st.mobile && st.mobile.toLowerCase() === cleanInput) ||
      (st.email && st.email.toLowerCase() === cleanInput) ||
      (st.registrationNo && st.registrationNo.toLowerCase() === cleanInput)
    );

    if (foundStudent) {
      if (foundStudent.password && foundStudent.password !== password) {
        setError('Incorrect password. Please try again.');
        return;
      }
      onLogin(foundStudent);
      onNavigate('/student-dashboard');
      return;
    }

    if (identifier === '9471085404' || identifier === 'student@googletypingclasses.com') {
      const mockUser = {
        id: 'GTC-2026-001',
        name: 'Rahul Student',
        email: 'student@googletypingclasses.com',
        mobile: '+91 9471085404',
        dob: '12/05/2005',
        course: 'English Typing & DCA Masterclass',
        registrationNo: 'REG884920',
        enrolledDate: '10 Jan 2026'
      };
      onLogin(mockUser);
      onNavigate('/student-dashboard');
      return;
    }

    setError('Student account not found with this mobile/email. Please sign up first.');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-16 px-4 sm:px-8">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-200 p-8 sm:p-10 space-y-8">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-blue-500/20">
            <User className="w-7 h-7" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Student Portal Login</h2>
          <p className="text-slate-500 text-sm">Access your course results, tests, and certificates</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 text-xs font-bold p-3.5 rounded-xl border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Email or Mobile Number</label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                required
                placeholder="Enter mobile or email"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-blue-600 transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Password</label>
              <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Please contact institute office at Tripolia Kathak, Patna to reset password.'); }} className="text-xs font-bold text-blue-600 hover:underline">
                Forgot Password?
              </a>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-blue-600 transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
          >
            <span>Login to Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-6 border-t border-slate-100 text-center text-sm text-slate-600">
          Don't have a student account?{' '}
          <button onClick={() => onNavigate('/student-signup')} className="font-bold text-blue-600 hover:underline">
            Create New Account
          </button>
        </div>
      </div>
    </div>
  );
};
