import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  CheckCircle, 
  Upload, 
  Image as ImageIcon, 
  ExternalLink,
  Send,
  Share2,
  Mail,
  Phone,
  MapPin,
  Lock,
  MessageSquare,
  Trash2,
  Plus,
  Camera,
  Star
} from 'lucide-react';
import { InstituteSettings } from '../../types';

interface AdminSettingsProps {
  settings: InstituteSettings;
  onUpdateSettings: (newSet: InstituteSettings) => void;
  onLogAction: (action: string, details: string) => void;
}

export const AdminSettings: React.FC<AdminSettingsProps> = ({ settings, onUpdateSettings, onLogAction }) => {
  const [form, setForm] = useState<InstituteSettings>(settings);
  const [saved, setSaved] = useState(false);

  // Success Stories / Feedback state in settings
  const [feedbacks, setFeedbacks] = useState<any[]>(() => {
    const savedFb = localStorage.getItem('gtc_student_feedback');
    if (savedFb) {
      try {
        return JSON.parse(savedFb);
      } catch (e) {}
    }
    return [
      {
        id: 'FB-1',
        name: 'Pooja Kumari',
        course: 'English & Hindi Typing Masterclass',
        achievement: 'Selected in SSC CHSL Typing Test (54 WPM)',
        rating: 5,
        comment: 'Google Typing Classes Patna ka environment aur typing software bilkul exam jaisa hai. Yahan daily practice karne se meri speed 30 se 54 WPM ho gayi aur exam mein pehli baar mein qualify kar gayi!',
        photo: '',
        date: '25 Sep 2026'
      },
      {
        id: 'FB-2',
        name: 'Amit Kumar Singh',
        course: 'ADCA & Stenography Shorthand',
        achievement: 'Bihar Civil Court Stenographer & Typist',
        rating: 5,
        comment: 'Tripolia center par AC lab aur mechanical keyboards par practice karne ka bahut benefit mila. Guru ji ka guidance aur regular speed tests highly effective hain.',
        photo: '',
        date: '20 Sep 2026'
      }
    ];
  });

  const [newFb, setNewFb] = useState({
    name: '',
    course: 'English Typing Masterclass',
    achievement: 'SSC / Court Typing Selected',
    rating: 5,
    comment: '',
    photo: ''
  });
  const [fbSuccess, setFbSuccess] = useState(false);

  const handleFeedbackPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const res = event.target?.result as string;
        if (res) {
          setNewFb({ ...newFb, photo: res });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFb.name || !newFb.comment) {
      alert('Please enter student name and success comment.');
      return;
    }

    const item = {
      id: `FB-${Date.now()}`,
      name: newFb.name,
      course: newFb.course,
      achievement: newFb.achievement,
      rating: Number(newFb.rating),
      comment: newFb.comment,
      photo: newFb.photo,
      date: 'Today'
    };

    const updated = [item, ...feedbacks];
    setFeedbacks(updated);
    localStorage.setItem('gtc_student_feedback', JSON.stringify(updated));
    onLogAction('Success Story Added', `Added student feedback & success story for ${newFb.name}`);

    setNewFb({
      name: '',
      course: 'English Typing Masterclass',
      achievement: 'SSC / Court Typing Selected',
      rating: 5,
      comment: '',
      photo: ''
    });
    setFbSuccess(true);
    setTimeout(() => setFbSuccess(false), 3000);
  };

  const handleDeleteFeedback = (id: string) => {
    if (window.confirm('Are you sure you want to delete this success story?')) {
      const updated = feedbacks.filter(f => f.id !== id);
      setFeedbacks(updated);
      localStorage.setItem('gtc_student_feedback', JSON.stringify(updated));
      onLogAction('Success Story Deleted', `Removed success story ID ${id}`);
    }
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          setForm({ ...form, logoUrl: uploadEvent.target.result as string });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleHeroImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          setForm({ ...form, heroImageUrl: uploadEvent.target.result as string });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBannerImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          setForm({ ...form, bannerImageUrl: uploadEvent.target.result as string });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings(form);
    onLogAction('Settings Updated', 'Updated institute settings, logo and social media links');
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-4xl">
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
        <h2 className="text-2xl font-extrabold text-slate-900">Institute & Website Settings</h2>
        <p className="text-xs text-slate-500">Manage institute branding logo, contact info, social media handles (Facebook, YouTube, Instagram, Telegram), and SEO metadata.</p>
      </div>

      {saved && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl flex items-center gap-2 text-sm font-bold animate-in fade-in">
          <CheckCircle className="w-5 h-5 text-emerald-600" />
          <span>All Settings, Social Links & Logo saved successfully!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 space-y-8">
        {/* Section 1: Logo */}
        <div>
          <h3 className="text-lg font-extrabold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-blue-600" />
            <span>Institute Branding & Logo</span>
          </h3>

          <div className="flex flex-col sm:flex-row items-center gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-200 mt-4">
            <div className="w-24 h-24 rounded-2xl bg-white border border-slate-200 overflow-hidden flex items-center justify-center shadow-inner shrink-0">
              {form.logoUrl ? (
                <img src={form.logoUrl} alt="Institute Logo" className="w-full h-full object-cover" />
              ) : (
                <ImageIcon className="w-10 h-10 text-slate-400" />
              )}
            </div>
            <div className="space-y-3 flex-1 text-center sm:text-left">
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Upload or Reupload Institute Logo</h4>
                <p className="text-xs text-slate-500 mt-0.5">Recommended: Square PNG or JPG with transparent or solid background.</p>
              </div>
              <div>
                <label className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs shadow-md cursor-pointer transition-all">
                  <Upload className="w-4 h-4" />
                  <span>Choose Logo File</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Section 1.5: Website Page & Hero Banner Images */}
        <div>
          <h3 className="text-lg font-extrabold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-indigo-600" />
            <span>Website Page & Hero Banner Images</span>
          </h3>
          <p className="text-xs text-slate-500 mt-2">
            Upload custom hero banner or background images for your institute website pages.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
            {/* Hero Banner Image */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-extrabold text-slate-900 text-sm">Homepage Hero / Banner Image</h4>
                {form.heroImageUrl && (
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, heroImageUrl: '' })}
                    className="text-xs text-red-600 font-bold hover:underline"
                  >
                    Remove
                  </button>
                )}
              </div>
              <div className="h-32 rounded-xl bg-white border border-slate-200 overflow-hidden flex items-center justify-center shadow-inner">
                {form.heroImageUrl ? (
                  <img src={form.heroImageUrl} alt="Hero Banner" className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon className="w-8 h-8 text-slate-300" />
                )}
              </div>
              <div>
                <label className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-sm cursor-pointer transition-all">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Hero Image</span>
                  <input type="file" accept="image/*" onChange={handleHeroImageChange} className="hidden" />
                </label>
              </div>
            </div>

            {/* Feature / Announcement Banner Image */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-extrabold text-slate-900 text-sm">Notice / Admission Banner Image</h4>
                {form.bannerImageUrl && (
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, bannerImageUrl: '' })}
                    className="text-xs text-red-600 font-bold hover:underline"
                  >
                    Remove
                  </button>
                )}
              </div>
              <div className="h-32 rounded-xl bg-white border border-slate-200 overflow-hidden flex items-center justify-center shadow-inner">
                {form.bannerImageUrl ? (
                  <img src={form.bannerImageUrl} alt="Admission Banner" className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon className="w-8 h-8 text-slate-300" />
                )}
              </div>
              <div>
                <label className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-sm cursor-pointer transition-all">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Banner Image</span>
                  <input type="file" accept="image/*" onChange={handleBannerImageChange} className="hidden" />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Social Media Links Upload & Edit */}
        <div>
          <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                <Share2 className="w-5 h-5 text-orange-500" />
                <span>Social Media Links (Follow & Connect Us)</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">Edit and upload your active profile links for Footer display.</p>
            </div>

            {/* Live Preview Badges matching user's screenshot */}
            <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-xl">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Preview:</span>
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-6 rounded-lg bg-[#1877F2] text-white flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </div>
                <div className="w-6 h-6 rounded-lg bg-[#FF0000] text-white flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </div>
                <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </div>
                <div className="w-6 h-6 rounded-lg bg-[#229ED9] text-white flex items-center justify-center">
                  <Send className="w-3 h-3 fill-current" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-4">
            {/* Facebook Link */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800">
                  <span className="w-6 h-6 rounded-lg bg-[#1877F2] text-white flex items-center justify-center shrink-0">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </span>
                  <span>Facebook URL</span>
                </label>
                {form.facebookUrl && (
                  <a 
                    href={form.facebookUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-[11px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  >
                    <span>Test</span> <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
              <input
                type="url"
                placeholder="https://facebook.com/googletypingclassespatna"
                value={form.facebookUrl || ''}
                onChange={(e) => setForm({ ...form, facebookUrl: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-blue-600 font-medium"
              />
            </div>

            {/* YouTube Link */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800">
                  <span className="w-6 h-6 rounded-lg bg-[#FF0000] text-white flex items-center justify-center shrink-0">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  </span>
                  <span>YouTube Channel URL</span>
                </label>
                {form.youtubeUrl && (
                  <a 
                    href={form.youtubeUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-[11px] font-bold text-red-600 hover:text-red-800 flex items-center gap-1"
                  >
                    <span>Test</span> <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
              <input
                type="url"
                placeholder="https://youtube.com/@googletypingclassespatna"
                value={form.youtubeUrl || ''}
                onChange={(e) => setForm({ ...form, youtubeUrl: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-red-600 font-medium"
              />
            </div>

            {/* Instagram Link */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800">
                  <span className="w-6 h-6 rounded-lg bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white flex items-center justify-center shrink-0">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  </span>
                  <span>Instagram URL</span>
                </label>
                {form.instagramUrl && (
                  <a 
                    href={form.instagramUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-[11px] font-bold text-pink-600 hover:text-pink-800 flex items-center gap-1"
                  >
                    <span>Test</span> <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
              <input
                type="url"
                placeholder="https://instagram.com/googletypingclasses"
                value={form.instagramUrl || ''}
                onChange={(e) => setForm({ ...form, instagramUrl: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-pink-500 font-medium"
              />
            </div>

            {/* Telegram Link */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800">
                  <span className="w-6 h-6 rounded-lg bg-[#229ED9] text-white flex items-center justify-center shrink-0">
                    <Send className="w-3.5 h-3.5 fill-current" />
                  </span>
                  <span>Telegram Group / Channel</span>
                </label>
                {form.telegramUrl && (
                  <a 
                    href={form.telegramUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-[11px] font-bold text-sky-600 hover:text-sky-800 flex items-center gap-1"
                  >
                    <span>Test</span> <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
              <input
                type="url"
                placeholder="https://t.me/googletypingclasses"
                value={form.telegramUrl || ''}
                onChange={(e) => setForm({ ...form, telegramUrl: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-sky-500 font-medium"
              />
            </div>
          </div>
        </div>

        {/* Section: Admin Portal Security & Login Credentials */}
        <div>
          <h3 className="text-lg font-extrabold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
            <Lock className="w-5 h-5 text-indigo-600" />
            <span>Admin Portal Login Credentials (Email & Password)</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Admin Login Email</label>
              <input
                type="email"
                placeholder="admin@googletypingclasses.com"
                value={form.adminEmail || 'admin@googletypingclasses.com'}
                onChange={(e) => setForm({ ...form, adminEmail: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-600 font-bold text-slate-800"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Admin Login Password</label>
              <input
                type="text"
                placeholder="admin123"
                value={form.adminPassword || 'admin123'}
                onChange={(e) => setForm({ ...form, adminPassword: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-600 font-bold text-slate-800"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">
                Update admin login email and password securely here.
              </span>
            </div>
          </div>
        </div>

        {/* Section 3: General Information */}
        <div>
          <h3 className="text-lg font-extrabold text-slate-900 border-b border-slate-100 pb-3">General Information</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Institute Name</label>
              <input
                type="text"
                value={form.instituteName}
                onChange={(e) => setForm({ ...form, instituteName: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-600 font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-blue-600" />
                <span>Contact Email Address</span>
              </label>
              <input
                type="email"
                placeholder="e.g. maasitaniwas@gmail.com"
                value={form.email || ''}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-600 font-bold text-slate-800"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                This email will be displayed in website footer & contact page.
              </span>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-orange-500" />
                <span>Phone Number</span>
              </label>
              <input
                type="text"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-600 font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp Helpline Number</span>
              </label>
              <input
                type="text"
                value={form.whatsapp || ''}
                onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-600 font-bold"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              <span>Institute Address</span>
            </label>
            <input
              type="text"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-600 font-bold"
            />
          </div>
        </div>

        {/* Section: Student Success Stories & Feedback Management */}
        <div>
          <h3 className="text-lg font-extrabold text-slate-900 border-b border-slate-100 pb-3 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-emerald-600" />
              <span>Student Success Stories & Feedback Management</span>
            </span>
            <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">
              {feedbacks.length} Published
            </span>
          </h3>

          <p className="text-xs text-slate-500 mt-2">
            Add or manage success stories and reviews shown on the website homepage. You can upload student photos and their exam achievements.
          </p>

          {fbSuccess && (
            <div className="mt-3 bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-xl text-xs font-bold flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Success story added and published on website successfully!</span>
            </div>
          )}

          {/* Add Success Story Form */}
          <div className="mt-4 bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
            <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
              <Plus className="w-4 h-4 text-blue-600" />
              <span>Add New Student Success Story</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Student Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Pooja Kumari"
                  value={newFb.name}
                  onChange={(e) => setNewFb({ ...newFb, name: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-800 focus:outline-none focus:border-blue-600"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Exam / Achievement</label>
                <input
                  type="text"
                  placeholder="e.g. SSC CHSL Typing Selected (54 WPM)"
                  value={newFb.achievement}
                  onChange={(e) => setNewFb({ ...newFb, achievement: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-800 focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Course Name</label>
                <input
                  type="text"
                  placeholder="e.g. English Typing Masterclass"
                  value={newFb.course}
                  onChange={(e) => setNewFb({ ...newFb, course: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-800 focus:outline-none focus:border-blue-600"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Rating (1 to 5 Stars)</label>
                <select
                  value={newFb.rating}
                  onChange={(e) => setNewFb({ ...newFb, rating: Number(e.target.value) })}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-800 focus:outline-none focus:border-blue-600"
                >
                  <option value={5}>⭐⭐⭐⭐⭐ (5 Stars - Excellent)</option>
                  <option value={4}>⭐⭐⭐⭐ (4 Stars - Very Good)</option>
                  <option value={3}>⭐⭐⭐ (3 Stars - Good)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Success Story & Review Comment *</label>
              <textarea
                rows={3}
                placeholder="Write student success review here..."
                value={newFb.comment}
                onChange={(e) => setNewFb({ ...newFb, comment: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-xl p-3 text-sm font-bold text-slate-800 focus:outline-none focus:border-blue-600 resize-none"
              ></textarea>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold overflow-hidden shadow-sm shrink-0">
                  {newFb.photo ? (
                    <img src={newFb.photo} alt="Student" className="w-full h-full object-cover" />
                  ) : (
                    <Camera className="w-5 h-5 text-white" />
                  )}
                </div>
                <div>
                  <label className="bg-white border border-slate-300 hover:border-blue-500 text-slate-700 text-xs font-bold px-4 py-2 rounded-xl shadow-sm cursor-pointer inline-flex items-center gap-2">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Student Photo</span>
                    <input type="file" accept="image/*" onChange={handleFeedbackPhotoUpload} className="hidden" />
                  </label>
                  <span className="text-[11px] text-slate-500 block mt-0.5">Passport or success celebration photo</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleAddFeedback}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-6 py-2.5 rounded-xl text-xs shadow-md transition-all flex items-center gap-2 shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Publish Success Story</span>
              </button>
            </div>
          </div>

          {/* List of Existing Success Stories */}
          <div className="mt-4 space-y-3">
            <h4 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Active Published Success Stories ({feedbacks.length})</h4>
            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
              {feedbacks.map((fb) => (
                <div key={fb.id} className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center overflow-hidden shrink-0 shadow-inner">
                      {fb.photo ? (
                        <img src={fb.photo} alt={fb.name} className="w-full h-full object-cover" />
                      ) : (
                        fb.name.charAt(0)
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h5 className="font-extrabold text-slate-900 text-sm">{fb.name}</h5>
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded">
                          {fb.achievement || fb.course}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 line-clamp-1 italic mt-0.5">"{fb.comment}"</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteFeedback(fb.id)}
                    className="bg-red-50 hover:bg-red-100 text-red-600 font-bold px-3 py-2 rounded-xl text-xs flex items-center gap-1 transition-all shrink-0"
                    title="Delete Story"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section 4: SEO Metadata */}
        <div>
          <h3 className="text-lg font-extrabold text-slate-900 border-b border-slate-100 pb-3">SEO & Search Metadata</h3>

          <div className="space-y-4 mt-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Website Title Tag</label>
              <input
                type="text"
                value={form.websiteTitle}
                onChange={(e) => setForm({ ...form, websiteTitle: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Meta Description</label>
              <textarea
                rows={3}
                value={form.metaDescription}
                onChange={(e) => setForm({ ...form, metaDescription: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-600 resize-none"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-4 border-t border-slate-100 flex items-center gap-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3.5 rounded-xl shadow-md transition-all flex items-center gap-2"
          >
            <CheckCircle className="w-4 h-4" />
            <span>Save All Settings & Social Media Links</span>
          </button>
        </div>
      </form>
    </div>
  );
};
