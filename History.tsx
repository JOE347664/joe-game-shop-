
import React from 'react';
import { ORDERS } from '../constants';

interface HistoryProps {
  onRepeatOrder?: (gameId: string) => void;
}

const History: React.FC<HistoryProps> = ({ onRepeatOrder }) => {
  const handleExport = () => {
    alert("Generating CSV report... Your download will begin shortly.");
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-wrap justify-between items-end gap-3 mb-8">
        <div className="flex flex-col gap-2">
          <p className="text-white text-4xl font-black leading-tight tracking-tight">Order History</p>
          <p className="text-[#a492c9] text-base font-normal leading-normal">Manage your game top-ups and digital assets across all games.</p>
        </div>
        <button 
          onClick={handleExport}
          className="flex items-center gap-2 px-6 bg-[#2f2348] hover:bg-[#3d2d5d] text-white rounded-lg h-11 text-sm font-bold transition-all shadow-lg"
        >
          <span className="material-symbols-outlined text-sm">download</span>
          <span>Export Report</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { label: 'Total Orders', value: '1,248', change: '+12% from last month', icon: 'receipt_long', color: 'text-primary' },
          { label: 'Recent Spend', value: '850,000 MMK', change: 'Current Month', icon: 'payments', color: 'text-primary' },
          { label: 'Active Orders', value: '3', change: 'Processing delivery', icon: 'pending_actions', color: 'text-primary' },
        ].map((stat, i) => (
          <div key={i} className="flex flex-col gap-2 rounded-xl p-6 border border-[#443267] bg-[#1f1631] shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-[#a492c9] text-sm font-medium">{stat.label}</p>
              <span className={`material-symbols-outlined ${stat.color}`}>{stat.icon}</span>
            </div>
            <p className="text-white text-3xl font-bold leading-tight">{stat.value}</p>
            <p className={`text-xs font-semibold ${stat.label === 'Active Orders' ? 'text-amber-500' : stat.label === 'Total Orders' ? 'text-green-500' : 'text-gray-400'}`}>
              {stat.change}
            </p>
          </div>
        ))}
      </div>

      <div className="overflow-hidden rounded-xl border border-[#443267] bg-[#1f1631] shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-[#221933] border-b border-[#443267]">
                <th className="px-6 py-4 text-white text-xs font-bold uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-4 text-white text-xs font-bold uppercase tracking-wider">Service</th>
                <th className="px-6 py-4 text-white text-xs font-bold uppercase tracking-wider">Amount / Package</th>
                <th className="px-6 py-4 text-white text-xs font-bold uppercase tracking-wider">Date & Time</th>
                <th className="px-6 py-4 text-white text-xs font-bold uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-white text-xs font-bold uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#443267]">
              {ORDERS.map((order) => (
                <tr key={order.id} className="hover:bg-primary/5 transition-colors group">
                  <td className="px-6 py-5">
                    <span className="text-white font-mono text-sm">{order.id}</span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded flex items-center justify-center font-bold text-xs ${
                        order.serviceCode === 'ML' ? 'bg-primary/20 text-primary' : 'bg-amber-500/20 text-amber-500'
                      }`}>
                        {order.serviceCode}
                      </div>
                      <span className="text-white text-sm font-semibold">{order.service}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-white text-sm font-medium">{order.amount}</div>
                    <div className="text-[#a492c9] text-xs">{order.price}</div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-white text-sm">{order.date}</div>
                    <div className="text-[#a492c9] text-xs">{order.time}</div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${
                      order.status === 'Success' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                      order.status === 'Processing' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                      'bg-red-500/10 text-red-500 border-red-500/20'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full mr-2 ${
                        order.status === 'Success' ? 'bg-green-500' :
                        order.status === 'Processing' ? 'bg-amber-500' : 'bg-red-500'
                      }`}></span>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button 
                      onClick={() => onRepeatOrder?.(order.serviceCode === 'ML' ? 'mlbb' : 'pubg')}
                      className="bg-primary hover:bg-primary/80 text-white text-xs font-bold py-2 px-4 rounded-lg transition-all shadow-md active:scale-95"
                    >
                      Repeat Order
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default History;
