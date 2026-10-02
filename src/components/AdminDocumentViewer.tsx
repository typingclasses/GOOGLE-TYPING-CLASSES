import React, { useEffect, useRef, useState } from 'react';
import { Download, Printer, X, FileText, Upload, ExternalLink, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { StudentResult } from '../types';
import jsPDF from 'jspdf';

interface AdminDocumentViewerProps {
  result: StudentResult;
  onClose: () => void;
  onUpdateResult?: (updated: StudentResult) => void;
}

// Convert Data URL to Blob for reliable iframe & download support
const dataUrlToBlob = (dataUrl: string): Blob => {
  const parts = dataUrl.split(',');
  const mime = parts[0].match(/:(.*?);/)?.[1] || 'application/pdf';
  const byteString = atob(parts[1]);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mime });
};

// Generate an official institutional PDF blob if no file was uploaded
const generateDefaultResultPDF = (res: StudentResult): string => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  // Border & Header
  doc.setDrawColor(30, 58, 138); // blue-900
  doc.setLineWidth(1.5);
  doc.rect(8, 8, 194, 281);

  doc.setLineWidth(0.5);
  doc.rect(10, 10, 190, 277);

  // Institution Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text('GOVT. REGD. NO.: P.T/TBSE/014060  |  ISO 9001:2025 CERTIFIED  |  MSME UDYAM: UDYAM-BR-26-004921', 105, 18, { align: 'center' });

  doc.setFontSize(20);
  doc.setTextColor(15, 23, 42);
  doc.text('GOOGLE TYPING & COMPUTER CLASSES', 105, 28, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(71, 85, 105);
  doc.text('Tripolia, Main Road, Gulzarbagh, Patna – 800007 (Bihar)', 105, 34, { align: 'center' });

  // Banner
  doc.setFillColor(30, 58, 138);
  doc.roundedRect(45, 40, 120, 9, 2, 2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(255, 255, 255);
  doc.text('OFFICIAL EXAMINATION RESULT DOCUMENT', 105, 46, { align: 'center' });

  // Metadata Table
  doc.setFillColor(248, 250, 252);
  doc.rect(15, 54, 180, 22, 'F');
  doc.setDrawColor(203, 213, 225);
  doc.rect(15, 54, 180, 22);

  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text('REGISTRATION NO:', 18, 62);
  doc.text('DATE OF BIRTH:', 18, 70);
  doc.text('EXAM SESSION:', 115, 62);
  doc.text('ISSUE DATE:', 115, 70);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text(res.registrationNo || 'REG884950', 60, 62);
  doc.text(res.dob || '15/07/1996', 60, 70);
  doc.text('2025 - 2026', 150, 62);
  doc.text(res.testDate || 'Today', 150, 70);

  // Candidate Details
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(30, 58, 138);
  doc.text('CANDIDATE PARTICULARS', 15, 86);
  doc.setDrawColor(30, 58, 138);
  doc.setLineWidth(0.8);
  doc.line(15, 88, 195, 88);

  doc.setFontSize(10);
  doc.setTextColor(71, 85, 105);
  doc.text('Candidate Name:', 18, 96);
  doc.text('Course Enrolled:', 18, 104);
  doc.text('Examination Status:', 18, 112);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text(res.name.toUpperCase(), 65, 96);
  doc.text(res.course, 65, 104);
  doc.text(res.status || 'Passed', 65, 112);

  // Speed & Performance Table
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(30, 58, 138);
  doc.text('SPEED & SKILL ASSESSMENT RECORD', 15, 126);
  doc.line(15, 128, 195, 128);

  // Table Header
  doc.setFillColor(30, 58, 138);
  doc.rect(15, 133, 180, 8, 'F');
  doc.setFontSize(9);
  doc.setTextColor(255, 255, 255);
  doc.text('TEST MODULE', 20, 138.5);
  doc.text('SPEED OBTAINED', 85, 138.5);
  doc.text('ACCURACY', 135, 138.5);
  doc.text('RESULT', 170, 138.5);

  // Rows
  let curY = 141;
  const drawRow = (title: string, speedVal: string, accVal: string, statusVal: string, isBg: boolean) => {
    if (isBg) {
      doc.setFillColor(248, 250, 252);
      doc.rect(15, curY, 180, 9, 'F');
    }
    doc.setDrawColor(226, 232, 240);
    doc.rect(15, curY, 180, 9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text(title, 20, curY + 6);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 58, 138);
    doc.text(speedVal, 85, curY + 6);
    doc.setTextColor(16, 185, 129);
    doc.text(accVal, 135, curY + 6);
    doc.setTextColor(15, 23, 42);
    doc.text(statusVal, 170, curY + 6);
    curY += 9;
  };

  drawRow('Speed English', res.englishSpeed || '45 WPM', res.accuracy || '98.0%', 'Qualified', false);
  drawRow('Hindi Speed', res.hindiSpeed || '35 WPM', res.accuracy || '97.5%', 'Qualified', true);
  if (res.marks) {
    drawRow('Theory / Obtained Marks', `${res.marks} Marks`, res.accuracy || '95.0%', 'Passed', false);
  }

  // Remarks
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(71, 85, 105);
  doc.text('Remarks / Achievement:', 18, curY + 12);
  doc.setTextColor(15, 23, 42);
  doc.text(`Cleared ${res.course}`, 75, curY + 12);

  // Institutional Signatures & Verification
  doc.setDrawColor(203, 213, 225);
  doc.line(15, 230, 195, 230);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text('OFFICIAL SEAL & STAMP', 50, 260, { align: 'center' });
  doc.text('DIRECTOR / CONTROLLER', 155, 260, { align: 'center' });

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(12);
  doc.setTextColor(30, 58, 138);
  doc.text('Authorized Signatory', 155, 252, { align: 'center' });

  // Stamp circle
  doc.setDrawColor(220, 38, 38);
  doc.setLineWidth(0.8);
  doc.circle(50, 248, 12);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6);
  doc.setTextColor(220, 38, 38);
  doc.text('GOOGLE TYPING', 50, 246, { align: 'center' });
  doc.text('★ PATNA ★', 50, 249, { align: 'center' });
  doc.text('VERIFIED', 50, 252, { align: 'center' });

  // Bottom Notice
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  doc.text('Certified Document issued by Google Typing Classes Patna. Computer Generated Record.', 105, 276, { align: 'center' });

  return doc.output('datauristring');
};

