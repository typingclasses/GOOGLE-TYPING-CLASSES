import React, { useState, useRef } from 'react';
import { 
  Award, 
  Plus, 
  Search, 
  Trash2, 
  X, 
  Calendar,
  Upload,
  Download,
  FileSpreadsheet,
  CheckCircle,
  AlertCircle,
  FileText,
  Check,
  Sparkles,
  FileUp,
  FileCheck,
  RefreshCw,
  Eye,
  UserCheck,
  Edit3,
  Keyboard
} from 'lucide-react';
import { StudentResult } from '../../types';
import { COURSES_DATA } from '../../data/mockData';
import { extractTextFromDocument, extractTextFromPDF, parseStudentData } from '../../utils/pdfParser';
import { ResultCard } from '../../components/ResultCard';
import { AdminDocumentViewer } from '../../components/AdminDocumentViewer';

interface AdminResultsProps {
  results: StudentResult[];
  onUpdateResults: (newResults: StudentResult[]) => void;
  onLogAction: (action: string, details: string) => void;
}

export const AdminResults: React.FC<AdminResultsProps> = ({ results, onUpdateResults, onLogAction }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [search, setSearch] = useState('');
  const [notification, setNotification] = useState<string | null>(null);

  // Actions states: View scorecard, Edit result, Delete inline confirm
  const [selectedResultForView, setSelectedResultForView] = useState<StudentResult | null>(null);
  const [editingResult, setEditingResult] = useState<StudentResult | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Typing Results Uploading PDF Auto-Fill State
  const [showTypingModal, setShowTypingModal] = useState(false);
  const [typingFormData, setTypingFormData] = useState({
    name: '',
    dob: '12/05/2005',
    registrationNo: 'REG884950',
    course: 'English Typing',
    englishSpeed: '45 WPM',
    hindiSpeed: '35 WPM',
    status: 'Passed' as 'Passed' | 'Distinction' | 'Certified' | 'Completed'
  });
  const [isParsingTypingPDF, setIsParsingTypingPDF] = useState(false);
  const [typingAutoFillMsg, setTypingAutoFillMsg] = useState<string | null>(null);
  const typingFileInputRef = useRef<HTMLInputElement>(null);

  // Single Result Form State with Auto-fill indicator
  const [formData, setFormData] = useState({
    name: '',
    dob: '15/07/1996',
    studentId: 'GTC-2026-101',
    registrationNo: 'M171823101141925',
    course: COURSES_DATA[0].title,
    speed: '45 WPM',
    accuracy: '95.0%',
    marks: '403',
    cgpa: '9.4',
    status: 'Passed' as 'Passed' | 'Distinction' | 'Certified' | 'Completed',
    achievement: 'Cleared Examination',
    testDate: 'Today'
  });

  const [isParsingSinglePDF, setIsParsingSinglePDF] = useState(false);
  const [singleAutoFillMsg, setSingleAutoFillMsg] = useState<string | null>(null);
  const singleFileInputRef = useRef<HTMLInputElement>(null);

  // Uploaded Document File Storage (PDF / Word)
  const [uploadedDocument, setUploadedDocument] = useState<{
    url: string;
    name: string;
    type: 'pdf' | 'docx' | 'doc' | 'image' | 'document';
  } | null>(null);

  // Bulk Import States (PDF & CSV)
  const [bulkParsedResults, setBulkParsedResults] = useState<StudentResult[]>([]);
  const [bulkFileName, setBulkFileName] = useState('');
  const [bulkFileType, setBulkFileType] = useState<'pdf' | 'csv' | 'txt'>('pdf');
  const [bulkError, setBulkError] = useState<string | null>(null);
  const [isParsingBulk, setIsParsingBulk] = useState(false);
  const [bulkImportMode, setBulkImportMode] = useState<'append' | 'replace'>('append');
  const bulkFileInputRef = useRef<HTMLInputElement>(null);

  const showNotify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const filtered = results.filter(r => 
    r.name.toLowerCase().includes(search.toLowerCase()) || 
    r.registrationNo.toLowerCase().includes(search.toLowerCase()) ||
    (r.dob && r.dob.includes(search)) ||
    r.course.toLowerCase().includes(search.toLowerCase())
  );

  // Helper to read file as Data URL
  const readFileDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve((reader.result as string) || '');
      reader.onerror = () => resolve('');
      reader.readAsDataURL(file);
    });
  };

  // Handle PDF / Document Upload in Single Result Modal to Auto-Fill
  const handleSinglePDFUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsParsingSinglePDF(true);
    setSingleAutoFillMsg(null);

    try {
      // Store original document for Admin direct view & download
      const dataUri = await readFileDataUrl(file);
      setUploadedDocument({
        url: dataUri,
        name: file.name,
        type: file.name.endsWith('.pdf') ? 'pdf' : (file.name.endsWith('.docx') || file.name.endsWith('.doc')) ? 'docx' : 'document'
      });

      const extractedText = await extractTextFromDocument(file);
      const parsed = parseStudentData(extractedText, file.name);

      setFormData({
        name: parsed.name,
        dob: parsed.dob,
        studentId: parsed.studentId,
        registrationNo: parsed.registrationNo,
        course: parsed.course,
        speed: parsed.speed || '45 WPM',
        accuracy: parsed.accuracy,
        marks: parsed.marks,
        cgpa: '9.4',
        status: parsed.status,
        achievement: parsed.achievement,
        testDate: 'Today'
      });

      setSingleAutoFillMsg(
        `✅ Auto-filled successfully from "${file.name}"! Candidate: ${parsed.name} | Reg: ${parsed.registrationNo} | Course: ${parsed.course} | DOB: ${parsed.dob}`
      );
      showNotify(`Document parsed & fields auto-filled for ${parsed.name}!`);
    } catch (err: any) {
      console.error('PDF parsing error:', err);
      // Fallback filename parsing
      const fallbackParsed = parseStudentData('', file.name);
      setFormData(prev => ({
        ...prev,
        name: fallbackParsed.name,
        registrationNo: fallbackParsed.registrationNo,
        dob: fallbackParsed.dob,
        course: fallbackParsed.course
      }));
      setSingleAutoFillMsg(`Auto-filled from filename "${file.name}" for Candidate: ${fallbackParsed.name}`);
    } finally {
      setIsParsingSinglePDF(false);
      if (singleFileInputRef.current) singleFileInputRef.current.value = '';
    }
  };

  // Handle Bulk File Upload (PDF or CSV)
  const handleBulkFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setBulkError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    setBulkFileName(file.name);
    setIsParsingBulk(true);

    try {
      const isCsv = file.name.toLowerCase().endsWith('.csv');
      setBulkFileType(isCsv ? 'csv' : 'pdf');

      if (!isCsv) {
        // Extract text from PDF or Word document (.docx, .doc, .txt)
        const pdfText = await extractTextFromDocument(file);
        const lines = pdfText.split(/\r\n|\n/).map(l => l.trim()).filter(Boolean);

        const parsedList: StudentResult[] = [];

        // Check if multiple records exist in document
        if (lines.length > 3) {
          let currentChunk = '';
          for (let i = 0; i < lines.length; i++) {
            currentChunk += lines[i] + ' ';
            if (lines[i].includes('%') || i % 4 === 0 || i === lines.length - 1) {
              const data = parseStudentData(currentChunk, `Candidate_${i}`);
              if (data.name && data.name !== 'STUDENT NAME' && data.name.length >= 3) {
                parsedList.push({
                  id: `RES-${Date.now()}-${parsedList.length}`,
                  studentId: data.studentId,
                  registrationNo: data.registrationNo,
                  name: data.name,
                  dob: data.dob,
                  course: data.course,
                  speed: '45 WPM',
                  accuracy: data.accuracy,
                  marks: data.marks,
                  cgpa: '9.4',
                  status: data.status,
                  achievement: data.achievement,
                  testDate: 'Today',
                  certificateStatus: 'Available',
                  published: true
                });
              }
              currentChunk = '';
            }
          }
        }

        // If list is empty, create from single document / filename
        if (parsedList.length === 0) {
          const singleData = parseStudentData(pdfText, file.name);
          parsedList.push({
            id: `RES-${Date.now()}-1`,
            studentId: singleData.studentId,
            registrationNo: singleData.registrationNo,
            name: singleData.name,
            dob: singleData.dob,
            course: singleData.course,
            speed: '45 WPM',
            accuracy: singleData.accuracy,
            marks: singleData.marks,
            cgpa: '9.4',
            status: singleData.status,
            achievement: singleData.achievement,
            testDate: 'Today',
            certificateStatus: 'Available',
            published: true
          });
        }

        setBulkParsedResults(parsedList);
        showNotify(`Extracted ${parsedList.length} student result records from PDF!`);
      } else {
        // Standard CSV Parser
        const text = await file.text();
        const lines = text.split(/\r\n|\n/).map(l => l.trim()).filter(Boolean);
        if (lines.length < 2) {
          setBulkError('CSV must contain a header row and at least 1 student row.');
          return;
        }

        const parseCSVLine = (line: string): string[] => {
          const res: string[] = [];
          let cur = '';
          let inQuotes = false;
          for (let i = 0; i < line.length; i++) {
            const c = line[i];
            if (c === '"') {
              if (inQuotes && line[i + 1] === '"') {
                cur += '"';
                i++;
              } else inQuotes = !inQuotes;
            } else if (c === ',' && !inQuotes) {
              res.push(cur.trim());
              cur = '';
            } else cur += c;
          }
          res.push(cur.trim());
          return res;
        };

        const headers = parseCSVLine(lines[0]).map(h => h.toLowerCase().replace(/[^a-z0-9]/g, ''));
        const nameIdx = headers.findIndex(h => h.includes('name') || h.includes('student'));
        const dobIdx = headers.findIndex(h => h.includes('dob') || h.includes('birth'));
        const regIdx = headers.findIndex(h => h.includes('reg') || h.includes('roll'));
        const courseIdx = headers.findIndex(h => h.includes('course'));
        const accIdx = headers.findIndex(h => h.includes('acc') || h.includes('percent'));
        const marksIdx = headers.findIndex(h => h.includes('mark') || h.includes('score'));
        const statusIdx = headers.findIndex(h => h.includes('status'));

        const parsedCsvList: StudentResult[] = [];
        for (let i = 1; i < lines.length; i++) {
          const vals = parseCSVLine(lines[i]);
          if (!vals[nameIdx] || vals[nameIdx].trim() === '') continue;

          parsedCsvList.push({
            id: `RES-${Date.now()}-${i}`,
            studentId: `GTC-2026-${Math.floor(100 + Math.random() * 900)}`,
            name: vals[nameIdx].trim().toUpperCase(),
            dob: dobIdx !== -1 && vals[dobIdx] ? vals[dobIdx].trim() : '15/07/1996',
            registrationNo: regIdx !== -1 && vals[regIdx] ? vals[regIdx].trim() : `REG${Math.floor(100000 + Math.random() * 900000)}`,
            course: courseIdx !== -1 && vals[courseIdx] ? vals[courseIdx].trim() : COURSES_DATA[0].title,
            speed: '45 WPM',
            accuracy: accIdx !== -1 && vals[accIdx] ? vals[accIdx].trim() : '95.0%',
            marks: marksIdx !== -1 && vals[marksIdx] ? vals[marksIdx].trim() : '94/100',
            cgpa: '9.4',
            status: statusIdx !== -1 && vals[statusIdx] ? (vals[statusIdx] as any) : 'Passed',
            achievement: 'Cleared Examination',
            testDate: 'Today',
            certificateStatus: 'Available',
            published: true
          });
        }

        setBulkParsedResults(parsedCsvList);
        showNotify(`Parsed ${parsedCsvList.length} student records from CSV!`);
      }
    } catch (err: any) {
      setBulkError('Error parsing file: ' + (err.message || 'Invalid format'));
    } finally {
      setIsParsingBulk(false);
    }
  };

  const handleAddResult = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Please enter student name');
      return;
    }

    const newRes: StudentResult = {
      id: `RES-${Date.now()}`,
      studentId: formData.studentId || `GTC-2026-${Math.floor(100 + Math.random() * 900)}`,
      registrationNo: formData.registrationNo,
      name: formData.name.toUpperCase(),
      dob: formData.dob,
      course: formData.course,
      speed: '45 WPM',
      accuracy: formData.accuracy.includes('%') ? formData.accuracy : `${formData.accuracy}%`,
      marks: (formData.marks || '403').replace(/\/100$/, '').trim(),
      cgpa: '9.4',
      testDate: 'Today',
      status: formData.status,
      achievement: formData.achievement || `Cleared ${formData.course}`,
      certificateStatus: 'Available',
      published: true,
      documentUrl: uploadedDocument?.url,
      documentName: uploadedDocument?.name,
      documentType: uploadedDocument?.type
    };

    const updated = [newRes, ...results];
    onUpdateResults(updated);
    onLogAction(
      'Result Added', 
      `Added exam result for ${newRes.name} (${newRes.registrationNo}) [Course: ${newRes.course}, Marks: ${newRes.marks}, Accuracy: ${newRes.accuracy}]`
    );
    showNotify(`Result for ${newRes.name} published successfully!`);
    setShowAddModal(false);
    setSingleAutoFillMsg(null);
    setUploadedDocument(null);
    setFormData({ 
      name: '', 
      dob: '15/07/1996', 
      studentId: 'GTC-2026-101', 
      registrationNo: `REG${Math.floor(100000 + Math.random() * 900000)}`, 
      course: COURSES_DATA[0].title, 
      speed: '45 WPM',
      accuracy: '95.0%',
      marks: '403',
      cgpa: '9.4',
      status: 'Passed', 
      achievement: 'Cleared Examination',
      testDate: 'Today'
    });
  };

  const executeDelete = (id: string, name: string) => {
    const updated = results.filter(r => r.id !== id);
    onUpdateResults(updated);
    onLogAction('Result Deleted', `Deleted result for ${name}`);
    showNotify(`Result for ${name} deleted successfully.`);
    setDeletingId(null);
  };

  const handleTypingPDFUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsParsingTypingPDF(true);
      setTypingAutoFillMsg(null);

      // Store uploaded document for Admin direct view & download
      const dataUri = await readFileDataUrl(file);
      setUploadedDocument({
        url: dataUri,
        name: file.name,
        type: file.name.endsWith('.pdf') ? 'pdf' : (file.name.endsWith('.docx') || file.name.endsWith('.doc')) ? 'docx' : 'document'
      });

      const text = await extractTextFromDocument(file);
      const parsed = parseStudentData(text, file.name);

      const detectedEngSpeed = parsed.englishSpeed || parsed.speed || '45 WPM';
      const detectedHinSpeed = parsed.hindiSpeed || '35 WPM';

      setTypingFormData(prev => ({
        ...prev,
        name: parsed.name && parsed.name !== 'STUDENT NAME' ? parsed.name : prev.name,
        dob: parsed.dob || prev.dob || '12/05/2005',
        registrationNo: parsed.registrationNo || prev.registrationNo || 'REG884950',
        course: parsed.course.includes('Typing') || parsed.course.includes('Shorthand') ? parsed.course : 'English Typing',
        englishSpeed: detectedEngSpeed,
        hindiSpeed: detectedHinSpeed,
        status: parsed.status || 'Passed'
      }));

      setTypingAutoFillMsg(`✓ Auto-filled from "${file.name}"! Candidate: ${parsed.name} | Eng: ${detectedEngSpeed} | Hin: ${detectedHinSpeed}`);
    } catch (err: any) {
      console.error('Error extracting document:', err);
      setTypingAutoFillMsg(`⚠️ Error extracting file: ${err.message || 'Please enter details manually'}`);
    } finally {
      setIsParsingTypingPDF(false);
      if (typingFileInputRef.current) {
        typingFileInputRef.current.value = '';
      }
    }
  };

  const handlePublishTypingResult = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typingFormData.name.trim()) {
      showNotify('Please enter Student Name');
      return;
    }

    const regNo = typingFormData.registrationNo.trim() || `REG${Math.floor(100000 + Math.random() * 900000)}`;
    const engSpd = typingFormData.englishSpeed.includes('WPM') ? typingFormData.englishSpeed : `${typingFormData.englishSpeed} WPM`;
    const hinSpd = typingFormData.hindiSpeed.includes('WPM') ? typingFormData.hindiSpeed : `${typingFormData.hindiSpeed} WPM`;

    const newRes: StudentResult = {
      id: `RES-${Date.now()}`,
      studentId: `GTC-2026-${Math.floor(100 + Math.random() * 900)}`,
      registrationNo: regNo.toUpperCase(),
      name: typingFormData.name.toUpperCase().trim(),
      dob: typingFormData.dob.trim() || '12/05/2005',
      course: typingFormData.course,
      englishSpeed: engSpd,
      hindiSpeed: hinSpd,
      speed: `Eng: ${engSpd} | Hin: ${hinSpd}`,
      accuracy: '98.0%',
      marks: '95',
      cgpa: '9.5',
      testDate: 'Today',
      status: typingFormData.status || 'Passed',
      achievement: `Cleared ${typingFormData.course}`,
      certificateStatus: 'Available',
      published: true,
      documentUrl: uploadedDocument?.url,
      documentName: uploadedDocument?.name,
      documentType: uploadedDocument?.type
    };

    onUpdateResults([newRes, ...results]);
    onLogAction(
      'Typing Result Published',
      `Published typing result for ${newRes.name} (${newRes.registrationNo}) [Course: ${newRes.course}, Speed English: ${engSpd}, Hindi Speed: ${hinSpd}]`
    );
    showNotify(`Typing result for ${newRes.name} published successfully!`);
    setShowTypingModal(false);
    setTypingAutoFillMsg(null);
    setUploadedDocument(null);
    setTypingFormData({
      name: '',
      dob: '12/05/2005',
      registrationNo: `REG${Math.floor(100000 + Math.random() * 900000)}`,
      course: 'English Typing',
      englishSpeed: '45 WPM',
      hindiSpeed: '35 WPM',
      status: 'Passed'
    });
  };

  const handleConfirmBulkImport = () => {
    if (bulkParsedResults.length === 0) return;

    let updated: StudentResult[];
    if (bulkImportMode === 'replace') {
      updated = bulkParsedResults;
    } else {
      updated = [...bulkParsedResults, ...results];
    }

    onUpdateResults(updated);
    onLogAction(
      'Bulk Results Import', 
      `Imported and published ${bulkParsedResults.length} student results via ${bulkFileType.toUpperCase()} (${bulkFileName}).`
    );

    showNotify(`Successfully imported ${bulkParsedResults.length} results!`);
    setShowBulkModal(false);
    setBulkParsedResults([]);
    setBulkFileName('');
    if (bulkFileInputRef.current) bulkFileInputRef.current.value = '';
  };

  // Export Results to CSV
  const handleExportResultsCSV = () => {
    if (results.length === 0) return;

    const headers = ['Student Name', 'DOB', 'Registration No', 'Course', 'Accuracy', 'Marks', 'Status', 'Achievement'];
    const rows = results.map(r => [
      `"${r.name}"`,
      `"${r.dob || '15/07/1996'}"`,
      `"${r.registrationNo}"`,
      `"${r.course}"`,
      `"${r.accuracy || '95%'}"`,
      `"${r.marks || '94/100'}"`,
      `"${r.status}"`,
      `"${(r.achievement || 'Cleared Examination').replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `student_results_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Header Card */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3.5">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
              <Award className="w-6 h-6 text-blue-600" />
              <span>Student Results Management</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Upload Marksheet PDF, CSV, or enter details with smart auto-fill.
            </p>
          </div>

          {/* Typing Results Upload Button right beside title */}
          <button
            type="button"
            onClick={() => {
              setTypingAutoFillMsg(null);
              setShowTypingModal(true);
            }}
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md flex items-center gap-2 transition-all hover:scale-105 border border-emerald-500 shrink-0"
          >
            <Keyboard className="w-4 h-4 text-emerald-100" />
            <span>Upload Typing Result</span>
          </button>
        </div>
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Smart PDF / CSV Bulk Importer */}
          <button
            onClick={() => {
              setBulkParsedResults([]);
              setBulkError(null);
              setBulkFileName('');
              setShowBulkModal(true);
            }}
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-md flex items-center gap-2 transition-all hover:scale-105"
          >
            <Upload className="w-4 h-4" /> 
            <span>Bulk Import (PDF / CSV)</span>
          </button>

          {/* Export CSV */}
          <button
            onClick={handleExportResultsCSV}
            disabled={results.length === 0}
            className="bg-slate-100 hover:bg-slate-200 disabled:opacity-50 text-slate-800 text-xs font-bold px-4 py-3 rounded-xl flex items-center gap-2 transition-all border border-slate-200"
          >
            <Download className="w-4 h-4 text-slate-600" /> 
            <span>Export CSV</span>
          </button>

          {/* Add Single Result with PDF Auto-Fill */}
          <button
            onClick={() => {
              setSingleAutoFillMsg(null);
              setShowAddModal(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-md flex items-center gap-2 transition-all hover:scale-105"
          >
            <Plus className="w-4 h-4" /> 
            <span>Add Single Result (with PDF Auto-Fill)</span>
          </button>
        </div>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>{notification}</span>
        </div>
      )}

      {/* Search Bar */}
      <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by student name, reg no, DOB, course..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-2.5 text-xs focus:outline-none focus:border-blue-600"
          />
        </div>
        <div className="text-xs font-bold text-slate-500">
          Total Results Published: <span className="text-blue-600 font-extrabold">{filtered.length}</span>
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase font-extrabold text-slate-500 tracking-wider">
                <th className="py-4 px-6">Student Name</th>
                <th className="py-4 px-6">DOB</th>
                <th className="py-4 px-6">Course</th>
                <th className="py-4 px-6">Accuracy</th>
                <th className="py-4 px-6">Obtained Marks</th>
                <th className="py-4 px-6">Reg. Number</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filtered.map((res) => (
                <tr key={res.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-6">
                    <div className="font-bold text-slate-900">{res.name}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{res.achievement || 'Cleared Examination'}</div>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <div className="text-xs font-semibold text-blue-700 font-mono bg-blue-50 border border-blue-100 px-2.5 py-1.5 rounded-lg inline-flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-blue-500" />
                      <span>{res.dob || '15/07/1996'}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-slate-700 font-medium">{res.course}</td>
                  <td className="py-4 px-6">
                    <span className="font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-lg">
                      {res.accuracy || '95.0%'}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-xs font-bold text-purple-700 bg-purple-50 border border-purple-100 px-2.5 py-1 rounded-lg inline-flex items-center gap-1.5 font-mono">
                      <span>{(res.marks || '403').replace(/\/100$/, '')}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 font-mono text-xs font-bold text-slate-600">{res.registrationNo}</td>
                  <td className="py-4 px-6">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                      {res.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right whitespace-nowrap">
                    {deletingId === res.id ? (
                      <div className="flex items-center gap-1.5 justify-end animate-in fade-in">
                        <span className="text-[11px] font-bold text-red-600">Delete?</span>
                        <button
                          type="button"
                          onClick={() => executeDelete(res.id, res.name)}
                          className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-2.5 py-1.5 rounded-lg shadow-sm transition-all"
                        >
                          Yes
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeletingId(null)}
                          className="bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold px-2.5 py-1.5 rounded-lg transition-all"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-end gap-1.5">
                        {/* View Card */}
                        <button
                          type="button"
                          onClick={() => setSelectedResultForView(res)}
                          className="bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                          title="View Scorecard"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View</span>
                        </button>

                        {/* Edit Result */}
                        <button
                          type="button"
                          onClick={() => setEditingResult({ ...res })}
                          className="bg-amber-50 hover:bg-amber-100 text-amber-700 text-xs font-bold px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                          title="Edit Details"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>

                        {/* Delete Result */}
                        <button
                          type="button"
                          onClick={() => setDeletingId(res.id)}
                          className="bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                          title="Delete Record"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-slate-400 text-xs">
            No published results found matching your search query.
          </div>
        )}
      </div>

      {/* MODAL 1: ADD SINGLE RESULT (WITH PDF AUTO-FILL ZONE) */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl space-y-5 max-h-[92vh] overflow-y-auto border border-slate-200">
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  <Plus className="w-5 h-5 text-blue-600" />
                  <span>Add Student Result</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Upload a Marksheet PDF to auto-fill or enter information directly.
                </p>
              </div>
              <button onClick={() => setShowAddModal(false)} className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* ✨ PDF / Marksheet Upload & Auto-Fill Zone */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50/70 p-5 rounded-2xl border-2 border-dashed border-blue-300 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-sm">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-blue-950">
                      📄 Upload PDF / Marksheet Document for Auto-Fill
                    </h4>
                    <p className="text-[11px] text-blue-800">
                      Automatically extracts Student Name, DOB, Registration No, Course & Marks!
                    </p>
                  </div>
                </div>

                <label className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-md cursor-pointer transition-all shrink-0 flex items-center gap-1.5">
                  <FileUp className="w-3.5 h-3.5" />
                  <span>{isParsingSinglePDF ? 'Reading PDF...' : 'Choose PDF'}</span>
                  <input
                    ref={singleFileInputRef}
                    type="file"
                    accept=".pdf,.txt,.csv,.doc,.docx"
                    onChange={handleSinglePDFUpload}
                    disabled={isParsingSinglePDF}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Status banner */}
              {singleAutoFillMsg && (
                <div className="bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-semibold p-3 rounded-xl flex items-start gap-2 animate-in fade-in">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{singleAutoFillMsg}</span>
                </div>
              )}
            </div>

            {/* Manual Edit / Review Form */}
            <form onSubmit={handleAddResult} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Student Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="JITENDRA KUMAR"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-600 font-bold uppercase"
                />
              </div>

              {/* DOB & Reg No */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Date of Birth (DOB) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="DD/MM/YYYY e.g. 15/07/1996"
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-600 font-mono font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Registration No *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="M171823101141925"
                    value={formData.registrationNo}
                    onChange={(e) => setFormData({ ...formData, registrationNo: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-600 font-mono font-bold"
                  />
                </div>
              </div>

              {/* Course */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Course / Exam
                </label>
                <select
                  value={formData.course}
                  onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-600 font-medium"
                >
                  <option value="English Typing">English Typing</option>
                  <option value="Hindi Typing">Hindi Typing</option>
                  <option value="Typing (Hindi & English)">Typing (Hindi & English)</option>
                  <option value="Shorthand">Shorthand</option>
                  <option value="ADCA">ADCA</option>
                  <option value="DCA">DCA</option>
                  <option value="CCC">CCC</option>
                </select>
              </div>

              {/* Accuracy & Obtained Marks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Accuracy / Percentage (%)
                  </label>
                  <input
                    type="text"
                    placeholder="95.0%"
                    value={formData.accuracy}
                    onChange={(e) => setFormData({ ...formData, accuracy: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-600 font-bold text-emerald-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Obtained Marks
                  </label>
                  <input
                    type="text"
                    placeholder="403"
                    value={formData.marks}
                    onChange={(e) => setFormData({ ...formData, marks: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-600 font-semibold text-slate-800"
                  />
                </div>
              </div>

              {/* Status / Result */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Status / Result
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-600 font-semibold text-slate-800"
                >
                  <option value="Passed">Passed</option>
                  <option value="Distinction">Distinction</option>
                  <option value="Certified">Certified</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              {/* Actions */}
              <div className="pt-2 flex justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-5 py-2.5 rounded-xl text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs shadow-md flex items-center gap-1.5 transition-all"
                >
                  <Check className="w-4 h-4" /> 
                  <span>Publish Result</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: TYPING RESULTS UPLOADING PDF AUTO-FILL (MATCHING USER SCREENSHOT) */}
      {showTypingModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 my-8 border border-slate-200">
            {/* Header */}
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                Add Student Result
              </h3>
              <button
                type="button"
                onClick={() => setShowTypingModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Smart PDF / Document Auto-Fill Banner */}
            <div className="bg-emerald-50/90 border border-emerald-200 p-4 rounded-2xl space-y-2">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <FileUp className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wider">
                      Upload Typing PDF or Document to Auto-Fill
                    </h4>
                    <p className="text-[11px] text-emerald-700">
                      Auto-extracts Name, DOB, Reg No, Speed English & Hindi Speed from PDF, Word (.docx, .doc), or Text.
                    </p>
                  </div>
                </div>
                <input
                  type="file"
                  ref={typingFileInputRef}
                  onChange={handleTypingPDFUpload}
                  accept=".pdf,.doc,.docx,.txt,.csv,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
                  className="hidden"
                  id="typing-result-pdf-input"
                />
                <label
                  htmlFor="typing-result-pdf-input"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-sm cursor-pointer transition-all flex items-center gap-1.5 shrink-0"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>{isParsingTypingPDF ? 'Extracting...' : 'Upload PDF / Doc'}</span>
                </label>
              </div>

              {typingAutoFillMsg && (
                <div className="text-[11px] font-bold text-emerald-900 bg-white/90 p-2.5 rounded-xl border border-emerald-200 flex items-center gap-1.5 animate-in fade-in">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{typingAutoFillMsg}</span>
                </div>
              )}
            </div>

            {/* Form matching user screenshot exactly */}
            <form onSubmit={handlePublishTypingResult} className="space-y-4">
              {/* STUDENT NAME */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  STUDENT NAME *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Rahul Kumar"
                  value={typingFormData.name}
                  onChange={(e) => setTypingFormData({ ...typingFormData, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-600 font-medium text-slate-900"
                />
              </div>

              {/* DATE OF BIRTH (DOB) & REGISTRATION NO */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    DATE OF BIRTH (DOB) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="12/05/2005"
                    value={typingFormData.dob}
                    onChange={(e) => setTypingFormData({ ...typingFormData, dob: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-600 font-mono text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    REGISTRATION NO *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="REG884950"
                    value={typingFormData.registrationNo}
                    onChange={(e) => setTypingFormData({ ...typingFormData, registrationNo: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-600 font-mono font-bold text-slate-800"
                  />
                </div>
              </div>

              {/* COURSE */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  COURSE
                </label>
                <select
                  value={typingFormData.course}
                  onChange={(e) => setTypingFormData({ ...typingFormData, course: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-600 font-medium text-slate-800"
                >
                  <option value="English Typing">English Typing</option>
                  <option value="Hindi Typing">Hindi Typing</option>
                  <option value="Typing (Hindi & English)">Typing (Hindi & English)</option>
                  <option value="Shorthand">Shorthand</option>
                  <option value="ADCA">ADCA</option>
                  <option value="DCA">DCA</option>
                  <option value="CCC">CCC</option>
                </select>
              </div>

              {/* SPEED ENGLISH & HINDI SPEED */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    SPEED ENGLISH
                  </label>
                  <input
                    type="text"
                    placeholder="45 WPM"
                    value={typingFormData.englishSpeed}
                    onChange={(e) => setTypingFormData({ ...typingFormData, englishSpeed: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-600 font-bold text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    HINDI SPEED
                  </label>
                  <input
                    type="text"
                    placeholder="35 WPM"
                    value={typingFormData.hindiSpeed}
                    onChange={(e) => setTypingFormData({ ...typingFormData, hindiSpeed: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-600 font-bold text-slate-800"
                  />
                </div>
              </div>

              {/* Buttons matching screenshot */}
              <div className="pt-4 flex justify-end items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowTypingModal(false)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-6 py-3 rounded-xl text-sm transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-7 py-3 rounded-xl text-sm shadow-md transition-all flex items-center gap-1.5"
                >
                  <span>Publish Result</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showBulkModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-5 max-h-[90vh] flex flex-col border border-slate-200">
            {/* Header */}
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Upload className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900">
                    Bulk Import Results (PDF & CSV)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Upload a Marksheet PDF or CSV file to extract multiple student records automatically.
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowBulkModal(false);
                  setBulkParsedResults([]);
                  setBulkError(null);
                }}
                className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="space-y-4 flex-1 overflow-y-auto pr-1">
              {/* Upload Drop Zone */}
              <div className="border-2 border-dashed border-emerald-300 bg-emerald-50/50 p-6 rounded-2xl text-center space-y-3">
                <div className="w-12 h-12 bg-white rounded-2xl border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                  {isParsingBulk ? (
                    <RefreshCw className="w-6 h-6 animate-spin text-emerald-600" />
                  ) : (
                    <FileText className="w-6 h-6 text-emerald-600" />
                  )}
                </div>

                <div>
                  <h4 className="font-extrabold text-sm text-slate-800">
                    Choose or Drop Marksheet PDF or CSV File
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Supports <strong>.PDF</strong>, <strong>.CSV</strong>, or <strong>.TXT</strong> files
                  </p>
                </div>

                <label className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md cursor-pointer transition-all">
                  <Upload className="w-4 h-4" />
                  <span>Select Results File</span>
                  <input
                    ref={bulkFileInputRef}
                    type="file"
                    accept=".pdf,.csv,.txt"
                    onChange={handleBulkFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Error Box */}
              {bulkError && (
                <div className="bg-red-50 border border-red-200 text-red-800 p-3 rounded-xl text-xs font-bold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{bulkError}</span>
                </div>
              )}

              {/* Parsed Preview Table */}
              {bulkParsedResults.length > 0 && (
                <div className="space-y-3 animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-extrabold text-slate-900">Extracted Results Preview:</span>
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                        {bulkParsedResults.length} Records Found
                      </span>
                    </div>

                    {/* Mode toggle */}
                    <div className="flex items-center gap-2 text-xs">
                      <label className="flex items-center gap-1 cursor-pointer font-bold text-slate-600">
                        <input
                          type="radio"
                          name="importMode"
                          checked={bulkImportMode === 'append'}
                          onChange={() => setBulkImportMode('append')}
                          className="text-emerald-600"
                        />
                        <span>Append to existing</span>
                      </label>
                      <label className="flex items-center gap-1 cursor-pointer font-bold text-slate-600">
                        <input
                          type="radio"
                          name="importMode"
                          checked={bulkImportMode === 'replace'}
                          onChange={() => setBulkImportMode('replace')}
                          className="text-emerald-600"
                        />
                        <span>Replace all</span>
                      </label>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden max-h-56 overflow-y-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead className="bg-slate-100 sticky top-0">
                        <tr className="border-b border-slate-200 font-bold text-slate-600 uppercase text-[10px]">
                          <th className="p-2.5">Name</th>
                          <th className="p-2.5">DOB</th>
                          <th className="p-2.5">Course</th>
                          <th className="p-2.5">Accuracy</th>
                          <th className="p-2.5">Obtained Marks</th>
                          <th className="p-2.5">Reg. No</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {bulkParsedResults.map((r, idx) => (
                          <tr key={idx} className="hover:bg-white">
                            <td className="p-2.5 font-bold text-slate-900">{r.name}</td>
                            <td className="p-2.5 font-mono text-slate-600">{r.dob}</td>
                            <td className="p-2.5 text-slate-600">{r.course}</td>
                            <td className="p-2.5 font-mono text-emerald-600">{r.accuracy}</td>
                            <td className="p-2.5 font-bold text-slate-700">{(r.marks || '403').replace(/\/100$/, '')}</td>
                            <td className="p-2.5 font-mono text-slate-600">{r.registrationNo}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                {bulkParsedResults.length > 0 ? `${bulkParsedResults.length} records ready to import` : 'Select a file to parse records'}
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowBulkModal(false)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-4 py-2 rounded-xl text-xs"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={bulkParsedResults.length === 0}
                  onClick={handleConfirmBulkImport}
                  className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white font-bold px-5 py-2 rounded-xl text-xs shadow-md flex items-center gap-1.5 transition-all"
                >
                  <Check className="w-4 h-4" />
                  <span>Import {bulkParsedResults.length > 0 ? `(${bulkParsedResults.length})` : ''} Results</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Result Modal */}
      {editingResult && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 my-8">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-amber-600" />
                <span>Edit Student Result</span>
              </h3>
              <button
                type="button"
                onClick={() => setEditingResult(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const updated = results.map(r => r.id === editingResult.id ? editingResult : r);
                onUpdateResults(updated);
                onLogAction('Result Updated', `Updated result for ${editingResult.name}`);
                showNotify(`Result for ${editingResult.name} updated successfully!`);
                setEditingResult(null);
              }}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">Student Name *</label>
                <input
                  type="text"
                  required
                  value={editingResult.name}
                  onChange={(e) => setEditingResult({ ...editingResult, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold uppercase focus:outline-none focus:border-amber-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">DOB *</label>
                  <input
                    type="text"
                    required
                    placeholder="DD/MM/YYYY"
                    value={editingResult.dob || ''}
                    onChange={(e) => setEditingResult({ ...editingResult, dob: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-mono focus:outline-none focus:border-amber-600"
                  />
                </div>
                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">Registration No *</label>
                  <input
                    type="text"
                    required
                    value={editingResult.registrationNo}
                    onChange={(e) => setEditingResult({ ...editingResult, registrationNo: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-mono font-bold focus:outline-none focus:border-amber-600"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">Course / Exam</label>
                <input
                  type="text"
                  required
                  value={editingResult.course}
                  onChange={(e) => setEditingResult({ ...editingResult, course: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-600 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">Accuracy / Percentage (%)</label>
                  <input
                    type="text"
                    value={editingResult.accuracy}
                    onChange={(e) => setEditingResult({ ...editingResult, accuracy: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-mono text-emerald-700 font-bold focus:outline-none focus:border-amber-600"
                  />
                </div>
                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">Obtained Marks</label>
                  <input
                    type="text"
                    placeholder="403"
                    value={editingResult.marks}
                    onChange={(e) => setEditingResult({ ...editingResult, marks: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-mono text-purple-700 font-bold focus:outline-none focus:border-amber-600"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">Status / Result</label>
                <select
                  value={editingResult.status}
                  onChange={(e) => setEditingResult({ ...editingResult, status: e.target.value as any })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold focus:outline-none focus:border-amber-600"
                >
                  <option value="Passed">Passed</option>
                  <option value="Distinction">Distinction</option>
                  <option value="Certified">Certified</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingResult(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold shadow-md text-xs transition-all"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Result Modal from Admin - Shows Original PDF / Document Format & Direct Download */}
      {selectedResultForView && (
        <AdminDocumentViewer
          result={selectedResultForView}
          onClose={() => setSelectedResultForView(null)}
          onUpdateResult={(updated) => {
            const updatedList = results.map(r => r.id === updated.id ? updated : r);
            onUpdateResults(updatedList);
            setSelectedResultForView(updated);
          }}
        />
      )}
    </div>
  );
};
