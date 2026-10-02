import React, { useState, useRef } from 'react';
import { 
  Users, 
  Search, 
  Plus, 
  UserCheck, 
  UserX, 
  Edit, 
  Trash2, 
  Mail, 
  Phone, 
  MapPin, 
  X, 
  Calendar,
  Upload,
  Download,
  FileSpreadsheet,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { User } from '../../types';
import { COURSES_DATA } from '../../data/mockData';

interface AdminStudentsProps {
  students: User[];
  onUpdateStudents: (newStudents: User[]) => void;
  onLogAction: (action: string, details: string) => void;
}

export const AdminStudents: React.FC<AdminStudentsProps> = ({ students, onUpdateStudents, onLogAction }) => {
  const [search, setSearch] = useState('');
  const [courseFilter, setCourseFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCsvModal, setShowCsvModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<User | null>(null);

  // CSV Import States
  const [csvParsedStudents, setCsvParsedStudents] = useState<User[]>([]);
  const [csvFileName, setCsvFileName] = useState('');
  const [csvError, setCsvError] = useState<string | null>(null);
  const [csvImportMode, setCsvImportMode] = useState<'append' | 'replace'>('append');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    dob: '12/05/2005',
    email: '',
    mobile: '',
    course: COURSES_DATA[0].title,
    address: 'Tripolia Kathak, Patna, Bihar',
    batch: 'Morning Batch'
  });

  const filtered = students.filter(st => {
    const matchesSearch = st.name.toLowerCase().includes(search.toLowerCase()) ||
                          st.registrationNo.toLowerCase().includes(search.toLowerCase()) ||
                          st.mobile.includes(search) ||
                          (st.dob && st.dob.includes(search));
    const matchesCourse = courseFilter === 'all' || st.course === courseFilter;
    return matchesSearch && matchesCourse;
  });

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    const newSt: User = {
      id: `GTC-2026-${Math.floor(100 + Math.random() * 900)}`,
      name: formData.name,
      dob: formData.dob,
      email: formData.email || 'student@googletypingclasses.com',
      mobile: formData.mobile,
      course: formData.course,
      registrationNo: `REG${Math.floor(100000 + Math.random() * 900000)}`,
      enrolledDate: 'Today',
      status: 'Active' as const,
      address: formData.address,
      batch: formData.batch
    };

    const updated: User[] = [newSt, ...students];
    onUpdateStudents(updated);
    onLogAction('Student Added', `Added student ${newSt.name} (${newSt.registrationNo}) with DOB ${newSt.dob || 'N/A'}`);
    setShowAddModal(false);
    setFormData({ name: '', dob: '12/05/2005', email: '', mobile: '', course: COURSES_DATA[0].title, address: 'Tripolia Kathak, Patna, Bihar', batch: 'Morning Batch' });
  };

  const toggleStatus = (id: string) => {
    const updated: User[] = students.map(st => {
      if (st.id === id) {
        const newStatus = st.status === 'Active' ? 'Inactive' : 'Active';
        onLogAction('Student Updated', `Changed status of ${st.name} to ${newStatus}`);
        return { ...st, status: newStatus as 'Active' | 'Inactive' };
      }
      return st;
    });
    onUpdateStudents(updated);
  };

  const deleteStudent = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete student ${name}?`)) {
      const updated = students.filter(st => st.id !== id);
      onUpdateStudents(updated);
      onLogAction('Student Deleted', `Deleted student ${name}`);
    }
  };

  // CSV Parser Helper
  const parseCSVLine = (line: string): string[] => {
    const result: string[] = [];
    let cur = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (c === '"') {
        if (inQuotes && line[i + 1] === '"') {
          cur += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (c === ',' && !inQuotes) {
        result.push(cur.trim());
        cur = '';
      } else {
        cur += c;
      }
    }
    result.push(cur.trim());
    return result;
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCsvError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.csv') && file.type !== 'text/csv' && file.type !== 'application/vnd.ms-excel') {
      setCsvError('Please select a valid .csv file.');
      return;
    }

    setCsvFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        if (!text || text.trim() === '') {
          setCsvError('The selected CSV file is empty.');
          return;
        }

        const lines = text.split(/\r\n|\n/).map(l => l.trim()).filter(l => l.length > 0);
        if (lines.length < 2) {
          setCsvError('CSV must contain at least a header row and one student data row.');
          return;
        }

        // Parse header
        const rawHeaders = parseCSVLine(lines[0]).map(h => h.toLowerCase().replace(/[^a-z0-9]/g, ''));
        
        // Map header indices
        const nameIdx = rawHeaders.findIndex(h => h.includes('name') || h.includes('student'));
        const dobIdx = rawHeaders.findIndex(h => h.includes('dob') || h.includes('birth') || h.includes('dateofbirth'));
        const mobileIdx = rawHeaders.findIndex(h => h.includes('mobile') || h.includes('phone') || h.includes('contact'));
        const emailIdx = rawHeaders.findIndex(h => h.includes('email') || h.includes('mail'));
        const courseIdx = rawHeaders.findIndex(h => h.includes('course') || h.includes('subject'));
        const batchIdx = rawHeaders.findIndex(h => h.includes('batch') || h.includes('timing') || h.includes('time'));
        const regIdx = rawHeaders.findIndex(h => h.includes('reg') || h.includes('registration') || h.includes('roll'));
        const addressIdx = rawHeaders.findIndex(h => h.includes('address') || h.includes('city') || h.includes('location'));
        const statusIdx = rawHeaders.findIndex(h => h.includes('status'));

        if (nameIdx === -1) {
          setCsvError('Header must include a "Name" or "Student Name" column.');
          return;
        }

        const parsed: User[] = [];
        for (let i = 1; i < lines.length; i++) {
          const values = parseCSVLine(lines[i]);
          if (values.length === 0 || !values[nameIdx] || values[nameIdx].trim() === '') continue;

          const studentName = values[nameIdx].trim();
          const studentDob = dobIdx !== -1 && values[dobIdx] ? values[dobIdx].trim() : '12/05/2005';
          const studentMobile = mobileIdx !== -1 && values[mobileIdx] ? values[mobileIdx].trim() : '+91 9471085404';
          const studentEmail = emailIdx !== -1 && values[emailIdx] ? values[emailIdx].trim() : `${studentName.toLowerCase().replace(/\s+/g, '')}@example.com`;
          const studentCourse = courseIdx !== -1 && values[courseIdx] ? values[courseIdx].trim() : COURSES_DATA[0].title;
          const studentBatch = batchIdx !== -1 && values[batchIdx] ? values[batchIdx].trim() : 'Morning Batch';
          const studentReg = regIdx !== -1 && values[regIdx] ? values[regIdx].trim() : `REG${Math.floor(100000 + Math.random() * 900000)}`;
          const studentAddress = addressIdx !== -1 && values[addressIdx] ? values[addressIdx].trim() : 'Patna, Bihar';
          const rawStatus = statusIdx !== -1 && values[statusIdx] ? values[statusIdx].trim().toLowerCase() : 'active';
          const studentStatus: 'Active' | 'Inactive' = rawStatus === 'inactive' ? 'Inactive' : 'Active';

          parsed.push({
            id: `GTC-2026-${Math.floor(100 + Math.random() * 900)}`,
            name: studentName,
            dob: studentDob,
            mobile: studentMobile,
            email: studentEmail,
            course: studentCourse,
            batch: studentBatch,
            registrationNo: studentReg,
            address: studentAddress,
            status: studentStatus,
            enrolledDate: 'Imported CSV'
          });
        }

        if (parsed.length === 0) {
          setCsvError('No valid student rows found in the CSV file.');
          return;
        }

        setCsvParsedStudents(parsed);
      } catch (err: any) {
        setCsvError('Error parsing CSV: ' + (err.message || 'Unknown format error'));
      }
    };
    reader.readAsText(file);
  };

  const handleConfirmCsvImport = () => {
    if (csvParsedStudents.length === 0) return;

    let updated: User[];
    if (csvImportMode === 'replace') {
      updated = csvParsedStudents;
    } else {
      updated = [...csvParsedStudents, ...students];
    }

    onUpdateStudents(updated);
    onLogAction(
      'Bulk Student Import', 
      `Successfully bulk imported ${csvParsedStudents.length} student records from CSV file (${csvFileName}) [Mode: ${csvImportMode}].`
    );

    setShowCsvModal(false);
    setCsvParsedStudents([]);
    setCsvFileName('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Export current students to CSV
  const handleExportStudentsCSV = () => {
    if (students.length === 0) return;

    const headers = ['Name', 'DOB', 'Registration No', 'Course', 'Batch', 'Mobile', 'Email', 'Address', 'Status', 'Enrolled Date'];
    const rows = students.map(s => [
      `"${s.name}"`,
      `"${s.dob || '12/05/2005'}"`,
      `"${s.registrationNo}"`,
      `"${s.course}"`,
      `"${s.batch || 'Morning Batch'}"`,
      `"${s.mobile}"`,
      `"${s.email}"`,
      `"${(s.address || 'Patna, Bihar').replace(/"/g, '""')}"`,
      `"${s.status}"`,
      `"${s.enrolledDate}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `students_list_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Download Sample Template CSV
  const handleDownloadSampleTemplate = () => {
    const headers = ['Name', 'DOB', 'Mobile', 'Email', 'Course', 'Batch', 'Registration No', 'Address', 'Status'];
    const sampleRows = [
      ['Rahul Kumar', '12/05/2005', '9471085404', 'rahul@example.com', 'English Typing Masterclass', 'Morning 8:00 AM', 'REG884920', 'Kankarbagh, Patna', 'Active'],
      ['Priya Kumari', '15/08/2004', '9876543210', 'priya@example.com', 'Hindi Typing (Kruti Dev)', 'Day 11:00 AM', 'REG884921', 'Boring Road, Patna', 'Active'],
      ['Amitabh Sharma', '01/12/2003', '9123456789', 'amitabh@example.com', 'ADCA (Advanced Diploma)', 'Evening 4:00 PM', 'REG884922', 'Rajendra Nagar, Patna', 'Active']
    ];

    const csvContent = [headers.join(','), ...sampleRows.map(r => r.map(c => `"${c}"`).join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'gtc_student_import_sample_template.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900">Student Management</h2>
          <p className="text-xs text-slate-500">Manage enrolled student profiles, bulk CSV import, Date of Birth (DOB), registrations, and course access.</p>
        </div>
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => {
              setCsvParsedStudents([]);
              setCsvError(null);
              setCsvFileName('');
              setShowCsvModal(true);
            }}
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-md flex items-center gap-2 transition-all"
          >
            <Upload className="w-4 h-4" /> Bulk Import CSV
          </button>
          <button
            onClick={handleExportStudentsCSV}
            disabled={students.length === 0}
            className="bg-slate-100 hover:bg-slate-200 disabled:opacity-50 text-slate-800 text-xs font-bold px-4 py-3 rounded-xl flex items-center gap-2 transition-all border border-slate-200"
          >
            <Download className="w-4 h-4 text-slate-600" /> Export CSV
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-md flex items-center gap-2 transition-all"
          >
            <Plus className="w-4 h-4" /> Add Student
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, reg no, DOB, mobile..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-blue-600"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <span className="text-xs font-bold text-slate-500">Total: {filtered.length} Students</span>
          <select
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
            className="w-full md:w-auto bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-blue-600 font-medium"
          >
            <option value="all">All Courses</option>
            {COURSES_DATA.map(c => (
              <option key={c.id} value={c.title}>{c.title}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase font-extrabold text-slate-500 tracking-wider">
                <th className="py-4 px-6">Student Name</th>
                <th className="py-4 px-6">DOB</th>
                <th className="py-4 px-6">Course & Batch</th>
                <th className="py-4 px-6">Contact Info</th>
                <th className="py-4 px-6">Registration No</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filtered.map((st) => (
                <tr key={st.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-6">
                    <div className="font-bold text-slate-900">{st.name}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">ID: {st.id}</div>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <div className="text-xs font-semibold text-blue-700 font-mono bg-blue-50 border border-blue-100 px-2.5 py-1.5 rounded-lg inline-flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-blue-500" />
                      <span>{st.dob || '12/05/2005'}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-semibold text-slate-800">{st.course}</div>
                    <div className="text-xs text-slate-500">{st.batch || 'Morning Batch'}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-xs text-slate-700 flex items-center gap-1"><Phone className="w-3 h-3 text-blue-500" /> {st.mobile}</div>
                    <div className="text-xs text-slate-500 flex items-center gap-1"><Mail className="w-3 h-3 text-slate-400" /> {st.email}</div>
                  </td>
                  <td className="py-4 px-6 font-mono text-xs font-bold text-blue-600">{st.registrationNo}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                      st.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {st.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right space-x-2">
                    <button
                      onClick={() => setSelectedStudent(st)}
                      className="text-xs font-bold bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      Profile
                    </button>
                    <button
                      onClick={() => toggleStatus(st.id)}
                      className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-colors ${st.status === 'Active' ? 'bg-amber-50 text-amber-700 hover:bg-amber-100' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'}`}
                    >
                      {st.status === 'Active' ? 'Deactivate' : 'Activate'}
                    </button>
                    <button
                      onClick={() => deleteStudent(st.id, st.name)}
                      className="text-xs font-bold bg-red-50 hover:bg-red-100 text-red-700 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-slate-400">
            No students found matching your criteria.
          </div>
        )}
      </div>

      {/* CSV Bulk Import Modal */}
      {showCsvModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl space-y-6 animate-fadeIn max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900">Bulk Import Students (CSV)</h3>
                  <p className="text-xs text-slate-500">Upload a .csv file to import student records at once.</p>
                </div>
              </div>
              <button 
                onClick={() => {
                  setShowCsvModal(false);
                  setCsvParsedStudents([]);
                  setCsvError(null);
                }} 
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4 overflow-y-auto flex-1 pr-1">
              {/* Template Download Notice */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-blue-50 p-4 rounded-2xl border border-blue-100">
                <div className="text-xs text-blue-900">
                  <span className="font-bold">Need sample format?</span> Download standard CSV headers with DOB & contact details.
                </div>
                <button
                  type="button"
                  onClick={handleDownloadSampleTemplate}
                  className="bg-white hover:bg-blue-100 text-blue-700 text-xs font-bold px-3.5 py-2 rounded-xl border border-blue-200 flex items-center gap-1.5 shadow-sm transition-colors whitespace-nowrap"
                >
                  <Download className="w-3.5 h-3.5" /> Download Template CSV
                </button>
              </div>

              {/* Upload Drop Zone / Input */}
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-200 hover:border-emerald-500 bg-slate-50/60 hover:bg-emerald-50/20 rounded-2xl p-6 text-center cursor-pointer transition-all"
              >
                <input 
                  type="file" 
                  ref={fileInputRef}
                  accept=".csv,text/csv" 
                  onChange={handleFileUpload} 
                  className="hidden" 
                />
                <Upload className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                <p className="text-sm font-bold text-slate-800">
                  {csvFileName ? `Selected: ${csvFileName}` : 'Click here to choose a CSV file'}
                </p>
                <p className="text-xs text-slate-400 mt-1">Supports standard CSV with Name, DOB, Mobile, Course, Batch, Reg No.</p>
              </div>

              {csvError && (
                <div className="flex items-center gap-2 bg-red-50 text-red-700 text-xs font-bold p-3.5 rounded-xl border border-red-200">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{csvError}</span>
                </div>
              )}

              {/* Parsed Preview */}
              {csvParsedStudents.length > 0 && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span className="text-xs font-extrabold text-slate-800">
                        Successfully parsed {csvParsedStudents.length} student records
                      </span>
                    </div>

                    {/* Import Mode Selector */}
                    <div className="flex items-center gap-2 text-xs">
                      <label className="font-semibold text-slate-600">Import Mode:</label>
                      <select
                        value={csvImportMode}
                        onChange={(e) => setCsvImportMode(e.target.value as 'append' | 'replace')}
                        className="bg-slate-100 border border-slate-200 rounded-lg px-2.5 py-1 font-bold text-slate-800 focus:outline-none"
                      >
                        <option value="append">Append (Add to current list)</option>
                        <option value="replace">Replace All Existing</option>
                      </select>
                    </div>
                  </div>

                  {/* Preview Table */}
                  <div className="border border-slate-200 rounded-2xl overflow-hidden max-h-48 overflow-y-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-100 text-slate-600 uppercase font-extrabold sticky top-0">
                          <th className="py-2.5 px-3">Name</th>
                          <th className="py-2.5 px-3">DOB</th>
                          <th className="py-2.5 px-3">Mobile</th>
                          <th className="py-2.5 px-3">Course</th>
                          <th className="py-2.5 px-3">Reg No</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {csvParsedStudents.slice(0, 10).map((st, i) => (
                          <tr key={i} className="hover:bg-slate-50">
                            <td className="py-2 px-3 font-bold text-slate-900">{st.name}</td>
                            <td className="py-2 px-3 font-mono text-blue-600">{st.dob}</td>
                            <td className="py-2 px-3 text-slate-600">{st.mobile}</td>
                            <td className="py-2 px-3 text-slate-600 truncate max-w-[140px]">{st.course}</td>
                            <td className="py-2 px-3 font-mono font-semibold text-slate-700">{st.registrationNo}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {csvParsedStudents.length > 10 && (
                    <p className="text-[11px] text-slate-400 text-center">
                      + {csvParsedStudents.length - 10} more rows ready to import...
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowCsvModal(false);
                  setCsvParsedStudents([]);
                  setCsvError(null);
                }}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-5 py-2.5 rounded-xl text-xs transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={csvParsedStudents.length === 0}
                onClick={handleConfirmCsvImport}
                className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold px-6 py-2.5 rounded-xl text-xs shadow-md transition-all flex items-center gap-2"
              >
                <CheckCircle className="w-4 h-4" /> Import {csvParsedStudents.length > 0 ? `${csvParsedStudents.length} Students` : ''}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Student Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl space-y-6 animate-fadeIn">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-extrabold text-slate-900">Add New Student</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleAddStudent} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Rahul Kumar"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Date of Birth (DOB) *</label>
                  <input
                    type="text"
                    required
                    placeholder="DD/MM/YYYY e.g. 12/05/2005"
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-600 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 9876543210"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="student@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Batch</label>
                  <input
                    type="text"
                    placeholder="Morning 8:00 AM"
                    value={formData.batch}
                    onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Course *</label>
                <select
                  value={formData.course}
                  onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-600"
                >
                  {COURSES_DATA.map(c => (
                    <option key={c.id} value={c.title}>{c.title}</option>
                  ))}
                </select>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-6 py-3 rounded-xl text-sm transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl text-sm shadow-md transition-all"
                >
                  Save Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Student Profile Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-8 shadow-2xl space-y-6 animate-fadeIn">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">{selectedStudent.name}</h3>
                <p className="text-xs text-blue-600 font-bold">Registration No: {selectedStudent.registrationNo}</p>
              </div>
              <button onClick={() => setSelectedStudent(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div><span className="text-xs text-slate-400 block">Student ID</span><strong>{selectedStudent.id}</strong></div>
                <div><span className="text-xs text-slate-400 block">Date of Birth (DOB)</span><strong className="text-blue-600">{selectedStudent.dob || '12/05/2005'}</strong></div>
                <div><span className="text-xs text-slate-400 block">Status</span><strong className="text-emerald-600">{selectedStudent.status}</strong></div>
                <div><span className="text-xs text-slate-400 block">Mobile</span><strong>{selectedStudent.mobile}</strong></div>
                <div><span className="text-xs text-slate-400 block">Email</span><strong>{selectedStudent.email}</strong></div>
                <div><span className="text-xs text-slate-400 block">Batch</span><strong>{selectedStudent.batch || 'Morning Batch'}</strong></div>
              </div>
              <div><span className="text-xs text-slate-400 block">Enrolled Course</span><strong className="text-slate-900">{selectedStudent.course}</strong></div>
              <div><span className="text-xs text-slate-400 block">Institute Address</span><strong className="text-slate-900">Tripolia Kathak, Patna – 800007</strong></div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setSelectedStudent(null)}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-2.5 rounded-xl text-sm shadow-md"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
