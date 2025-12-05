import React from 'react';
import { PAYMENT_METHODS } from '../constants';
import { PaymentMethod } from '../types';
import { Check, ChevronRight } from 'lucide-react';

interface PaymentMethodListProps {
  selectedId: string | null;
  onSelect: (method: PaymentMethod) => void;
}

const PaymentMethodList: React.FC<PaymentMethodListProps> = ({ selectedId, onSelect }) => {
  return (
    <div className="grid grid-cols-1 gap-4 mt-2">
      {PAYMENT_METHODS.map((method) => {
        const isSelected = selectedId === method.id;
        return (
          <button
            key={method.id}
            onClick={() => onSelect(method)}
            className={`
              w-full group relative flex items-center gap-5 p-5 rounded-2xl border text-left transition-all duration-300 ease-out outline-none
              ${isSelected 
                ? `border-indigo-500 bg-white shadow-xl shadow-indigo-100/50 ring-1 ring-indigo-500 transform -translate-y-1` 
                : 'border-slate-200 bg-white shadow-sm hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-50/30 hover:bg-slate-50/50'
              }
            `}
          >
            {/* Logo Container */}
            <div className={`
                w-16 h-16 flex-shrink-0 flex items-center justify-center rounded-xl p-3 transition-colors duration-300 border
                ${isSelected 
                  ? 'bg-slate-50 border-slate-100' 
                  : 'bg-white border-slate-100 group-hover:border-indigo-100'
                }
            `}>
               <img 
                 src={method.logo} 
                 alt={method.name} 
                 className="w-full h-full object-contain mix-blend-multiply filter"
               />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                 <p className={`font-bold text-lg truncate ${isSelected ? 'text-slate-900' : 'text-slate-800'}`}>
                    {method.name}
                 </p>
                 {isSelected && (
                    <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">Selected</span>
                 )}
              </div>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
                {method.type.replace('_', ' ')}
              </p>
            </div>

            <div className={`
              w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0
              ${isSelected 
                ? 'bg-indigo-600 text-white scale-110 shadow-lg shadow-indigo-300' 
                : 'bg-slate-100 text-slate-300 group-hover:bg-slate-200 group-hover:text-slate-500'
              }
            `}>
              {isSelected ? <Check className="w-4 h-4 stroke-[3]" /> : <ChevronRight className="w-4 h-4 stroke-[3]" />}
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default PaymentMethodList;