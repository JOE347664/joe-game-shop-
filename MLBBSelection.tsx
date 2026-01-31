
import React, { useState, useMemo } from 'react';
import { MLBB_PACKAGES } from '../constants';
import { Package } from '../types';

interface MLBBSelectionProps {
  onSelect: (pkg: Package) => void;
  searchQuery: string;
  onSearch: (query: string) => void;
}

const MLBBSelection: React.FC<MLBBSelectionProps> = ({ onSelect, searchQuery, onSearch }) => {
  const [topupType, setTopupType] = useState<'direct' | 'pin'>('direct');
  const [category, setCategory] = useState<'standard' | 'weekly' | 'starlight'>('standard');

  const filteredPackages = useMemo(() => {
    return MLBB_PACKAGES.filter(pkg => {
      const matchesSearch = pkg.amount.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            (pkg.tag && pkg.tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      if (!matchesSearch) return false;

      // Category filtering logic
      const amountLower = pkg.amount.toLowerCase();
      if (category === 'weekly') {
        return amountLower.includes('weekly');
      } else if (category === 'starlight') {
        return amountLower.includes('starlight') || amountLower.includes('twilight');
      } else {
        // Standard diamonds (exclude passes if standard is selected)
        return amountLower.includes('diamonds') && !amountLower.includes('weekly');
      }
    });
  }, [searchQuery, category]);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-[#a492c9] text-sm font-medium cursor-pointer hover:text-white">Home</span>
        <span className="material-symbols-outlined text-sm text-[#a492c9]">chevron_right</span>
        <span className="text-white text-sm font-bold">MLBB Diamonds</span>
      </div>

      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-white text-4xl font-black tracking-tight">Select Diamond Package</h1>
          <p className="text-[#a492c9] text-lg max-w-2xl">Recharge your Mobile Legends account instantly. Select the best value package below.</p>
        </div>
        <div className="bg-[#2f2348] p-1 rounded-lg flex items-center self-start">
          <button 
            onClick={() => setTopupType('direct')}
            className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${topupType === 'direct' ? 'bg-primary text-white' : 'text-[#a492c9] hover:text-white'}`}
          >
            Direct Topup
          </button>
          <button 
            onClick={() => setTopupType('pin')}
            className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${topupType === 'pin' ? 'bg-primary text-white' : 'text-[#a492c9] hover:text-white'}`}
          >
            Pin Codes
          </button>
        </div>
      </div>

      <div className="mb-8 border-b border-[#2f2348] flex gap-8 overflow-x-auto no-scrollbar">
        <button 
          onClick={() => setCategory('standard')}
          className={`pb-4 border-b-2 transition-all text-sm font-bold flex items-center gap-2 whitespace-nowrap ${category === 'standard' ? 'border-primary text-white' : 'border-transparent text-[#a492c9] hover:text-white'}`}
        >
          <span className="material-symbols-outlined text-lg">diamond</span>
          Standard Packages
        </button>
        <button 
          onClick={() => setCategory('weekly')}
          className={`pb-4 border-b-2 transition-all text-sm font-bold flex items-center gap-2 whitespace-nowrap ${category === 'weekly' ? 'border-primary text-white' : 'border-transparent text-[#a492c9] hover:text-white'}`}
        >
          <span className="material-symbols-outlined text-lg">event_available</span>
          Weekly Pass
        </button>
        <button 
          onClick={() => setCategory('starlight')}
          className={`pb-4 border-b-2 transition-all text-sm font-bold flex items-center gap-2 whitespace-nowrap ${category === 'starlight' ? 'border-primary text-white' : 'border-transparent text-[#a492c9] hover:text-white'}`}
        >
          <span className="material-symbols-outlined text-lg">workspace_premium</span>
          Pass & Bundles
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
        {filteredPackages.length > 0 ? filteredPackages.map((pkg) => (
          <div 
            key={pkg.id} 
            onClick={() => onSelect(pkg)}
            className="diamond-card bg-[#231a37] border border-[#2f2348] rounded-2xl p-6 transition-all cursor-pointer flex flex-col items-center group overflow-hidden relative"
          >
            {pkg.tag === 'Popular' && <div className="absolute top-0 left-0 bg-primary w-full h-1"></div>}
            <div className="relative mb-4 w-full flex justify-center py-6 bg-gradient-to-b from-primary/10 to-transparent rounded-xl">
              <div 
                className="size-20 bg-contain bg-no-repeat bg-center" 
                style={{ backgroundImage: `url(${pkg.image})` }}
              ></div>
              {pkg.tag && (
                <span className={`absolute top-2 right-2 text-white text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-widest ${
                  pkg.tag === 'Popular' ? 'bg-yellow-500 text-black' : pkg.tag === 'Best Value' ? 'bg-red-500' : 'bg-primary'
                }`}>
                  {pkg.tag}
                </span>
              )}
            </div>
            <h3 className="text-white text-lg font-extrabold mb-1 text-center">{pkg.amount}</h3>
            <div className="flex items-center gap-2 mb-6">
              <span className="text-primary text-xs font-bold px-2 py-0.5 bg-primary/20 rounded-full">{pkg.bonus}</span>
            </div>
            <button className="w-full bg-[#2f2348] group-hover:bg-primary py-3 rounded-xl text-white font-bold transition-all flex justify-between px-4 items-center">
              <span className="text-sm">Buy Now</span>
              <span className="bg-black/20 px-2 py-1 rounded-md text-xs">{pkg.price.toLocaleString()} {pkg.currency}</span>
            </button>
          </div>
        )) : (
          <div className="col-span-full py-20 text-center bg-white/5 rounded-2xl border border-dashed border-white/10">
             <p className="text-[#a492c9]">No packages found in this category.</p>
             {/* Fix: use onSearch instead of the undefined setSearchQuery */}
             <button onClick={() => {setCategory('standard'); onSearch('');}} className="mt-4 text-primary font-bold hover:underline">View All Diamonds</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MLBBSelection;
