import React from 'react';
import { Keyboard, CheckCircle, ArrowRight, Activity, Award, Target } from 'lucide-react';

interface TypingClassesProps {
  onNavigate: (path: string) => void;
}

export const TypingClasses: React.FC<TypingClassesProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-orange-600 font-extrabold uppercase text-xs tracking-widest bg-orange-50 px-3.5 py-1.5 rounded-full border border-orange-200">
            Keyboard Mastery Program
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            English & Hindi Typing Classes in Patna
          </h1>
          <p className="text-slate-600 text-base sm:text-lg">
            Professional touch-typing training designed for government jobs, SSC CHSL, CGL, civil courts, and secretarial exams.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* English Typing */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Keyboard className="w-7 h-7" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-extrabold text-slate-900">English Typing Masterclass</h3>
                <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg">₹1,500</span>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                Learn touch-typing without looking at the keyboard. Build muscle memory and achieve speeds exceeding 40-50 WPM with high accuracy.
              </p>
            </div>

            <div className="space-y-2.5 pt-2">
              <div className="text-xs font-bold uppercase text-slate-500">What You Will Learn:</div>
              {[
                "Home row, top row, and bottom row finger positioning",
                "Touch typing without looking down",
                "Backspace restrictions and accuracy drills",
                "Timed 10 & 15 minute exam simulations",
                "Speed booster exercises for SSC CHSL / CGL"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2.5 text-sm text-slate-700">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <button 
              onClick={() => onNavigate('/student-signup')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Enroll in English Typing</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Hindi Typing */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-orange-500 text-white flex items-center justify-center shadow-lg shadow-orange-500/20">
              <span className="text-xl font-extrabold">हि</span>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-extrabold text-slate-900">Hindi Typing (Kruti Dev & Gail)</h3>
                <span className="text-sm font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-lg">₹1,500</span>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                Master Hindi typing using Kruti Dev 010 and Remington Gail keyboard layouts, mandatory for Bihar state government and judiciary exams.
              </p>
            </div>

            <div className="space-y-2.5 pt-2">
              <div className="text-xs font-bold uppercase text-slate-500">What You Will Learn:</div>
              {[
                "Kruti Dev 010 layout key mapping",
                "Remington Gail layout practice",
                "Conjunct characters (half letters) & matras",
                "Special character shortcuts and Alt codes",
                "High-speed accuracy tests on exam software"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2.5 text-sm text-slate-700">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <button 
              onClick={() => onNavigate('/student-signup')}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Enroll in Hindi Typing</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Practice Banner */}
        <div className="bg-gradient-to-r from-slate-900 to-blue-950 text-white rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3">
            <h3 className="text-2xl font-extrabold">Ready to test your speed right now?</h3>
            <p className="text-slate-300 text-sm max-w-xl">
              Use our built-in online typing test simulator to measure your WPM, CPM, and accuracy instantly.
            </p>
          </div>
          <button 
            onClick={() => onNavigate('/typing-test')}
            className="bg-orange-500 hover:bg-orange-600 text-white font-extrabold px-8 py-4 rounded-xl shadow-lg transition-all flex items-center gap-2 shrink-0"
          >
            <Activity className="w-5 h-5" />
            <span>Start Free Typing Test</span>
          </button>
        </div>
      </div>
    </div>
  );
};
