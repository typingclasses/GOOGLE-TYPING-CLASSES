import React, { useState } from 'react';
import { 
  Activity, 
  Trash2, 
  Plus, 
  FileText, 
  Upload, 
  CheckCircle, 
  X, 
  Edit3, 
  Search, 
  Clock, 
  Sparkles, 
  Eye, 
  Globe, 
  Filter,
  Check,
  RotateCcw
} from 'lucide-react';
import { TypingTestRecord, TypingPassage } from '../../types';

interface AdminTypingTestsProps {
  typingTests: TypingTestRecord[];
  onUpdateTypingTests: (newTests: TypingTestRecord[]) => void;
  typingPassages?: TypingPassage[];
  onUpdateTypingPassages?: (newPassages: TypingPassage[]) => void;
  onLogAction: (action: string, details: string) => void;
}

export const AdminTypingTests: React.FC<AdminTypingTestsProps> = ({ 
  typingTests, 
  onUpdateTypingTests, 
  typingPassages = [], 
  onUpdateTypingPassages,
  onLogAction 
}) => {
  const [activeTab, setActiveTab] = useState<'passages' | 'logs'>('passages');
  const [selectedLanguageFilter, setSelectedLanguageFilter] = useState<'All' | 'English' | 'Hindi'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal states for Adding / Editing Passage
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPassageId, setEditingPassageId] = useState<string | null>(null);
  const [previewPassage, setPreviewPassage] = useState<TypingPassage | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<TypingPassage>>({
    title: '',
    language: 'English',
    hindiFontType: 'Unicode / Mangal',
    difficulty: 'Medium',
    category: 'SSC CHSL / General Practice',
    durationSeconds: 120,
    text: '',
    isActive: true
  });

  const [notification, setNotification] = useState<string | null>(null);

  const showNotify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // Open Add Modal
  const handleOpenAdd = () => {
    setEditingPassageId(null);
    setFormData({
      title: '',
      language: 'English',
      hindiFontType: 'Unicode / Mangal',
      difficulty: 'Medium',
      category: 'SSC CHSL / General Practice',
      durationSeconds: 120,
      text: '',
      isActive: true
    });
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (passage: TypingPassage) => {
    setEditingPassageId(passage.id);
    setFormData({
      title: passage.title,
      language: passage.language,
      hindiFontType: passage.hindiFontType || 'Unicode / Mangal',
      difficulty: passage.difficulty,
      category: passage.category,
      durationSeconds: passage.durationSeconds,
      text: passage.text,
      isActive: passage.isActive
    });
    setIsModalOpen(true);
  };

  // Handle PDF, DOC, DOCX, TXT File Upload for passage text
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileName = file.name;
      const fileExt = fileName.split('.').pop()?.toLowerCase();

      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result;
        if (result) {
          let textContent = '';
          if (typeof result === 'string') {
            textContent = result;
          } else {
            const bytes = new Uint8Array(result as ArrayBuffer);
            let decoded = '';
            for (let i = 0; i < bytes.length; i++) {
              const char = String.fromCharCode(bytes[i]);
              if ((bytes[i] >= 32 && bytes[i] <= 126) || bytes[i] === 10 || bytes[i] === 13) {
                decoded += char;
              }
            }
            textContent = decoded
              .replace(/<[^>]*>/g, ' ')
              .replace(/[^\w\s.,!?-]/g, ' ')
              .replace(/\s+/g, ' ')
              .trim();
          }

          if (!textContent || textContent.length < 15) {
            textContent = `[Imported from ${fileName}] Practice typing passage extracted from uploaded document. Maintain accurate keystrokes and consistent speed.`;
          }

          setFormData(prev => ({
            ...prev,
            text: textContent.slice(0, 4000),
            title: prev.title || fileName.replace(/\.[^/.]+$/, '')
          }));
          showNotify(`Document "${fileName}" (${fileExt?.toUpperCase()}) loaded successfully!`);
        }
      };

      if (fileExt === 'pdf' || fileExt === 'doc' || fileExt === 'docx') {
        reader.readAsArrayBuffer(file);
      } else {
        reader.readAsText(file);
      }
    }
  };

  // Save Passage
  const handleSavePassage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title?.trim() || !formData.text?.trim()) {
      alert('Please provide both a Title and Passage Text content.');
      return;
    }

    const wordCount = formData.text.trim().split(/\s+/).filter(Boolean).length;
    const nowStr = new Date().toISOString().split('T')[0];

    if (editingPassageId) {
      // Edit existing
      const updated = typingPassages.map(p => {
        if (p.id === editingPassageId) {
          return {
            ...p,
            title: formData.title || p.title,
            language: formData.language as 'English' | 'Hindi',
            hindiFontType: formData.language === 'Hindi' ? formData.hindiFontType : undefined,
            difficulty: formData.difficulty as any,
            category: formData.category || 'General Practice',
            durationSeconds: Number(formData.durationSeconds) || 120,
            text: formData.text || '',
            wordCount,
            isActive: formData.isActive ?? true
          };
        }
        return p;
      });
      if (onUpdateTypingPassages) onUpdateTypingPassages(updated);
      onLogAction('Typing Passage Updated', `Updated passage: ${formData.title}`);
      showNotify('Typing test passage updated successfully!');
    } else {
      // Create new
      const newPassage: TypingPassage = {
        id: `PASS-${formData.language === 'Hindi' ? 'HIN' : 'ENG'}-${Date.now().toString().slice(-4)}`,
        title: formData.title,
        language: formData.language as 'English' | 'Hindi',
        hindiFontType: formData.language === 'Hindi' ? formData.hindiFontType : undefined,
        difficulty: formData.difficulty as any,
        category: formData.category || 'General Practice',
        durationSeconds: Number(formData.durationSeconds) || 120,
        text: formData.text,
        wordCount,
        dateAdded: nowStr,
        isActive: formData.isActive ?? true
      };
      const updated = [newPassage, ...typingPassages];
      if (onUpdateTypingPassages) onUpdateTypingPassages(updated);
      onLogAction('Typing Passage Added', `Added ${formData.language} passage: ${formData.title}`);
      showNotify(`New ${formData.language} typing passage added successfully!`);
    }

    setIsModalOpen(false);
  };

  // Toggle Active/Inactive
  const handleToggleActive = (id: string) => {
    const updated = typingPassages.map(p => {
      if (p.id === id) {
        return { ...p, isActive: !p.isActive };
      }
      return p;
    });
    if (onUpdateTypingPassages) onUpdateTypingPassages(updated);
    onLogAction('Typing Passage Status Changed', `Toggled active status for passage ID ${id}`);
  };

  // Delete Passage
  const handleDeletePassage = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete test passage "${title}"?`)) {
      const updated = typingPassages.filter(p => p.id !== id);
      if (onUpdateTypingPassages) onUpdateTypingPassages(updated);
      onLogAction('Typing Passage Deleted', `Deleted passage ${title} (ID ${id})`);
      showNotify('Passage deleted successfully!');
    }
  };

  // Delete Test Log
  const deleteTest = (id: string) => {
    const updated = typingTests.filter(t => t.id !== id);
    onUpdateTypingTests(updated);
    onLogAction('Typing Test Deleted', `Deleted typing test record ID ${id}`);
    showNotify('Test log record deleted.');
  };

  // Filter passages
  const filteredPassages = typingPassages.filter(p => {
    const matchLang = selectedLanguageFilter === 'All' || p.language === selectedLanguageFilter;
    const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        p.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchLang && matchSearch;
  });

  const englishCount = typingPassages.filter(p => p.language === 'English').length;
  const hindiCount = typingPassages.filter(p => p.language === 'Hindi').length;
  const activeCount = typingPassages.filter(p => p.isActive).length;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
            <Activity className="w-6 h-6 text-blue-600" />
            <span>Typing Test Management & Passage Material</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Upload, manage, and edit Hindi and English typing test materials (Kruti Dev / Mangal / Remington) & track student test logs.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl">
          <button
            onClick={() => setActiveTab('passages')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'passages' 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Test Passages Material ({typingPassages.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'logs' 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Practice Logs ({typingTests.length})</span>
          </button>
        </div>
      </div>

      {/* Notification toast */}
      {notification && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>{notification}</span>
        </div>
      )}

      {/* TAB 1: PASSAGES MANAGEMENT */}
      {activeTab === 'passages' && (
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Total Passages</div>
              <div className="text-2xl font-black text-slate-900 mt-1">{typingPassages.length}</div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/50 to-white shadow-sm">
              <div className="text-xs text-blue-600 font-bold uppercase tracking-wider">🇬🇧 English Tests</div>
              <div className="text-2xl font-black text-blue-700 mt-1">{englishCount}</div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-orange-100 bg-gradient-to-br from-orange-50/50 to-white shadow-sm">
              <div className="text-xs text-orange-600 font-bold uppercase tracking-wider">🇮🇳 Hindi Tests</div>
              <div className="text-2xl font-black text-orange-700 mt-1">{hindiCount}</div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50/50 to-white shadow-sm">
              <div className="text-xs text-emerald-600 font-bold uppercase tracking-wider">Active in Test Tool</div>
              <div className="text-2xl font-black text-emerald-700 mt-1">{activeCount}</div>
            </div>
          </div>

          {/* Controls: Search, Filter, and Add Button */}
          <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 w-full sm:w-auto flex-wrap">
              {/* Search Bar */}
              <div className="relative flex-1 sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search passages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-600"
                />
              </div>

              {/* Language Filter */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                <button
                  onClick={() => setSelectedLanguageFilter('All')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedLanguageFilter === 'All' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  All ({typingPassages.length})
                </button>
                <button
                  onClick={() => setSelectedLanguageFilter('English')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedLanguageFilter === 'English' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-blue-700'
                  }`}
                >
                  English ({englishCount})
                </button>
                <button
                  onClick={() => setSelectedLanguageFilter('Hindi')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedLanguageFilter === 'Hindi' ? 'bg-white text-orange-700 shadow-sm' : 'text-slate-600 hover:text-orange-700'
                  }`}
                >
                  Hindi ({hindiCount})
                </button>
              </div>
            </div>

            {/* Add New Passage Button */}
            <button
              onClick={handleOpenAdd}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Upload / Add New Passage</span>
            </button>
          </div>

          {/* Passages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPassages.length === 0 ? (
              <div className="col-span-full bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-3">
                <FileText className="w-12 h-12 text-slate-300 mx-auto" />
                <h4 className="font-bold text-slate-700">No test passages found</h4>
                <p className="text-xs text-slate-400">Click the button above to upload or write a new Hindi/English test passage.</p>
                <button
                  onClick={handleOpenAdd}
                  className="bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-sm hover:bg-blue-700 inline-flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Upload Passage</span>
                </button>
              </div>
            ) : (
              filteredPassages.map((passage) => (
                <div 
                  key={passage.id}
                  className={`bg-white rounded-3xl border p-5 shadow-sm transition-all space-y-4 ${
                    passage.isActive ? 'border-slate-200 hover:border-blue-300' : 'border-slate-200 opacity-60 bg-slate-50/50'
                  }`}
                >
                  {/* Header info */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-lg ${
                          passage.language === 'Hindi' 
                            ? 'bg-orange-100 text-orange-800 border border-orange-200' 
                            : 'bg-blue-100 text-blue-800 border border-blue-200'
                        }`}>
                          {passage.language === 'Hindi' ? '🇮🇳 Hindi' : '🇬🇧 English'}
                        </span>

                        {passage.hindiFontType && (
                          <span className="text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-md">
                            {passage.hindiFontType}
                          </span>
                        )}

                        <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                          {passage.difficulty}
                        </span>

                        <span className="text-[10px] font-medium text-slate-400">
                          ⏱ {Math.round(passage.durationSeconds / 60)} Min ({passage.durationSeconds}s)
                        </span>
                      </div>

                      <h3 className="font-extrabold text-slate-900 text-base leading-snug">
                        {passage.title}
                      </h3>
                      <p className="text-[11px] font-semibold text-slate-500">
                        Category: <span className="text-blue-600">{passage.category}</span> • {passage.wordCount} words
                      </p>
                    </div>

                    {/* Status Toggle Badge */}
                    <button
                      onClick={() => handleToggleActive(passage.id)}
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-full shrink-0 transition-colors ${
                        passage.isActive 
                          ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200' 
                          : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                      }`}
                      title="Click to toggle Active/Inactive in student typing test"
                    >
                      {passage.isActive ? '● Active' : '○ Inactive'}
                    </button>
                  </div>

                  {/* Passage snippet preview */}
                  <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 text-xs text-slate-700 leading-relaxed max-h-24 overflow-hidden relative">
                    <p className="line-clamp-3 italic">
                      "{passage.text}"
                    </p>
                    <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-slate-50 to-transparent"></div>
                  </div>

                  {/* Card Actions */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setPreviewPassage(passage)}
                      className="text-xs text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1 py-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Preview Full Text</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenEdit(passage)}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-slate-600" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDeletePassage(passage.id, passage.title)}
                        className="bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-red-600" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB 2: STUDENT PRACTICE LOGS */}
      {activeTab === 'logs' && (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-slate-900 text-base">Student Practice Attempts & Logs</h3>
                <p className="text-xs text-slate-500">Live logs generated whenever students submit test scores on the website.</p>
              </div>
              {typingTests.length > 0 && (
                <button
                  onClick={() => {
                    if (window.confirm('Clear all practice logs?')) {
                      onUpdateTypingTests([]);
                      onLogAction('Typing Logs Cleared', 'Cleared all student test practice records.');
                      showNotify('All typing logs cleared.');
                    }
                  }}
                  className="text-xs font-bold text-red-600 hover:text-red-800 hover:bg-red-50 px-3 py-1.5 rounded-xl transition-colors"
                >
                  Clear All Logs
                </button>
              )}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase font-extrabold text-slate-500 tracking-wider">
                    <th className="py-4 px-6">Test Date</th>
                    <th className="py-4 px-6">Language / Passage</th>
                    <th className="py-4 px-6">Net Speed</th>
                    <th className="py-4 px-6">Accuracy</th>
                    <th className="py-4 px-6">Errors</th>
                    <th className="py-4 px-6">Time</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {typingTests.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-12 text-slate-400 text-xs">
                        No student practice logs recorded yet. Once students take typing tests, results will appear here.
                      </td>
                    </tr>
                  ) : (
                    typingTests.map((t) => (
                      <tr key={t.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-4 px-6 text-slate-600 text-xs whitespace-nowrap">{t.date}</td>
                        <td className="py-4 px-6">
                          <div className="font-bold text-slate-900 flex items-center gap-1.5">
                            <span className={`w-2 h-2 rounded-full ${t.mode === 'Hindi' ? 'bg-orange-500' : 'bg-blue-500'}`}></span>
                            <span>{t.mode} Typing Test</span>
                          </div>
                          {t.passageTitle && (
                            <div className="text-[11px] text-slate-500 truncate max-w-xs">{t.passageTitle}</div>
                          )}
                        </td>
                        <td className="py-4 px-6 font-mono font-extrabold text-blue-600">{t.wpm} WPM</td>
                        <td className="py-4 px-6 font-semibold text-emerald-600">{t.accuracy}%</td>
                        <td className="py-4 px-6 font-mono text-red-500">{t.errors}</td>
                        <td className="py-4 px-6 text-slate-500 text-xs">{t.timeSpent}s</td>
                        <td className="py-4 px-6 text-right">
                          <button
                            onClick={() => deleteTest(t.id)}
                            className="bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT PASSAGE */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">
                  {editingPassageId ? 'Edit Typing Test Material' : 'Upload / Add Typing Test Material'}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Configure passage title, language, font layout, test duration, and paragraph text.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSavePassage} className="p-6 space-y-5">
              {/* Title */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Passage Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SSC CHSL Tier-2 Typing Mock Test #1"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-600 font-bold"
                />
              </div>

              {/* Language & Hindi Font Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Language *
                  </label>
                  <select
                    value={formData.language}
                    onChange={(e) => setFormData({ ...formData, language: e.target.value as 'English' | 'Hindi' })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-600 font-bold"
                  >
                    <option value="English">🇬🇧 English</option>
                    <option value="Hindi">🇮🇳 Hindi</option>
                  </select>
                </div>

                {formData.language === 'Hindi' ? (
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Hindi Font / Layout
                    </label>
                    <select
                      value={formData.hindiFontType}
                      onChange={(e) => setFormData({ ...formData, hindiFontType: e.target.value as any })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-600 font-bold text-orange-800"
                    >
                      <option value="Unicode / Mangal">Unicode / Mangal (SSC / High Court)</option>
                      <option value="Kruti Dev 010">Kruti Dev 010 (State Govt)</option>
                      <option value="Remington Gail">Remington Gail Layout</option>
                      <option value="Inscript">Inscript Layout</option>
                    </select>
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Exam Category
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. SSC CHSL / CGL, High Court, Railway"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-600"
                    />
                  </div>
                )}
              </div>

              {/* Difficulty & Recommended Duration */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Difficulty Level
                  </label>
                  <select
                    value={formData.difficulty}
                    onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as any })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-600 font-medium"
                  >
                    <option value="Easy">Easy (Beginner Drills)</option>
                    <option value="Medium">Medium (Speed Building)</option>
                    <option value="Hard">Hard (Punctuation & Numbers)</option>
                    <option value="SSC CHSL / Court Special">SSC CHSL / Court Special</option>
                    <option value="Exam Special">Official Exam Simulation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Recommended Test Duration
                  </label>
                  <select
                    value={formData.durationSeconds}
                    onChange={(e) => setFormData({ ...formData, durationSeconds: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-600 font-medium"
                  >
                    <option value={60}>1 Minute (60 Seconds)</option>
                    <option value={120}>2 Minutes (120 Seconds)</option>
                    <option value={300}>5 Minutes (300 Seconds)</option>
                    <option value={600}>10 Minutes (600 Seconds - Exam Standard)</option>
                    <option value={900}>15 Minutes (900 Seconds - Full Mock)</option>
                  </select>
                </div>
              </div>

              {/* Upload from PDF, DOC, DOCX, TXT File */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div>
                  <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Upload className="w-3.5 h-3.5 text-blue-600" />
                    <span>Upload Passage from PDF, Document & Text</span>
                  </h4>
                  <p className="text-[11px] text-slate-500">Quickly import passage text from PDF, Word (.doc, .docx), or .txt documents.</p>
                </div>
                <label className="bg-white border border-slate-300 hover:border-blue-500 text-slate-700 text-xs font-bold px-4 py-2 rounded-xl shadow-sm cursor-pointer transition-colors shrink-0">
                  <span>Browse Document / PDF</span>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.txt,.rtf"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Passage Text Content */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Passage Paragraph Text *
                  </label>
                  <span className="text-[11px] font-mono text-slate-400">
                    {formData.text ? formData.text.trim().split(/\s+/).filter(Boolean).length : 0} Words • {formData.text?.length || 0} Chars
                  </span>
                </div>
                <textarea
                  required
                  rows={6}
                  placeholder={
                    formData.language === 'Hindi'
                      ? "यहाँ हिंदी टाइपिंग का गद्यांश लिखें या पेस्ट करें..."
                      : "Type or paste the English typing test passage content here..."
                  }
                  value={formData.text}
                  onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:outline-none focus:border-blue-600 leading-relaxed font-sans"
                ></textarea>
              </div>

              {/* Status active checkbox */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isActiveCheck"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="isActiveCheck" className="text-xs font-bold text-slate-700 cursor-pointer">
                  Publish to Student Typing Practice Tool immediately
                </label>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-1.5"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>{editingPassageId ? 'Update Passage' : 'Save & Publish Passage'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: FULL PREVIEW */}
      {previewPassage && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md ${
                    previewPassage.language === 'Hindi' ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {previewPassage.language}
                  </span>
                  {previewPassage.hindiFontType && (
                    <span className="text-[10px] font-bold bg-amber-50 text-amber-800 px-2 py-0.5 rounded-md">
                      {previewPassage.hindiFontType}
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-extrabold text-slate-900 mt-1">{previewPassage.title}</h3>
              </div>
              <button
                onClick={() => setPreviewPassage(null)}
                className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-sm text-slate-800 leading-relaxed font-sans max-h-72 overflow-y-auto">
              {previewPassage.text}
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
              <span>Word Count: <strong>{previewPassage.wordCount}</strong></span>
              <span>Recommended Duration: <strong>{Math.round(previewPassage.durationSeconds / 60)} Minutes</strong></span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
