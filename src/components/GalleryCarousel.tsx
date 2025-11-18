// src/components/GalleryCarousel.tsx
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Lightbox from "./Lightbox";

type GalleryData = { images: string[] };

type Props = {
  sourceUrl?: string; // JSON path; default: /data/gallery.json
  title?: string;     // section title
  aspect?: string;    // CSS aspect-ratio, e.g., "16 / 9" | "4 / 3"
  intervalMs?: number; // autoplay interval
};

const GalleryCarousel: React.FC<Props> = ({
  sourceUrl = "/data/gallery.json",
  title = "Weekly Worship Gallery",
  aspect = "16 / 9",
  intervalMs = 4000,
}) => {
  const [images, setImages] = useState<string[]>([]);
  const [index, setIndex] = useState(0);
  const [hover, setHover] = useState(false);
  const [lbOpen, setLbOpen] = useState(false);

  // fetch images
  useEffect(() => {
    let alive = true;
    fetch(sourceUrl)
      .then(r => r.json())
      .then((data: GalleryData) => { if (alive) setImages(data?.images || []); })
      .catch(() => setImages([]));
    return () => { alive = false; };
  }, [sourceUrl]);

  const hasImages = images.length > 0;
  const safeIndex = (i: number) => (hasImages ? (i + images.length) % images.length : 0);

  const next = useCallback(() => setIndex(i => safeIndex(i + 1)), [images.length]);
  const prev = useCallback(() => setIndex(i => safeIndex(i - 1)), [images.length]);

  // autoplay
  useEffect(() => {
    if (!hasImages || hover || images.length < 2) return;
    const id = setInterval(next, intervalMs);
    return () => clearInterval(id);
  }, [hover, images.length, hasImages, next, intervalMs]);

  // keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lbOpen) return; // Lightbox handles its own keys
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, lbOpen]);

  // touch swipe
  const startX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => { startX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (startX.current == null) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    const THRESH = 40; // px
    if (dx > THRESH) prev();
    else if (dx < -THRESH) next();
    startX.current = null;
  };

  const dots = useMemo(() => images.map((_, i) => i), [images]);

  return (
    <section className="py-16 bg-blue-50">
      <div className="max-w-6xl mx-auto px-6">
        <h3 className="text-3xl font-semibold text-blue-700 mb-8 text-center">{title}</h3>

        {!hasImages ? (
          <p className="text-center text-gray-600">Photos coming soon…</p>
        ) : (
          <div
            className="relative rounded-lg overflow-hidden shadow bg-black/5"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <div className="relative w-full" style={{ aspectRatio: aspect }}>
              {/* Current image */}
              <img
                src={images[index]}
                alt={`Worship ${index + 1}`}
                className="absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-300"
                onClick={() => setLbOpen(true)}
                loading="lazy"
              />
              {/* gradient edges (subtle) */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/10 to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/10 to-transparent" />
            </div>

            {/* Controls */}
            <button
              aria-label="Previous slide"
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded bg-white/30 hover:bg-white/50 text-white backdrop-blur px-3 py-2"
            >
              ‹
            </button>
            <button
              aria-label="Next slide"
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded bg-white/30 hover:bg-white/50 text-white backdrop-blur px-3 py-2"
            >
              ›
            </button>

            {/* Dots */}
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
              {dots.map(i => (
                <button
                  key={i}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={`h-2 w-2 rounded-full ${i === index ? "bg-white" : "bg-white/50 hover:bg-white/70"}`}
                />
              ))}
            </div>
          </div>
        )}

        <div className="text-center mt-8">
          <a
            href="/events"
            className="inline-block rounded bg-blue-700 px-4 py-2 text-white font-semibold hover:bg-blue-600"
          >
            Join Us This Week
          </a>
        </div>
      </div>

      {/* Lightbox uses the same images; opens at current index */}
      {lbOpen && (
        <Lightbox
          images={images}
          index={index}
          onClose={() => setLbOpen(false)}
          onPrev={prev}
          onNext={next}
        />
      )}
    </section>
  );
};

export default GalleryCarousel;
