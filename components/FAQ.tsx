import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const FAQS = [
    {
        q: "Berapa lama proses verifikasi?",
        a: "Sistem AI kami mengecek receipt dalam hitungan detik. Admin akan memvalidasi final dalam 10-30 menit jam kerja."
    },
    {
        q: "Apakah ini sekali bayar (One-time payment)?",
        a: "Betul! Harga yang tertera adalah untuk Lifetime Access. Tidak ada biaya bulanan atau tahunan."
    },
    {
        q: "Bagaimana cara akses produknya?",
        a: "Setelah pembayaran dikonfirmasi via WhatsApp, link akses dan kredensial login akan dikirim langsung ke Email & WhatsApp kamu."
    }
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mt-8 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-indigo-600" />
            <h3 className="font-bold text-slate-800">Pertanyaan Umum</h3>
        </div>
        <div className="divide-y divide-slate-100">
            {FAQS.map((faq, idx) => (
                <div key={idx} className="p-4">
                    <button 
                        onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                        className="flex items-center justify-between w-full text-left focus:outline-none group"
                    >
                        <span className="font-bold text-slate-700 text-sm group-hover:text-indigo-600 transition-colors">{faq.q}</span>
                        {openIndex === idx ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                    </button>
                    {openIndex === idx && (
                        <p className="mt-2 text-sm text-slate-500 leading-relaxed pl-1 animate-fade-in font-medium">
                            {faq.a}
                        </p>
                    )}
                </div>
            ))}
        </div>
    </div>
  );
};

export default FAQ;