export const AdminDocumentViewer: React.FC<AdminDocumentViewerProps> = ({
  result,
  onClose,
  onUpdateResult
}) => {
  const [docUrl, setDocUrl] = useState<string | null>(null);
  const [docName, setDocName] = useState<string>(
    result.documentName || `Result_${result.name.replace(/\s+/g, '_')}_${result.registrationNo}.pdf`
  );
  const [docType, setDocType] = useState<string>(result.documentType || 'pdf');
  const [isUploading, setIsUploading] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize active document URL (either uploaded original, or auto-generated standard PDF)
  useEffect(() => {
    let activeBlobUrl: string | null = null;

    if (result.documentUrl) {
      if (result.documentUrl.startsWith('data:')) {
        try {
          const blob = dataUrlToBlob(result.documentUrl);
          activeBlobUrl = URL.createObjectURL(blob);
          setDocUrl(activeBlobUrl);
        } catch (e) {
          setDocUrl(result.documentUrl);
        }
      } else {
        setDocUrl(result.documentUrl);
      }
      setDocName(result.documentName || `${result.name.replace(/\s+/g, '_')}_Document.pdf`);
      setDocType(result.documentType || 'pdf');
    } else {
      // Fallback: Generate real PDF so Admin can always view and download a real PDF
      const generated = generateDefaultResultPDF(result);
      try {
        const blob = dataUrlToBlob(generated);
        activeBlobUrl = URL.createObjectURL(blob);
        setDocUrl(activeBlobUrl);
      } catch (e) {
        setDocUrl(generated);
      }
      setDocName(`Official_Result_${result.name.replace(/\s+/g, '_')}_${result.registrationNo}.pdf`);
      setDocType('pdf');
    }

    return () => {
      if (activeBlobUrl && activeBlobUrl.startsWith('blob:')) {
        URL.revokeObjectURL(activeBlobUrl);
      }
    };
  }, [result]);

  // Handle uploading / replacing the original PDF or document directly in the viewer
  const handleUploadOriginalFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onload = () => {
        const dataUri = reader.result as string;
        const fileType = file.name.endsWith('.pdf') ? 'pdf' : (file.name.endsWith('.docx') || file.name.endsWith('.doc')) ? 'docx' : 'document';
        
        try {
          const blob = dataUrlToBlob(dataUri);
          const blobUrl = URL.createObjectURL(blob);
          setDocUrl(blobUrl);
        } catch (e) {
          setDocUrl(dataUri);
        }

        setDocName(file.name);
        setDocType(fileType);

        // Update result object permanently
        if (onUpdateResult) {
          const updated: StudentResult = {
            ...result,
            documentUrl: dataUri,
            documentName: file.name,
            documentType: fileType as any
          };
          onUpdateResult(updated);
        }

        setNotification(`✓ Uploaded "${file.name}" successfully!`);
        setTimeout(() => setNotification(null), 4000);
      };
      reader.readAsDataURL(file);
    } catch (err: any) {
      setNotification(`⚠️ Upload error: ${err.message || 'Failed to upload'}`);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // Direct File Download
  const handleDownload = () => {
    if (!docUrl) return;
    const a = document.createElement('a');
    a.href = docUrl;
    a.download = docName || `Document_${result.registrationNo}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Open in New Tab
  const handleOpenInNewTab = () => {
    if (!docUrl) return;
    window.open(docUrl, '_blank');
  };

  // Print
  const handlePrint = () => {
    const iframe = document.getElementById('admin-pdf-iframe') as HTMLIFrameElement;
    if (iframe && iframe.contentWindow) {
      try {
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
        return;
      } catch (e) {
        // Fallback
      }
    }
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex flex-col p-2 sm:p-4 overflow-hidden animate-in fade-in">
      {/* Top Header Bar */}
      <div className="w-full max-w-6xl mx-auto bg-slate-900 text-white px-4 sm:px-6 py-3 rounded-2xl shadow-2xl border border-slate-800 flex items-center justify-between gap-3 flex-wrap mb-2.5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-blue-400 shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-blue-400">
                Original PDF / Document Viewer
              </span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-mono px-2 py-0.5 rounded-full border border-emerald-500/30">
                {result.documentUrl ? 'Uploaded File' : 'Original Format'}
              </span>
            </div>
            <div className="text-sm font-bold text-slate-100 flex items-center gap-2 truncate max-w-sm sm:max-w-md">
              <span className="text-white uppercase">{result.name}</span>
              <span className="text-slate-400 font-mono text-xs">({result.registrationNo})</span>
              <span className="text-slate-500 text-xs hidden sm:inline">• {docName}</span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Hidden File Input for uploading / replacing document */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleUploadOriginalFile}
            accept=".pdf,.doc,.docx,.txt,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="hidden"
            id="admin-replace-doc-input"
          />

          <label
            htmlFor="admin-replace-doc-input"
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold px-3 py-2 rounded-xl transition-all border border-slate-700 cursor-pointer flex items-center gap-1.5 shadow-sm"
            title="Upload or Replace original PDF file"
          >
            <Upload className="w-3.5 h-3.5 text-blue-400" />
            <span>{isUploading ? 'Uploading...' : 'Upload Original File'}</span>
          </label>

          <button
            type="button"
            onClick={handleDownload}
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-md flex items-center gap-1.5"
            title="Download Original PDF / Document"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download</span>
          </button>

          <button
            type="button"
            onClick={handleOpenInNewTab}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold px-3 py-2 rounded-xl transition-all border border-slate-700 hidden sm:flex items-center gap-1.5"
            title="Open in New Tab"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold px-3 py-2 rounded-xl transition-all border border-slate-700 flex items-center gap-1.5"
            title="Print"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Print</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="bg-slate-800 hover:bg-red-900/60 hover:text-red-300 text-slate-400 p-2 rounded-xl transition-all border border-slate-700"
            title="Close Viewer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {notification && (
        <div className="w-full max-w-6xl mx-auto mb-2 text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-4 py-2 rounded-xl flex items-center gap-2 animate-in fade-in">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{notification}</span>
        </div>
      )}

      {/* Main Full-Size PDF / Document Viewer Frame */}
      <div className="flex-1 w-full max-w-6xl mx-auto bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 overflow-hidden flex flex-col relative">
        {docUrl ? (
          docType === 'docx' || docType === 'doc' ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4 bg-slate-900 text-white">
              <div className="w-20 h-20 bg-blue-600/20 text-blue-400 border border-blue-500/30 rounded-3xl flex items-center justify-center mx-auto">
                <FileText className="w-10 h-10" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xl font-bold text-slate-100">{docName}</h4>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Original Microsoft Word Document (.docx / .doc) uploaded by Admin for candidate {result.name}.
                </p>
              </div>
              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleDownload}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-xl text-sm flex items-center gap-2 shadow-lg"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Original Document ({docName})</span>
                </button>
              </div>
            </div>
          ) : (
            <iframe
              id="admin-pdf-iframe"
              src={docUrl}
              title={`Original Document - ${result.name}`}
              className="w-full h-full flex-1 border-0 bg-slate-950"
            />
          )
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4 text-slate-300">
            <AlertCircle className="w-12 h-12 text-amber-400 mx-auto" />
            <p className="text-sm font-semibold">Document loading...</p>
          </div>
        )}
      </div>
    </div>
  );
};
