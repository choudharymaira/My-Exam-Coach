
import React, { useState } from 'react';
import { User, HistoryItem } from '../types';
import ResultCard from './ResultCard';

interface HistoryProps {
  user: User;
}

const History: React.FC<HistoryProps> = ({ user }) => {
  const historyKey = `coach_history_${user.id}`;
  const history: HistoryItem[] = JSON.parse(localStorage.getItem(historyKey) || '[]');
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);

  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-20 text-center opacity-50">
        <span className="text-6xl mb-4">📓</span>
        <h3 className="text-xl font-bold text-[#4A3728]">Your notebook is empty!</h3>
        <p className="text-[#8B5E3C]">Start a conversation with the AI Coach to save your first lesson.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-[#4A3728]">My Study Notebooks</h2>
          <p className="text-[#8B5E3C]">All your past lessons stored in one safe place.</p>
        </div>
        {selectedItem && (
          <button 
            onClick={() => setSelectedItem(null)}
            className="text-sm font-bold text-[#8B5E3C] hover:text-[#4A3728]"
          >
            ← Back to List
          </button>
        )}
      </header>

      {selectedItem ? (
        <div className="animate-fade-in-up">
          <div className="bg-[#F5F5DC] p-4 rounded-t-2xl border border-[#E9DCC9] border-b-0">
            <p className="text-xs font-bold text-[#8B5E3C] uppercase mb-1">Question/Answer you wrote:</p>
            <p className="text-[#4A3728] italic">"{selectedItem.input.substring(0, 200)}{selectedItem.input.length > 200 ? '...' : ''}"</p>
          </div>
          <ResultCard response={selectedItem.response} />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {history.map((item) => (
            <div 
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group bg-white p-6 rounded-2xl border border-[#E9DCC9] hover:border-[#D2B48C] hover:shadow-md transition-all cursor-pointer flex justify-between items-center"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-[#D2B48C] bg-[#FDFBF7] px-2 py-0.5 rounded">
                    {new Date(item.timestamp).toLocaleDateString()}
                  </span>
                  <span className="text-xs text-[#8B5E3C]">
                    Lesson: {item.response.conceptExplanation.split('.')[0]}...
                  </span>
                </div>
                <h4 className="font-bold text-[#4A3728] line-clamp-1 group-hover:text-[#8B5E3C] transition-colors">
                  {item.input}
                </h4>
              </div>
              <span className="text-2xl transition-transform group-hover:translate-x-1">📖</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
