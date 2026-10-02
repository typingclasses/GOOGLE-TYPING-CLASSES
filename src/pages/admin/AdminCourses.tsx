import React, { useState } from 'react';
import { 
  BookOpen, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  CheckCircle, 
  X, 
  Edit3,
  Layers,
  Sparkles,
  Tag,
  Clock,
  IndianRupee,
  Check
} from 'lucide-react';
import { Course } from '../../types';

interface AdminCoursesProps {
  courses: Course[];
  onUpdateCourses: (newCourses: Course[]) => void;
  onLogAction: (action: string, details: string) => void;
}

export const AdminCourses: React.FC<AdminCoursesProps> = ({ courses, onUpdateCourses, onLogAction }) => {
  const [showModal, setShowModal] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [notification, setNotification] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'typing' as 'typing' | 'computer' | 'shorthand' | 'competitive',
    duration: '3 Months',
    fees: '₹1,500 / course',
    description: '',
    level: 'Beginner' as 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels',
    highlights: 'Professional Training, Practical Lab Sessions, Certificate Available',
    published: true
  });

  const showNotify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleOpenAdd = () => {
    setEditingCourseId(null);
    setFormData({
      title: '',
      category: 'typing',
      duration: '3 Months',
      fees: '₹1,500 / course',
      description: '',
      level: 'Beginner',
      highlights: 'Professional Training, Practical Lab Sessions, Certificate Available',
      published: true
    });
    setShowModal(true);
  };

  const handleOpenEdit = (course: Course) => {
    setEditingCourseId(course.id);
    setFormData({
      title: course.title,
      category: course.category as any,
      duration: course.duration,
      fees: course.fees,
      description: course.description,
      level: (course.level as any) || 'Beginner',
      highlights: course.highlights ? course.highlights.join(', ') : 'Professional Training, Practical Lab Sessions, Certificate Available',
      published: course.published ?? true
    });
    setShowModal(true);
  };

  const handleSaveCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Please enter a course title.');
      return;
    }

    const highlightsArray = formData.highlights
      .split(',')
      .map(h => h.trim())
      .filter(Boolean);

    if (editingCourseId) {
      // Update existing course
      const updated = courses.map(c => {
        if (c.id === editingCourseId) {
          return {
            ...c,
            title: formData.title,
            category: formData.category,
            duration: formData.duration,
            fees: formData.fees,
            description: formData.description,
            level: formData.level,
            highlights: highlightsArray.length > 0 ? highlightsArray : c.highlights,
            published: formData.published
          };
        }
        return c;
      });
      onUpdateCourses(updated);
      onLogAction('Course Updated', `Updated course: ${formData.title}`);
      showNotify(`Course "${formData.title}" updated successfully!`);
    } else {
      // Add new course
      const newCourse: Course = {
        id: `course-${Date.now()}`,
        title: formData.title,
        category: formData.category,
        duration: formData.duration,
        fees: formData.fees,
        description: formData.description,
        highlights: highlightsArray.length > 0 ? highlightsArray : ['Professional Training', 'Practical Lab Sessions', 'Certificate Available'],
        level: formData.level,
        iconName: 'BookOpen',
        published: formData.published
      };
      const updated = [newCourse, ...courses];
      onUpdateCourses(updated);
      onLogAction('Course Added', `Added course: ${newCourse.title}`);
      showNotify(`New course "${newCourse.title}" created successfully!`);
    }

    setShowModal(false);
  };

  const togglePublish = (id: string) => {
    const updated = courses.map(c => {
      if (c.id === id) {
        const pub = !c.published;
        onLogAction('Course Updated', `Changed publish status of ${c.title} to ${pub ? 'Published' : 'Draft'}`);
        showNotify(`Course "${c.title}" is now ${pub ? 'Published' : 'Draft / Unpublished'}.`);
        return { ...c, published: pub };
      }
      return c;
    });
    onUpdateCourses(updated);
  };

  const deleteCourse = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete course "${title}"?`)) {
      const updated = courses.filter(c => c.id !== id);
      onUpdateCourses(updated);
      onLogAction('Course Deleted', `Deleted course: ${title}`);
      showNotify(`Course "${title}" has been deleted.`);
    }
  };

  // Filtered courses
  const filteredCourses = courses.filter(c => {
    const matchCategory = selectedCategory === 'all' || c.category === selectedCategory;
    const matchSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        c.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const publishedCount = courses.filter(c => c.published).length;
  const draftCount = courses.filter(c => !c.published).length;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-blue-600" />
            <span>Course Management</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Add, edit, publish/unpublish, and manage all courses. Changes reflect instantly across the website.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-5 py-3 rounded-xl shadow-md flex items-center gap-2 transition-all hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Course</span>
        </button>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>{notification}</span>
        </div>
      )}

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-600"
          />
        </div>

        {/* Category & Status Filter Tabs */}
        <div className="flex items-center gap-1.5 flex-wrap justify-center w-full md:w-auto">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedCategory === 'all' ? 'bg-slate-900 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All ({courses.length})
          </button>
          <button
            onClick={() => setSelectedCategory('typing')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedCategory === 'typing' ? 'bg-blue-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Typing
          </button>
          <button
            onClick={() => setSelectedCategory('computer')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedCategory === 'computer' ? 'bg-indigo-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Computer
          </button>
          <button
            onClick={() => setSelectedCategory('shorthand')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedCategory === 'shorthand' ? 'bg-purple-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Shorthand
          </button>
          <button
            onClick={() => setSelectedCategory('competitive')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedCategory === 'competitive' ? 'bg-orange-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Competitive
          </button>
        </div>
      </div>

      {/* Courses Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.length === 0 ? (
          <div className="col-span-full bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-3">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
            <h4 className="font-bold text-slate-700">No courses match your filter</h4>
            <p className="text-xs text-slate-400">Click "Add New Course" to create a course.</p>
          </div>
        ) : (
          filteredCourses.map((course) => (
            <div 
              key={course.id} 
              className={`bg-white p-6 rounded-3xl shadow-sm border flex flex-col justify-between space-y-4 transition-all duration-200 hover:shadow-md ${
                course.published ? 'border-slate-200 hover:border-blue-300' : 'border-slate-200 opacity-75 bg-slate-50/60'
              }`}
            >
              {/* Course Top Info */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                    {course.category}
                  </span>

                  {/* Clickable Status Badge */}
                  <button
                    onClick={() => togglePublish(course.id)}
                    className={`text-[11px] font-bold px-3 py-1 rounded-full transition-all flex items-center gap-1 ${
                      course.published 
                        ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200' 
                        : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                    }`}
                    title="Click to toggle Published / Draft"
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${course.published ? 'bg-emerald-600' : 'bg-slate-500'}`}></span>
                    <span>{course.published ? 'Published' : 'Draft / Hidden'}</span>
                  </button>
                </div>

                <h3 className="text-lg font-extrabold text-slate-900 leading-snug">{course.title}</h3>
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">{course.description}</p>
                
                <div className="flex justify-between items-center text-xs text-slate-500 pt-3 border-t border-slate-100">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Duration: <strong>{course.duration}</strong></span>
                  </span>
                  <strong className="text-slate-900 font-bold bg-slate-100 px-2.5 py-1 rounded-lg">
                    {course.fees}
                  </strong>
                </div>
              </div>

              {/* Action Buttons with Edit */}
              <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                {/* Edit Button */}
                <button
                  onClick={() => handleOpenEdit(course)}
                  className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                  title="Edit course details"
                >
                  <Edit3 className="w-3.5 h-3.5 text-blue-600" />
                  <span>Edit</span>
                </button>

                {/* Publish / Unpublish Button */}
                <button
                  onClick={() => togglePublish(course.id)}
                  className={`flex-1 text-xs font-bold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1 ${
                    course.published 
                      ? 'bg-amber-50 text-amber-700 hover:bg-amber-100' 
                      : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                  }`}
                  title={course.published ? 'Unpublish from website' : 'Publish to website'}
                >
                  <span>{course.published ? 'Unpublish' : 'Publish'}</span>
                </button>

                {/* Delete Button */}
                <button
                  onClick={() => deleteCourse(course.id, course.title)}
                  className="bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold px-3 py-2.5 rounded-xl transition-colors flex items-center justify-center"
                  title="Delete course"
                >
                  <Trash2 className="w-3.5 h-3.5 text-red-600" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ADD / EDIT MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  <Edit3 className="w-5 h-5 text-blue-600" />
                  <span>{editingCourseId ? 'Edit Course Details' : 'Add New Course'}</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Update course title, category, duration, fee structure, and publish status.
                </p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveCourse} className="p-6 space-y-4">
              {/* Course Title */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Course Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. English Typing Masterclass (40+ WPM)"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-600 font-bold"
                />
              </div>

              {/* Category & Level */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-600 font-bold text-slate-800"
                  >
                    <option value="typing">Typing (English / Hindi)</option>
                    <option value="computer">Computer (DCA / ADCA / Tally)</option>
                    <option value="shorthand">Shorthand (Stenography)</option>
                    <option value="competitive">Competitive Exam Prep</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Level
                  </label>
                  <select
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value as any })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-600 font-medium text-slate-800"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="All Levels">All Levels</option>
                  </select>
                </div>
              </div>

              {/* Duration & Fees */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Course Duration
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 3 Months / 6 Months"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Course Fees
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ₹1,500 / course"
                    value={formData.fees}
                    onChange={(e) => setFormData({ ...formData, fees: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-600 font-semibold"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Course Description *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Detailed course description and syllabus overview..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:outline-none focus:border-blue-600 resize-none leading-relaxed"
                ></textarea>
              </div>

              {/* Highlights */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Course Highlights (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="Professional Training, Practical Lab Sessions, Certificate Available"
                  value={formData.highlights}
                  onChange={(e) => setFormData({ ...formData, highlights: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-blue-600"
                />
              </div>

              {/* Published Checkbox */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between">
                <div>
                  <label htmlFor="publishedCheck" className="text-xs font-bold text-slate-900 cursor-pointer block">
                    Publish on Website
                  </label>
                  <p className="text-[11px] text-slate-500">When checked, course appears live on the student courses page.</p>
                </div>
                <input
                  type="checkbox"
                  id="publishedCheck"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
              </div>

              {/* Modal Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-5 py-2.5 rounded-xl text-xs transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs shadow-md transition-all flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>{editingCourseId ? 'Save & Update Course' : 'Create Course'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
