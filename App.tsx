
import React, { useState, useEffect, useRef } from 'react';
import { User, HistoryItem, CoachResponse } from './types';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import History from './components/History';
import Feedback from './components/Feedback';
import LoadingSpinner from './components/LoadingSpinner';
import ResultCard from './components/ResultCard';
import { getCoachFeedback } from './services/gemini';

type View = 'dashboard' | 'coach' | 'history' | 'feedback';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [isNewUserSession, setIsNewUserSession] = useState(false);
  const [loading, setLoading] = useState(false);
  const [coachInput, setCoachInput] = useState('');
  const [lastResponse, setLastResponse] = useState<CoachResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Persist user session
  useEffect(() => {
    const savedUser = localStorage.getItem('coach_current_user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      // If loading from storage, it's not a fresh signup session
      setIsNewUserSession(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('coach_current_user');
    setCurrentUser(null);
    setIsNewUserSession(false);
    setActiveView('dashboard');
  };

  const saveToHistory = (input: string, response: CoachResponse) => {
    if (!currentUser) return;
    const historyKey = `coach_history_${currentUser.id}`;
    const existingHistoryRaw = localStorage.getItem(historyKey);
    const history: HistoryItem[] = existingHistoryRaw ? JSON.parse(existingHistoryRaw) : [];
    
    const newItem: HistoryItem = {
      id: Math.random().toString(36).substr(2, 9),
      userId: currentUser.id,
      timestamp: Date.now(),
      input,
      response
    };
    
    localStorage.setItem(historyKey, JSON.stringify([newItem, ...history]));
    
    // Update stats
    const statsKey = `coach_stats_${currentUser.id}`;
    const stats = JSON.parse(localStorage.getItem(statsKey) || '{"totalQueries":0, "studyMinutes":0}');
    stats.totalQueries += 1;
    stats.studyMinutes += 15; // Assume 15 mins per interaction for simulation
    localStorage.setItem(statsKey, JSON.stringify(stats));
  };

  const handleCoachSubmit = async () => {
    if (!coachInput.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const feedback = await getCoachFeedback(coachInput);
      setLastResponse(feedback);
      saveToHistory(coachInput, feedback);
    } catch (err) {
      setError("I had a little trouble thinking there. Could you please try again?");
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) {
    return <Auth onLogin={(user, isNew) => {
      setCurrentUser(user);
      setIsNewUserSession(isNew);
      localStorage.setItem('coach_current_user', JSON.stringify(user));
    }} />;
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <nav className="w-full md:w-64 bg-white border-r border-[#E9DCC9] flex flex-col p-6 space-y-8">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🎓</span>
          <h1 className="text-xl font-bold text-[#4A3728]">Exam Coach</h1>
        </div>

        <div className="flex-1 space-y-2">
          <NavItem active={activeView === 'dashboard'} onClick={() => setActiveView('dashboard')} icon="🏠" label="Dashboard" />
          <NavItem active={activeView === 'coach'} onClick={() => setActiveView('coach')} icon="✍️" label="AI Coach" />
          <NavItem active={activeView === 'history'} onClick={() => setActiveView('history')} icon="📚" label="My Notebooks" />
          <NavItem active={activeView === 'feedback'} onClick={() => setActiveView('feedback')} icon="💌" label="Feedback" />
        </div>

        <div className="pt-6 border-t border-[#E9DCC9]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#D2B48C] flex items-center justify-center text-white font-bold">
              {currentUser.username[0].toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-[#4A3728] truncate">{currentUser.username}</p>
              <p className="text-xs text-[#8B5E3C] truncate">{currentUser.email}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 md:p-10">
        <div className="max-w-4xl mx-auto">
          {activeView === 'dashboard' && (
            <Dashboard 
              user={currentUser} 
              isNewUser={isNewUserSession} 
              onStartCoach={() => setActiveView('coach')} 
            />
          )}
          
          {activeView === 'coach' && (
            <div className="space-y-8 animate-fade-in">
              <header className="mb-8">
                <h2 className="text-3xl font-black text-[#4A3728]">The Classroom</h2>
                <p className="text-[#8B5E3C]">Let's master this concept together.</p>
              </header>

              <section className="bg-white p-6 md:p-8 rounded-3xl border border-[#E9DCC9] shadow-sm">
                <label className="block text-lg font-bold text-[#8B5E3C] mb-4">What's on your mind today?</label>
                <textarea
                  className="w-full p-5 rounded-2xl border-2 border-[#F5F5DC] focus:border-[#D2B48C] focus:ring-0 text-[#4A3728] bg-[#FDFBF7] placeholder-[#D2B48C] transition-colors resize-none"
                  rows={6}
                  placeholder="Paste an exam question or your answer draft..."
                  value={coachInput}
                  onChange={(e) => setCoachInput(e.target.value)}
                />
                <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <span className="text-xs text-[#8B5E3C] italic italic">"Don't worry about being perfect, that's what I'm here for!"</span>
                  <button
                    disabled={loading || !coachInput.trim()}
                    onClick={handleCoachSubmit}
                    className="px-8 py-3 bg-[#8B5E3C] text-white rounded-full font-bold hover:bg-[#704B30] disabled:opacity-50 transition-all shadow-md active:scale-95"
                  >
                    {loading ? 'Thinking...' : 'Coach Me! ✨'}
                  </button>
                </div>
              </section>

              {loading && <LoadingSpinner />}
              {error && <div className="p-4 bg-red-50 text-red-700 rounded-xl text-center">{error}</div>}
              {lastResponse && !loading && (
                <div className="pt-8">
                  <ResultCard response={lastResponse} />
                </div>
              )}
            </div>
          )}

          {activeView === 'history' && <History user={currentUser} />}
          {activeView === 'feedback' && <Feedback user={currentUser} />}
        </div>
      </main>
    </div>
  );
};

const NavItem = ({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: string, label: string }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
      active ? 'bg-[#F5F5DC] text-[#4A3728] font-bold shadow-sm' : 'text-[#8B5E3C] hover:bg-[#FDFBF7]'
    }`}
  >
    <span className="text-xl">{icon}</span>
    <span>{label}</span>
  </button>
);

export default App;
