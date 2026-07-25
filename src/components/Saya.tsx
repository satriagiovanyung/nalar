import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { User, Trash2 } from 'lucide-react';

interface DailyRecord {
  date: string;
  energiFisik: number | null;
  energiMental: number | null;
  thought: string | null;
  friction: number | null;
  note: string;
}

export default function Saya() {
  const [records, setRecords] = useState<DailyRecord[]>([]);

  const loadData = () => {
    const savedData = localStorage.getItem('nalar_records');
    if (savedData) {
      const parsedData: DailyRecord[] = JSON.parse(savedData);
      const sortedData = parsedData.sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      setRecords(sortedData);
    } else {
      setRecords([]);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleResetData = () => {
    if (window.confirm("Apakah kamu yakin ingin menghapus semua riwayat catatan Nalar?")) {
      localStorage.removeItem('nalar_records');
      loadData();
      window.location.reload();
    }
  };

  const formatIndoDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return dateStr;
      
      const options: Intl.DateTimeFormatOptions = { 
        weekday: 'long', 
        day: 'numeric', 
        month: 'long',
        year: 'numeric'
      };
      return date.toLocaleDateString('id-ID', options);
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <div className="flex flex-col w-full h-full pt-16 pb-28 px-6 relative overflow-y-auto bg-[#09090B] text-white">
      
      {/* BACKGROUND /SAYA.PNG DENGAN OVERLAY GELAP */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 pointer-events-none"
        style={{ backgroundImage: "url('/saya.png')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#09090B]/95 via-[#09090B]/90 to-[#09090B]/95"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="z-10 relative flex flex-col h-full max-w-md w-full mx-auto"
      >
        {/* HEADER */}
        <div className="flex items-center gap-4 mb-6 bg-zinc-900/90 backdrop-blur-md border border-zinc-700 rounded-2xl p-5 shadow-lg">
          <div className="w-14 h-14 rounded-full bg-zinc-800 border border-zinc-600 flex items-center justify-center shrink-0">
            <User size={26} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Ruang Saya</h1>
            <p className="text-sm text-zinc-300 font-medium">Semua riwayat catatanmu</p>
          </div>
        </div>

        {/* STATISTIK */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-zinc-900/90 backdrop-blur-md border border-zinc-700 rounded-2xl p-4 flex flex-col shadow-md">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">Total Catatan</span>
            <span className="text-3xl font-extrabold text-white">{records.length}</span>
          </div>
          <div className="bg-zinc-900/90 backdrop-blur-md border border-zinc-700 rounded-2xl p-4 flex flex-col shadow-md">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">Status Sistem</span>
            <span className="text-xl font-extrabold text-[#A3B899]">{records.length > 0 ? 'Aktif' : 'Baru'}</span>
          </div>
        </div>

        {/* DAFTAR RIWAYAT */}
        <div className="flex justify-between items-center mb-4 px-1">
          <h2 className="text-sm font-bold text-zinc-300 uppercase tracking-wider">Daftar Riwayat Lengkap</h2>
          {records.length > 0 && (
            <button 
              onClick={handleResetData}
              className="flex items-center gap-1.5 text-xs font-semibold text-rose-400 hover:text-rose-300 transition-colors bg-rose-500/10 border border-rose-500/20 px-3 py-1.5 rounded-full"
            >
              <Trash2 size={12} />
              Reset Data
            </button>
          )}
        </div>

        {records.length === 0 ? (
          <div className="bg-zinc-900/90 backdrop-blur-md border border-zinc-700 rounded-2xl p-6 text-center shadow-md">
            <p className="text-white font-medium text-sm leading-relaxed">
              Belum ada catatan yang tersimpan. Silakan isi Catatan Malam terlebih dahulu.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {records.map((record, index) => (
              <div 
                key={index}
                className="bg-zinc-900/90 backdrop-blur-md border border-zinc-700 rounded-2xl p-5 shadow-lg flex flex-col gap-3"
              >
                <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
                  <span className="text-sm font-bold text-white">
                    {formatIndoDate(record.date)}
                  </span>
                  <span className="text-xs font-bold bg-zinc-800 px-3 py-1 rounded-full text-zinc-200 border border-zinc-600">
                    Fisik: {record.energiFisik || '-'} | Mental: {record.energiMental || '-'}
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Dominasi Pikiran</span>
                  <p className="text-base font-bold text-white mt-0.5">
                    {record.thought || 'Tidak ada data'}
                  </p>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Tingkat Hambatan</span>
                  <p className="text-sm font-semibold text-zinc-200 mt-0.5">
                    Level {record.friction || '-'} dari 5
                  </p>
                </div>

                {record.note && record.note.trim() !== "" && (
                  <div className="bg-black/80 border border-zinc-800 rounded-xl p-3 mt-1">
                    <span className="text-[11px] font-bold text-[#A3B899] uppercase tracking-wider block mb-1">Catatan Tambahan:</span>
                    <p className="text-sm text-zinc-100 font-normal leading-relaxed whitespace-pre-wrap">
                      {record.note}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}