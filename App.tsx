
import React, { useState, useMemo } from 'react';
import { Layout } from './components/Layout';
import Home from './pages/Home';
import MLBBSelection from './pages/MLBBSelection';
import PUBGSelection from './pages/PUBGSelection';
import Checkout from './pages/Checkout';
import History from './pages/History';
import Support from './pages/Support';
import { View, Package, User } from './types';
import { GAMES } from './constants';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedPackage, setSelectedPackage] = useState<Package | undefined>();
  const [searchQuery, setSearchQuery] = useState('');
  const [walletConnected, setWalletConnected] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  // Initial state is a Guest user
  const [user, setUser] = useState<User>({
    name: 'Guest User',
    id: 'GUEST-' + Math.floor(Math.random() * 10000),
    avatar: 'https://ui-avatars.com/api/?name=Guest&background=2f2348&color=a492c9',
    isConnected: false
  });

  const handleGameSelect = (gameId: string) => {
    setSearchQuery('');
    if (gameId === 'mlbb') setCurrentView('mlbb-diamonds');
    if (gameId === 'pubg') setCurrentView('pubg-uc');
  };

  const handlePackageSelect = (pkg: Package) => {
    setSelectedPackage(pkg);
    if (pkg.gameId === 'mlbb') {
        setCurrentView('checkout');
    }
  };

  const handleConnectTelegram = (username: string) => {
    setUser({
      name: username,
      id: 'TG-' + Math.floor(Math.random() * 100000),
      avatar: `https://ui-avatars.com/api/?name=${username}&background=0088cc&color=fff`,
      telegramUsername: username,
      isConnected: true
    });
    setShowLoginModal(false);
  };

  const filteredGames = useMemo(() => {
    return GAMES.filter(g => g.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery]);

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return <Home onGameSelect={handleGameSelect} onNavigate={setCurrentView} filteredGames={filteredGames} />;
      case 'mlbb-diamonds':
        return <MLBBSelection onSelect={handlePackageSelect} searchQuery={searchQuery} onSearch={setSearchQuery} />;
      case 'pubg-uc':
        return (
          <PUBGSelection 
            onSelect={setSelectedPackage} 
            selectedPackage={selectedPackage} 
            onCheckout={() => setCurrentView('checkout')}
            searchQuery={searchQuery}
          />
        );
      case 'checkout':
        return selectedPackage ? (
          <Checkout selectedPackage={selectedPackage} onNavigate={setCurrentView} />
        ) : (
          <Home onGameSelect={handleGameSelect} onNavigate={setCurrentView} filteredGames={filteredGames} />
        );
      case 'history':
        return <History onRepeatOrder={handleGameSelect} />;
      case 'support':
        return <Support />;
      default:
        return <Home onGameSelect={handleGameSelect} onNavigate={setCurrentView} filteredGames={filteredGames} />;
    }
  };

  return (
    <Layout 
      currentView={currentView} 
      onNavigate={setCurrentView} 
      user={user}
      onSearch={setSearchQuery}
      searchQuery={searchQuery}
      walletConnected={walletConnected}
      onConnectWallet={() => setWalletConnected(!walletConnected)}
      onOpenLogin={() => setShowLoginModal(true)}
    >
      {renderContent()}

      {/* Telegram Registration Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#1c152a] border border-[#443267] w-full max-w-md rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="bg-gradient-to-r from-[#0088cc] to-[#00aaff] p-8 text-center relative">
               <button onClick={() => setShowLoginModal(false)} className="absolute top-4 right-4 text-white/60 hover:text-white">
                  <span className="material-symbols-outlined">close</span>
               </button>
               <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white/30">
                  <span className="material-symbols-outlined text-white text-5xl">send</span>
               </div>
               <h3 className="text-2xl font-black text-white">Connect Telegram</h3>
               <p className="text-white/80 text-sm">Register to track your orders and get bonus!</p>
            </div>
            <div className="p-8">
               <form onSubmit={(e) => {
                 e.preventDefault();
                 const formData = new FormData(e.currentTarget);
                 handleConnectTelegram(formData.get('username') as string);
               }}>
                 <div className="mb-6">
                    <label className="block text-[#a492c9] text-xs font-bold uppercase tracking-wider mb-2">Telegram Username</label>
                    <div className="relative">
                       <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary font-bold">@</span>
                       <input 
                         name="username"
                         required
                         autoFocus
                         className="w-full bg-[#161022] border border-[#443267] rounded-xl pl-8 pr-4 py-4 text-white placeholder:text-[#a492c9]/40 focus:ring-2 focus:ring-[#0088cc] outline-none transition-all"
                         placeholder="your_username"
                       />
                    </div>
                 </div>
                 <button 
                   type="submit"
                   className="w-full bg-[#0088cc] hover:bg-[#0099e6] text-white font-black py-4 rounded-xl transition-all shadow-lg shadow-[#0088cc]/20 flex items-center justify-center gap-2"
                 >
                   Register Now
                   <span className="material-symbols-outlined">arrow_forward</span>
                 </button>
                 <p className="text-center text-[#a492c9] text-[10px] mt-4 uppercase font-bold tracking-widest">Secure & Instant Verification</p>
               </form>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default App;
