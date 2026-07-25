import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, ArrowRight, Sparkles, X } from 'lucide-react';
import { generateInsight } from '../utils/engine';
import type { DailyRecord } from '../utils/engine';

const ACCENT_COLOR = "text-[#A3B899]";
const ACCENT_BG = "bg-[#A3B899]";

export default function HariIni() {
  const [insight, setInsight] = useState({ title: '', text: '' });
  const [recordCount, setRecordCount] = useState(0);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [greeting, setGreeting] = useState({ title: 'Selamat pagi', subtitle: 'Ini Temuan Nalar hari ini' });

  useEffect(() => {
    const savedData = localStorage.getItem('nalar_records');
    const records: DailyRecord[] = savedData ? JSON.parse(savedData) : [];

    setRecordCount(records.length);
    const result = generateInsight(records);
    setInsight(result);

    // Logika Sapaan Berdasarkan Jam Sistem
    const currentHour = new Date().getHours();
    
    if (currentHour >= 4 && currentHour < 11) {
      setGreeting({ title: 'Selamat pagi', subtitle: 'Ini Temuan Nalar hari ini' });
    } else if (currentHour >= 11 && currentHour < 15) {
      setGreeting({ title: 'Selamat siang', subtitle: 'Evaluasi paruh hari Nalar' });
    } else if (currentHour >= 15 && currentHour < 18) {
      setGreeting({ title: 'Selamat sore', subtitle: 'Menjelang penutupan hari' });
    } else {
      setGreeting({ title: 'Selamat malam', subtitle: 'Refleksi akhir hari Nalar' });
    }
  }, []);

  return (
    <div className="flex flex-col w-full min-h-full pt-12 pb-28 px-6 relative overflow-hidden bg-[#09090B] text-gray-100">

      {/* --- LAYER GAMBAR BACKGROUND (malam.png) --- */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <img
          src="/malam.png"
          alt="Latar Belakang Nalar"
          className="w-full h-full object-cover object-bottom"
        />

        {/* Gradien atas: menggelapkan area judul supaya teks tetap kebaca */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#09090B] via-[#09090B]/40 to-transparent"></div>
        {/* Gradien bawah: menggelapkan area status card di bawah */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#09090B] to-transparent"></div>

        {/* --- MOTIF TAMBAHAN --- */}

        {/* 1. Dot-grid halus, kasih tekstur tanpa ramai */}
        <div
          className="absolute inset-0 opacity-[0.15] mix-blend-soft-light"
          style={{
            backgroundImage: 'radial-gradient(circle, #A3B899 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        ></div>

        {/* 2. Glow organik mengambang, terasa "bernapas" */}
        <motion.div
          className="absolute -top-10 -right-10 w-72 h-72 bg-[#A3B899]/10 rounded-full blur-[110px]"
          animate={{ x: [0, 15, 0], y: [0, 10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        ></motion.div>

        <motion.div
          className="absolute top-1/3 -left-16 w-64 h-64 bg-[#A3B899]/8 rounded-full blur-[100px]"
          animate={{ x: [0, -12, 0], y: [0, 15, 0] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        ></motion.div>

        {/* 3. Garis lengkung tipis ala "kontur" */}
        <svg
          className="absolute bottom-0 left-0 w-full opacity-[0.08]"
          viewBox="0 0 400 300"
          preserveAspectRatio="none"
        >
          <path
            d="M0,180 C80,140 140,220 220,170 C300,120 340,200 400,160"
            fill="none"
            stroke="#A3B899"
            strokeWidth="1.5"
          />
          <path
            d="M0,220 C90,190 160,260 240,210 C320,160 360,240 400,210"
            fill="none"
            stroke="#A3B899"
            strokeWidth="1"
          />
        </svg>

        {/* 4. Noise/grain tipis biar nggak flat, kesan "film" */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        ></div>
      </div>

      {/* --- KONTEN UTAMA --- */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="z-10 relative flex flex-col h-full"
      >
        {/* Header Sapaan Dinamis */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold mb-1 tracking-tight text-white drop-shadow-md">{greeting.title},</h1>
          <h2 className="text-xl text-gray-300 font-medium drop-shadow-md">{greeting.subtitle}</h2>
        </div>

        {/* Badge Nomor Temuan */}
        <div className="self-start px-3.5 py-1.5 rounded-full bg-[#18181B]/90 border border-zinc-700/50 mb-4 shadow-sm flex items-center gap-2">
          <Sparkles size={12} className={ACCENT_COLOR} />
          <span className="text-[11px] font-semibold tracking-wide text-[#A3B899] uppercase">
            Temuan Nalar #{recordCount > 0 ? recordCount : '1'}
          </span>
        </div>

        {/* Kartu Temuan Utama */}
        <motion.div
          layout
          className="bg-[#18181B]/80 backdrop-blur-xl rounded-[28px] p-7 sm:p-8 border border-zinc-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.5)] relative overflow-hidden group flex flex-col min-h-[260px] justify-between"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#A3B899]/10 rounded-full blur-3xl transition-opacity duration-500 group-hover:bg-[#A3B899]/20"></div>

          <div className="relative z-10">
            <div className="mb-5">
              <TrendingUp className={`${ACCENT_COLOR}`} size={28} strokeWidth={2.5} />
            </div>

            <h3 className="text-xl sm:text-2xl font-medium leading-snug mb-3 text-white tracking-tight break-words">
              {insight.title}
            </h3>

            <p className="text-sm sm:text-base text-gray-300 mb-8 leading-relaxed break-words">
              {insight.text}
            </p>
          </div>

          <div className="relative z-10">
            <button
              onClick={() => setIsDetailOpen(true)}
              className={`flex items-center ${ACCENT_COLOR} text-sm font-semibold hover:text-white transition-colors group/btn cursor-pointer`}
            >
              Lihat Detail
              <ArrowRight size={16} className="ml-1.5 group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>

        {/* Kotak Status Perjalanan */}
        <div className="mt-6 bg-[#121214]/80 backdrop-blur-xl border border-zinc-800/80 rounded-2xl p-5 flex items-center justify-between shadow-lg">
          <div className="flex flex-col">
            <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold mb-1">Status Perjalanan</span>
            <span className="text-sm text-gray-200 font-medium drop-shadow-sm">
              {recordCount} Hari catatan terekam
            </span>
          </div>
          <div className="w-8 h-8 rounded-full bg-zinc-800/60 flex items-center justify-center border border-zinc-700">
            <span className="text-xs">🌿</span>
          </div>
        </div>
      </motion.div>

      {/* --- MODAL DETAIL --- */}
      <AnimatePresence>
        {isDetailOpen && (
          <div className="absolute inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-md p-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="bg-[#18181B] border border-zinc-800 rounded-3xl p-6 w-full max-w-md shadow-2xl relative"
            >
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-semibold tracking-wider text-[#A3B899] uppercase">Analisis Mendalam Nalar</span>
                <button
                  onClick={() => setIsDetailOpen(false)}
                  className="p-2 -mr-2 text-zinc-400 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <h4 className="text-lg font-semibold text-white mb-3 break-words">{insight.title}</h4>
              <p className="text-sm text-gray-300 leading-relaxed mb-6 break-words">
                {insight.text} Temuan ini dikalkulasikan berdasarkan tren interaksi harianmu. Nalar terus mengkalibrasi data untuk memberikan pola yang semakin tajam.
              </p>

              <div className="bg-[#121214] border border-zinc-800/60 rounded-2xl p-4 mb-6">
                <p className="text-xs text-gray-400 italic">
                  "AI tidak memberi tahu apa yang harus dilakukan. AI membantu menemukan sesuatu yang belum disadari."
                </p>
              </div>

              <button
                onClick={() => setIsDetailOpen(false)}
                className={`w-full py-3.5 rounded-2xl text-sm font-semibold ${ACCENT_BG} text-black transition-transform active:scale-[0.98]`}
              >
                Tutup
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}