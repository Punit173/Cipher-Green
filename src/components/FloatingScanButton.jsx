import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ScanLine } from 'lucide-react';

export default function FloatingScanButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(createPageUrl('Scanner'))}
      className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-[#00C853] to-[#22d3ee] rounded-full flex items-center justify-center text-white shadow-lg pulse-glow hover:scale-110 transition-transform duration-300 z-50"
      aria-label="Scan Waste"
    >
      <ScanLine className="w-7 h-7" />
    </button>
  );
}