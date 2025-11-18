// src/components/Lightbox.tsx
import React, { useEffect, useRef } from "react";

type LightboxProps = {
  images: string[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

const Lightbox: React.FC<LightboxProps> = ({ images, index, onClose, onPrev, onNext }) => {
  const backdropRef = useRef<HTMLDivElement | null>(null);
  const src = images[index];

  // Close on ESC, navigate with arrows
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose, onPrev, onNext]);

  // Close when clicking outside image
  const onBackdropClick = (e: React.MouseEvent) => {
    if (e.target === backdropRef.current) onClose();
  };

  // Preload neighbors
  useEffect(() => {
    const prev = new Image();
    const next = new Image();
    prev.src = images[(index - 1 + images.length) % images.length] || "";
    next.src = images[(index + 1) % images.length] || "";
  }, [index, images]);

  if (!images.length) return null;

  return (
    <div
      ref={backdropRef}
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onBackdropClick}
    >
      {/* Close */}
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute top-4 right-4 rounded-full bg-white/10 hover:bg-white/20 text-white px-3 py-2"
      >
        ✕
      </button>

      {/* Prev */}
      <button
        aria-label="Previous image"
        onClick={onPrev}
        className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 rounded bg-white/10 hover:bg-white/20 text-white px-3 py-2"
      >
        ‹
      </button>

      {/* Next */}
      <button
        aria-label="Next image"
        onClick={onNext}
        className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 rounded bg-white/10 hover:bg-white/20 text-white px-3 py-2"
      >
        ›
      </button>

      {/* Image */}
      <div className="max-w-[92vw] max-height-[90vh]">
        <img
          src={src}
          alt={`Gallery ${index + 1}`}
          className="max-h-[82vh] max-w-[90vw] object-contain rounded shadow-lg"
        />
      </div>
    </div>
  );
};

export default Lightbox;
