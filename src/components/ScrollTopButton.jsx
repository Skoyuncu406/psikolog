"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollTopButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!show) return null;

  return (
    <button
      onClick={scrollTop}
      className="fixed bottom-24 right-6 z-50 w-12 h-12 rounded-full bg-[#1f5f4b] text-white flex items-center justify-center shadow-xl hover:bg-[#174637] transition"
      aria-label="Yukarı çık"
    >
      <ArrowUp size={22} />
    </button>
  );
}