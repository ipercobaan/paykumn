import React, { useState } from 'react';
import { MOCK_PRODUCT } from './constants';
import { PaymentMethod, ReceiptData, CustomerDetails } from './types';
import PaymentMethodList from './components/PaymentMethodList';
import PaymentDetailView from './components/PaymentDetailView';
import ReceiptUploader from './components/ReceiptUploader';
import CustomerDetailsForm from './components/CustomerDetailsForm';
import PromoTimer from './components/PromoTimer';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import { ShieldCheck, MessageCircle, AlertTriangle, ShoppingBag, ExternalLink, Timer, Lock, ArrowRight, Zap } from 'lucide-react';

const App: React.FC = () => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [receiptData, setReceiptData] = useState<ReceiptData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Customer Details State
  const [customer, setCustomer] = useState<CustomerDetails>({
    name: '',
    email: '',
    phone: ''
  });

  const handleCustomerChange = (field: keyof CustomerDetails, value: string) => {
    setCustomer(prev => ({ ...prev, [field]: value }));
  };

  const isCustomerInfoValid = customer.name.length > 2 && customer.email.includes('@') && customer.phone.length > 9;

  const handleConfirmPayment = () => {
    setIsSubmitting(true);
    // Simulate WhatsApp redirect
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
    <div className="min-h-screen text-slate-800 pb-20">
      
      {/* Glass Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/60 shadow-sm transition-all">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-violet-700 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
               <h1 className="font-extrabold text-xl text-slate-900 tracking-tight leading-none">VANGUARD</h1>
               <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Payment</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100 shadow-sm">
            <Lock className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Secure Checkout</span>
            <span className="sm:hidden">Secure</span>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        
        {/* Promo Timer */}
        <div className="animate-fade-in-up">
           <PromoTimer />
        </div>

        {/* Order Details Card */}
        <div className="animate-fade-in-up delay-100 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-1 shadow-xl shadow-slate-300">
           <div className="bg-slate-900/50 rounded-xl p-6 relative overflow-hidden">
               {/* Background Glow */}
               <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

               <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                      <div className="bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide flex items-center gap-1">
                         <Zap className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                         Best Seller
                      </div>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-white mb-2 leading-tight">{MOCK_PRODUCT.name}</h2>
                  <p className="text-slate-300 text-sm leading-relaxed mb-6 max-w-lg">{MOCK_PRODUCT.description}</p>
                  
                  <div className="flex items-end justify-between border-t border-white/10 pt-4">
                     <div>
                        {MOCK_PRODUCT.discountNote && (
                          <div className="flex items-center gap-2 text-red-300 text-xs font-medium mb-1">
                            <Timer className="w-3.5 h-3.5" />
                            {MOCK_PRODUCT.discountNote}
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <span className="text-slate-500 line-through text-sm">
                            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(MOCK_PRODUCT.originalPrice || 0)}
                          </span>
                          <span className="bg-red-500/20 text-red-300 text-[10px] px-1.5 rounded font-bold">-88%</span>
                        </div>
                     </div>
                     <div className="text-right">
                        <span className="block text-xs text-slate-400 mb-1">Total Payment</span>
                        <p className="text-3xl font-extrabold text-white tracking-tight">
                          {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(MOCK_PRODUCT.price)}
                        </p>
                     </div>
                  </div>
               </div>
           </div>
        </div>

        {/* Steps Container */}
        <div className="space-y-8 relative">
            {/* Connecting Line (Optional visual guide) */}
            <div className="absolute left-[27px] top-6 bottom-6 w-0.5 bg-slate-200 hidden md:block -z-10"></div>

            {/* Step 1: Customer Info */}
            <div className="animate-fade-in-up delay-200">
               <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-white border-2 border-slate-200 text-slate-500 flex items-center justify-center font-bold text-sm shadow-sm z-10">1</div>
                  <h3 className="text-lg font-bold text-slate-800">Your Details</h3>
               </div>
               <div className="md:pl-11">
                  <CustomerDetailsForm details={customer} onChange={handleCustomerChange} />
               </div>
            </div>

            {/* Step 2: Payment Method */}
            <div className={`animate-fade-in-up delay-300 transition-all duration-500 ${!isCustomerInfoValid ? 'opacity-40 grayscale' : 'opacity-100'}`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-sm shadow-sm z-10 transition-colors ${selectedMethod ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-200 text-slate-500'}`}>2</div>
                  <h3 className="text-lg font-bold text-slate-800">Select Payment</h3>
               </div>
               
               <div className="md:pl-11">
                  <PaymentMethodList 
                    selectedId={selectedMethod?.id || null} 
                    onSelect={setSelectedMethod} 
                  />
                  {!isCustomerInfoValid && (
                    <div className="mt-3 bg-amber-50 text-amber-700 px-4 py-3 rounded-lg text-sm flex items-center gap-2 border border-amber-100">
                        <Lock className="w-4 h-4" />
                        Complete your details above to unlock payment methods.
                    </div>
                  )}
               </div>
            </div>

            {/* Step 3: Confirmation & Upload */}
            {selectedMethod && isCustomerInfoValid && (
              <div className="animate-fade-in-up">
                 <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-indigo-600 border-2 border-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-sm z-10">3</div>
                    <h3 className="text-lg font-bold text-slate-800">Complete Payment</h3>
                 </div>

                 <div className="md:pl-11 space-y-8">
                     {/* Payment Details Card */}
                     <PaymentDetailView method={selectedMethod} amount={MOCK_PRODUCT.price} />

                     {/* Upload Section */}
                     <div className="relative">
                        <div className="absolute -left-[30px] top-8 hidden md:flex flex-col items-center gap-1">
                           <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                           <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                           <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                        </div>
                        <ReceiptUploader onAnalysisComplete={setReceiptData} />
                     </div>

                     {/* AI Result Card */}
                     {receiptData && (
                        <div className="bg-gradient-to-b from-white to-slate-50 border border-indigo-100 rounded-xl p-6 shadow-sm ring-4 ring-indigo-50/50 animate-fade-in-up">
                          <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-4">
                            <div className="p-2 bg-indigo-100 rounded-lg">
                               <ShieldCheck className="w-5 h-5 text-indigo-600" />
                            </div>
                            <div>
                               <h4 className="font-bold text-slate-800">Payment Verification</h4>
                               <p className="text-xs text-slate-500">AI Analysis Result</p>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-y-4 gap-x-6">
                             <div>
                               <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Status</p>
                               <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                 Valid Receipt
                               </span>
                             </div>
                             <div>
                               <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Amount</p>
                               <span className={`font-mono font-bold ${receiptData.amount === MOCK_PRODUCT.price ? 'text-green-600' : 'text-slate-700'}`}>
                                 {receiptData.amount ? new Intl.NumberFormat('id-ID').format(receiptData.amount) : '---'}
                               </span>
                             </div>
                             {receiptData.date && (
                                <div className="col-span-2">
                                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Detected Date</p>
                                  <p className="text-slate-700 font-medium">{receiptData.date}</p>
                                </div>
                             )}
                          </div>
                          
                          {receiptData.amount !== undefined && receiptData.amount < MOCK_PRODUCT.price && (
                             <div className="mt-4 flex items-start gap-2 text-orange-700 text-xs bg-orange-50 p-3 rounded-lg border border-orange-100">
                               <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                               <p>Warning: Amount detected is lower than price. Verification might be delayed.</p>
                             </div>
                           )}
                        </div>
                     )}

                     {/* Final CTA */}
                     <div className="sticky bottom-4 z-40">
                        <button
                          onClick={handleConfirmPayment}
                          disabled={!receiptData || isSubmitting}
                          className={`
                            w-full py-4 px-6 rounded-xl font-bold text-white shadow-xl shadow-indigo-200 flex items-center justify-center gap-3 transition-all duration-300 transform
                            ${!receiptData 
                              ? 'bg-slate-300 cursor-not-allowed text-slate-500 shadow-none' 
                              : 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:scale-[1.02] hover:shadow-2xl'
                            }
                          `}
                        >
                          {isSubmitting ? (
                            'Processing...'
                          ) : (
                            <>
                              <MessageCircle className="w-5 h-5 fill-current" />
                              <span>Confirm via WhatsApp</span>
                              <ArrowRight className="w-5 h-5 opacity-50" />
                            </>
                          )}
                        </button>
                        {!receiptData && (
                          <div className="absolute -top-12 left-0 right-0 text-center animate-bounce">
                             <span className="bg-slate-800 text-white text-xs px-3 py-1 rounded-full shadow-lg opacity-90">Upload receipt first ☝️</span>
                          </div>
                        )}
                     </div>

                 </div>
              </div>
            )}
        </div>

        {/* Footer Content */}
        <div className="mt-16 border-t border-slate-200 pt-12 space-y-12">
            <Testimonials />
            <FAQ />
            
            <footer className="text-center pb-8">
              <p className="font-bold text-slate-300 text-lg mb-2">VANGUARD</p>
              <p className="text-slate-400 text-sm">Empowering Creators • Manual Payment Gateway</p>
              <div className="flex justify-center gap-6 mt-6">
                  <a href="#" className="text-xs text-slate-400 hover:text-slate-600 transition-colors">Privacy Policy</a>
                  <a href="#" className="text-xs text-slate-400 hover:text-slate-600 transition-colors">Terms of Service</a>
                  <a href="#" className="text-xs text-slate-400 hover:text-slate-600 transition-colors">Support</a>
              </div>
            </footer>
        </div>

      </div>
    </div>
  );
};

export default App;