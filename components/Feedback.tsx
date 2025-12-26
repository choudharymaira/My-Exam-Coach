
import React, { useState } from 'react';
import { User } from '../types';

interface FeedbackProps {
  user: User;
}

const Feedback: React.FC<FeedbackProps> = ({ user }) => {
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send to a server
    console.log(`Feedback from ${user.username}: ${message}`);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-white p-12 rounded-3xl border border-[#E9DCC9] text-center space-y-4 animate-fade-in">
        <div className="text-5xl">💝</div>
        <h2 className="text-2xl font-black text-[#4A3728]">Thank you, {user.username}!</h2>
        <p className="text-[#8B5E3C] max-w-sm mx-auto">Your feedback means the world to me. I'll read it carefully as soon as I finish grading these papers!</p>
        <button 
          onClick={() => { setSubmitted(false); setMessage(''); }}
          className="mt-4 text-sm font-bold text-[#8B5E3C] hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <header>
        <h2 className="text-3xl font-black text-[#4A3728]">Talk to Your Coach</h2>
        <p className="text-[#8B5E3C]">Have a suggestion? Want to say thanks? I'm all ears!</p>
      </header>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl border border-[#E9DCC9] shadow-sm space-y-6">
        <div>
          <label className="block text-lg font-bold text-[#4A3728] mb-2">Your Message</label>
          <textarea
            className="w-full p-5 rounded-2xl border-2 border-[#F5F5DC] focus:border-[#D2B48C] focus:ring-0 text-[#4A3728] bg-[#FDFBF7] placeholder-[#D2B48C] transition-colors resize-none"
            rows={8}
            placeholder="Write your note here... (e.g. 'I'd love more science examples!')"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={!message.trim()}
          className="w-full py-4 bg-[#8B5E3C] text-white rounded-xl font-bold text-lg hover:bg-[#704B30] disabled:opacity-50 transition-all shadow-lg"
        >
          Send Feedback 🕊️
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-6 bg-yellow-50 rounded-2xl border border-yellow-100 flex gap-4">
          <span className="text-2xl">👩‍🏫</span>
          <p className="text-sm text-[#8B5E3C]">I personally read every piece of feedback to help underprivileged students like you even more!</p>
        </div>
        <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 flex gap-4">
          <span className="text-2xl">🔒</span>
          <p className="text-sm text-[#8B5E3C]">Your data is safe and kept private to your account.</p>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
