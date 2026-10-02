import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send, CheckCircle, MessageSquare } from 'lucide-react';
import { InstituteSettings } from '../types';

interface ContactProps {
  onNavigate: (path: string) => void;
  onAddEnquiry?: (enq: any) => void;
  settings?: InstituteSettings;
}

export const Contact: React.FC<ContactProps> = ({ onNavigate, onAddEnquiry, settings }) => {
  const [formData, setFormData] = useState({ name: '', mobile: '', email: '', course: 'English Typing', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const phone = settings?.phone || '+91 9471085404';
  const whatsapp = settings?.whatsapp || settings?.phone || '+91 9471085404';
  const email = settings?.email || 'maasitaniwas@gmail.com';
  const address = settings?.address || 'Tripolia Kathak, Patna, Bihar – 800007';

  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const cleanWhatsapp = whatsapp.replace(/[^0-9]/g, '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.mobile) return;
    if (onAddEnquiry) {
      onAddEnquiry({
        id: `ENQ-${Date.now()}`,
        name: formData.name,
        mobile: formData.mobile,
        email: formData.email || 'enquiry@example.com',
        courseInterested: formData.course,
        message: formData.message,
        date: 'Today',
        status: 'New'
      });
    }
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-blue-600 font-extrabold uppercase text-xs tracking-widest bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200">
            Get in Touch
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Contact Google Typing Classes
          </h1>
          <p className="text-slate-600 text-base sm:text-lg">
            Visit our institute in Patna or send an inquiry for admissions, course fees, and typing batches.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 space-y-6">
              <h3 className="text-2xl font-extrabold text-slate-900">Institute Location</h3>
              
              <div className="space-y-4 text-slate-700 text-sm">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-bold">Address:</strong>
                    <span>{address}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-bold">Phone / WhatsApp:</strong>
                    <a href={`tel:${cleanPhone}`} className="font-extrabold text-blue-600 hover:underline">{phone}</a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-bold">Email:</strong>
                    <a href={`mailto:${email}`} className="text-slate-700 hover:text-blue-600 transition-colors font-medium">
                      {email}
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex gap-3">
                <a 
                  href={`tel:${cleanPhone}`}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-center text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Now</span>
                </a>
                <a 
                  href={`https://wa.me/${cleanWhatsapp}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-center text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-sm border border-slate-200 space-y-6">
              <h3 className="text-2xl font-extrabold text-slate-900">Send an Inquiry</h3>

              {submitted ? (
                <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl text-emerald-800 space-y-2 text-center">
                  <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto" />
                  <h4 className="font-bold text-lg">Message Sent Successfully!</h4>
                  <p className="text-sm">Thank you for contacting Google Typing Classes. Our team will get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Your Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Rahul Kumar"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-blue-600"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Mobile Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.mobile}
                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-blue-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Email Address</label>
                      <input
                        type="email"
                        placeholder="student@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-blue-600"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Course Interested In</label>
                      <select
                        value={formData.course}
                        onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-blue-600"
                      >
                        <option value="English Typing">English Typing</option>
                        <option value="Hindi Typing">Hindi Typing</option>
                        <option value="Shorthand">Shorthand / Stenography</option>
                        <option value="DCA / ADCA">DCA / ADCA Computer Course</option>
                        <option value="Tally">Tally Prime with GST</option>
                        <option value="SSC CHSL Typing">SSC CHSL Typing Preparation</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Message / Inquiry</label>
                    <textarea
                      rows={4}
                      placeholder="Write your message here..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-blue-600 resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3.5 rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
