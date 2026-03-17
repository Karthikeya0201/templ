import { useState } from 'react';
import { Link, navigate } from '../Router';
import API_BASE_URL from '../api';

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Login failed');
      }

      localStorage.setItem('token', data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));

      console.log('Login successful');
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center p-6 selection:bg-indigo-500/30 font-sans">
      <div className="relative w-full max-w-[400px]">
        {/* Glow Effects */}
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-indigo-600/20 blur-[100px] -z-10 rounded-full" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-purple-600/10 blur-[100px] -z-10 rounded-full" />

        <div className="rounded-3xl border border-white/5 bg-white/5 p-10 backdrop-blur-3xl shadow-2xl">
          <div className="mb-10 text-center">
            <Link to="/" className="inline-flex h-12 w-12 rounded-2xl bg-indigo-600 mb-6 items-center justify-center shadow-lg shadow-indigo-500/20 hover:scale-105 transition-transform">
              <div className="h-6 w-6 border-2 border-white rounded-md" />
            </Link>
            <h1 className="text-3xl font-extrabold tracking-tight mb-2">Welcome Back</h1>
            <p className="text-neutral-400 text-sm">Sign in to continue your journey</p>
          </div>

          {error && (
            <div className="mb-6 rounded-xl bg-red-500/10 border border-red-500/20 p-4 text-xs font-bold text-red-500 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest pl-1 mb-2 block">
                Email Address
              </label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@email.com" 
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm outline-none ring-offset-neutral-950 transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2 pl-1">
                <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest block">
                  Password
                </label>
                <a href="#" className="text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
                  Forgot?
                </a>
              </div>
              <input 
                type="password" 
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••" 
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm outline-none ring-offset-neutral-950 transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                required
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className={`w-full mt-2 rounded-2xl bg-indigo-600 py-4 text-sm font-bold text-white shadow-xl shadow-indigo-500/20 hover:bg-indigo-500 hover:scale-[1.02] active:scale-[0.98] transition-all ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-neutral-500">
            Don't have an account?{' '}
            <Link to="/signup" className="font-bold text-white hover:text-indigo-400 transition-colors underline-offset-4 hover:underline">
              Join for free
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
