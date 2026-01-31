
import React from 'react';
import { Game, View } from '../types';
import { TELEGRAM_CHANNEL_URL } from '../constants';

interface HomeProps {
  onGameSelect: (gameId: string) => void;
  onNavigate: (view: View) => void;
  filteredGames: Game[];
}

const Home: React.FC<HomeProps> = ({ onGameSelect, onNavigate, filteredGames }) => {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="mb-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/20 to-transparent border border-white/5">
          <div className="absolute inset-0 z-0 bg-cover bg-center opacity-30 mix-blend-overlay" style={{ backgroundImage: `url('https://picsum.photos/1200/400?blur=10')` }}></div>
          <div className="relative z-10 px-6 py-10 md:py-16 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-[10px] md:text-xs font-bold uppercase tracking-wider mb-4">
                <span className="material-symbols-outlined text-sm">auto_awesome</span>
                New User Special
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-4 tracking-tight">
                Boost Your Gaming <br className="hidden md:block"/>Experience <span className="text-primary">10% Faster</span>
              </h1>
              <p className="text-slate-400 text-sm md:text-lg mb-8 max-w-md mx-auto md:mx-0">
                Get 10% Extra Diamonds or UC on your very first top-up. Instant delivery through our secure bot.
              </p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <button 
                  onClick={() => onNavigate('mlbb-diamonds')}
                  className="bg-primary hover:bg-primary/90 text-white px-6 md:px-8 py-3 rounded-xl font-bold transition-all primary-glow text-sm md:text-base"
                >
                  Claim Now
                </button>
                <button 
                  onClick={() => alert("Simple: 1. Select Game, 2. Choose Pack, 3. Pay, 4. Instant Delivery!")}
                  className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-6 md:px-8 py-3 rounded-xl font-bold transition-all text-sm md:text-base"
                >
                  How it works
                </button>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="bg-primary/10 p-4 rounded-2xl border border-primary/20 rotate-3 primary-glow">
                <div className="bg-background-dark/80 p-6 rounded-xl border border-white/5 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center">
                      <span className="material-symbols-outlined text-green-500 text-sm">verified</span>
                    </div>
                    <span className="text-xs font-bold text-slate-400">Transaction Successful</span>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">+5,000 Diamonds</div>
                  <div className="text-xs text-slate-500">Delivered to ID: 12345678 (9012)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Telegram Community Section */}
      <section className="mb-10">
         <a 
           href={TELEGRAM_CHANNEL_URL} 
           target="_blank" 
           rel="noopener noreferrer"
           className="flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-[#0088cc]/10 to-[#0088cc]/5 border border-[#0088cc]/30 rounded-2xl p-6 hover:bg-[#0088cc]/15 transition-all group"
         >
            <div className="flex items-center gap-4 text-center md:text-left flex-col md:flex-row">
               <div className="size-14 md:size-16 bg-[#0088cc] rounded-full flex items-center justify-center shadow-lg shadow-[#0088cc]/30 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-white text-3xl">send</span>
               </div>
               <div>
                  <h3 className="text-lg md:text-xl font-black text-white">Join Our Telegram Community</h3>
                  <p className="text-[#a492c9] text-xs md:text-sm font-medium">Get latest price updates and giveaway news!</p>
               </div>
            </div>
            <div className="flex items-center gap-3 bg-[#0088cc] text-white px-6 md:px-8 py-3 rounded-xl font-black text-xs md:text-sm uppercase tracking-widest shadow-lg shadow-[#0088cc]/20 w-full md:w-auto justify-center">
               Join Channel
               <span className="material-symbols-outlined text-base">open_in_new</span>
            </div>
         </a>
      </section>

      {/* Section Header */}
      <div className="flex items-center justify-between mb-6 px-1">
        <div>
          <h2 className="text-xl md:text-2xl font-extrabold text-white flex items-center gap-2">
            Game Top Up
            <span className="h-1 w-1 rounded-full bg-primary"></span>
          </h2>
        </div>
      </div>

      {/* Game Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-12">
        {filteredGames.length > 0 ? filteredGames.map((game) => (
          <div 
            key={game.id}
            onClick={() => onGameSelect(game.id)}
            className="group relative h-[260px] md:h-[320px] rounded-2xl overflow-hidden cursor-pointer border border-white/5 transition-all duration-300"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" 
              style={{ 
                backgroundImage: `linear-gradient(to top, rgba(22, 16, 34, 0.95) 15%, rgba(22, 16, 34, 0.4) 50%, rgba(22, 16, 34, 0.1) 100%), url(${game.image})` 
              }}
            ></div>
            {game.popular && (
              <div className="absolute top-4 left-4 bg-primary text-white text-[9px] font-black px-2 py-1 rounded uppercase tracking-widest z-10">Popular</div>
            )}
            <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
              <div className="mb-3 md:mb-4">
                <h3 className="text-xl md:text-2xl font-extrabold text-white mb-0.5">{game.name}</h3>
                <p className="text-slate-300 text-xs md:text-sm font-medium">{game.description}</p>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block font-bold uppercase leading-none mb-1">Starting</span>
                  <span className="text-lg md:text-xl font-bold text-white">{game.startingPrice}</span>
                </div>
                <button className="bg-primary hover:bg-white hover:text-primary text-white px-4 md:px-6 py-2 md:py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 text-sm">
                  Buy
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        )) : (
          <div className="col-span-full py-16 text-center bg-white/5 rounded-2xl border border-dashed border-white/10 px-4">
             <p className="text-[#a492c9] text-sm">No games found matching your search.</p>
             <button onClick={() => onGameSelect('mlbb')} className="mt-4 text-primary font-bold hover:underline">View All Games</button>
          </div>
        )}
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-10">
        {[
          { icon: 'bolt', title: 'Instant', sub: 'Delivery' },
          { icon: 'shield_lock', title: 'Secure', sub: 'Payments' },
          { icon: 'support_agent', title: '24/7', sub: 'Support' },
          { icon: 'groups', title: '50k+', sub: 'Users' },
        ].map((badge, idx) => (
          <div key={idx} className="flex flex-col items-center text-center p-4 md:p-6 bg-white/5 rounded-2xl border border-white/5 transition-all hover:bg-white/10">
            <span className="material-symbols-outlined text-primary mb-1 md:mb-2 text-3xl md:text-4xl">{badge.icon}</span>
            <span className="text-sm md:text-xl font-bold text-white">{badge.title}</span>
            <span className="text-[10px] md:text-xs text-[#a492c9] uppercase tracking-tighter">{badge.sub}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
