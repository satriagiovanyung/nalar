import React, { useRef } from 'react';
import { motion } from 'framer-motion';

interface Props {
  data: { valence: number; energy: number };
  onChange: (valence: number, energy: number) => void;
}

export default function MatriksKeadaan({ onChange }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDragEnd = (_event: any, info: any) => {
    if (!containerRef.current) return;
    const { width, height } = containerRef.current.getBoundingClientRect();
    
    const x = Math.max(0, Math.min(100, (info.point.x / width) * 100));
    const y = Math.max(0, Math.min(100, 100 - (info.point.y / height) * 100));

    onChange(Math.round(x), Math.round(y));
  };

  return (
    <div className="relative w-64 h-64 border border-gray-200 rounded-2xl bg-white shadow-sm flex items-center justify-center">
      <span className="absolute top-4 text-xs text-gray-400 font-medium">Energi Tinggi</span>
      <span className="absolute bottom-4 text-xs text-gray-400 font-medium">Energi Rendah</span>
      <span className="absolute left-4 text-xs text-gray-400 font-medium -rotate-90">Buruk</span>
      <span className="absolute right-4 text-xs text-gray-400 font-medium rotate-90">Baik</span>
      
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
        <div className="w-full h-[1px] bg-black"></div>
        <div className="h-full w-[1px] bg-black absolute"></div>
      </div>

      <div ref={containerRef} className="absolute inset-0 p-4">
        <motion.div
          drag
          dragConstraints={containerRef}
          dragElastic={0}
          dragMomentum={false}
          onDragEnd={handleDragEnd}
          className="w-10 h-10 bg-black rounded-full shadow-lg cursor-grab active:cursor-grabbing absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>
    </div>
  );
}