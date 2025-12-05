import React, { useState, useEffect } from 'react';
import { ShoppingBag, CheckCircle2 } from 'lucide-react';

const NAMES = [
    { name: "Dimas", loc: "Jakarta" },
    { name: "Sarah", loc: "Bandung" },
    { name: "Rizky", loc: "Surabaya" },
    { name: "Putri", loc: "Medan" },
    { name: "Adi", loc: "Yogyakarta" },
    { name: "Mega", loc: "Bali" }
];

const RecentSales: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(NAMES[0]);

  useEffect(() => {
    // Show first notification after 3 seconds
    const initialTimer = setTimeout(() => setVisible(true), 3000);

    const cycleTimer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        const randomUser = NAMES[Math.floor(Math.random() * NAMES.length)];
        setCurrentUser(randomUser);
        setVisible(true);
      }, 2000); // Wait 2s before showing next
    }, 12000); // Cycle every 12s

    return () => {
      clearTimeout(initialTimer);
      clearInterval(cycleTimer);
    };
  }, []);

  return (
    <div 
      className={`
        fixed bottom-24 left-4 sm:bottom-6 sm:left-6 z-40 transition-all duration-500 transform
        ${visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}
      `}
    >
      <div className="bg-white/90 backdrop-blur-md border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-4 rounded-2xl flex items-center gap-3 max-w-[280px] sm:max-w-xs ring-1 ring-black/5">
         <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 relative">
            <ShoppingBag className="w-5 h-5 text-indigo-600" />
            <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-0.5 border-2 border-white">
               <CheckCircle2 className="w-2.5 h-2.5 text-white" />
            </div>
         </div>
         <div>
            <p className="text-xs text-slate-500 font-medium">Someone in <span className="font-bold text-slate-700">{currentUser.loc}</span> purchased</p>
            <p className="text-sm font-bold text-slate-900 leading-tight">Vanguard Platform</p>
            <p className="text-[10px] text-indigo-500 font-bold mt-0.5">Just now</p>
         </div>
      </div>
    </div>
  );
};

export default RecentSales;