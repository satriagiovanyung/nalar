// src/App.tsx
import { useState } from 'react';
import { Home, Moon, User } from 'lucide-react';
import CatatanMalam from './components/CatatanMalam/CatatanMalam';
import HariIni from './components/HariIni';
import Saya from './components/Saya';

type Tab = 'hariIni' | 'catatanMalam' | 'saya';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('hariIni');

  return (
    <main className="min-h-screen bg-black flex justify-center selection:bg-[#A3B899] selection:text-black">
      {/* Container ini membatasi lebar agar terlihat seperti layar HP di layar desktop */}
      <div className="w-full max-w-md bg-[#09090B] relative shadow-2xl flex flex-col h-screen">
        
        {/* Area Konten Utama (Scrollable) */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth">
          {activeTab === 'hariIni' && <HariIni />}
          {activeTab === 'catatanMalam' && <CatatanMalam />}
          
          {activeTab === 'saya' && <Saya />}
        </div>

        {/* Bottom Navigation (Sticky) */}
        <div className="sticky bottom-0 w-full bg-[#09090B]/90 backdrop-blur-md border-t border-zinc-800/80 px-8 py-4 flex justify-between items-center z-50 pb-safe">
          <button 
            onClick={() => setActiveTab('hariIni')}
            className={`flex flex-col items-center gap-1.5 transition-colors duration-200 ${
              activeTab === 'hariIni' ? 'text-[#A3B899]' : 'text-zinc-500 hover:text-zinc-400'
            }`}
          >
            <Home size={22} strokeWidth={activeTab === 'hariIni' ? 2.5 : 2} />
            <span className="text-[10px] font-medium tracking-wide">Hari Ini</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('catatanMalam')}
            className={`flex flex-col items-center gap-1.5 transition-colors duration-200 ${
              activeTab === 'catatanMalam' ? 'text-[#A3B899]' : 'text-zinc-500 hover:text-zinc-400'
            }`}
          >
            <Moon size={22} strokeWidth={activeTab === 'catatanMalam' ? 2.5 : 2} />
            <span className="text-[10px] font-medium tracking-wide">Catatan Malam</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('saya')}
            className={`flex flex-col items-center gap-1.5 transition-colors duration-200 ${
              activeTab === 'saya' ? 'text-[#A3B899]' : 'text-zinc-500 hover:text-zinc-400'
            }`}
          >
            <User size={22} strokeWidth={activeTab === 'saya' ? 2.5 : 2} />
            <span className="text-[10px] font-medium tracking-wide">Saya</span>
          </button>
        </div>
        
      </div>
    </main>
  );
}