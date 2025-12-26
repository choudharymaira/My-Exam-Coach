
import React from 'react';
import { User, UserStats } from '../types';

interface DashboardProps {
  user: User;
  isNewUser: boolean;
  onStartCoach: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, isNewUser, onStartCoach }) => {
  const statsKey = `coach_stats_${user.id}`;
  const stats: UserStats = JSON.parse(localStorage.getItem(statsKey) || '{"totalQueries":0, "studyMinutes":0, "lastActive":0}');

  return (
    <div className="space-y-10 animate-fade-in">
      <header className="flex flex-col md:flex-row items-center gap-6">
        <div className="w-24 h-24 rounded-full bg-[#F5F5DC] flex items-center justify-center text-4xl shadow-inner border-4 border-white">
          {isNewUser ? '🌱' : '✨'}
        </div>
        <div className="text-center md:text-left">
          <h2 className="text-4xl font-black text-[#4A3728]">
            {isNewUser ? `Welcome, ${user.username}!` : `Welcome back, ${user.username}!`}
          </h2>
          <p className="text-xl text-[#8B5E3C] mt-1 font-medium italic">
            {isNewUser 
              ? "I'm so glad you decided to join our classroom." 
              : "Every day is a fresh start to learn something new."}
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Lessons Completed" value={stats.totalQueries} icon="📖" color="bg-blue-50" />
        <StatCard title="Study Minutes" value={`${stats.studyMinutes}m`} icon="⏳" color="bg-orange-50" />
        <StatCard title="Notebook Pages" value={stats.totalQueries} icon="📒" color="bg-green-50" />
      </div>

      <section className="bg-white p-8 rounded-3xl border border-[#E9DCC9] shadow-sm flex flex-col items-center text-center space-y-6">
        <div className="max-w-md">
          <h3 className="text-2xl font-bold text-[#4A3728]">Ready for a quick lesson?</h3>
          <p className="text-[#8B5E3C] mt-2">I've got my red pen ready (for feedback, not marking mistakes!) and a fresh cup of coffee. Let's tackle those tricky questions.</p>
        </div>
        <button 
          onClick={onStartCoach}
          className="px-12 py-4 bg-[#8B5E3C] text-white rounded-full font-black text-xl hover:bg-[#704B30] transition-all transform hover:scale-105 shadow-xl shadow-[#8B5E3C]/30"
        >
          Open AI Coach 🚀
        </button>
      </section>

      <div className="p-6 bg-[#FDFBF7] rounded-2xl border border-dashed border-[#D2B48C]">
        <h4 className="font-bold text-[#4A3728] mb-2 flex items-center gap-2">
          <span>💡</span> Study Tip of the Day
        </h4>
        <p className="text-sm text-[#8B5E3C] leading-relaxed">
          Did you know? Explaining a concept to a friend (or an AI!) is the best way to see if you truly understand it. examiners love when you use simple, clear examples!
        </p>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color }: { title: string, value: string | number, icon: string, color: string }) => (
  <div className={`p-6 rounded-3xl ${color} border border-black/5 flex items-center gap-4 transition-transform hover:-translate-y-1`}>
    <div className="text-3xl p-3 bg-white/50 rounded-2xl">{icon}</div>
    <div>
      <p className="text-xs font-bold text-black/40 uppercase tracking-widest">{title}</p>
      <p className="text-2xl font-black text-[#4A3728]">{value}</p>
    </div>
  </div>
);

export default Dashboard;
