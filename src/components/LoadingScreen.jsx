"use client";

import { useEffect, useState } from "react";
import { Leaf } from "lucide-react";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHide(true);

      setTimeout(() => {
        setLoading(false);
      }, 600);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#f7f5ef] flex items-center justify-center transition-opacity duration-700 ${
        hide ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="text-center">
        <div className="w-20 h-20 mx-auto rounded-full bg-[#e3efe8] flex items-center justify-center animate-pulse">
          <Leaf className="text-[#1f5f4b]" size={42} />
        </div>

        <h1 className="mt-6 text-3xl md:text-4xl font-serif font-bold text-[#1f332b]">
          Psikolog Merkezi
        </h1>

        <p className="mt-2 text-[#7a8b7f] tracking-[0.25em] text-xs">
          TERAPİ & DANIŞMANLIK
        </p>
      </div>
    </div>
  );
}