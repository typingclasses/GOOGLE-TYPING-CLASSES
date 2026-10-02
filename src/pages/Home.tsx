import React, { useState, useEffect } from 'react';
import { 
  Keyboard, 
  Laptop, 
  Award, 
  CheckCircle, 
  ArrowRight, 
  Phone, 
  MapPin, 
  Star, 
  Users, 
  Activity, 
  Target, 
  FileText,
  ChevronDown,
  Sparkles,
  Bell,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  ImageIcon,
  MessageSquare,
  Upload,
  Camera
} from 'lucide-react';
import { FAQS_DATA } from '../data/mockData';
import { OfficialAdmissionBanner } from '../components/OfficialAdmissionBanner';

// Local institute images for sliding carousel
import typingLabImg from '../assets/images/typing_lab_practice_1790487931747.jpg';
import certificateCeremonyImg from '../assets/images/certificate_distribution_gtc_1790487947293.jpg';
import shorthandBatchImg from '../assets/images/computer_shorthand_batch_1790487965931.jpg';
import officialBannerImg from '../assets/images/official_gtc_banner_1790423250991.jpg';

interface HomeProps {
  onNavigate: (path: string) => void;
  courses?: any[];
  announcements?: any[];
  media?: any[];
}

export const Home: React.FC<HomeProps> = ({ onNavigate, courses, announcements, media }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const displayCourses = courses || [];
  const displayAnnouncements = announcements || [];
  const displayMedia = (media || []).filter(m => m.type !== 'pdf');

  // Success Feedback state
  const [feedbacks, setFeedbacks] = useState<any[]>(() => {
    const saved = localStorage.getItem('gtc_student_feedback');
    if (saved) {
      try {
        return JSON.parse(saved);
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

  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [feedbackForm, setFeedbackForm] = useState({
    name: '',
    course: 'English Typing Masterclass',
    achievement: 'SSC / Court Typing Selected',
    rating: 5,
    comment: '',
    photo: ''
  });
  const [feedbackSuccessMsg, setFeedbackSuccessMsg] = useState('');

  const handleFeedbackPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const res = event.target?.result as string;
        if (res) {
          setFeedbackForm(prev => ({ ...prev, photo: res }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackForm.name || !feedbackForm.comment) {
      alert('Please fill in your name and feedback message.');
      return;
    }

    const newFeedback = {
      id: `FB-${Date.now()}`,
      name: feedbackForm.name,
      course: feedbackForm.course,
      achievement: feedbackForm.achievement,
      rating: Number(feedbackForm.rating),
      comment: feedbackForm.comment,
      photo: feedbackForm.photo,
      date: 'Today'
    };

    const updated = [newFeedback, ...feedbacks];
    setFeedbacks(updated);
    localStorage.setItem('gtc_student_feedback', JSON.stringify(updated));

    setFeedbackForm({
      name: '',
      course: 'English Typing Masterclass',
      achievement: 'SSC / Court Typing Selected',
      rating: 5,
      comment: '',
      photo: ''
    });
    setIsFeedbackModalOpen(false);
    setFeedbackSuccessMsg('Thank you! Your success story & feedback has been successfully published.');
    setTimeout(() => setFeedbackSuccessMsg(''), 5000);
  };

  // Slider items
  const baseSliderItems = [
    {
      url: typingLabImg,
      badge: 'Air-Conditioned Typing Lab',
      title: 'High-Speed Typing Practice Systems',
      desc: 'Students practicing for SSC CHSL, CGL, Civil Court & High Court typing tests.'
    },
    {
      url: certificateCeremonyImg,
      badge: 'Govt. Recognized Certification',
      title: 'ISO 9001:2025 & Govt. Registered Certificates',
      desc: 'Valid for all Central & State government job typing qualifications.'
    },
    {
      url: shorthandBatchImg,
      badge: 'Expert Guidance Batch',
      title: 'Hindi, English Typing & Shorthand Steno',
      desc: 'Personalized attention with Kruti Dev & Remington Gail typing fonts.'
    },
    {
      url: officialBannerImg,
      badge: 'Tripolia, Patna Main Center',
      title: 'Google Typing & Computer Classes, Patna',
      desc: 'Govt. Reg. P.T/TBSE/014060 | Helpline: +91 93341 42618.'
    }
  ];

  // Combine default photos with any custom media images uploaded
  const sliderItems = [
    ...baseSliderItems,
    ...displayMedia.map(m => ({
      url: m.url,
      badge: 'Institute Campus',
      title: m.name.replace(/\.[^/.]+$/, ''),
      desc: 'Google Typing Classes, Patna Campus Gallery'
    }))
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-play sliding every 3.5s (pauses on hover)
  useEffect(() => {
    if (isHovered || sliderItems.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderItems.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [isHovered, sliderItems.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sliderItems.length) % sliderItems.length);
  };

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Active Announcement Banner */}
      {displayAnnouncements.length > 0 && displayAnnouncements[0].published && (
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white py-2.5 px-4 text-center text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-inner">
          <Bell className="w-4 h-4 animate-bounce" />
          <span><strong>Notice:</strong> {displayAnnouncements[0].title} — {displayAnnouncements[0].content}</span>
        </div>
      )}

      {/* Official Admission Banner as Top Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-6 pb-2 relative z-20">
        <OfficialAdmissionBanner onNavigate={onNavigate} />
      </div>

      {/* Popular Courses Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-8 max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-full text-blue-600 text-xs sm:text-sm font-extrabold">
            <Laptop className="w-4 h-4 text-blue-600" />
            <span>Professional Training Programs</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Our Popular Courses
          </h2>
          <p className="text-slate-600 text-base">
            Designed to build industry-standard speed, accuracy, and technical proficiency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayCourses.slice(0, 6).map((course) => (
            <div key={course.id} className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 hover:shadow-xl transition-all flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-black group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Keyboard className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {course.title}
                </h3>
                <p className="text-slate-600 text-sm line-clamp-2">
                  {course.description}
                </p>
                <div className="flex items-center gap-4 text-xs font-bold text-slate-500 pt-2 border-t border-slate-100">
                  <span>⏱ {course.duration}</span>
                  <span>💰 {course.fees}</span>
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => onNavigate('/courses')}
                  className="w-full bg-slate-50 hover:bg-blue-600 hover:text-white text-slate-700 font-bold py-3 rounded-xl text-xs transition-all flex items-center justify-center gap-2"
                >
                  <span>Course Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-4">
          <button
            onClick={() => onNavigate('/courses')}
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 py-4 rounded-2xl text-sm shadow-md transition-all"
          >
            <span>View All Courses & Fee Structure</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Institute Highlights */}
      <section className="bg-slate-900 text-white py-20 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-orange-400 font-bold text-xs uppercase tracking-widest bg-orange-500/10 px-4 py-2 rounded-full border border-orange-500/20">
              Why Choose Google Typing Classes?
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
               Patna's Premier Computer & Typing Institute
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl space-y-4 backdrop-blur-sm">
              <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-2xl flex items-center justify-center font-bold text-xl">
                01
              </div>
              <h3 className="text-lg font-bold">Govt. Reg. & ISO Certified</h3>
              <p className="text-slate-400 text-sm">
                Govt. Reg. No.: P.T/TBSE/014060 with ISO 9001:2025 and MSME certification valid for all government jobs.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl space-y-4 backdrop-blur-sm">
              <div className="w-12 h-12 bg-orange-500/20 text-orange-400 rounded-2xl flex items-center justify-center font-bold text-xl">
                02
              </div>
              <h3 className="text-lg font-bold">Advanced Computer Lab</h3>
              <p className="text-slate-400 text-sm">
                Fully air-conditioned computer lab equipped with high-speed systems for rigorous typing practice.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl space-y-4 backdrop-blur-sm">
              <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center font-bold text-xl">
                03
              </div>
              <h3 className="text-lg font-bold">Bilingual Typing Mastery</h3>
              <p className="text-slate-400 text-sm">
                Expert training in English Typing, Hindi Typing (Kruti Dev / Gail), and Shorthand with high accuracy focus.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl space-y-4 backdrop-blur-sm">
              <div className="w-12 h-12 bg-indigo-500/20 text-indigo-400 rounded-2xl flex items-center justify-center font-bold text-xl">
                04
              </div>
              <h3 className="text-lg font-bold">Competitive Exam Focus</h3>
              <p className="text-slate-400 text-sm">
                Special practice batches for SSC CHSL, CGL, Civil Court, High Court, and Bihar State Exam typing tests.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2-COLUMN SECTION: FAQ ON LEFT, SLIDING IMAGES ON RIGHT */}
      <section className="py-16 sm:py-20 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* LEFT COLUMN: COMPACT FREQUENTLY ASKED QUESTIONS */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 px-3.5 py-1.5 rounded-full text-orange-600 text-xs font-extrabold">
                <FileText className="w-4 h-4 text-orange-500" />
                <span>Got Questions?</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm">
                Everything you need to know about admissions, typing batches, and certificates.
              </p>
            </div>

            <div className="space-y-2.5">
              {FAQS_DATA.map((faq, idx) => (
                <div 
                  key={faq.id} 
                  className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-sm hover:border-blue-300 transition-all"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-4 sm:px-5 py-3 text-left font-bold text-slate-900 text-xs sm:text-sm flex items-center justify-between gap-3 hover:bg-slate-50 transition-colors"
                  >
                    <span className="leading-snug">{faq.question}</span>
                    <ChevronDown 
                      className={`w-4 h-4 shrink-0 text-slate-400 transition-transform duration-200 ${
                        openFaq === idx ? 'rotate-180 text-blue-600 font-bold' : ''
                      }`} 
                    />
                  </button>
                  {openFaq === idx && (
                    <div className="px-4 sm:px-5 pb-4 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100 pt-3 bg-slate-50/50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: SLIDING IMAGE CAROUSEL */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
                <ImageIcon className="w-4 h-4 text-blue-600" />
                <span>Institute Campus & Lab Highlights</span>
              </div>
              <span className="text-[11px] font-mono font-bold text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded-full shadow-sm">
                {currentSlide + 1} / {sliderItems.length}
              </span>
            </div>

            {/* Slider Container */}
            <div 
              className="relative w-full h-80 sm:h-96 rounded-3xl overflow-hidden shadow-xl border border-slate-200 group bg-slate-950"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Slides */}
              {sliderItems.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                  }`}
                >
                  <img
                    src={slide.url}
                    alt={slide.title}
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-1000"
                  />
                  {/* Subtle Gradient Overlay for Text Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

                  {/* Caption Content */}
                  <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 text-white space-y-1.5 z-20">
                    <span className="inline-block bg-blue-600/90 backdrop-blur-md text-white text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-sm">
                      {slide.badge}
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-white leading-snug drop-shadow-sm">
                      {slide.title}
                    </h3>
                    <p className="text-xs text-slate-200 line-clamp-2 drop-shadow-sm">
                      {slide.desc}
                    </p>
                  </div>
                </div>
              ))}

              {/* Prev / Next Buttons */}
              <button
                type="button"
                onClick={prevSlide}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white backdrop-blur-md flex items-center justify-center transition-all opacity-80 hover:opacity-100 hover:scale-105"
                title="Previous Image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white backdrop-blur-md flex items-center justify-center transition-all opacity-80 hover:opacity-100 hover:scale-105"
                title="Next Image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Dot Indicators */}
              <div className="absolute bottom-3 right-4 z-20 flex items-center gap-1.5">
                {sliderItems.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === currentSlide ? 'w-6 bg-blue-500' : 'w-2 bg-white/50 hover:bg-white'
                    }`}
                    title={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Quick Action card below slider */}
            <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-2xl p-4 text-white flex items-center justify-between gap-3 shadow-md">
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-300">
                  Govt. Approved Institute
                </span>
                <p className="text-xs font-bold text-slate-100">
                  Admissions Open for New Typing Batches
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('/contact')}
                className="bg-amber-400 hover:bg-amber-500 text-blue-950 font-bold text-xs px-3.5 py-2 rounded-xl transition-all shadow-sm shrink-0 flex items-center gap-1"
              >
                <span>Join Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* STUDENT SUCCESS STORIES & FEEDBACK SECTION */}
      <section className="py-16 bg-white border-t border-slate-200 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full text-emerald-700 text-xs sm:text-sm font-extrabold">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Success Wall & Student Reviews</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Student Success Stories & Feedback
              </h2>
              <p className="text-slate-600 text-sm">
                Hear from our successful students who qualified government typing exams, courts, and secured dream jobs with Google Typing Classes Patna.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsFeedbackModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-6 py-3.5 rounded-2xl shadow-lg transition-all text-sm flex items-center gap-2 shrink-0"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Share Your Success & Photo</span>
            </button>
          </div>

          {feedbackSuccessMsg && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl text-sm font-bold flex items-center gap-3 shadow-sm max-w-2xl mx-auto">
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{feedbackSuccessMsg}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {feedbacks.map((fb) => (
              <div key={fb.id} className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(fb.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[11px] font-bold text-slate-400 bg-white px-2.5 py-1 rounded-full border border-slate-200">
                      {fb.date}
                    </span>
                  </div>

                  <p className="text-slate-700 text-sm leading-relaxed italic">
                    "{fb.comment}"
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200/80 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white font-extrabold text-xl flex items-center justify-center overflow-hidden shrink-0 shadow-md">
                    {fb.photo ? (
                      <img src={fb.photo} alt={fb.name} className="w-full h-full object-cover" />
                    ) : (
                      fb.name.charAt(0)
                    )}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-base">{fb.name}</h4>
                    <span className="inline-block bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2 py-0.5 rounded-md mt-0.5">
                      {fb.achievement || fb.course}
                    </span>
                    <p className="text-[11px] text-slate-500 mt-0.5">{fb.course}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEEDBACK SUBMISSION MODAL */}
      {isFeedbackModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 relative max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">Share Your Success & Photo</h3>
                <p className="text-xs text-slate-500">Inspire new aspirants with your typing test success story!</p>
              </div>
              <button
                type="button"
                onClick={() => setIsFeedbackModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleFeedbackSubmit} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Kumar"
                  value={feedbackForm.name}
                  onChange={(e) => setFeedbackForm({ ...feedbackForm, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 font-bold text-slate-800 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Enrolled Course</label>
                  <select
                    value={feedbackForm.course}
                    onChange={(e) => setFeedbackForm({ ...feedbackForm, course: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-3 font-bold text-slate-800 focus:outline-none focus:border-blue-600 text-xs"
                  >
                    <option value="English Typing Masterclass">English Typing Masterclass</option>
                    <option value="Hindi Typing (Kruti Dev / Remington)">Hindi Typing (Kruti Dev / Remington)</option>
                    <option value="ADCA & Computer Applications">ADCA & Computer Applications</option>
                    <option value="Shorthand Stenography">Shorthand Stenography</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Exam / Achievement</label>
                  <input
                    type="text"
                    placeholder="e.g. SSC CHSL Selected (52 WPM)"
                    value={feedbackForm.achievement}
                    onChange={(e) => setFeedbackForm({ ...feedbackForm, achievement: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 font-bold text-slate-800 focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Your Success Story & Feedback *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Share your experience, typing speed improvements, and guidance at Google Typing Classes Patna..."
                  value={feedbackForm.comment}
                  onChange={(e) => setFeedbackForm({ ...feedbackForm, comment: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-4 font-bold text-slate-800 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Upload Your Photo</label>
                <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <div className="w-12 h-12 rounded-xl bg-blue-600 text-white font-extrabold flex items-center justify-center overflow-hidden shrink-0">
                    {feedbackForm.photo ? (
                      <img src={feedbackForm.photo} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <Camera className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <label className="bg-white border border-slate-300 hover:border-blue-500 text-slate-700 text-xs font-bold px-4 py-2 rounded-xl shadow-sm cursor-pointer inline-flex items-center gap-2">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Browse Photo</span>
                      <input type="file" accept="image/*" onChange={handleFeedbackPhotoUpload} className="hidden" />
                    </label>
                    <span className="text-[11px] text-slate-500 block mt-1">Optional passport or success photo</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsFeedbackModalOpen(false)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-5 py-3 rounded-xl text-xs transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-6 py-3 rounded-xl text-xs shadow-md transition-all flex items-center gap-2"
                >
                  <span>Publish Success Story</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
