import React, { useState } from 'react';
import { Briefcase, CheckCircle, ArrowRight, ShieldAlert, HelpCircle } from 'lucide-react';

interface WorkFromHomeProps {
  onNavigate: (path: string) => void;
  wfhApps?: any[];
  onAddWfhApp?: (app: any) => void;
}

export const WorkFromHome: React.FC<WorkFromHomeProps> = ({ onNavigate, onAddWfhApp }) => {
  const [formData, setFormData] = useState({ name: '', email: '', mobile: '', city: 'Patna', interest: 'Affiliate Marketing' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.mobile) return;
    if (onAddWfhApp) {
      onAddWfhApp({
        id: `WFH-${Date.now()}`,
        name: formData.name,
        mobile: formData.mobile,
        email: formData.email || 'applicant@example.com',
        city: formData.city,
        interest: formData.interest,
        date: 'Today',
        status: 'New'
      });
    }
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-4">
          <span className="text-blue-600 font-extrabold uppercase text-xs tracking-widest bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200">
            Digital Learning Opportunity
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Work From Home Opportunity
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto">
            Learn Affiliate Marketing and explore flexible online work opportunities with professional digital skills.
          </p>
        </div>

        {/* Earnings Disclaimer Notice */}
        <div className="bg-amber-50 border border-amber-300 p-6 rounded-3xl flex items-start gap-4 text-amber-900 shadow-sm">
          <ShieldAlert className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs sm:text-sm leading-relaxed font-medium">
            <strong className="font-extrabold block text-amber-950">Important Earnings & Income Disclaimer:</strong>
            Income is not guaranteed. Earnings depend entirely on individual performance, skills, traffic, conversions, and applicable program terms. This affiliate marketing training is distinct from our typing and computer courses.
          </div>
        </div>

        {/* Content sections */}
        <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-sm border border-slate-200 space-y-8">
          <div className="space-y-3">
            <h3 className="text-2xl font-extrabold text-slate-900">What is Affiliate Marketing?</h3>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Affiliate marketing is a performance-based model where participants may earn commissions by promoting eligible products or services through tracked referral links. When someone makes a purchase through your unique link, you may earn a referral commission based on the merchant's program terms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 text-base">How It Works</h4>
              <p className="text-slate-600 text-sm">Sign up for an affiliate network, generate your referral link, share educational content, and earn when users complete eligible actions.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 text-base">Who Can Join?</h4>
              <p className="text-slate-600 text-sm">Students, job seekers, and computer learners in Patna who want to build digital marketing, blogging, and online promotion skills.</p>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-100">
            <h4 className="font-bold text-slate-900 text-lg">Skills You Can Learn</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "Digital Content Creation & Blogging",
                "Social Media Promotion & Traffic Building",
                "Understanding Affiliate Link Tracking",
                "Conversion Optimization & Ethics"
              ].map((skill, i) => (
                <div key={i} className="flex items-center gap-2.5 text-sm text-slate-700 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <CheckCircle className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Registration Interest Form */}
        <div className="bg-gradient-to-br from-slate-900 to-blue-950 text-white p-8 sm:p-10 rounded-3xl shadow-xl space-y-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-extrabold">Register Interest in Affiliate Training</h3>
            <p className="text-slate-300 text-sm">Submit your details to receive information about our upcoming online marketing workshop.</p>
          </div>

          {submitted ? (
            <div className="bg-emerald-900/50 border border-emerald-500/40 p-6 rounded-2xl text-emerald-200 text-center font-bold">
              Thank you! Your interest has been registered successfully. Our team will contact you with session details.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">Mobile Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="student@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg transition-all"
                >
                  Register Interest Now
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
