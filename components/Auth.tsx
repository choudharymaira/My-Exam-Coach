
import React, { useState } from 'react';
import { User } from '../types';

interface AuthProps {
  onLogin: (user: User, isNew: boolean) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      // Login Logic
      const users: User[] = JSON.parse(localStorage.getItem('coach_users') || '[]');
      const user = users.find(u => (u.email === email || u.username === email) && u.password === password);
      
      if (user) {
        onLogin(user, false);
      } else {
        setError("Hmm, that doesn't match our records. Try again?");
      }
    } else {
      // Signup Logic
      if (!username || !email || !password) {
        setError("Please fill in all the fields!");
        return;
      }
      const users: User[] = JSON.parse(localStorage.getItem('coach_users') || '[]');
      if (users.find(u => u.email === email || u.username === username)) {
        setError("Someone is already using that email or username!");
        return;
      }

      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        username,
        email,
        password,
        createdAt: Date.now()
      };

      users.push(newUser);
      localStorage.setItem('coach_users', JSON.stringify(users));
      onLogin(newUser, true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#FDFBF7]">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl border border-[#E9DCC9] shadow-2xl space-y-8 animate-fade-in-up">
        <div className="text-center">
          <div className="inline-block p-4 bg-[#F5F5DC] rounded-full mb-4 shadow-inner">
            <span className="text-5xl">🎓</span>
          </div>
          <h1 className="text-3xl font-black text-[#4A3728]">
            {isLogin ? 'Welcome Back!' : 'Start Your Journey'}
          </h1>
          <p className="text-[#8B5E3C] mt-2 font-medium">
            {isLogin ? 'Ready to ace your next exam?' : 'Join our friendly classroom today.'}
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-5">
          {!isLogin && (
            <div>
              <label className="block text-sm font-bold text-[#4A3728] mb-1 ml-1">Display Name</label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-xl border-2 border-[#E9DCC9] focus:border-[#8B5E3C] outline-none transition-all text-[#4A3728] bg-white placeholder-[#D2B48C] font-medium"
                placeholder="How should I call you?"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          )}
          
          <div>
            <label className="block text-sm font-bold text-[#4A3728] mb-1 ml-1">
              {isLogin ? 'Email or Username' : 'Email Address'}
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-xl border-2 border-[#E9DCC9] focus:border-[#8B5E3C] outline-none transition-all text-[#4A3728] bg-white placeholder-[#D2B48C] font-medium"
              placeholder={isLogin ? "Your email or username" : "e.g. topper@school.com"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-bold text-[#4A3728] mb-1 ml-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-3 rounded-xl border-2 border-[#E9DCC9] focus:border-[#8B5E3C] outline-none transition-all text-[#4A3728] bg-white placeholder-[#D2B48C] font-medium pr-12"
                placeholder="Your secret password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#8B5E3C] hover:text-[#4A3728] transition-colors focus:outline-none"
                title={showPassword ? "Hide Password" : "Show Password"}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 text-sm py-2 px-3 rounded-lg text-center font-bold border border-red-100 animate-shake">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-4 bg-[#8B5E3C] text-white rounded-2xl font-black text-xl hover:bg-[#704B30] transition-all transform active:scale-95 shadow-xl shadow-[#8B5E3C]/30 mt-2"
          >
            {isLogin ? 'Login 🚪' : 'Sign Up ✍️'}
          </button>
        </form>

        <div className="text-center pt-2">
          <button
            onClick={() => { setIsLogin(!isLogin); setError(''); setShowPassword(false); }}
            className="text-[#8B5E3C] text-sm font-bold hover:text-[#4A3728] transition-colors underline decoration-dotted underline-offset-4"
          >
            {isLogin ? "New here? Create an account" : "Already have an account? Login here"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
