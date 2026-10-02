import React, { useState } from 'react';
import { BookOpen, CheckCircle, ArrowRight, Search, Filter, Award, Clock, DollarSign } from 'lucide-react';

interface CoursesProps {
  onNavigate: (path: string) => void;
  courses?: any[];
}

export const Courses: React.FC<CoursesProps> = ({ onNavigate, courses }) => {
  const [filter, setFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const allCourses = courses || [];

  const filteredCourses = allCourses.filter(course => {
    const matchesCategory = filter === 'all' || course.category === filter;
    const matchesQuery = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-blue-600 font-extrabold uppercase text-xs tracking-widest bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200">
            Professional Training Catalog
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Our Courses & Fees
          </h1>
          <p className="text-slate-600 text-base sm:text-lg">
            Advance your career with Patna's premier typing, computer literacy, and professional certificate courses.
          </p>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-4 justify-between items-center">
          {/* Categories */}
          <div className="flex items-center gap-2 flex-wrap w-full md:w-auto">
            {[
              { id: 'all', label: 'All Courses' },
              { id: 'typing', label: 'Typing' },
              { id: 'computer', label: 'Computer (DCA/ADCA)' },
              { id: 'shorthand', label: 'Shorthand' },
              { id: 'competitive', label: 'SSC / Exams' }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${filter === cat.id ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-blue-600 transition-colors"
            />
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <div 
              key={course.id}
              className="bg-white rounded-3xl p-7 shadow-sm border border-slate-200/80 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                    {course.category}
                  </span>
                  <span className="text-sm font-extrabold text-slate-900 bg-slate-100 px-3 py-1 rounded-lg">
                    {course.fees}
                  </span>
                </div>

                <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {course.title}
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed">
                  {course.description}
                </p>

                <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 py-1">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <span>{course.duration}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Award className="w-4 h-4 text-amber-500" />
                    <span>{course.level}</span>
                  </div>
                </div>

                <div className="pt-2 space-y-2 border-t border-slate-100">
                  <div className="text-xs font-semibold text-slate-500 uppercase">Key Highlights:</div>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {course.highlights.map((hl: string, i: number) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-3">
                <button 
                  onClick={() => onNavigate('/contact')}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-3 rounded-xl text-sm text-center transition-colors"
                >
                  Inquire
                </button>
                <button 
                  onClick={() => onNavigate('/student-signup')}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-sm text-center shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-1"
                >
                  <span>Enroll</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800">No courses found</h3>
            <p className="text-sm text-slate-500 mt-1">Try adjusting your search or category filter.</p>
          </div>
        )}
      </div>
    </div>
  );
};
