import React from 'react';
import { MessageCircle } from 'lucide-react';

const FloatingSupport: React.FC = () => {
  return (
    <a 
      href="https://api.whatsapp.com/send?phone=6282124335700&text=Halo%20Admin,%20saya%20butuh%20bantuan%20soal%20pembayaran%20Vanguard."
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-40 group"
    >
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
        Need Help?
        <div className="absolute top-1/2 -right-1 -translate-y-1/2 border-4 border-transparent border-l-slate-900"></div>
      </span>
      <div className="w-14 h-14 bg-[#25D366] hover:bg-[#20bd5a] rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 transition-all duration-300 hover:scale-110 active:scale-95 ring-4 ring-white">
        <MessageCircle className="w-7 h-7 text-white fill-white" />
      </div>
    </a>
  );
};

export default FloatingSupport;