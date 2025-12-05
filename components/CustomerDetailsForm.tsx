import React from 'react';
import { User, Mail, Phone } from 'lucide-react';
import { CustomerDetails } from '../types';

interface CustomerDetailsFormProps {
  details: CustomerDetails;
  onChange: (field: keyof CustomerDetails, value: string) => void;
}

const CustomerDetailsForm: React.FC<CustomerDetailsFormProps> = ({ details, onChange }) => {
  return (
    <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-6 sm:p-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-[100px] -mr-10 -mt-10 z-0 pointer-events-none"></div>
      
      <div className="grid gap-6 relative z-10">
        
        {/* Name Field */}
        <div className="group">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 transition-colors group-focus-within:text-indigo-600">Full Name</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            </div>
            <input
              type="text"
              value={details.name}
              onChange={(e) => onChange('name', e.target.value)}
              className="block w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white text-slate-900 font-bold placeholder-slate-400 transition-all duration-300 ease-out outline-none hover:bg-slate-50/80"
              placeholder="e.g. Faisal Ahmad"
            />
          </div>
        </div>

        {/* Email Field */}
        <div className="group">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 transition-colors group-focus-within:text-indigo-600">Email Address</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            </div>
            <input
              type="email"
              value={details.email}
              onChange={(e) => onChange('email', e.target.value)}
              className="block w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white text-slate-900 font-bold placeholder-slate-400 transition-all duration-300 ease-out outline-none hover:bg-slate-50/80"
              placeholder="name@example.com"
            />
          </div>
        </div>

        {/* Phone Field */}
        <div className="group">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 transition-colors group-focus-within:text-indigo-600">WhatsApp Number</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Phone className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            </div>
            <input
              type="tel"
              value={details.phone}
              onChange={(e) => onChange('phone', e.target.value)}
              className="block w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white text-slate-900 font-bold placeholder-slate-400 transition-all duration-300 ease-out outline-none hover:bg-slate-50/80"
              placeholder="08xxxxxxxxxx"
            />
          </div>
          <p className="mt-2 text-[10px] text-slate-400 flex items-center gap-1.5 font-bold pl-1 uppercase tracking-wide">
             <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full inline-block animate-pulse"></span>
             Required for delivery
          </p>
        </div>

      </div>
    </div>
  );
};

export default CustomerDetailsForm;