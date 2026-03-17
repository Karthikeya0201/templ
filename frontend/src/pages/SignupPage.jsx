import { useState } from 'react';
import { Link, navigate } from '../Router';
import API_BASE_URL from '../api';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const payload = {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        password: formData.password
      };

      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Signup failed');
      }

      // Save token and user info
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));

      console.log('Signup successful');
      navigate('/');
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
      <div className="relative w-full max-w-[440px]">
        {/* Glow Effects */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-indigo-600/20 blur-[100px] -z-10 rounded-full" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-purple-600/10 blur-[100px] -z-10 rounded-full" />

        <div className="rounded-3xl border border-white/5 bg-white/5 p-10 backdrop-blur-3xl shadow-2xl">
          <div className="mb-10 text-center">
            <Link to="/" className="inline-flex h-12 w-12 rounded-2xl bg-indigo-600 mb-6 items-center justify-center shadow-lg shadow-indigo-500/20 hover:scale-105 transition-transform">
              <div className="h-6 w-6 border-2 border-white rounded-md" />
            </Link>
            <h1 className="text-3xl font-extrabold tracking-tight mb-2">Create Account</h1>
            <p className="text-neutral-400 text-sm">Join our platform today</p>
          </div>

          {error && (
            <div className="mb-6 rounded-xl bg-red-500/10 border border-red-500/20 p-4 text-xs font-bold text-red-500 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest pl-1 mb-2 block">
                  First Name
                </label>
                <input 
                  type="text" 
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Jane" 
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm outline-none ring-offset-neutral-950 transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest pl-1 mb-2 block">
                  Last Name
                </label>
                <input 
                  type="text" 
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe" 
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm outline-none ring-offset-neutral-950 transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  required
                />
              </div>
            </div>

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
              <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest pl-1 mb-2 block">
                Password
              </label>
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
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-neutral-500">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-white hover:text-indigo-400 transition-colors underline-offset-4 hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
