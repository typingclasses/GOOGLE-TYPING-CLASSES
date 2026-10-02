import React from 'react';
import { 
  Keyboard, 
  MapPin, 
  Phone, 
  Mail, 
  Award, 
  ArrowRight, 
  ShieldCheck,
  Send,
  ExternalLink,
  Lock
} from 'lucide-react';
import { InstituteSettings } from '../types';

interface FooterProps {
  onNavigate: (path: string) => void;
  settings?: InstituteSettings;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, settings }) => {
  const handleClick = (path: string) => {
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const facebookUrl = settings?.facebookUrl || 'https://facebook.com/googletypingclassespatna';
  const youtubeUrl = settings?.youtubeUrl || 'https://youtube.com/@googletypingclassespatna';
  const instagramUrl = settings?.instagramUrl || 'https://instagram.com/googletypingclasses';
  const telegramUrl = settings?.telegramUrl || 'https://t.me/googletypingclasses';

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Info & Social Media */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                <Keyboard className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-white font-extrabold text-lg tracking-tight">
                  GOOGLE TYPING <span className="text-blue-500">CLASSES</span>
                </h3>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Best Computer & Typing Classes in Patna. Empowering students with professional keyboard mastery, DCA, ADCA, Tally, Shorthand, and competitive exam readiness.
            </p>
            
            <div className="flex items-center gap-2 text-xs text-blue-400 font-semibold bg-blue-950/60 p-3 rounded-xl border border-blue-900/50">
              <Award className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Course Completion Certificate Available</span>
            </div>

            {/* Social Media Links Icons */}
            <div className="pt-2">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Follow & Connect With Us:
              </div>
              <div className="flex items-center gap-3">
                {/* Facebook */}
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-[#1877F2]/20 hover:bg-[#1877F2] text-[#1877F2] hover:text-white border border-[#1877F2]/30 flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-sm"
                  title="Facebook - Google Typing Classes"
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href={youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-[#FF0000]/20 hover:bg-[#FF0000] text-[#FF0000] hover:text-white border border-[#FF0000]/30 flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-sm"
                  title="YouTube - Google Typing Classes"
                  aria-label="YouTube"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-[#E4405F]/20 hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] text-[#E4405F] hover:text-white border border-[#E4405F]/30 flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-sm"
                  title="Instagram - Google Typing Classes"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>

                {/* Telegram */}
                <a
                  href={telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-[#229ED9]/20 hover:bg-[#229ED9] text-[#229ED9] hover:text-white border border-[#229ED9]/30 flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-sm"
                  title="Telegram - Google Typing Classes"
                  aria-label="Telegram"
                >
                  <Send className="w-4 h-4 fill-current" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-base mb-4 tracking-wide uppercase text-xs text-blue-400">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => handleClick('/')} className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" /> Home
                </button>
              </li>
              <li>
                <button onClick={() => handleClick('/courses')} className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" /> All Courses
                </button>
              </li>
              <li>
                <button onClick={() => handleClick('/results')} className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" /> Student Results
                </button>
              </li>
              <li>
                <button onClick={() => handleClick('/certificates')} className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" /> Verify Certificates
                </button>
              </li>
              <li>
                <button onClick={() => handleClick('/student-login')} className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" /> Student Login
                </button>
              </li>
              <li>
                <button onClick={() => handleClick('/work-from-home')} className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" /> Work From Home
                </button>
              </li>
              <li>
                <button onClick={() => handleClick('/contact')} className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" /> Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Popular Courses */}
          <div>
            <h4 className="text-white font-bold text-base mb-4 tracking-wide uppercase text-xs text-blue-400">
              Courses & Programs
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => handleClick('/typing')} className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" /> English Typing
                </button>
              </li>
              <li>
                <button onClick={() => handleClick('/typing')} className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" /> Hindi Typing (Kruti Dev / Gail)
                </button>
              </li>
              <li>
                <button onClick={() => handleClick('/shorthand')} className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" /> Shorthand / Stenography
                </button>
              </li>
              <li>
                <button onClick={() => handleClick('/computer-courses')} className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" /> DCA & ADCA Courses
                </button>
              </li>
              <li>
                <button onClick={() => handleClick('/computer-courses')} className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" /> Tally Prime with GST
                </button>
              </li>
              <li>
                <button onClick={() => handleClick('/typing-test')} className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" /> Online Typing Test Series
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-white font-bold text-base mb-4 tracking-wide uppercase text-xs text-blue-400">
              Institute Contact
            </h4>
            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <span>{settings?.address || 'Tripolia Kathak, Patna, Bihar – 800007'}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-orange-400 shrink-0" />
                <a href={`tel:${settings?.phone || '+919471085404'}`} className="font-bold hover:text-white transition-colors">
                  {settings?.phone || '+91 9471085404'}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-400 shrink-0" />
                <a href={`mailto:${settings?.email || 'maasitaniwas@gmail.com'}`} className="text-slate-300 hover:text-white transition-colors">
                  {settings?.email || 'maasitaniwas@gmail.com'}
                </a>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Verified Training Institute in Patna</span>
            </div>
          </div>
        </div>

        {/* Dedicated Social Media Banner Strip */}
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <h5 className="text-white font-bold text-sm">Join Our Community & Get Latest Updates</h5>
            <p className="text-xs text-slate-400 mt-0.5">Subscribe to YouTube, follow Facebook & Instagram, and join Telegram for study material.</p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap justify-center">
            {/* Facebook button */}
            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#1877F2] hover:bg-[#166fe5] text-white px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-transform hover:scale-105"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>Facebook</span>
            </a>

            {/* YouTube button */}
            <a
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#FF0000] hover:bg-[#e60000] text-white px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-transform hover:scale-105"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              <span>YouTube</span>
            </a>

            {/* Instagram button */}
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] hover:opacity-95 text-white px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-transform hover:scale-105"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span>Instagram</span>
            </a>

            {/* Telegram button */}
            <a
              href={telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#229ED9] hover:bg-[#1e8dbf] text-white px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-transform hover:scale-105"
            >
              <Send className="w-3.5 h-3.5 fill-current" />
              <span>Telegram</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar: Legal links & Copyright */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <div>
            {settings?.footerText || '© 2026 Google Typing Classes. All Rights Reserved.'}
          </div>
          <div className="flex items-center gap-6 flex-wrap justify-center">
            <button onClick={() => handleClick('/privacy-policy')} className="hover:text-white transition-colors">Privacy Policy</button>
            <span>•</span>
            <button onClick={() => handleClick('/terms')} className="hover:text-white transition-colors">Terms & Conditions</button>
            <span>•</span>
            <button onClick={() => handleClick('/disclaimer')} className="hover:text-white transition-colors">Disclaimer</button>
            <span>•</span>
            <button onClick={() => handleClick('/admin/login')} className="hover:text-amber-400 text-slate-400 transition-colors flex items-center gap-1 font-medium">
              <Lock className="w-3 h-3 text-amber-500" /> Admin Login
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
