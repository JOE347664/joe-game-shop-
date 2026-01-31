
import React, { useState, useRef, useEffect } from 'react';
import { getSupportResponse } from '../services/gemini';
import { sendTelegramMessage } from '../services/telegram';
import { TELEGRAM_CHANNEL_URL, TELEGRAM_ADMIN_URL } from '../constants';

interface Message {
  role: 'user' | 'bot';
  text: string;
}

const Support: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ai' | 'telegram'>('ai');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: 'Hello! I am JOE GAME SHOP Support. How can I help you with your top-ups today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [tgName, setTgName] = useState('');
  const [tgMessage, setTgMessage] = useState('');
  const [tgSending, setTgSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleAISend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    const botMsg = await getSupportResponse(userMsg);
    setMessages(prev => [...prev, { role: 'bot', text: botMsg }]);
    setIsTyping(false);
  };

  const handleTelegramSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tgName.trim() || !tgMessage.trim()) return;

    setTgSending(true);
    const formattedText = `🚀 *New Direct Support Request*\n\n👤 *Name:* ${tgName}\n💬 *Message:* ${tgMessage}`;
    const success = await sendTelegramMessage(formattedText);

    setTgSending(false);
    if (success) {
      alert('Message sent! Admin will be notified. For faster response, you can also click "Chat Directly with Admin".');
      setTgName('');
      setTgMessage('');
    } else {
      alert('Bot Notification failed. Please ensure the Admin Chat ID is set in services/telegram.ts or use the Direct Chat button below.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto min-h-[70vh] flex flex-col pb-20">
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white">Contact Support</h1>
          <p className="text-[#a492c9]">Get help with your orders instantly.</p>
        </div>
        <div className="bg-[#2f2348] p-1 rounded-xl flex">
          <button 
            onClick={() => setActiveTab('ai')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'ai' ? 'bg-primary text-white shadow-lg' : 'text-[#a492c9] hover:text-white'}`}
          >
            AI Chat
          </button>
          <button 
            onClick={() => setActiveTab('telegram')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'telegram' ? 'bg-[#0088cc] text-white shadow-lg' : 'text-[#a492c9] hover:text-white'}`}
          >
            Telegram Admin
          </button>
        </div>
      </div>

      {activeTab === 'ai' ? (
        <div className="flex-1 bg-[#1c152a] rounded-2xl border border-[#443267] flex flex-col overflow-hidden h-[500px] shadow-2xl">
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-4 rounded-2xl ${
                  m.role === 'user' ? 'bg-primary text-white rounded-tr-none shadow-lg' : 'bg-[#2f2348] text-[#a492c9] rounded-tl-none'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-[#2f2348] text-[#a492c9] p-4 rounded-2xl rounded-tl-none animate-pulse">
                  Joe is thinking...
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-[#221933] border-t border-[#443267] flex gap-2">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAISend()}
              placeholder="Type your question..."
              className="flex-1 bg-[#161022] border-[#443267] rounded-xl text-white focus:ring-primary focus:border-primary px-4 py-3 outline-none transition-all"
            />
            <button 
              onClick={handleAISend}
              disabled={isTyping}
              className="bg-primary p-3 rounded-xl text-white hover:bg-primary/90 transition-all disabled:opacity-50 primary-glow"
            >
              <span className="material-symbols-outlined">send</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-[#1c152a] rounded-2xl border border-[#443267] p-8 shadow-2xl">
          <div className="flex flex-col sm:flex-row items-center gap-6 mb-8 bg-[#2f2348]/30 p-6 rounded-2xl border border-white/5">
            <div className="w-20 h-20 rounded-full bg-[#0088cc]/20 flex items-center justify-center flex-shrink-0 border-2 border-[#0088cc]/30">
               <span className="material-symbols-outlined text-[#0088cc] text-5xl">person</span>
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-2xl font-black text-white">Joe Game Admin</h3>
              <p className="text-[#a492c9] text-sm mb-4">Chat directly with Joe for urgent issues or bulk orders.</p>
              <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                <a 
                  href={TELEGRAM_ADMIN_URL} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#0088cc] hover:bg-[#0099e6] text-white px-6 py-2.5 rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg shadow-[#0088cc]/30"
                >
                  <span className="material-symbols-outlined">chat</span>
                  Chat with Admin
                </a>
                <a 
                  href={TELEGRAM_CHANNEL_URL} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#2f2348] hover:bg-[#3d2d5d] text-white px-6 py-2.5 rounded-xl font-bold transition-all border border-[#0088cc]/30"
                >
                  <span className="material-symbols-outlined">send</span>
                  Join Channel
                </a>
              </div>
            </div>
          </div>
          
          <div className="relative mb-8 text-center">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#443267]"></div></div>
            <span className="relative bg-[#1c152a] px-4 text-[#a492c9] text-xs font-bold uppercase">OR SEND A NOTIFICATION</span>
          </div>

          <form onSubmit={handleTelegramSend} className="space-y-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-[#a492c9]">Your Name / Phone Number</label>
              <input 
                required
                value={tgName}
                onChange={(e) => setTgName(e.target.value)}
                placeholder="Name or Account ID"
                className="w-full bg-[#161022] border border-[#443267] rounded-xl text-white focus:ring-2 focus:ring-[#0088cc] px-4 py-3 outline-none transition-all"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-[#a492c9]">Detailed Message</label>
              <textarea 
                required
                rows={3}
                value={tgMessage}
                onChange={(e) => setTgMessage(e.target.value)}
                placeholder="Explain your problem clearly..."
                className="w-full bg-[#161022] border border-[#443267] rounded-xl text-white focus:ring-2 focus:ring-[#0088cc] px-4 py-3 outline-none transition-all resize-none"
              ></textarea>
            </div>
            <button 
              type="submit"
              disabled={tgSending}
              className="w-full bg-[#2f2348] hover:bg-[#3d2d5d] text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 border border-white/5"
            >
              {tgSending ? 'Processing...' : (
                <>
                  Notify Admin via Bot
                  <span className="material-symbols-outlined text-sm">notifications_active</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-[#443267] text-center">
            <p className="text-[#a492c9] text-sm mb-4">Official Community Hub</p>
            <a href={TELEGRAM_CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[#0088cc] font-bold hover:underline bg-[#0088cc]/10 px-4 py-2 rounded-full transition-all">
               <span className="material-symbols-outlined text-lg">public</span>
               JOE GAME SHOP CHANNEL
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Support;
