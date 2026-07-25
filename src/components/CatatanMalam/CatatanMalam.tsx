import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Briefcase, BookOpen, CircleDollarSign, 
  Heart, Users, Leaf, User, MoreHorizontal, Lightbulb
} from 'lucide-react';
import type { CheckInState } from './types';

const ACCENT_COLOR = "bg-[#A3B899]";
const TEXT_ACCENT = "text-[#121212]";
// Warna kartu dibuat lebih transparan (Glassmorphism) agar background terlihat sedikit
const CARD_BG = "bg-[#18181B]/70 backdrop-blur-xl";

export default function CatatanMalam() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<CheckInState>({
    energiFisik: null,
    energiMental: null,
    thought: null,
    friction: null,
    note: '',
  });

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => Math.max(1, prev - 1));

  const Header = ({ currentStep }: { currentStep: number }) => (
    <div className="flex items-center justify-between mb-8 w-full z-10">
      <button onClick={handleBack} className="p-2 -ml-2 text-gray-400 hover:text-white transition">
        <ArrowLeft size={24} />
      </button>
      <div className="flex flex-col items-center">
        <span className="text-sm font-medium mb-2 text-gray-200">Catatan Malam</span>
        <div className="flex gap-1.5">
          {[1, 2, 3, 4].map((i) => (
            <div 
              key={i} 
              className={`h-2 rounded-full transition-all duration-300 ${
                i === currentStep ? `${ACCENT_COLOR} w-4` : 'bg-gray-700 w-2'
              }`}
            />
          ))}
        </div>
      </div>
      <span className="text-xs text-[#A3B899] font-medium">{currentStep} dari 4</span>
    </div>
  );

  return (
    // Container utama harus relative agar inset-0 bekerja
    <div className="min-h-screen bg-[#09090B] text-gray-100 flex flex-col items-center p-6 pb-12 font-sans selection:bg-[#A3B899] selection:text-black relative overflow-hidden">
      
      {/* ------------------------------------------------------------------ */}
      {/* INTEGRASI FOTO BACKGROUND DENGAN OVERLAY GELAP                     */}
      {/* Posisi gambar digeser naik: backgroundPosition 'center 30%'       */}
      {/* Angka lebih kecil (mis. 15%) = gambar naik lebih jauh              */}
      {/* Angka lebih besar (mis. 50%/center) = gambar turun ke posisi awal  */}
      {/* ------------------------------------------------------------------ */}
      <div
        className="absolute inset-0 bg-cover bg-no-repeat z-0 pointer-events-none"
        style={{
          backgroundImage: 'url(/cekin.png)',
          backgroundPosition: 'center 30%',
        }}
      >
        {/* OVERLAY GELAP: Penting agar teks putih bisa dibaca di atas gambar */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#09090B] via-[#09090B]/90 to-[#09090B]/60"></div>
      </div>
      {/* ------------------------------------------------------------------ */}

      {/* Konten harus z-10 agar berada di atas background */}
      <div className="w-full max-w-md flex flex-col items-center h-full z-10 relative">
        {step < 5 && <Header currentStep={step} />}

        <AnimatePresence mode="wait">
          {/* STEP 1: MATRIKS ENERGI */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="flex flex-col w-full flex-1"
            >
              <h2 className="text-2xl font-semibold mb-2 tracking-tight text-white drop-shadow-md">Bagaimana energimu hari ini?</h2>
              <p className="text-sm text-gray-400 mb-10">Pilih tingkat energi fisik dan mentalmu.</p>

              <div className="mb-8">
                <p className="text-sm font-medium mb-4 text-gray-200">Energi Fisik</p>
                <div className="flex justify-between items-center bg-[#121214]/70 backdrop-blur-sm p-3 rounded-2xl border border-zinc-700/50">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <motion.button
                      key={`fisik-${val}`}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setData({ ...data, energiFisik: val })}
                      className={`w-12 h-12 rounded-full text-lg font-medium transition-all duration-200 ${
                        data.energiFisik === val 
                          ? `${ACCENT_COLOR} ${TEXT_ACCENT} scale-110 shadow-[0_0_20px_rgba(163,184,153,0.35)]` 
                          : 'bg-[#18181B] text-gray-400 border border-zinc-800 hover:border-zinc-600 hover:bg-zinc-800/50'
                      }`}
                    >
                      {val}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="mb-auto">
                <p className="text-sm font-medium mb-4 text-gray-200">Energi Mental</p>
                <div className="flex justify-between items-center bg-[#121214]/70 backdrop-blur-sm p-3 rounded-2xl border border-zinc-700/50">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <motion.button
                      key={`mental-${val}`}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setData({ ...data, energiMental: val })}
                      className={`w-12 h-12 rounded-full text-lg font-medium transition-all duration-200 ${
                        data.energiMental === val 
                          ? `${ACCENT_COLOR} ${TEXT_ACCENT} scale-110 shadow-[0_0_20px_rgba(163,184,153,0.35)]` 
                          : 'bg-[#18181B] text-gray-400 border border-zinc-800 hover:border-zinc-600 hover:bg-zinc-800/50'
                      }`}
                    >
                      {val}
                    </motion.button>
                  ))}
                </div>
              </div>

              <motion.button 
                whileTap={data.energiFisik && data.energiMental ? { scale: 0.97 } : {}}
                onClick={handleNext}
                disabled={!data.energiFisik || !data.energiMental}
                className={`mt-12 w-full py-4 rounded-2xl text-sm font-semibold transition-all duration-300 ${
                  data.energiFisik && data.energiMental ? `${ACCENT_COLOR} ${TEXT_ACCENT}` : 'bg-zinc-800 text-zinc-500'
                }`}
              >
                Selanjutnya
              </motion.button>
            </motion.div>
          )}

          {/* STEP 2: DOMINASI PIKIRAN */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="flex flex-col w-full flex-1"
            >
              <h2 className="text-2xl font-semibold mb-2 tracking-tight text-white drop-shadow-md">Apa yang paling mendominasi pikiranmu hari ini?</h2>
              <p className="text-sm text-gray-400 mb-8">Pilih satu yang paling utama</p>

              <div className="grid grid-cols-2 gap-3 mb-auto">
                {[
                  { id: 'Pekerjaan', icon: <Briefcase size={22} className="mb-2" /> },
                  { id: 'Belajar', icon: <BookOpen size={22} className="mb-2" /> },
                  { id: 'Keuangan', icon: <CircleDollarSign size={22} className="mb-2 text-[#A3B899]" /> },
                  { id: 'Hubungan', icon: <Heart size={22} className="mb-2 text-rose-400" /> },
                  { id: 'Keluarga', icon: <Users size={22} className="mb-2 text-emerald-400" /> },
                  { id: 'Kesehatan', icon: <Leaf size={22} className="mb-2 text-green-500" /> },
                  { id: 'Diri sendiri', icon: <User size={22} className="mb-2 text-blue-400" /> },
                  { id: 'Lainnya', icon: <MoreHorizontal size={22} className="mb-2 text-gray-400" /> },
                ].map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.02, type: "spring", duration: 0.3 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setData({ ...data, thought: item.id });
                      setTimeout(handleNext, 350);
                    }}
                    className={`flex flex-col items-center justify-center p-5 rounded-2xl border transition-all duration-300 ${
                      data.thought === item.id 
                        ? 'bg-zinc-800/80 border-[#A3B899] shadow-[0_0_20px_rgba(163,184,153,0.2)] text-[#A3B899]' 
                        : `${CARD_BG} border-zinc-700/50 text-gray-400 hover:border-zinc-700 hover:text-gray-300`
                    }`}
                  >
                    {item.icon}
                    <span className="text-sm font-medium">{item.id}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 3: KUALITAS GESEKAN */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="flex flex-col w-full flex-1"
            >
              <h2 className="text-2xl font-semibold mb-2 tracking-tight text-white drop-shadow-md">Seberapa banyak hambatan yang kamu rasakan hari ini?</h2>
              <p className="text-sm text-gray-400 mb-10">Pilih sesuai dengan pengalamanmu</p>

              <div className="mb-8">
                <div className="flex justify-between items-center bg-[#121214]/70 backdrop-blur-sm p-3 rounded-2xl border border-zinc-700/50">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <motion.button
                      key={`friction-${val}`}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setData({ ...data, friction: val })}
                      className={`w-12 h-12 rounded-full text-lg font-medium transition-all duration-200 ${
                        data.friction === val 
                          ? `${ACCENT_COLOR} ${TEXT_ACCENT} scale-110 shadow-[0_0_20px_rgba(163,184,153,0.35)]` 
                          : 'bg-[#18181B] text-gray-400 border border-zinc-800 hover:border-zinc-600 hover:bg-zinc-800/50'
                      }`}
                    >
                      {val}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="mt-4 mb-12 bg-[#18181B]/80 backdrop-blur-xl border border-zinc-700/50 rounded-2xl p-4 flex gap-4 items-start shadow-xl">
                <Lightbulb className="text-[#A3B899] shrink-0 mt-0.5" size={20} />
                <p className="text-sm text-gray-400 leading-relaxed">
                  Hambatan bisa datang dari pekerjaan, pikiran, lingkungan, atau hal lainnya.
                </p>
              </div>

              <motion.button 
                whileTap={data.friction ? { scale: 0.97 } : {}}
                onClick={handleNext}
                disabled={!data.friction}
                className={`mt-auto w-full py-4 rounded-2xl text-sm font-semibold transition-all duration-300 ${
                  data.friction ? `${ACCENT_COLOR} ${TEXT_ACCENT}` : 'bg-zinc-800 text-zinc-500'
                }`}
              >
                Selanjutnya
              </motion.button>
            </motion.div>
          )}

          {/* STEP 4: CATATAN (OPSIONAL) */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="flex flex-col w-full flex-1"
            >
              <h2 className="text-2xl font-semibold mb-2 tracking-tight text-white drop-shadow-md">Ada sesuatu yang ingin kamu ingat hari ini?</h2>
              <p className="text-sm text-gray-400 mb-8">(Opsional)</p>

              <textarea
                value={data.note}
                onChange={(e) => setData({ ...data, note: e.target.value })}
                placeholder="Tulis di sini..."
                className="w-full h-48 bg-[#18181B]/70 backdrop-blur-sm text-white border border-zinc-700/50 rounded-2xl p-5 focus:outline-none focus:border-[#A3B899] transition-colors resize-none text-sm placeholder:text-zinc-600 shadow-inner"
              />

              <motion.button 
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  const savedData = localStorage.getItem('nalar_records');
                  const records = savedData ? JSON.parse(savedData) : [];
                  
                  const newRecord = {
                    ...data,
                    date: new Date().toISOString().split('T')[0] 
                  };
                  
                  localStorage.setItem('nalar_records', JSON.stringify([...records, newRecord]));
                  
                  handleNext();
                }}
                className={`mt-auto w-full py-4 rounded-2xl text-sm font-semibold transition-all duration-300 ${ACCENT_COLOR} ${TEXT_ACCENT}`}
              >
                Simpan Catatan
              </motion.button>
            </motion.div>
          )}

          {/* STEP 5: SUCCESS SCREEN */}
          {step === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              className="flex flex-col w-full items-center justify-center flex-1 py-12"
            >
              <div className="w-32 h-32 rounded-full bg-gradient-to-b from-[#A3B899] to-zinc-900/50 shadow-[0_0_40px_rgba(163,184,153,0.15)] backdrop-blur-sm flex items-center justify-center mb-10 border border-[#A3B899]/20">
                 <span className="text-5xl">😌</span>
              </div>
              
              <h2 className="text-2xl font-semibold mb-4 tracking-tight text-center text-white drop-shadow-md">Catatanmu tersimpan 💚</h2>
              <p className="text-sm text-gray-300 text-center mb-12 px-4 leading-relaxed">
                Nalar akan mempelajari pola kamu dan memberikan Temuan yang lebih bermakna besok.
              </p>

              <div className="bg-[#18181B]/80 backdrop-blur-xl border border-zinc-700/50 rounded-2xl p-6 w-full relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 left-0 w-1 h-full bg-[#A3B899]"></div>
                <p className="text-gray-200 italic text-sm mb-4 drop-shadow-sm">
                  "Data hari ini, pemahaman besok."
                </p>
                <p className="text-right text-xs text-gray-500 font-medium">— Nalar</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
} 