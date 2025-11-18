// src/pages/Give.tsx
import React, { useEffect, useState } from "react";
import { useSEO } from "../hooks/useSEO";

const QrModal: React.FC<{ open: boolean; onClose: () => void; src: string }> = ({ open, onClose, src }) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div className="relative" onClick={(e) => e.stopPropagation()}>
        <button
          aria-label="Close"
          className="absolute -top-3 -right-3 rounded-full bg-white/90 px-3 py-1 text-blue-900 shadow"
          onClick={onClose}
        >
          ✕
        </button>
        <img
          src={src}
          alt="Scan to give"
          className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg shadow-lg bg-white"
        />
      </div>
    </div>
  );
};

const Give: React.FC = () => {
  useSEO({
    title: "Give | Believers Temple AG",
    description: "Simple, secure ways to give at Believers Temple AG.",
    image: "/images/give-hero.jpg",
  });

  const [qrOpen, setQrOpen] = useState(false);

  return (
    <div className="pb-12">
      {/* Slim HERO */}
      <section className="relative">
        <div className="relative w-full" style={{ aspectRatio: "16 / 6" }}>
          <img
            src="/images/give-hero.jpg"
            alt="Giving at Believers Temple AG"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-blue-900/35" />
          <div className="absolute inset-0 flex items-center">
            <div className="px-6 md:px-10">
              <h1 className="text-3xl md:text-4xl font-bold text-white">Give</h1>
              <p className="mt-2 text-blue-50">Simple & secure.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Options (Bank card commented out) */}
      <section className="max-w-4xl mx-auto px-6 -mt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Mobile Money */}
          <div className="rounded-lg bg-white shadow p-5 text-center">
            <h3 className="text-lg font-semibold text-blue-800">Mobile Money</h3>
            <p className="mt-1 text-gray-700">
              MTN MoMo: <span className="font-medium">055 123 4567</span>
            </p>
            <p className="text-sm text-gray-500">Name: Believers Temple AG</p>
            <button
              onClick={() => setQrOpen(true)}
              className="mt-4 inline-block rounded bg-blue-700 px-4 py-2 text-white font-semibold hover:bg-blue-600"
            >
              Show QR
            </button>
          </div>

          {/* Bank Transfer (commented out for now) */}
          {/*
          <div className="rounded-lg bg-white shadow p-5 text-center">
            <h3 className="text-lg font-semibold text-blue-800">Bank Transfer</h3>
            <p className="mt-1 text-gray-700">
              GCB Bank • <span className="font-medium">Acc: 123456789</span>
            </p>
            <p className="text-sm text-gray-500">Branch: Accra Central</p>
            <a
              href="/files/bank-details.pdf"
              className="mt-4 inline-block rounded border border-blue-200 bg-white px-4 py-2 text-blue-700 font-semibold hover:bg-blue-50"
            >
              Download Details
            </a>
          </div>
          */}

          {/* In-Person */}
          <div className="rounded-lg bg-white shadow p-5 text-center md:col-span-2 md:col-start-2">
            <h3 className="text-lg font-semibold text-blue-800">In Person</h3>
            <p className="mt-1 text-gray-700">Give during service at the Info Desk.</p>
            <a
              href="/events"
              className="mt-4 inline-block rounded border border-blue-200 bg-white px-4 py-2 text-blue-700 font-semibold hover:bg-blue-50"
            >
              Service Times
            </a>
          </div>
        </div>
      </section>

      {/* Note */}
      <section className="max-w-4xl mx-auto px-6 mt-8">
        <p className="text-center text-sm text-gray-600">
          Thank you for your generosity. Use references like <span className="font-medium">“Tithe”</span>,{" "}
          <span className="font-medium">“Offering”</span>, or <span className="font-medium">“Project”</span>.
        </p>
      </section>

      {/* QR Modal */}
      <QrModal open={qrOpen} onClose={() => setQrOpen(false)} src="/images/give-qr.jpg" />
    </div>
  );
};

export default Give;
