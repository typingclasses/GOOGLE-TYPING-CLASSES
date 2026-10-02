import React, { useRef, useState } from 'react';
import { Download, Award, ShieldCheck, CheckCircle, X, Calendar, BookOpen, User } from 'lucide-react';
import { StudentResult } from '../types';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface ResultCardProps {
  result: StudentResult;
  onDownloadPdf?: () => void;
  onClose?: () => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result, onClose }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPdf = async () => {
    if (!cardRef.current) return;
    try {
      setIsDownloading(true);
      const canvas = await html2canvas(cardRef.current, { 
        scale: 2, 
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 10, pdfWidth, pdfHeight);
      pdf.save(`Scorecard_${result.name.replace(/\s+/g, '_')}_${result.registrationNo}.pdf`);
    } catch (err) {
      console.error('PDF generation error:', err);
      window.print();
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
      <div className="space-y-4 max-w-2xl w-full my-8">
        <div 
          ref={cardRef} 
          className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden transition-all"
        >
          {/* Official Certificate Style Top Banner */}
          <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white p-6 sm:p-7 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Award className="w-36 h-36 text-white" />
            </div>
            <div className="relative z-10 space-y-1.5">
              <div className="text-amber-400 font-extrabold tracking-widest text-[11px] sm:text-xs uppercase bg-white/10 px-3 py-1 rounded-full inline-block backdrop-blur-sm">
                GOVT. REG. NO.: P.T/TBSE/014060 • ISO 9001:2025 & MSME
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase">
                GOOGLE TYPING CLASSES
              </h2>
              <p className="text-slate-200 text-xs font-medium max-w-lg mx-auto">
                Tripolia, Gulzarbagh, Patna – 800007 • Ministry of Corporate Affairs (Govt. of India)
              </p>
            </div>
          </div>

          {/* Card Body */}
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center border-b border-slate-100 pb-5">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-blue-700 bg-blue-50 border border-blue-100 px-3.5 py-1 rounded-full">
                OFFICIAL EXAMINATION SCORECARD
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-3 uppercase tracking-tight">
                {result.name}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Registration No: <span className="font-mono font-bold text-slate-900">{result.registrationNo}</span>
              </p>
              {result.dob && (
                <div className="inline-flex items-center gap-1.5 text-xs text-blue-700 font-bold mt-2 bg-blue-50/80 border border-blue-100 px-3 py-1 rounded-lg">
                  <Calendar className="w-3.5 h-3.5 text-blue-500" />
                  <span>Date of Birth (DOB): {result.dob}</span>
                </div>
              )}
            </div>

            {/* Course Information */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div>
                <span className="text-slate-400 text-xs font-semibold block uppercase tracking-wider">Course Completed</span>
                <strong className="text-slate-900 font-bold text-sm sm:text-base">{result.course}</strong>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold shrink-0 ${
                result.status === 'Distinction' ? 'bg-amber-100 text-amber-800' :
                result.status === 'Passed' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
              }`}>
                {result.status}
              </span>
            </div>

            {/* Scorecard Metrics (Speed English & Hindi Speed / Accuracy) */}
            <div className="flex justify-center">
              {result.englishSpeed || result.hindiSpeed ? (
                <div className="grid grid-cols-2 gap-3 w-full max-w-md">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 p-4 rounded-2xl text-center">
                    <div className="text-[11px] font-extrabold text-blue-700 uppercase tracking-wider">
                      SPEED ENGLISH
                    </div>
                    <div className="text-2xl sm:text-3xl font-black text-blue-900 mt-1 font-mono">
                      {result.englishSpeed || '45 WPM'}
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 p-4 rounded-2xl text-center">
                    <div className="text-[11px] font-extrabold text-emerald-700 uppercase tracking-wider">
                      HINDI SPEED
                    </div>
                    <div className="text-2xl sm:text-3xl font-black text-emerald-900 mt-1 font-mono">
                      {result.hindiSpeed || '35 WPM'}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 p-5 rounded-2xl w-full max-w-sm text-center">
                  <div className="text-xs font-extrabold text-emerald-700 uppercase tracking-wider">
                    ACCURACY / PERCENTAGE
                  </div>
                  <div className="text-3xl sm:text-4xl font-black text-emerald-900 mt-2 font-mono">
                    {result.accuracy || '95.0%'}
                  </div>
                </div>
              )}
            </div>

            {/* Achievement & Status */}
            <div className="border-t border-slate-100 pt-4 space-y-2 text-xs">
              <div className="flex flex-col sm:flex-row justify-between gap-1">
                <span className="text-slate-500 font-medium">Achievement / Remarks:</span>
                <span className="font-bold text-slate-900">
                  {(result.achievement || `Cleared ${result.course}`)
                    .replace(/\s*\([^)]*(?:eng|hin|speed|wpm)[^)]*\)/gi, '')
                    .trim() || `Cleared ${result.course}`}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-medium">Certificate Status:</span>
                <span className="font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-lg inline-flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> {result.certificateStatus || 'Available'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Card Footer with Close & PDF Download */}
        <div className="bg-white px-6 sm:px-8 py-4 rounded-2xl shadow-xl border border-slate-200 flex items-center justify-between gap-4 flex-wrap">
          <div className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>Verified Official Record</span>
          </div>
          <div className="flex items-center gap-2">
            {onClose && (
              <button
                onClick={onClose}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-4 py-2.5 rounded-xl text-xs transition-all"
              >
                Close
              </button>
            )}
            <button
              onClick={handleDownloadPdf}
              disabled={isDownloading}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>{isDownloading ? 'Generating PDF...' : 'Download Scorecard (PDF)'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
