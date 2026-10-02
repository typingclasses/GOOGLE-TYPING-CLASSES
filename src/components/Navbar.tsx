import React, { useState } from 'react';
import { 
  Keyboard, 
  Menu, 
  X, 
  Phone, 
  MapPin, 
  User, 
  Award, 
  BookOpen, 
  Home, 
  Briefcase, 
  Activity, 
  Mail,
  ChevronDown,
  FileText
} from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  user: any;
  onLogout: () => void;
  settings?: any;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate, user, onLogout, settings }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [coursesDropdownOpen, setCoursesDropdownOpen] = useState(false);

  const handleNav = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
    setCoursesDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100">
      {/* Top Bar with Contact info */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-start">
            <span className="flex items-center gap-1.5 hover:text-white transition-colors">
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
              <span>Tripolia Kathak, Patna, Bihar – 800007</span>
            </span>
            <a href="tel:+919471085404" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone className="w-3.5 h-3.5 text-orange-400" />
              <span className="font-semibold">+91 9471085404</span>
            </a>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden md:inline-block text-slate-400">|</span>
            <button 
              onClick={() => handleNav('/typing-test')}
              className="flex items-center gap-1 text-orange-400 hover:text-orange-300 font-medium transition-colors"
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Free Typing Practice</span>
            </button>
            <span className="text-slate-400">|</span>
            <button 
              onClick={() => handleNav('/work-from-home')}
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
            >
              Work From Home
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => handleNav('/')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform overflow-hidden border border-blue-500/30">
            {settings?.logoUrl ? (
              <img src={settings.logoUrl} alt="Logo" className="w-full h-full object-cover" />
            ) : (
              <Keyboard className="w-6 h-6" />
            )}
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight leading-none group-hover:text-blue-600 transition-colors">
              GOOGLE TYPING <span className="text-blue-600">CLASSES</span>
            </h1>
            <p className="text-[11px] font-semibold text-slate-500 tracking-wider uppercase mt-0.5">
              Best Computer & Typing Institute in Patna
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          <button 
            onClick={() => handleNav('/')}
            className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${currentPath === '/' ? 'text-blue-600 bg-blue-50' : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'}`}
          >
            Home
          </button>

          {/* Courses Dropdown */}
          <div className="relative group">
            <button 
              onClick={() => setCoursesDropdownOpen(!coursesDropdownOpen)}
              className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:text-blue-600 hover:bg-slate-50 flex items-center gap-1 transition-colors"
            >
              <span>Courses</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {coursesDropdownOpen && (
              <div className="absolute top-full left-0 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 py-3 mt-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <button
                  onClick={() => handleNav('/courses')}
                  className="w-full px-4 py-2.5 text-left text-sm font-bold text-slate-900 hover:bg-slate-50 hover:text-blue-600 flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  <span>All Courses Overview</span>
                </button>
                <div className="h-px bg-slate-100 my-1"></div>
                <button
                  onClick={() => handleNav('/typing')}
                  className="w-full px-4 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                >
                  ⌨️ English & Hindi Typing Classes
                </button>
                <button
                  onClick={() => handleNav('/computer-courses')}
                  className="w-full px-4 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                >
                  💻 DCA, ADCA & Tally Prime
                </button>
                <button
                  onClick={() => handleNav('/shorthand')}
                  className="w-full px-4 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                >
                  ✍️ Shorthand (Stenography)
                </button>
              </div>
            )}
          </div>

          <button 
            onClick={() => handleNav('/typing-test')}
            className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${currentPath === '/typing-test' ? 'text-blue-600 bg-blue-50' : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'}`}
          >
            Typing Test
          </button>

          <button 
            onClick={() => handleNav('/results')}
            className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${currentPath === '/results' ? 'text-blue-600 bg-blue-50' : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'}`}
          >
            Results
          </button>

          <button 
            onClick={() => handleNav('/certificates')}
            className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${currentPath === '/certificates' ? 'text-blue-600 bg-blue-50' : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'}`}
          >
            Verify Certificate
          </button>

          <button 
            onClick={() => handleNav('/work-from-home')}
            className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${currentPath === '/work-from-home' ? 'text-blue-600 bg-blue-50' : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'}`}
          >
            Work From Home
          </button>

          <button 
            onClick={() => handleNav('/contact')}
            className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${currentPath === '/contact' ? 'text-blue-600 bg-blue-50' : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'}`}
          >
            Contact
          </button>
        </nav>

        {/* Right Auth / Student Portal Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleNav('/student-dashboard')}
                className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-2.5 rounded-xl font-bold text-xs transition-colors"
              >
                <User className="w-4 h-4" />
                <span>{user.name}</span>
              </button>
              <button
                onClick={onLogout}
                className="text-slate-600 hover:text-red-600 text-xs font-bold px-3 py-2 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleNav('/student-login')}
                className="text-slate-700 hover:text-blue-600 font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-slate-50 transition-colors"
              >
                Student Login
              </button>
              <button
                onClick={() => handleNav('/student-signup')}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md transition-all"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-6 space-y-4 animate-in slide-in-from-top duration-200 shadow-xl">
          <div className="space-y-1">
            <button
              onClick={() => handleNav('/')}
              className="w-full text-left px-4 py-3 rounded-xl font-bold text-sm text-slate-800 hover:bg-blue-50 hover:text-blue-600 flex items-center gap-3"
            >
              <Home className="w-4 h-4 text-blue-600" /> Home
            </button>
            <button
              onClick={() => handleNav('/courses')}
              className="w-full text-left px-4 py-3 rounded-xl font-bold text-sm text-slate-800 hover:bg-blue-50 hover:text-blue-600 flex items-center gap-3"
            >
              <BookOpen className="w-4 h-4 text-blue-600" /> All Courses
            </button>
            <button
              onClick={() => handleNav('/typing-test')}
              className="w-full text-left px-4 py-3 rounded-xl font-bold text-sm text-slate-800 hover:bg-blue-50 hover:text-blue-600 flex items-center gap-3"
            >
              <Activity className="w-4 h-4 text-orange-500" /> Free Typing Test
            </button>
            <button
              onClick={() => handleNav('/results')}
              className="w-full text-left px-4 py-3 rounded-xl font-bold text-sm text-slate-800 hover:bg-blue-50 hover:text-blue-600 flex items-center gap-3"
            >
              <Award className="w-4 h-4 text-amber-500" /> Results Verification
            </button>
            <button
              onClick={() => handleNav('/certificates')}
              className="w-full text-left px-4 py-3 rounded-xl font-bold text-sm text-slate-800 hover:bg-blue-50 hover:text-blue-600 flex items-center gap-3"
            >
              <FileText className="w-4 h-4 text-emerald-500" /> Verify Certificate
            </button>
            <button
              onClick={() => handleNav('/work-from-home')}
              className="w-full text-left px-4 py-3 rounded-xl font-bold text-sm text-slate-800 hover:bg-blue-50 hover:text-blue-600 flex items-center gap-3"
            >
              <Briefcase className="w-4 h-4 text-indigo-500" /> Work From Home
            </button>
            <button
              onClick={() => handleNav('/contact')}
              className="w-full text-left px-4 py-3 rounded-xl font-bold text-sm text-slate-800 hover:bg-blue-50 hover:text-blue-600 flex items-center gap-3"
            >
              <Mail className="w-4 h-4 text-sky-500" /> Contact Institute
            </button>
          </div>

          <div className="pt-4 border-t border-slate-100 space-y-3">
            {user ? (
              <div className="space-y-2">
                <button
                  onClick={() => handleNav('/student-dashboard')}
                  className="w-full bg-blue-50 text-blue-700 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2"
                >
                  <User className="w-4 h-4" /> Dashboard ({user.name})
                </button>
                <button
                  onClick={onLogout}
                  className="w-full bg-red-50 text-red-700 py-3 rounded-xl font-bold text-xs"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleNav('/student-login')}
                  className="w-full bg-slate-100 text-slate-800 py-3 rounded-xl font-bold text-xs"
                >
                  Student Login
                </button>
                <button
                  onClick={() => handleNav('/student-signup')}
                  className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold text-xs shadow-sm"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
