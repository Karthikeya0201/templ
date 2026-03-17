import { useState, useEffect } from 'react';
import { Link, navigate } from '../Router';

export default function LandingPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white selection:bg-indigo-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-neutral-950/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-indigo-600 shadow-lg shadow-indigo-500/20" />
            <span className="text-xl font-bold tracking-tight">Antigravity</span>
          </Link>
          <div className="flex items-center gap-6">
            {!user ? (
              <>
                <Link to="/login" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">
                  Sign In
                </Link>
                <Link to="/signup" className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-neutral-950 hover:bg-neutral-200 transition-all">
                  Get Started
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold text-indigo-400">Hi, {user.name}</span>
                <button 
                  onClick={handleLogout}
                  className="rounded-full bg-white/5 border border-white/10 px-5 py-2.5 text-sm font-semibold hover:bg-white/10 transition-all"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative pt-32 pb-20 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-indigo-600/20 blur-[120px] -z-10 rounded-full" />
        <div className="absolute top-[20%] -right-20 w-96 h-96 bg-purple-600/10 blur-[100px] -z-10 rounded-full" />

        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <h1 className="animate-in fade-in slide-in-from-bottom-4 duration-1000 bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent sm:text-7xl">
              Connected & <br />
              <span className="text-indigo-400">Cloud Ready</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-400 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
              Build, deploy, and scale your applications with unprecedented speed and elegance. 
              The ultimate platform for forward-thinking teams.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400">
              <Link to="/signup" className="rounded-full bg-indigo-600 px-8 py-4 text-sm font-semibold text-white shadow-xl shadow-indigo-500/25 hover:bg-indigo-500 hover:scale-105 transition-all">
                Start Free Trial
              </Link>
              <button className="rounded-full bg-white/5 px-8 py-4 text-sm font-semibold border border-white/10 hover:bg-white/10 transition-all">
                View Demo
              </button>
            </div>
          </div>

          {/* Feature Grid */}
          <div className="mt-32 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {[
              {
                title: 'FastAPI Backend',
                desc: 'Blazing fast Python backend with MongoDB integration and JWT security.',
                icon: '⚡'
              },
              {
                title: 'Premium Frontend',
                desc: 'Stunning React interface with custom routing and modern aesthetics.',
                icon: '✨'
              },
              {
                title: 'Scalable Database',
                desc: 'NoSQL architecture ready for high-concurrency workloads.',
                icon: '🔋'
              }
            ].map((feature, i) => (
              <div 
                key={i} 
                className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/5 p-8 transition-all hover:bg-white/[0.07] hover:border-white/10"
              >
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-indigo-400 transition-colors">{feature.title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12">
        <div className="mx-auto max-w-7xl px-6 flex flex-col items-center justify-between gap-6 sm:flex-row text-sm text-neutral-500">
          <p>© 2026 Antigravity Inc. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-neutral-300 transition-colors">Privacy</a>
            <a href="#" className="hover:text-neutral-300 transition-colors">Terms</a>
            <a href="#" className="hover:text-neutral-300 transition-colors">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
