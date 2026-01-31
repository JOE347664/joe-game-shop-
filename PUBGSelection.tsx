
import React, { useState, useMemo } from 'react';
import { PUBG_PACKAGES } from '../constants';
import { Package } from '../types';

interface PUBGSelectionProps {
  onSelect: (pkg: Package) => void;
  selectedPackage?: Package;
  onCheckout: () => void;
  searchQuery: string;
}

const PUBGSelection: React.FC<PUBGSelectionProps> = ({ onSelect, selectedPackage, onCheckout, searchQuery }) => {
  const [playerId, setPlayerId] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [verifiedName, setVerifiedName] = useState<string | null>(null);
  const [filter, setFilter] = useState('All Packs');

  const handleVerify = () => {
    if (!playerId) return alert("Please enter a character ID");
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      setVerifiedName('BotMaster_PH');
    }, 1500);
  };

  const filteredPackages = useMemo(() => {
    let list = PUBG_PACKAGES.filter(pkg => 
      pkg.amount.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (pkg.tag && pkg.tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    if (filter === 'Popular') list = list.filter(p => p.tag === 'Most Popular');
    if (filter === 'Value Packs') list = list.filter(p => p.tag === 'Value');
    
    return list;
  }, [searchQuery, filter]);

  return (
    <div className="max-w-4xl mx-auto pb-32">
      <h1 className="text-white tracking-tight text-[32px] font-bold leading-tight pb-3 pt-4">Top-up PUBG Mobile UC</h1>
      
      {/* Player ID Section */}
      <div className="mb-8">
        <div className="flex flex-col items-start gap-6 rounded-2xl border border-[#443267] bg-[#1c152a] p-6">
          <div className="flex flex-col gap-2 w-full">
            <p className="text-white text-lg font-bold leading-tight flex items-center gap-2">
              <span className="material-symbols-outlined text-pubg-yellow">fingerprint</span>
              1. Enter Player ID
            </p>
            <p className="text-[#a492c9] text-sm font-normal leading-normal">Your character ID is needed to send the UC directly to your account.</p>
            <div className="flex flex-col md:flex-row items-end gap-4 mt-2 w-full">
              <label className="flex flex-col flex-1 w-full relative">
                <p className="text-white text-sm font-medium pb-2">Character ID</p>
                <div className="relative">
                  <input 
                    className="flex w-full rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-primary border border-[#443267] bg-[#221933] h-14 placeholder:text-[#a492c9] px-4 text-base font-normal transition-all" 
                    placeholder="e.g. 5123456789" 
                    value={playerId}
                    onChange={(e) => {
                        setPlayerId(e.target.value);
                        setVerifiedName(null);
                    }}
                  />
                  <span 
                    onClick={() => alert("Look for the numbers next to your avatar in the main menu profile.")}
                    className="absolute right-4 top-4 text-xs text-pubg-yellow font-bold bg-pubg-yellow/10 px-2 py-1 rounded cursor-pointer hover:bg-pubg-yellow/20"
                  >
                    How to find?
                  </span>
                </div>
                {verifiedName && (
                  <div className="absolute -bottom-6 left-0 text-green-500 text-xs font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">check_circle</span>
                    Verified: {verifiedName}
                  </div>
                )}
              </label>
              <button 
                onClick={handleVerify}
                disabled={verifying}
                className="flex min-w-[120px] w-full md:w-auto items-center justify-center rounded-lg h-14 px-6 bg-primary text-white text-base font-bold transition-all active:scale-95 shadow-lg shadow-primary/20 disabled:opacity-50"
              >
                {verifying ? 'Verifying...' : 'Verify ID'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* UC Selection */}
      <div className="mb-4">
        <p className="text-white text-lg font-bold leading-tight mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-pubg-orange">grid_view</span>
          2. Select UC Amount
        </p>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {['All Packs', 'Popular', 'Value Packs', 'Bulk UC'].map((f) => (
            <div 
              key={f} 
              onClick={() => setFilter(f)}
              className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full px-5 cursor-pointer transition-all ${filter === f ? 'bg-primary text-white' : 'bg-[#2f2348] text-white hover:bg-[#3d2d5d]'}`}
            >
              <p className="text-sm font-medium">{f}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {filteredPackages.map((pkg) => (
          <div 
            key={pkg.id}
            onClick={() => onSelect(pkg)}
            className={`uc-card relative flex flex-col items-center p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
              selectedPackage?.id === pkg.id 
                ? 'border-primary bg-primary/10' 
                : 'border-[#443267] bg-[#1c152a]'
            }`}
          >
            {pkg.tag && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase z-10">{pkg.tag}</div>
            )}
            <div className="w-full aspect-square mb-3 flex items-center justify-center bg-black/20 rounded-lg overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-pubg-yellow/20 to-transparent"></div>
              <span className="material-symbols-outlined text-6xl text-pubg-yellow">layers</span>
            </div>
            <p className="text-white font-bold text-lg">{pkg.amount}</p>
            <p className="text-green-500 text-xs font-bold mt-1 uppercase tracking-wider">{pkg.bonus}</p>
            <div className={`mt-4 w-full py-2 rounded-lg text-center ${selectedPackage?.id === pkg.id ? 'bg-primary' : 'bg-[#2f2348]'}`}>
              <p className="text-white font-extrabold">{pkg.price.toLocaleString()} {pkg.currency}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Sticky Footer */}
      {selectedPackage && (
        <div className="fixed bottom-0 left-0 md:left-64 right-0 p-4 bg-[#161022]/80 backdrop-blur-md border-t border-[#2f2348] z-50 animate-in slide-in-from-bottom duration-300">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex flex-col">
              <p className="text-[#a492c9] text-xs font-medium uppercase">Selected Product</p>
              <div className="flex items-center gap-2">
                 <p className="text-white font-bold text-lg">{selectedPackage.amount}</p>
                 <span className="material-symbols-outlined text-primary text-base">check_circle</span>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right hidden sm:block">
                <p className="text-[#a492c9] text-xs font-medium uppercase">Total Price</p>
                <p className="text-primary font-extrabold text-2xl">{selectedPackage.price.toLocaleString()} {selectedPackage.currency}</p>
              </div>
              <button 
                onClick={onCheckout}
                className="flex min-w-[160px] items-center justify-center rounded-lg h-14 px-8 bg-primary text-white text-base font-bold transition-all active:scale-95 shadow-xl shadow-primary/30"
              >
                Checkout Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PUBGSelection;
