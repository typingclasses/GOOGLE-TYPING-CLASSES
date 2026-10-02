import React, { useState, useEffect, useRef } from 'react';
import { 
  Activity, 
  RotateCcw, 
  Award, 
  CheckCircle, 
  Timer, 
  ShieldCheck, 
  BookOpen, 
  Sparkles, 
  FileText,
  Clock,
  ArrowRight,
  TrendingUp,
  Volume2
} from 'lucide-react';
import { TypingPassage } from '../types';
import { INITIAL_TYPING_PASSAGES } from '../data/mockData';

interface TypingTestProps {
  onNavigate: (path: string) => void;
  user: any;
  onSaveTestScore?: (score: any) => void;
  passages?: TypingPassage[];
}

export const TypingTest: React.FC<TypingTestProps> = ({ 
  onNavigate, 
  user, 
  onSaveTestScore,
  passages = INITIAL_TYPING_PASSAGES 
}) => {
  const activePassages = passages.filter(p => p.isActive);
  const englishPassages = activePassages.filter(p => p.language === 'English');
  const hindiPassages = activePassages.filter(p => p.language === 'Hindi');

  const [mode, setMode] = useState<'English' | 'Hindi'>('English');
  const [selectedPassageId, setSelectedPassageId] = useState<string>(() => {
    return englishPassages[0]?.id || activePassages[0]?.id || '';
  });

  const currentPassage = activePassages.find(p => p.id === selectedPassageId) || activePassages[0] || INITIAL_TYPING_PASSAGES[0];
  const currentText = currentPassage.text;

  const [duration, setDuration] = useState<number>(currentPassage.durationSeconds || 120);
  const [timeLeft, setTimeLeft] = useState<number>(duration);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<string>('');
  const [startTime, setStartTime] = useState<number | null>(null);

  const inputRef = useRef<HTMLTextAreaElement>(null);

  // When mode changes or passage changes
  const handleModeChange = (newMode: 'English' | 'Hindi') => {
    setMode(newMode);
    const list = newMode === 'English' ? englishPassages : hindiPassages;
    if (list.length > 0) {
      setSelectedPassageId(list[0].id);
      setDuration(list[0].durationSeconds || 120);
      setTimeLeft(list[0].durationSeconds || 120);
    }
    handleReset();
  };

  const handlePassageSelect = (id: string) => {
    setSelectedPassageId(id);
    const target = activePassages.find(p => p.id === id);
    if (target) {
      setDuration(target.durationSeconds || 120);
      setTimeLeft(target.durationSeconds || 120);
    }
    handleReset();
  };

  // Timer effect
  useEffect(() => {
    let interval: any = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      setIsCompleted(true);
      if (onSaveTestScore) {
        onSaveTestScore({
          id: `TEST-${Date.now()}`,
          date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
          mode,
          passageTitle: currentPassage.title,
          wpm: netWpm,
          cpm,
          accuracy,
          errors,
          timeSpent: duration,
          studentName: user?.name || 'Guest Learner'
        });
      }
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const handleStart = () => {
    setIsActive(true);
    setIsCompleted(false);
    setUserInput('');
    setTimeLeft(duration);
    setStartTime(Date.now());
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const handleReset = () => {
    setIsActive(false);
    setIsCompleted(false);
    setUserInput('');
    setTimeLeft(duration);
    setStartTime(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isActive && !isCompleted) {
      setIsActive(true);
      setStartTime(Date.now());
    }
    const val = e.target.value;
    setUserInput(val);

    if (val.length >= currentText.length) {
      setIsActive(false);
      setIsCompleted(true);
      if (onSaveTestScore) {
        onSaveTestScore({
          id: `TEST-${Date.now()}`,
          date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
          mode,
          passageTitle: currentPassage.title,
          wpm: netWpm,
          cpm,
          accuracy,
          errors,
          timeSpent: duration - timeLeft,
          studentName: user?.name || 'Guest Learner'
        });
      }
    }
  };

  // Calculations
  const timeElapsed = duration - timeLeft;
  const minutes = timeElapsed > 0 ? timeElapsed / 60 : 1 / 60;
  const wordsTyped = userInput.trim().split(/\s+/).filter(Boolean).length;
  const grossWpm = Math.round(wordsTyped / minutes);

  // Errors calculation
  let errors = 0;
  for (let i = 0; i < userInput.length; i++) {
    if (userInput[i] !== currentText[i]) {
      errors++;
    }
  }

  const netWpm = Math.max(0, grossWpm - Math.round(errors / minutes));
  const cpm = userInput.length;
  const accuracy = userInput.length > 0 ? Math.max(0, Math.round(((userInput.length - errors) / userInput.length) * 100)) : 100;

  const currentList = mode === 'English' ? englishPassages : hindiPassages;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 px-4 py-1.5 rounded-full text-blue-700 text-xs font-extrabold">
            <Activity className="w-4 h-4 text-blue-600" />
            <span>Interactive Hindi & English Typing Test Tool</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Online Typing Practice & Speed Test
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm max-w-2xl mx-auto">
            Practice on official institute examination test materials for SSC CHSL, High Court, Civil Courts, and Secretariat examinations.
          </p>
        </div>

        {/* Test Control & Passage Selector Card */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 space-y-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            {/* Language Switch */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase text-slate-500">Test Language:</span>
              <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
                <button
                  onClick={() => handleModeChange('English')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    mode === 'English' 
                      ? 'bg-blue-600 text-white shadow-sm' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  🇬🇧 English ({englishPassages.length})
                </button>
                <button
                  onClick={() => handleModeChange('Hindi')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    mode === 'Hindi' 
                      ? 'bg-orange-600 text-white shadow-sm' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  🇮🇳 Hindi ({hindiPassages.length})
                </button>
              </div>
            </div>

            {/* Duration Selector */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold uppercase text-slate-500">Timer:</span>
              {[60, 120, 300, 600].map((sec) => (
                <button
                  key={sec}
                  onClick={() => {
                    setDuration(sec);
                    setTimeLeft(sec);
                    handleReset();
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    duration === sec && !isActive
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {sec === 60 ? '1 Min' : sec === 120 ? '2 Min' : sec === 300 ? '5 Min' : '10 Min'}
                </button>
              ))}
            </div>
          </div>

          {/* Select Test Material Passage */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span>Select Uploaded Test Material / Passage:</span>
              </label>
              <span className="text-xs font-semibold text-slate-400">
                {currentList.length} {mode} Material Available
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {currentList.map((p) => (
                <div
                  key={p.id}
                  onClick={() => handlePassageSelect(p.id)}
                  className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all ${
                    selectedPassageId === p.id
                      ? 'border-blue-500 bg-blue-50/60 ring-2 ring-blue-500/20 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {p.difficulty}
                    </span>
                    {p.hindiFontType && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-orange-100 text-orange-800">
                        {p.hindiFontType}
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-xs text-slate-900 mt-2 line-clamp-1">{p.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">{p.wordCount} words • {p.category}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Live Metrics Dashboard */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 font-bold">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase">Time Left</p>
              <h3 className={`text-2xl font-black ${timeLeft <= 10 && isActive ? 'text-red-600 animate-pulse' : 'text-slate-900'}`}>
                {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
              </h3>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0 font-bold">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase">Net Speed</p>
              <h3 className="text-2xl font-black text-indigo-600">
                {netWpm} <span className="text-xs font-semibold text-slate-500 font-sans">WPM</span>
              </h3>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0 font-bold">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase">Accuracy</p>
              <h3 className="text-2xl font-black text-emerald-600">
                {accuracy}<span className="text-xs font-semibold font-sans">%</span>
              </h3>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-600 shrink-0 font-bold">
              <span className="font-bold text-base">✕</span>
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase">Errors</p>
              <h3 className="text-2xl font-black text-red-500 font-mono">
                {errors}
              </h3>
            </div>
          </div>
        </div>

        {/* Text Display & Typing Area */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-extrabold text-slate-900">{currentPassage.title}</span>
            </div>
            <div className="text-xs text-slate-500 font-medium">
              Progress: <strong className="text-slate-800">{userInput.length}</strong> / {currentText.length} Chars
            </div>
          </div>

          {/* Passage Display with live character highlight */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 font-sans text-base sm:text-lg leading-relaxed tracking-wide select-none max-h-56 overflow-y-auto">
            {currentText.split('').map((char, index) => {
              let color = 'text-slate-600';
              let bg = '';
              if (index < userInput.length) {
                if (userInput[index] === char) {
                  color = 'text-emerald-700 font-semibold';
                  bg = 'bg-emerald-100/50';
                } else {
                  color = 'text-red-600 font-bold';
                  bg = 'bg-red-200';
                }
              } else if (index === userInput.length) {
                bg = 'bg-blue-300 animate-pulse text-blue-950 font-bold';
              }
              return (
                <span key={index} className={`${color} ${bg} rounded-xs`}>
                  {char}
                </span>
              );
            })}
          </div>

          {/* Interactive Typing Input */}
          {!isCompleted ? (
            <div className="space-y-4">
              <textarea
                ref={inputRef}
                rows={4}
                value={userInput}
                onChange={handleInputChange}
                disabled={isCompleted || timeLeft === 0}
                placeholder={
                  mode === 'Hindi'
                    ? "यहाँ टाइप करना शुरू करें (टाइप करते ही टाइमर अपने आप शुरू हो जाएगा)..."
                    : "Start typing the passage here to begin the test automatically..."
                }
                className="w-full p-5 bg-white border-2 border-blue-400 rounded-2xl text-base sm:text-lg focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 transition-all font-sans"
              ></textarea>

              <div className="flex items-center justify-between gap-3">
                <button
                  onClick={handleReset}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-5 py-2.5 rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Restart Test</span>
                </button>

                {!isActive && (
                  <button
                    onClick={handleStart}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-1.5"
                  >
                    <span>Click to Focus & Start</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Results Screen */
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 p-8 rounded-3xl text-center space-y-6 animate-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/30">
                <Award className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h3 className="text-2xl font-black text-slate-900">Typing Test Completed!</h3>
                <p className="text-xs text-slate-600">
                  You tested on <strong>{currentPassage.title}</strong> ({mode} Mode).
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-xl mx-auto bg-white p-5 rounded-2xl border border-blue-100 shadow-sm">
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase">Net Speed</div>
                  <div className="text-2xl font-black text-blue-600 mt-0.5">{netWpm} WPM</div>
                </div>
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase">Gross Speed</div>
                  <div className="text-2xl font-black text-slate-800 mt-0.5">{grossWpm} WPM</div>
                </div>
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase">Accuracy</div>
                  <div className="text-2xl font-black text-emerald-600 mt-0.5">{accuracy}%</div>
                </div>
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase">Errors</div>
                  <div className="text-2xl font-black text-red-500 mt-0.5">{errors}</div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={handleReset}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-md transition-all flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Practice Again</span>
                </button>
                <button
                  onClick={() => onNavigate('/courses')}
                  className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-bold text-xs px-6 py-3 rounded-xl transition-all"
                >
                  <span>Explore Typing Courses</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
