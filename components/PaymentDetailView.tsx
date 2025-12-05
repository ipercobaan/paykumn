import React, { useState } from 'react';
import { PaymentMethod, PaymentType } from '../types';
import { Copy, Check, Info } from 'lucide-react';

interface PaymentDetailViewProps {
  method: PaymentMethod;
  amount: number;
}

const PaymentDetailView: React.FC<PaymentDetailViewProps> = ({ method, amount }) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 overflow-hidden relative border border-slate-100 ring-1 ring-black/5">
      {/* Top Decoration */}
      <div className={`h-2 w-full bg-gradient-to-r from-transparent via-current to-transparent opacity-50 ${method.color.replace('border-', 'text-')}`}></div>
      
      <div className="p-8">
        <div className="flex flex-col items-center justify-center text-center mb-10">
          <div className="w-20 h-20 bg-white rounded-2xl shadow-sm border border-slate-100 p-3 mb-5 flex items-center justify-center ring-4 ring-slate-50">
             <img src={method.logo} alt={method.name} className="w-full h-full object-contain" />
          </div>
          <p className="text-slate-400 text-[10px] font-extrabold uppercase tracking-[0.2em] mb-2">Transfer To</p>
          <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">{method.name}</h3>
        </div>

        {method.type === PaymentType.QRIS ? (
          <div className="bg-slate-900 p-8 rounded-3xl max-w-[320px] mx-auto mb-8 shadow-2xl shadow-slate-300 relative group overflow-hidden">
             {/* Dynamic Glow */}
             <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/30 rounded-full blur-[50px] pointer-events-none"></div>
             <div className="absolute bottom-0 left-0 w-40 h-40 bg-violet-500/30 rounded-full blur-[50px] pointer-events-none"></div>
            
            <div className="bg-white p-4 rounded-2xl relative z-10 shadow-lg">
                <img 
                  src="https://i.ibb.co.com/B2Vgqxm1/d7b2e0d8-b042-43d1-84cd-dd3747aa1d28.jpg" 
                  alt="QRIS Code" 
                  className="w-full h-auto rounded-xl"
                />
            </div>
            <div className="mt-6 text-center relative z-10">
              <p className="text-white font-bold text-xl tracking-tight">{method.accountName}</p>
              <div className="flex items-center justify-center gap-2 mt-2">
                 <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                 <p className="text-slate-300 text-xs font-mono">Accepting Payments</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8 mb-10">
            {/* Account Number */}
            <div className="group relative">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block pl-1">Account Number</label>
              <div className="flex items-center justify-between gap-4 bg-slate-50/80 p-5 rounded-2xl border border-slate-200 group-hover:border-indigo-400 group-hover:bg-indigo-50/20 transition-all duration-300 shadow-sm group-hover:shadow-md">
                <span className="text-lg sm:text-xl font-mono font-bold text-slate-900 break-all">{method.accountNumber}</span>
                <button 
                  onClick={() => copyToClipboard(method.accountNumber || '', 'number')}
                  className="p-3 bg-white rounded-xl shadow-sm border border-slate-200 hover:border-indigo-500 hover:text-indigo-600 transition-all active:scale-95 flex-shrink-0 group-hover:shadow-md"
                  title="Copy Number"
                >
                  {copiedField === 'number' ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Stacked Details */}
            <div className="flex flex-col gap-6">
               <div className="w-full">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block pl-1">Account Name</label>
                  <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-200 flex items-center">
                     <p className="font-bold text-slate-900 text-lg truncate">{method.accountName}</p>
                  </div>
               </div>
               
               <div className="w-full">
                   <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block pl-1">Total Amount</label>
                   <div className="bg-indigo-50/50 p-5 rounded-2xl border border-indigo-100 flex items-center justify-between group hover:border-indigo-300 transition-colors">
                       <p className="font-extrabold text-indigo-700 text-2xl tracking-tight">{formatCurrency(amount)}</p>
                       <button 
                            onClick={() => copyToClipboard(amount.toString(), 'amount')}
                            className="p-2 bg-white rounded-lg text-indigo-600 shadow-sm border border-indigo-100 hover:scale-110 transition-transform"
                        >
                            {copiedField === 'amount' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </button>
                   </div>
                   <p className="text-[10px] text-slate-400 mt-2 pl-1">*Exact amount helps verification.</p>
               </div>
            </div>
          </div>
        )}

        <div className="flex gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-200/60 items-start">
          <div className="p-2.5 bg-white rounded-full shadow-sm border border-slate-100">
             <Info className="w-5 h-5 text-indigo-500" />
          </div>
          <div className="text-sm text-slate-600 leading-relaxed">
            <p className="font-bold text-slate-900 mb-1">Instruction</p>
            <p>{method.instruction}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetailView;