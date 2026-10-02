import React from 'react';
import { 
  Phone, 
  Award, 
  CheckCircle, 
  MapPin, 
  Globe, 
  Mail, 
  Users, 
  BookOpen, 
  Sparkles, 
  Monitor, 
  Laptop, 
  Keyboard, 
  Bot, 
  TrendingUp, 
  FileSpreadsheet, 
  ArrowRight,
  Facebook,
  Instagram,
  Youtube
} from 'lucide-react';
import officialBannerImg from '../assets/images/official_gtc_banner_1790423250991.jpg';

interface OfficialAdmissionBannerProps {
  onNavigate?: (path: string) => void;
}

export const OfficialAdmissionBanner: React.FC<OfficialAdmissionBannerProps> = ({ onNavigate }) => {
  const [customBanner, setCustomBanner] = React.useState<string>('');

  React.useEffect(() => {
    const savedSettings = localStorage.getItem('gtc_settings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        if (parsed.bannerImageUrl) {
          setCustomBanner(parsed.bannerImageUrl);
        } else if (parsed.heroImageUrl) {
          setCustomBanner(parsed.heroImageUrl);
        }
      } catch (e) {}
    }
  }, []);

  const handleCourseClick = (courseTitle: string) => {
    if (onNavigate) {
      onNavigate('/courses');
    }
  };

  return (
    <div className="w-full bg-white rounded-3xl shadow-xl border-2 border-blue-100 overflow-hidden my-8">
      {/* High-Resolution Banner Image Preview */}
      <div className="relative w-full overflow-hidden bg-slate-900 group">
        <img 
          src={customBanner || officialBannerImg} 
          alt="Google Typing Classes Official Admission Banner Patna" 
          className="w-full h-auto object-cover max-h-[520px] transition-transform duration-700 group-hover:scale-[1.02]"
        />
        <div className="absolute top-4 right-4 bg-orange-500 text-white text-xs font-black px-4 py-1.5 rounded-full shadow-lg uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" /> Admission Open 2026
        </div>
      </div>

      {/* Interactive Popular Courses Quick Action Strip */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-6 sm:p-8 text-white space-y-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-b border-white/10 pb-5">
          <div>
            <div className="text-amber-400 text-xs font-extrabold tracking-widest uppercase flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-400" />
              100% Practical Training & Govt. Certified • Tripolia, Patna
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
              Google Typing Classes — Popular Courses
            </h3>
          </div>

          {/* Quick Action Navigation Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => onNavigate && onNavigate('/courses')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 shadow-md transition-all"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Explore Courses</span>
            </button>
            <button
              onClick={() => onNavigate && onNavigate('/typing-test')}
              className="bg-white/15 hover:bg-white/25 text-white border border-white/20 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 backdrop-blur-md transition-all"
            >
              <Keyboard className="w-3.5 h-3.5 text-orange-400" />
              <span>Free Typing Test</span>
            </button>
            <button
              onClick={() => onNavigate && onNavigate('/results')}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 shadow-md transition-all"
            >
              <span>🏆 View Results</span>
            </button>
            <a
              href="tel:+919471085404"
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 shadow-md transition-all"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>+91 9471085404</span>
            </a>
          </div>
        </div>

        {/* 6 Core Courses Cards matching the banner */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {/* 1. DCA */}
          <div className="bg-white/10 hover:bg-white/15 border border-white/10 p-3.5 rounded-2xl flex flex-col justify-between transition-all group">
            <div className="space-y-1.5">
              <div className="w-8 h-8 rounded-xl bg-blue-500/30 text-blue-400 flex items-center justify-center font-bold">
                <Laptop className="w-4 h-4" />
              </div>
              <h4 className="font-extrabold text-sm text-white">DCA</h4>
              <p className="text-[11px] text-slate-300 line-clamp-2">Diploma in Computer Application</p>
            </div>
            <button
              onClick={() => handleCourseClick('DCA')}
              className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-1.5 rounded-lg text-[11px] transition-colors"
            >
              Join Now
            </button>
          </div>

          {/* 2. ADCA */}
          <div className="bg-white/10 hover:bg-white/15 border border-white/10 p-3.5 rounded-2xl flex flex-col justify-between transition-all group">
            <div className="space-y-1.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/30 text-emerald-400 flex items-center justify-center font-bold">
                <Monitor className="w-4 h-4" />
              </div>
              <h4 className="font-extrabold text-sm text-white">ADCA</h4>
              <p className="text-[11px] text-slate-300 line-clamp-2">Advanced Diploma Computer</p>
            </div>
            <button
              onClick={() => handleCourseClick('ADCA')}
              className="mt-3 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-1.5 rounded-lg text-[11px] transition-colors"
            >
              Join Now
            </button>
          </div>

          {/* 3. TYPING */}
          <div className="bg-white/10 hover:bg-white/15 border border-white/10 p-3.5 rounded-2xl flex flex-col justify-between transition-all group">
            <div className="space-y-1.5">
              <div className="w-8 h-8 rounded-xl bg-purple-500/30 text-purple-400 flex items-center justify-center font-bold">
                <Keyboard className="w-4 h-4" />
              </div>
              <h4 className="font-extrabold text-sm text-white">TYPING</h4>
              <p className="text-[11px] text-slate-300 line-clamp-2">English & Hindi Typing</p>
            </div>
            <button
              onClick={() => handleCourseClick('Typing')}
              className="mt-3 w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-1.5 rounded-lg text-[11px] transition-colors"
            >
              Join Now
            </button>
          </div>

          {/* 4. AI & Web */}
          <div className="bg-white/10 hover:bg-white/15 border border-white/10 p-3.5 rounded-2xl flex flex-col justify-between transition-all group">
            <div className="space-y-1.5">
              <div className="w-8 h-8 rounded-xl bg-orange-500/30 text-orange-400 flex items-center justify-center font-bold">
                <Bot className="w-4 h-4" />
              </div>
              <h4 className="font-extrabold text-sm text-white">AI & WEB</h4>
              <p className="text-[11px] text-slate-300 line-clamp-2">Website & App Dev + AI</p>
            </div>
            <button
              onClick={() => handleCourseClick('AI')}
              className="mt-3 w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-1.5 rounded-lg text-[11px] transition-colors"
            >
              Join Now
            </button>
          </div>

          {/* 5. AFFILIATE MARKETING */}
          <div className="bg-white/10 hover:bg-white/15 border border-white/10 p-3.5 rounded-2xl flex flex-col justify-between transition-all group">
            <div className="space-y-1.5">
              <div className="w-8 h-8 rounded-xl bg-pink-500/30 text-pink-400 flex items-center justify-center font-bold">
                <TrendingUp className="w-4 h-4" />
              </div>
              <h4 className="font-extrabold text-sm text-white">AFFILIATE</h4>
              <p className="text-[11px] text-slate-300 line-clamp-2">Work From Home Online</p>
            </div>
            <button
              onClick={() => onNavigate ? onNavigate('/work-from-home') : null}
              className="mt-3 w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-1.5 rounded-lg text-[11px] transition-colors"
            >
              Join Now
            </button>
          </div>

          {/* 6. TALLY PRIME */}
          <div className="bg-white/10 hover:bg-white/15 border border-white/10 p-3.5 rounded-2xl flex flex-col justify-between transition-all group">
            <div className="space-y-1.5">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/30 text-cyan-400 flex items-center justify-center font-bold">
                <FileSpreadsheet className="w-4 h-4" />
              </div>
              <h4 className="font-extrabold text-sm text-white">TALLY PRIME</h4>
              <p className="text-[11px] text-slate-300 line-clamp-2">Accounting & GST Training</p>
            </div>
            <button
              onClick={() => handleCourseClick('Tally')}
              className="mt-3 w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-1.5 rounded-lg text-[11px] transition-colors"
            >
              Join Now
            </button>
          </div>
        </div>

        {/* Feature Highlights Bar */}
        <div className="pt-4 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-center text-[11px] text-slate-300">
          <div>🎓 Experienced Instructors</div>
          <div>💻 Practical Training</div>
          <div>📋 Regular Tests & Evaluation</div>
          <div>📜 Certificate Provided</div>
          <div>👥 1000+ Happy Students</div>
          <div className="text-amber-400 font-bold">🚀 Career Growth</div>
        </div>
      </div>
    </div>
  );
};
