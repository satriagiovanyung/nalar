import React from 'react';
import { motion } from 'framer-motion';

const frictions = [
  { label: 'Mengalir Lancar', value: 1 },
  { label: 'Sedikit Tersendat', value: 2 },
  { label: 'Banyak Hambatan', value: 3 },
];

interface Props {
  onSelect: (value: number) => void;
}

export default function KualitasGesekan({ onSelect }: Props) {
  return (
    <div className="flex flex-col gap-4 w-full">
      {frictions.map((item, index) => (
        <motion.button
          key={item.value}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.02, type: "spring", duration: 0.3 }}
          onClick={() => onSelect(item.value)}
          className="w-full px-6 py-5 rounded-2xl border border-gray-200 bg-white text-gray-800 text-lg font-medium hover:border-black transition-colors"
        >
          {item.label}
        </motion.button>
      ))}
    </div>
  );
}