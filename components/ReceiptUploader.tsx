import React, { useState, useRef } from 'react';
import { CheckCircle2, AlertCircle, Loader2, ExternalLink, RefreshCw, UploadCloud, ImageIcon } from 'lucide-react';
import { analyzeReceipt } from '../services/geminiService';
import { uploadToImgBB } from '../services/uploadService';
import { ReceiptData } from '../types';

interface ReceiptUploaderProps {
  onAnalysisComplete: (data: ReceiptData | null) => void;
}

const ReceiptUploader: React.FC<ReceiptUploaderProps> = ({ onAnalysisComplete }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState<string>('');
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file (JPG, PNG).');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('File size too large. Please upload an image under 10MB.');
      return;
    }

    setError(null);
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    setUploadedUrl(null);
    setIsProcessing(true);
    onAnalysisComplete(null);

    try {
      setProcessingStep('AI Analyzing & Uploading...');
      
      const [analysisResult, imgUrl] = await Promise.all([
        analyzeReceipt(file).catch(err => {
            console.error("AI Analysis failed", err);
            return { isValidReceipt: true }; 
        }),
        uploadToImgBB(file)
      ]);

      if (imgUrl) {
        setUploadedUrl(imgUrl);
      }

      if (analysisResult && 'isValidReceipt' in analysisResult && !analysisResult.isValidReceipt) {
        setError("The image doesn't look like a valid payment receipt. Please check and try again.");
      } else {
        const finalData: ReceiptData = {
          ...analysisResult,
          isValidReceipt: true,
          imageUrl: imgUrl || undefined
        };
        onAnalysisComplete(finalData);
      }
    } catch (err) {
      setError('Failed to process the receipt. You can still submit manually.');
      console.error(err);
    } finally {
      setIsProcessing(false);
      setProcessingStep('');
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="mt-8">
      <div 
        onClick={triggerUpload}
        className={`
          relative group cursor-pointer transition-all duration-300 rounded-3xl overflow-hidden
          ${preview 
            ? 'bg-slate-900 ring-4 ring-slate-100 shadow-xl' 
            : 'bg-white border-2 border-dashed border-slate-300 hover:border-indigo-500 hover:bg-indigo-50/30 hover:shadow-lg'
          }
        `}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          className="hidden" 
          accept="image/png, image/jpeg, image/jpg"
        />

        {isProcessing ? (
          <div className="flex flex-col items-center justify-center py-16 bg-white/95 backdrop-blur-md">
            <div className="relative">
               <div className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
               <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="w-6 h-6 text-indigo-600 animate-pulse" />
               </div>
            </div>
            <p className="text-slate-900 font-bold mt-6 animate-pulse tracking-wide text-sm">{processingStep}</p>
          </div>
        ) : preview ? (
          <div className="relative min-h-[280px] flex items-center justify-center bg-slate-900 p-4">
            <img src={preview} alt="Receipt Preview" className="max-h-72 w-auto object-contain rounded-lg opacity-90 group-hover:opacity-60 transition-opacity duration-300" />
            
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 bg-slate-900/40 backdrop-blur-sm">
               <button className="bg-white text-slate-900 px-6 py-3 rounded-full font-bold shadow-2xl flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:scale-105">
                  <RefreshCw className="w-4 h-4" />
                  Change Image
               </button>
            </div>

            {uploadedUrl && (
                <div className="absolute top-4 right-4 bg-emerald-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg z-20 ring-2 ring-emerald-600/20">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Uploaded
                </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
            <div className="w-20 h-20 bg-indigo-50 rounded-2xl rotate-3 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-indigo-100 transition-all duration-300 shadow-sm border border-indigo-100">
              <UploadCloud className="w-10 h-10 text-indigo-500 group-hover:text-indigo-600 transition-colors" />
            </div>
            <h4 className="text-xl font-bold text-slate-900 mb-2">Upload Proof</h4>
            <p className="text-slate-500 text-sm mb-6 max-w-xs font-medium leading-relaxed">Drag & drop your screenshot here or click to browse</p>
            <span className="bg-white border border-slate-200 text-slate-700 px-6 py-2.5 rounded-xl text-sm font-bold shadow-sm group-hover:border-indigo-400 group-hover:text-indigo-600 group-hover:shadow-md transition-all">
               Select Image
            </span>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-5 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-3 text-red-700 text-sm animate-fade-in-up shadow-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-600" />
          <p className="font-medium">{error}</p>
        </div>
      )}

      {!isProcessing && !error && preview && uploadedUrl && (
        <div className="mt-4 flex items-center justify-between text-xs font-medium text-slate-400 px-2 animate-fade-in-up">
           <span className="flex items-center gap-1.5 text-emerald-600 font-bold"><CheckCircle2 className="w-4 h-4" /> Receipt Ready</span>
           <a href={uploadedUrl} target="_blank" rel="noreferrer" className="hover:text-indigo-600 flex items-center gap-1 transition-colors">
              View Original <ExternalLink className="w-3 h-3" />
           </a>
        </div>
      )}
    </div>
  );
};

export default ReceiptUploader;