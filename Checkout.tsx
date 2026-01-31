
import React, { useState, useRef } from 'react';
import { Package, View } from '../types';
import { sendTelegramPhoto } from '../services/telegram';

interface CheckoutProps {
  selectedPackage: Package;
  onNavigate: (view: View) => void;
}

const Checkout: React.FC<CheckoutProps> = ({ selectedPackage, onNavigate }) => {
  const [paymentMethod, setPaymentMethod] = useState('kpay');
  const [playerId, setPlayerId] = useState('');
  const [serverId, setServerId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [receiptImage, setReceiptImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const total = selectedPackage.price;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setReceiptImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePay = async () => {
    if (!playerId) {
      alert('Please enter your Player ID');
      return;
    }

    if (!receiptImage) {
      alert('Please upload your payment receipt screenshot.');
      return;
    }

    setIsProcessing(true);

    const orderDetails = `
🚀 *New Order Received!*
------------------------
🎮 *Game:* ${selectedPackage.gameId === 'mlbb' ? 'MLBB' : 'PUBG Mobile'}
📦 *Package:* ${selectedPackage.amount}
💰 *Price:* ${total.toLocaleString()} MMK
💳 *Payment:* ${paymentMethod.toUpperCase()}

👤 *User ID:* ${playerId}
🌐 *Server:* ${serverId || 'N/A'}
------------------------
_Receipt Image attached below._
    `;

    const success = await sendTelegramPhoto(receiptImage, orderDetails);

    setTimeout(() => {
        setIsProcessing(false);
        if (success) {
          alert("Transaction successful! Receipt sent to Admin. Your top-up will be processed instantly.");
          onNavigate('history');
        } else {
          alert("Order details sent, but receipt upload failed. Please contact support.");
          onNavigate('history');
        }
    }, 1500);
  };

  const paymentDetails = {
    kpay: { number: '09959111081', name: 'Myo Hlaing Oo' },
    wave: { number: '09678243948', name: 'Myo Hlaing Oo' }
  };

  return (
    <div className="max-w-6xl mx-auto px-1">
      <div className="flex items-center gap-2 pb-4 text-xs font-medium">
        <button onClick={() => onNavigate('home')} className="text-[#a492c9] hover:text-white">Shop</button>
        <span className="text-[#a492c9]">/</span>
        <span className="text-white">Checkout</span>
      </div>

      <div className="flex flex-col gap-1 pb-6 md:pb-8">
        <h1 className="text-white text-3xl md:text-4xl font-black tracking-tight">Checkout</h1>
        <p className="text-[#a492c9] text-sm md:text-lg">Complete payment to receive your items.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <div className="lg:col-span-2 flex flex-col gap-6 md:gap-8">
          {/* 1. Game Details */}
          <section className="bg-[#221933] rounded-2xl p-5 md:p-6 border border-[#2f2348]">
            <h2 className="text-white text-lg md:text-xl font-bold flex items-center gap-3 mb-6">
              <span className="bg-primary/20 text-primary w-7 h-7 md:w-8 md:h-8 rounded-lg flex items-center justify-center text-sm font-black">1</span>
              Game Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <label className="flex flex-col gap-2">
                <p className="text-white text-xs md:text-sm font-semibold">Player ID</p>
                <input 
                  value={playerId}
                  onChange={(e) => setPlayerId(e.target.value)}
                  className="w-full rounded-xl text-white border border-[#443267] bg-[#161022] h-12 md:h-14 placeholder:text-[#a492c9]/50 px-4 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none text-sm" 
                  placeholder="e.g. 12345678"
                />
              </label>
              <label className="flex flex-col gap-2">
                <p className="text-white text-xs md:text-sm font-semibold">Server ID / Zone ID</p>
                <input 
                  value={serverId}
                  onChange={(e) => setServerId(e.target.value)}
                  className="w-full rounded-xl text-white border border-[#443267] bg-[#161022] h-12 md:h-14 placeholder:text-[#a492c9]/50 px-4 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none text-sm" 
                  placeholder="e.g. 1234"
                />
              </label>
            </div>
          </section>

          {/* 2. Payment Method */}
          <section className="bg-[#221933] rounded-2xl p-5 md:p-6 border border-[#2f2348]">
            <div className="mb-6">
              <h2 className="text-white text-lg md:text-xl font-bold flex items-center gap-3 mb-2">
                <span className="bg-primary/20 text-primary w-7 h-7 md:w-8 md:h-8 rounded-lg flex items-center justify-center text-sm font-black">2</span>
                Payment
              </h2>
              <p className="text-[#a492c9] text-xs md:text-sm">Transfer <span className="text-primary font-bold">{total.toLocaleString()} MMK</span> to below account.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-8">
              {[
                { id: 'kpay', label: 'KBZPay', number: paymentDetails.kpay.number, color: 'bg-[#005ba3]' },
                { id: 'wave', label: 'WavePay', number: paymentDetails.wave.number, color: 'bg-[#feca00]' },
              ].map((method) => (
                <button 
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id)}
                  className={`flex items-center gap-3 p-3 md:p-4 rounded-2xl border-2 transition-all text-left ${
                    paymentMethod === method.id ? 'border-primary bg-primary/10' : 'border-[#443267] bg-[#161022]'
                  }`}
                >
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex-shrink-0 flex items-center justify-center text-white font-black text-[9px] ${method.color}`}>
                    {method.label}
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-white font-bold text-xs md:text-sm">{method.label}</p>
                    <p className="text-primary font-black text-sm md:text-base">{method.number}</p>
                    <p className="text-[#a492c9] text-[9px] uppercase font-bold truncate">Name: {paymentDetails.kpay.name}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* 3. Receipt Upload */}
            <div>
              <h3 className="text-white text-sm font-bold mb-4 flex items-center gap-2">
                 <span className="material-symbols-outlined text-primary text-xl">add_a_photo</span>
                 3. Upload Receipt Screenshot
              </h3>
              <div 
                onClick={() => fileInputRef.current?.click()}
                className={`w-full border-2 border-dashed rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center cursor-pointer transition-all ${
                  receiptImage ? 'border-green-500 bg-green-500/5' : 'border-[#443267] bg-[#161022]'
                }`}
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  className="hidden" 
                  accept="image/*"
                />
                {receiptImage ? (
                  <div className="relative group">
                    <img src={receiptImage} alt="Receipt" className="max-h-40 md:max-h-48 rounded-lg shadow-xl" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all rounded-lg">
                       <span className="text-white text-[10px] font-bold">Tap to change</span>
                    </div>
                  </div>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[#a492c9] text-3xl md:text-4xl mb-2">cloud_upload</span>
                    <p className="text-white font-bold text-sm">Tap to upload</p>
                    <p className="text-[#a492c9] text-[10px] mt-1">Screenshot allowed</p>
                  </>
                )}
              </div>
            </div>
          </section>
        </div>

        {/* Order Summary - PC: Sticky, Mobile: Normal */}
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-24 bg-[#221933] rounded-2xl border border-[#2f2348] overflow-hidden shadow-xl mb-6">
            <div className="p-5 border-b border-[#2f2348] bg-primary/5">
              <h2 className="text-white font-bold">Order Summary</h2>
            </div>
            <div className="p-5 space-y-4">
              <div className="flex items-center gap-3 p-3 bg-[#161022] rounded-xl border border-white/5">
                <div 
                  className="size-12 rounded-lg bg-cover bg-center flex-shrink-0 shadow-inner border border-white/5"
                  style={{ backgroundImage: `url(${selectedPackage.image || ''})` }}
                ></div>
                <div className="min-w-0">
                  <p className="text-xs md:text-sm font-bold text-white truncate">{selectedPackage.amount}</p>
                  <p className="text-[10px] text-[#a492c9]">{selectedPackage.gameId === 'mlbb' ? 'Mobile Legends' : 'PUBG Mobile'}</p>
                </div>
              </div>
              <div className="flex justify-between text-xs md:text-sm">
                <span className="text-[#a492c9]">Package Price</span>
                <span className="text-white font-medium">{total.toLocaleString()} MMK</span>
              </div>
              <hr className="border-[#2f2348]"/>
              <div className="flex justify-between items-end">
                <span className="text-sm md:text-base font-bold text-white">Total Pay</span>
                <p className="text-2xl md:text-3xl font-black text-primary">{total.toLocaleString()} MMK</p>
              </div>
              <button 
                onClick={handlePay}
                disabled={isProcessing}
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3.5 md:py-4 rounded-xl transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 mt-4 disabled:opacity-50 text-sm md:text-base"
              >
                {isProcessing ? (
                   <>
                     <span className="animate-spin border-2 border-white border-t-transparent w-4 h-4 rounded-full"></span>
                     Processing...
                   </>
                ) : (
                  <>
                    Complete Order
                    <span className="material-symbols-outlined text-sm">send</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
