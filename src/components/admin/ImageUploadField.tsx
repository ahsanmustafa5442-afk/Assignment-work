import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, RotateCcw, Check, AlertCircle } from 'lucide-react';
import { uploadImage } from '../../utils/api.ts';
import { CAT_AVATAR_DEFAULT } from '../../data/defaultData.ts';

interface ImageUploadFieldProps {
  label: string;
  currentValue: string;
  onChange: (newUrl: string) => void;
  isAvatar?: boolean;
}

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  label,
  currentValue,
  onChange,
  isAvatar = false,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Compress image on client using canvas before uploading
  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(e.target?.result as string);
            return;
          }

          // Max dimensions based on whether it's avatar or general photo
          const maxDimension = isAvatar ? 800 : 1600;
          let width = img.width;
          let height = img.height;

          if (width > maxDimension || height > maxDimension) {
            if (width > height) {
              height = Math.round((height * maxDimension) / width);
              width = maxDimension;
            } else {
              width = Math.round((width * maxDimension) / height);
              height = maxDimension;
            }
          }

          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);

          // Export as webp or jpeg at 0.85 quality
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
          resolve(compressedDataUrl);
        };
        img.onerror = () => reject(new Error('Failed to load selected image file'));
        img.src = e.target?.result as string;
      };
      reader.onerror = () => reject(new Error('Failed to read image file'));
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setIsUploading(true);

    try {
      const compressedDataUrl = await compressImage(file);
      setPreviewUrl(compressedDataUrl);

      // Upload to server storage
      const uploadedUrl = await uploadImage(compressedDataUrl, file.name);
      onChange(uploadedUrl);
    } catch (err: any) {
      console.error('Image upload failed:', err);
      setError(err.message || 'Failed to process and upload image');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleResetToDefaultCat = () => {
    setPreviewUrl(null);
    onChange(CAT_AVATAR_DEFAULT);
  };

  const activeDisplaySrc = previewUrl || currentValue;

  return (
    <div className="space-y-3">
      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
        {label}
      </label>

      <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-900/90 p-4 rounded-2xl border border-slate-800">
        {/* Preview Container */}
        <div className="relative shrink-0">
          <div
            className={`overflow-hidden bg-slate-950 border-2 border-amber-400/60 shadow-md ${
              isAvatar ? 'w-20 h-20 rounded-full' : 'w-28 h-20 rounded-xl'
            }`}
          >
            {activeDisplaySrc ? (
              <img
                src={activeDisplaySrc}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-600">
                <ImageIcon className="w-6 h-6" />
              </div>
            )}
          </div>
          {isUploading && (
            <div className="absolute inset-0 bg-slate-950/80 rounded-full flex items-center justify-center">
              <span className="w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex-1 w-full space-y-2 text-center sm:text-left">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/jpg"
            onChange={handleFileChange}
            className="hidden"
            id={`file-input-${label.replace(/\s+/g, '-').toLowerCase()}`}
          />

          <div className="flex flex-wrap items-center gap-2">
            <label
              htmlFor={`file-input-${label.replace(/\s+/g, '-').toLowerCase()}`}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 font-bold text-xs cursor-pointer shadow-sm transition-colors"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>{isUploading ? 'Uploading...' : 'Choose from Phone / Device'}</span>
            </label>

            {isAvatar && (
              <button
                type="button"
                onClick={handleResetToDefaultCat}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                <span>Reset to Cat Avatar</span>
              </button>
            )}
          </div>

          <div className="text-[11px] text-slate-400">
            Supports JPG, PNG, WebP. Automatically resized and optimized for fast mobile delivery.
          </div>

          {/* Direct URL input fallback */}
          <div className="pt-1">
            <input
              type="text"
              value={currentValue}
              onChange={(e) => {
                setPreviewUrl(null);
                onChange(e.target.value);
              }}
              placeholder="Or enter image URL directly"
              className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-300 placeholder-slate-600 font-mono focus:outline-none focus:border-amber-400"
            />
          </div>

          {error && (
            <p className="text-xs text-rose-400 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{error}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
