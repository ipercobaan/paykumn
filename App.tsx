import React, { useState, useEffect } from 'react';
import { MOCK_PRODUCT } from './constants';
import { PaymentMethod, ReceiptData, CustomerDetails } from './types';
import PaymentMethodList from './components/PaymentMethodList';
import PaymentDetailView from './components/PaymentDetailView';
import ReceiptUploader from './components/ReceiptUploader';
import CustomerDetailsForm from './components/CustomerDetailsForm';
import PromoTimer from './components/PromoTimer';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import RecentSales from './components/RecentSales';
import FloatingSupport from './components/FloatingSupport';
import Confetti from './components/Confetti';
import { ShieldCheck, MessageCircle, AlertTriangle, ShoppingBag, Lock, ArrowRight, Zap, Timer, CheckCircle2 } from 'lucide-react';

const App: React.FC = () => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [receiptData, setReceiptData] = useState<ReceiptData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  
  const [customer, setCustomer] = useState<CustomerDetails>({
    name: '',
    email: '',
    phone: ''
  });

  // Trigger confetti when receipt is valid
  useEffect(() => {
    if (receiptData?.isValidReceipt) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 5000); // Stop after 5s
      return () => clearTimeout(timer);
    }
  }, [receiptData]);

  const handleCustomerChange = (field: keyof CustomerDetails, value: string) => {
    setCustomer(prev => ({ ...prev, [field]: value }));
  };

  const isCustomerInfoValid = customer.name.length > 2 && customer.email.includes('@') && customer.phone.length > 9;

  const handleConfirmPayment = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const message = 
        `*NEW ORDER - VANGUARD PAYMENT*%0A` +
        `--------------------------------%0A` +
        `👤 *Customer Details:*%0A` +
        `Name: ${customer.name}%0A` +
        `Email: ${customer.email}%0A` +
        `Phone: ${customer.phone}%0A%0A` +
        `🛒 *Product:* ${MOCK_PRODUCT.name}%0A` +
        `💰 *Amount:* ${new Intl.NumberFormat('id-ID', {style: 'currency', currency: 'IDR'}).format(MOCK_PRODUCT.price)}%0A` +
        `💳 *Method:* ${selectedMethod?.name}%0A` +
        `📅 *Date:* ${receiptData?.date || new Date().toISOString().split('T')[0]}%0A%0A` +
        (receiptData?.senderName ? `🧾 *Sender:* ${receiptData.senderName}%0A` : '') +
        (receiptData?.imageUrl ? `📎 *Proof Link:* ${receiptData.imageUrl}` : '⚠️ Image attached separately');
      
      window.open(`https://api.whatsapp.com/send?phone=6282124335700&text=${message}`, '_blank');
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen text-slate-800 pb-20 selection:bg-indigo-500/30 selection:text-indigo-900 relative overflow-x-hidden">
      
      {showConfetti && <Confetti />}
      <RecentSales />
      <FloatingSupport />

      {/* Premium Glass Header */}
      <div className="sticky top-0 z-50 glass-panel border-b border-white/50 shadow-sm transition-all duration-300">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 ring-1 ring-black/5">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
               <h1 className="font-extrabold text-xl text-slate-900 tracking-tight leading-none">VANGUARD</h1>
               <p className="text-[10px] font-bold text-slate-500 tracking-widest uppercase mt-0.5">Payment Gateway</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100/50 shadow-sm">
            <Lock className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">256-Bit SSL Secure</span>
            <span className="sm:hidden">Secure</span>
          </div>
        </div>
      </div>

      <div className="max-w-xl mx-auto px-4 sm:px-6 py-8 space-y-12">
        
        {/* Promo Timer */}
        <div className="animate-fade-in-up">
           <PromoTimer />
        </div>

        {/* Premium Product Card - Dark Mode Contrast */}
        <div className="animate-fade-in-up [animation-delay:100ms] group perspective">
           <div className="bg-slate-900 rounded-[2rem] shadow-2xl shadow-slate-300/50 transform transition-transform duration-500 hover:scale-[1.01] relative overflow-hidden ring-1 ring-slate-900/5">
                {/* Abstract Background Shapes */}
               <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-[80px] -mr-20 -mt-20 pointer-events-none mix-blend-screen"></div>
               <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-500/20 rounded-full blur-[60px] -ml-10 -mb-10 pointer-events-none mix-blend-screen"></div>

               <div className="p-8 relative z-10">
                  <div className="flex justify-between items-start mb-6">
                      <div className="inline-flex items-center gap-1.5 bg-white/10 border border-white/10 text-indigo-100 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wide backdrop-blur-md">
                         <Zap className="w-3 h-3 text-yellow-300 fill-yellow-300" />
                         Premium Bundle
                      </div>
                  </div>
                  
                  <h2 className="text-3xl font-extrabold text-white mb-3 leading-tight tracking-tight">{MOCK_PRODUCT.name}</h2>
                  <p className="text-slate-400 text-sm leading-relaxed mb-8 font-medium border-l-2 border-indigo-500 pl-4">
                    {MOCK_PRODUCT.description}
                  </p>
                  
                  <div className="flex items-end justify-between border-t border-white/10 pt-6">
                     <div>
                        {MOCK_PRODUCT.discountNote && (
                          <div className="flex items-center gap-2 text-red-300 text-xs font-bold mb-2 bg-red-500/10 px-3 py-1 rounded-full w-fit border border-red-500/20">
                            <Timer className="w-3.5 h-3.5" />
                            {MOCK_PRODUCT.discountNote}
                          </div>
                        )}
                        <div className="flex items-baseline gap-3">
                          <span className="text-slate-500 line-through text-base font-medium decoration-slate-500/50 decoration-2">
                            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(MOCK_PRODUCT.originalPrice || 0)}
                          </span>
                          <span className="bg-rose-500 text-white text-[10px] px-2 py-0.5 rounded font-bold shadow-lg shadow-rose-500/20">-88%</span>
                        </div>
                     </div>
                     <div className="text-right">
                        <span className="block text-[10px] text-slate-400 font-bold mb-1 uppercase tracking-wider">Total Payment</span>
                        <p className="text-4xl font-extrabold text-white tracking-tight">
                          {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(MOCK_PRODUCT.price)}
                        </p>
                     </div>
                  </div>
               </div>
           </div>
        </div>

        {/* Form Flow Container */}
        <div className="space-y-12 relative">
            {/* Connecting Line */}
            <div className="absolute left-[27px] top-8 bottom-12 w-0.5 bg-slate-200 hidden md:block -z-10"></div>

            {/* Step 1: Customer Info */}
            <div className="animate-fade-in-up [animation-delay:200ms]">
               <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 rounded-full bg-white ring-4 ring-slate-50 border border-slate-200 text-slate-900 flex items-center justify-center font-bold text-sm shadow-sm z-10">1</div>
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight">Personal Details</h3>
               </div>
               <div className="md:pl-14">
                  <CustomerDetailsForm details={customer} onChange={handleCustomerChange} />
               </div>
            </div>

            {/* Step 2: Payment Method */}
            <div className={`animate-fade-in-up [animation-delay:300ms] transition-all duration-500 ${!isCustomerInfoValid ? 'opacity-40 grayscale pointer-events-none' : 'opacity-100'}`}>
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-10 h-10 rounded-full ring-4 ring-slate-50 border flex items-center justify-center font-bold text-sm shadow-sm z-10 transition-colors duration-300 ${selectedMethod ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-200 text-slate-400'}`}>2</div>
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight">Select Payment</h3>
               </div>
               
               <div className="md:pl-14">
                  <PaymentMethodList 
                    selectedId={selectedMethod?.id || null} 
                    onSelect={setSelectedMethod} 
                  />
               </div>
            </div>

            {/* Step 3: Confirmation & Upload */}
            {selectedMethod && isCustomerInfoValid && (
              <div className="animate-fade-in-up">
                 <div className="flex items-center gap-4 mb-6">
                    <div className="w-10 h-10 rounded-full bg-indigo-600 ring-4 ring-indigo-50 border border-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-lg shadow-indigo-200 z-10">3</div>
                    <h3 className="text-xl font-bold text-slate-900 tracking-tight">Complete Payment</h3>
                 </div>

                 <div className="md:pl-14 space-y-8">
                     {/* Payment Details Card */}
                     <PaymentDetailView method={selectedMethod} amount={MOCK_PRODUCT.price} />

                     {/* Upload Section */}
                     <ReceiptUploader onAnalysisComplete={setReceiptData} />

                     {/* AI Result Card */}
                     {receiptData && (
                        <div className="bg-white/60 backdrop-blur-xl border border-indigo-100 rounded-3xl p-6 shadow-xl shadow-indigo-100/50 ring-1 ring-white/50 animate-fade-in-up">
                          <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-4">
                            <div className="p-2 bg-indigo-600 rounded-lg text-white shadow-md shadow-indigo-200">
                               <ShieldCheck className="w-5 h-5" />
                            </div>
                            <div>
                               <h4 className="font-bold text-slate-900">AI Verification</h4>
                               <p className="text-xs text-slate-500 font-medium">Receipt automatically analyzed</p>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-y-4 gap-x-6">
                             <div>
                               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Status</p>
                               <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                                 <CheckCircle2 className="w-3 h-3 mr-1" /> Valid
                               </span>
                             </div>
                             <div>
                               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Amount</p>
                               <span className={`font-mono text-base font-bold ${receiptData.amount === MOCK_PRODUCT.price ? 'text-emerald-600' : 'text-slate-800'}`}>
                                 {receiptData.amount ? new Intl.NumberFormat('id-ID').format(receiptData.amount) : '---'}
                               </span>
                             </div>
                          </div>
                          
                          {receiptData.amount !== undefined && receiptData.amount < MOCK_PRODUCT.price && (
                             <div className="mt-4 flex items-start gap-3 text-amber-800 text-xs bg-amber-50 p-4 rounded-xl border border-amber-200 shadow-sm">
                               <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-600" />
                               <p className="font-medium">Warning: The detected amount is lower than expected. Verification might be delayed.</p>
                             </div>
                           )}
                        </div>
                     )}

                     {/* Final CTA */}
                     <div className="sticky bottom-6 z-40 pt-4">
                        <button
                          onClick={handleConfirmPayment}
                          disabled={!receiptData || isSubmitting}
                          className={`
                            w-full py-4 px-6 rounded-2xl font-bold text-white shadow-xl flex items-center justify-center gap-3 transition-all duration-300 transform group
                            ${!receiptData 
                              ? 'bg-slate-200 cursor-not-allowed text-slate-400 shadow-none ring-1 ring-slate-300/50' 
                              : 'bg-slate-900 hover:bg-slate-800 hover:scale-[1.02] hover:shadow-2xl hover:shadow-indigo-500/20 ring-1 ring-white/10'
                            }
                          `}
                        >
                          {isSubmitting ? (
                            <span className="flex items-center gap-2">Processing...</span>
                          ) : (
                            <>
                              <MessageCircle className="w-5 h-5 fill-current" />
                              <span className="text-lg">Confirm via WhatsApp</span>
                              <ArrowRight className="w-5 h-5 opacity-70 group-hover:translate-x-1 transition-transform" />
                            </>
                          )}
                        </button>
                        {!receiptData && (
                          <div className="text-center mt-3 animate-pulse">
                             <span className="text-slate-400 text-xs font-medium">Please upload payment proof first ☝️</span>
                          </div>
                        )}
                     </div>

                 </div>
              </div>
            )}
        </div>

        {/* Footer Content */}
        <div className="mt-20 border-t border-slate-200 pt-12 space-y-16">
            <Testimonials />
            <FAQ />
            
            <footer className="text-center pb-8 pt-4">
              <div className="flex items-center justify-center gap-2 mb-4 opacity-70">
                 <ShoppingBag className="w-5 h-5 text-slate-900" />
                 <span className="font-extrabold text-slate-900 text-lg tracking-tight">VANGUARD</span>
              </div>
              <p className="text-slate-500 text-sm font-medium">Empowering Creators • Premium Payment Gateway</p>
              <div className="flex justify-center gap-8 mt-6">
                  <a href="#" className="text-xs font-bold text-slate-400 hover:text-indigo-600 transition-colors">Privacy</a>
                  <a href="#" className="text-xs font-bold text-slate-400 hover:text-indigo-600 transition-colors">Terms</a>
                  <a href="#" className="text-xs font-bold text-slate-400 hover:text-indigo-600 transition-colors">Support</a>
              </div>
              <p className="mt-8 text-[10px] text-slate-400">© 2024 Vanguard Payment Systems. All rights reserved.</p>
            </footer>
        </div>

      </div>
    </div>
  );
};

export default App;