import React, { useState, useEffect } from 'react';
import { Timer, Zap } from 'lucide-react';

const PromoTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 12, minutes: 45, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 rounded-2xl p-[2px] shadow-xl shadow-indigo-500/20 transform hover:scale-[1.01] transition-transform duration-300">
      <div className="bg-slate-900/40 backdrop-blur-md rounded-[14px] p-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-white relative overflow-hidden">
        
        {/* Shine Effect */}
        <div className="absolute top-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 animate-[shimmer_3s_infinite]"></div>

        <div className="flex items-center gap-4 relative z-10">
          <div className="bg-white/10 p-2.5 rounded-xl backdrop-blur-md shadow-inner border border-white/10">
              <Zap className="w-5 h-5 text-yellow-300 fill-yellow-300 animate-pulse" />
          </div>
          <div>
              <p className="font-bold text-base leading-tight">Flash Sale Ending Soon</p>
              <p className="text-xs text-indigo-100 opacity-90 font-medium mt-0.5">Secure your lifetime access now.</p>
          </div>
        </div>
        
        <div className="flex gap-2 font-mono font-bold text-xl tracking-wider bg-black/30 px-5 py-2.5 rounded-xl border border-white/5 shadow-inner backdrop-blur-sm relative z-10">
           <div className="text-center w-[2ch] bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
               {timeLeft.hours.toString().padStart(2, '0')}
           </div>
           <span className="text-indigo-400 animate-pulse">:</span>
           <div className="text-center w-[2ch] bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
               {timeLeft.minutes.toString().padStart(2, '0')}
           </div>
           <span className="text-indigo-400 animate-pulse">:</span>
           <div className="text-center w-[2ch] text-yellow-400">
               {timeLeft.seconds.toString().padStart(2, '0')}
           </div>
        </div>
      </div>
    </div>
  );
};

export default PromoTimer;