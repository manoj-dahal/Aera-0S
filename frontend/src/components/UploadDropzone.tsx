import React, { useCallback, useState } from 'react';
import { UploadCloud, File, CheckCircle } from 'lucide-react';

export const UploadDropzone: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) setIsDragging(true);
  }, []);

  const handleDragOut = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files).map(f => f.name);
      setUploadedFiles(prev => [...prev, ...newFiles]);
      
      // In production, this dispatches the File buffer through window.aeraAPI 
      // over to the `upload-plugin` sandbox inside the Node backend.
      console.log(`[UI] Dispatched ${newFiles.length} files to AERA Core.`);
    }
  }, []);

  return (
    <div className="w-full flex flex-col gap-4 mt-4">
      <div 
        onDragEnter={handleDragIn}
        onDragLeave={handleDragOut}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`w-full h-32 rounded-xl border-2 border-dashed flex flex-col items-center justify-center transition-all cursor-pointer ${
          isDragging ? 'border-primary bg-primary/10 scale-[1.02] shadow-[0_0_20px_rgba(72,232,255,0.2)]' : 'border-white/10 hover:border-primary/50 bg-white/5 hover:bg-white/10'
        }`}
      >
        <UploadCloud size={32} className={`mb-2 ${isDragging ? 'text-primary' : 'text-white/40'}`} />
        <p className={`text-xs font-medium font-mono tracking-widest uppercase ${isDragging ? 'text-primary' : 'text-white/40'}`}>
          {isDragging ? 'Drop to Ingest into AERA Core' : 'Drag & Drop files or click to upload'}
        </p>
      </div>

      {uploadedFiles.length > 0 && (
        <div className="flex flex-col gap-2">
          {uploadedFiles.map((filename, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
              <div className="flex items-center gap-3">
                <File size={16} className="text-white/40" />
                <span className="text-sm font-medium text-white/80">{filename}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-success font-mono uppercase tracking-widest">
                <CheckCircle size={12} /> Indexed
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
