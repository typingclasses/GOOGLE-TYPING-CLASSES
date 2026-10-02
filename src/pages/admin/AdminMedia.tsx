import React, { useState } from 'react';
import { Image as ImageIcon, Plus, Trash2, X, Upload, Copy, Check, FileText } from 'lucide-react';
import { MediaItem } from '../../types';

interface AdminMediaProps {
  media: MediaItem[];
  onUpdateMedia: (newMedia: MediaItem[]) => void;
  onLogAction: (action: string, details: string) => void;
}

export const AdminMedia: React.FC<AdminMediaProps> = ({ media, onUpdateMedia, onLogAction }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileName, setFileName] = useState('');
  const [fileType, setFileType] = useState<'image' | 'pdf' | 'logo'>('image');
  const [selectedFileUrl, setSelectedFileUrl] = useState<string>('');
  const [fileSize, setFileSize] = useState<string>('1.2 MB');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setFileSize(`${(file.size / (1024 * 1024)).toFixed(1)} MB`);
      if (file.type.includes('pdf')) {
        setFileType('pdf');
      } else {
        setFileType('image');
      }

      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          setSelectedFileUrl(uploadEvent.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileName.trim()) return;

    const url = selectedFileUrl || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80';
    
    const newItem: MediaItem = {
      id: `MEDIA-${Date.now()}`,
      name: fileName.trim(),
      type: fileType,
      url,
      size: fileSize,
      uploadDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    };

    onUpdateMedia([newItem, ...media]);
    onLogAction('Media Uploaded', `Uploaded file ${newItem.name}`);
    
    setFileName('');
    setSelectedFileUrl('');
    setIsModalOpen(false);
  };

  const deleteMedia = (id: string, name: string) => {
    if (confirm(`Delete file ${name}?`)) {
      const updated = media.filter(m => m.id !== id);
      onUpdateMedia(updated);
      onLogAction('Media Deleted', `Deleted media file ${name}`);
    }
  };

  const handleCopyUrl = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900">Media Library</h2>
          <p className="text-xs text-slate-500">Manage institute banners, logos, and downloadable certificate templates.</p>
        </div>
        <button
          onClick={() => {
            setFileName('');
            setSelectedFileUrl('');
            setIsModalOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-5 py-3 rounded-xl shadow-md flex items-center gap-2 transition-all"
        >
          <Plus className="w-4 h-4" /> Upload New File
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {media.map((m) => (
          <div key={m.id} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-full h-40 bg-slate-100 rounded-2xl overflow-hidden flex items-center justify-center border border-slate-100 relative group">
                {m.type === 'pdf' ? (
                  <div className="flex flex-col items-center justify-center text-red-500 space-y-2">
                    <FileText className="w-12 h-12" />
                    <span className="text-xs font-bold text-slate-700">PDF Document</span>
                  </div>
                ) : (
                  <img src={m.url} alt={m.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                )}
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm truncate" title={m.name}>{m.name}</h4>
                <p className="text-xs text-slate-400 mt-0.5">{m.size} • Uploaded on {m.uploadDate}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <button
                onClick={() => handleCopyUrl(m.id, m.url)}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 bg-blue-50 px-3 py-2 rounded-xl transition-colors"
              >
                {copiedId === m.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedId === m.id ? 'Copied URL!' : 'Copy URL'}</span>
              </button>
              <button
                onClick={() => deleteMedia(m.id, m.name)}
                className="bg-red-50 hover:bg-red-100 text-red-700 p-2 rounded-xl transition-colors"
                title="Delete File"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {media.length === 0 && (
        <div className="bg-white p-16 rounded-3xl text-center border border-slate-200 text-slate-500">
          No media files uploaded yet. Click "Upload New File" to add banners or logos.
        </div>
      )}

      {/* Upload Modal with File Picker */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-blue-400" />
                <span className="font-bold text-sm">Upload New Media File from Device</span>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleUpload} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Select File from Computer</label>
                <div className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-2xl p-6 text-center cursor-pointer bg-slate-50 transition-colors relative">
                  <input
                    type="file"
                    required
                    accept="image/*,application/pdf"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  <div className="space-y-2 flex flex-col items-center">
                    <Upload className="w-8 h-8 text-blue-600" />
                    <p className="text-sm font-bold text-slate-700">
                      {fileName ? <span className="text-blue-600">{fileName}</span> : 'Click here to browse & select image/PDF'}
                    </p>
                    <p className="text-xs text-slate-400">Supports JPG, PNG, WEBP, PDF</p>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">File Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. banner.jpg"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">File Type</label>
                <select
                  value={fileType}
                  onChange={(e) => setFileType(e.target.value as 'image' | 'pdf' | 'logo')}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:border-blue-600"
                >
                  <option value="image">Image / Banner</option>
                  <option value="logo">Institute Logo</option>
                  <option value="pdf">PDF Document / Certificate Template</option>
                </select>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs shadow-md transition-all"
                >
                  Upload File
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
