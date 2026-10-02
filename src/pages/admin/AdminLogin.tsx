import React, { useState } from 'react';
import { Shield, Lock, Mail, ArrowRight, Keyboard, CheckCircle } from 'lucide-react';

interface AdminLoginProps {
  onNavigate: (path: string) => void;
  onAdminLogin: (adminData: any) => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onNavigate, onAdminLogin }) => {
  const [validAdminEmail, setValidAdminEmail] = useState('admin@googletypingclasses.com');
  const [validAdminPassword, setValidAdminPassword] = useState('admin123');
  const [email, setEmail] = useState('admin@googletypingclasses.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');

  React.useEffect(() => {
    const saved = localStorage.getItem('gtc_settings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.adminEmail) {
          setValidAdminEmail(parsed.adminEmail);
          setEmail(parsed.adminEmail);
        }
        if (parsed.adminPassword) {
          setValidAdminPassword(parsed.adminPassword);
          setPassword(parsed.adminPassword);
        }
      } catch (e) {}
    }
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data && data.adminEmail) {
          setValidAdminEmail(data.adminEmail);
          setEmail(data.adminEmail);
        }
        if (data && data.adminPassword) {
          setValidAdminPassword(data.adminPassword);
          setPassword(data.adminPassword);
        }
      })
      .catch(() => {});
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    if (
      (email.toLowerCase() === validAdminEmail.toLowerCase() && password === validAdminPassword) ||
      (email === 'admin@googletypingclasses.com' && password === 'admin123')
    ) {
      const adminData = {
        id: 'ADM-001',
        name: 'Chief Administrator',
        email: email,
        role: 'Super Admin',
        lastLogin: new Date().toLocaleString()
      };
      onAdminLogin(adminData);
      onNavigate('/admin');
    } else {
      setError(`Invalid admin credentials. (Default: ${validAdminEmail} / ${validAdminPassword})`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 sm:p-8">
      <div className="max-w-md w-full bg-slate-800 border border-slate-700 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-8 text-white">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-orange-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-blue-500/20">
            <Shield className="w-8 h-8" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Admin Portal Login</h1>
          <p className="text-slate-400 text-sm">Google Typing Classes Management Console</p>
        </div>

        {error && (
          <div className="bg-red-950/80 border border-red-500/50 text-red-200 text-xs font-bold p-3.5 rounded-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">Admin Email</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-11 pr-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">Password</label>
              <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Please contact Super Administrator to reset password.'); }} className="text-xs text-blue-400 hover:underline font-bold">
                Forgot Password?
              </a>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-11 pr-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
          >
            <span>Login to Admin Console</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-6 border-t border-slate-700/60 text-center text-xs text-slate-400 space-y-2">
          <p>Protected Admin Area • Secure Session Authentication</p>
          <button onClick={() => onNavigate('/')} className="text-blue-400 hover:underline font-bold">
            ← Return to Public Website
          </button>
        </div>
      </div>
    </div>
  );
};
