import React from 'react';
import { Star, Quote } from 'lucide-react';

const TESTIMONIALS = [
    {
        name: "Raka Dimas",
        role: "Content Creator",
        text: "Gila sih, Vanguard ngebantu banget buat riset konten. Dulu butuh 3 jam, sekarang cuma 15 menit kelar!",
        rating: 5
    },
    {
        name: "Siska Putri",
        role: "Affiliate Marketer",
        text: "ROI naik 300% sejak pake tools ini. Fitur rankingnya beneran works, bukan gimmick doang. Recommended!",
        rating: 5
    }
];

const Testimonials: React.FC = () => {
  return (
    <div className="mt-8">
       <div className="flex items-center justify-between mb-8 px-2">
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">Trusted by Creators</h3>
          <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-100">
             <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
             <span className="text-sm font-bold text-slate-800">4.9</span>
             <span className="text-xs text-slate-400 font-medium">/ 5.0</span>
          </div>
       </div>
       
       <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-white p-7 rounded-[1.5rem] border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 relative group">
                  <div className="absolute top-6 right-6 p-2 bg-slate-50 rounded-full group-hover:bg-indigo-50 transition-colors">
                     <Quote className="w-4 h-4 text-slate-300 group-hover:text-indigo-300 transition-colors" />
                  </div>
                  
                  <div className="flex gap-1 mb-4">
                      {[...Array(t.rating)].map((_, idx) => (
                          <Star key={idx} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                  </div>
                  
                  <p className="text-slate-700 text-sm font-medium leading-relaxed relative z-10 mb-6">"{t.text}"</p>
                  
                  <div className="flex items-center gap-3 border-t border-slate-50 pt-5 mt-auto">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-md ring-2 ring-white">
                          {t.name.charAt(0)}
                      </div>
                      <div>
                          <p className="text-sm font-bold text-slate-900">{t.name}</p>
                          <p className="text-xs text-slate-400 font-semibold">{t.role}</p>
                      </div>
                  </div>
              </div>
          ))}
       </div>
    </div>
  );
};

export default Testimonials;