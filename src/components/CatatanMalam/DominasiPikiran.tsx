import React from 'react';
import { motion } from 'framer-motion';

const thoughts = [
  'Pekerjaan', 'Masa Depan', 'Keuangan', 
  'Hubungan', 'Keluarga', 'Diri Sendiri'
];

interface Props {
  selected: string | null;
  onSelect: (thought: string) => void;
}

export default function DominasiPikiran({ selected, onSelect }: Props) {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {thoughts.map((thought, index) => (
        <motion.button
          key={thought}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.02, type: "spring", duration: 0.3 }}
          onClick={() => onSelect(thought)}
          className={`px-6 py-4 rounded-full border text-sm font-medium transition-colors duration-200 w-full sm:w-auto ${
            selected === thought 
              ? 'bg-black text-white border-black' 
              : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
          }`}
        >
          {thought}
        </motion.button>
      ))}
    </div>
  );
}