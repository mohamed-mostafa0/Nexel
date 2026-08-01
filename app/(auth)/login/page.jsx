'use client';

import React, { useState, useEffect } from 'react';

const TriangleLogo = ({ className = 'w-7 h-7 text-white' }) => (
  <svg viewBox="0 0 76 65" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="currentColor" />
  </svg>
);

const GithubIcon = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const TerminalIcon = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="4 17 10 11 4 5" />
    <line x1="12" y1="19" x2="20" y2="19" />
  </svg>
);

const GlobeIcon = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const SparklesIcon = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
    <path d="M20 3v4" />
    <path d="M22 5h-4" />
    <path d="M4 17v2" />
    <path d="M5 18H3" />
  </svg>
);

const CheckCircleIcon = ({ className = 'w-4 h-4 text-emerald-400' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const ShieldCheckIcon = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export default function Login() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [authStatus, setAuthStatus] = useState('idle'); 
  const [activeTab, setActiveTab] = useState('terminal');
  const [logIndex, setLogIndex] = useState(0);

  const buildLogs = [
    { type: 'cmd', text: 'git commit -m "feat: edge-first architecture & zero-config OAuth"' },
    { type: 'cmd', text: 'git push origin main' },
    { type: 'system', text: '⚡ Hook received from GitHub App (SHA: #7a9c8f2)' },
    { type: 'info', text: '📦 Installing dependencies via bun (142 packages)... done in 680ms' },
    { type: 'build', text: '⚙️ Optimizing Next.js SSR functions & serverless middleware...' },
    { type: 'success', text: '✓ Edge Network propagated globally across 38 regions in 290ms' },
    { type: 'url', text: 'https://deployx-app-git-main.vercel.cloud' },
  ];

  const edgeNodes = [
    { city: 'Washington, D.C. (IAD)', latency: '12ms', status: 'Optimal' },
    { city: 'Frankfurt, Germany (FRA)', latency: '18ms', status: 'Optimal' },
    { city: 'Tokyo, Japan (NRT)', latency: '24ms', status: 'Optimal' },
    { city: 'São Paulo, Brazil (GRU)', latency: '38ms', status: 'Optimal' },
    { city: 'Sydney, Australia (SYD)', latency: '42ms', status: 'Optimal' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setLogIndex((prev) => (prev + 1) % (buildLogs.length + 1));
    }, 1800);
    return () => clearInterval(timer);
  }, [buildLogs.length]);

  const handleGithubLogin = () => {
    if (isConnecting || authStatus === 'success') return;
    setIsConnecting(true);
    setAuthStatus('loading');

    setTimeout(() => {
      setIsConnecting(false);
      setAuthStatus('success');
    }, 2500);
  };

  const resetDemo = () => {
    setIsConnecting(false);
    setAuthStatus('idle');
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans antialiased flex flex-col justify-between selection:bg-zinc-800 selection:text-white relative overflow-hidden">
      
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-gradient-to-tr from-indigo-950/40 via-blue-900/20 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-gradient-to-br from-emerald-950/30 via-zinc-900/30 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_75%_75%_at_50%_50%,#000_30%,transparent_100%)] pointer-events-none opacity-40" />

      <header className="relative z-10 border-b border-zinc-900/80 bg-black/50 backdrop-blur-md px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-1 rounded bg-gradient-to-b from-zinc-800 to-black border border-zinc-800 shadow-sm flex items-center justify-center">
              <TriangleLogo className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-base tracking-tight text-white flex items-center gap-2">
              Nexel
              <span className="px-2 py-0.5 text-[10px] font-mono font-medium tracking-wider uppercase rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Edge v4.2
              </span>
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium text-zinc-400">
            <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/60 border border-zinc-800/80">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-zinc-300">All Systems Operational</span>
            </div>
            <a href="#docs" className="hover:text-white transition-colors">Documentation</a>
            <a href="#changelog" className="hover:text-white transition-colors">Changelog</a>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex-1 flex items-center justify-center p-6 sm:p-10">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-xs font-medium text-zinc-300 shadow-inner">
                <SparklesIcon className="w-3.5 h-3.5 text-blue-400" />
                <span>Next-Generation Application Deployment Engine</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-[1.1]">
                Develop. Preview. <br />
                <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
                  Deploy to the Edge.
                </span>
              </h1>
              <p className="text-zinc-400 text-base sm:text-lg max-w-xl leading-relaxed">
                Connect your GitHub account to automatically deploy push notifications, spin up instant pull request previews, and run serverless compute across our global CDN.
              </p>
            </div>

            <div className="border border-zinc-800/80 rounded-2xl bg-zinc-950/90 shadow-2xl backdrop-blur-xl overflow-hidden text-xs sm:text-sm font-mono">
              
              <div className="bg-zinc-900/70 px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 font-semibold text-zinc-400 text-xs flex items-center gap-1.5">
                    <TerminalIcon className="w-3.5 h-3.5" /> Nexel-cli ~ interactive
                  </span>
                </div>
                
                <div className="flex bg-black/60 p-0.5 rounded-lg border border-zinc-800">
                  <button 
                    onClick={() => setActiveTab('terminal')}
                    className={`px-3 py-1 rounded-md transition-all text-xs ${activeTab === 'terminal' ? 'bg-zinc-800 text-white font-medium shadow' : 'text-zinc-400 hover:text-zinc-200'}`}
                  >
                    Live Build
                  </button>
                </div>
              </div>

              <div className="p-5 h-[260px] flex flex-col justify-between bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900/30 via-zinc-950 to-black">
                
               
                  <div className="space-y-3 overflow-hidden font-mono text-xs">
                    <div className="text-zinc-500 border-b border-zinc-900 pb-2">
                      $ Nexel link --git-repo github.com/username/project
                    </div>
                    
                    <div className="space-y-2 pt-1">
                      {buildLogs.slice(0, logIndex).map((log, idx) => (
                        <div key={idx} className="flex items-start gap-2 transition-all duration-300">
                          {log.type === 'cmd' && <span className="text-blue-400 font-bold select-none">❯</span>}
                          {log.type === 'system' && <span className="text-purple-400 font-bold select-none">ℹ</span>}
                          {log.type === 'info' && <span className="text-amber-400 font-bold select-none">→</span>}
                          {log.type === 'build' && <span className="text-cyan-400 font-bold select-none">⚙</span>}
                          {log.type === 'success' && <span className="text-emerald-400 font-bold select-none">✓</span>}
                          
                          {log.type === 'url' ? (
                            <div className="mt-2 p-2.5 w-full rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-sans font-medium flex items-center justify-between">
                              <span className="flex items-center gap-2">
                                <GlobeIcon className="w-4 h-4 text-emerald-400" />
                                Live URL: <span className="underline font-mono cursor-pointer hover:text-white transition-colors">{log.text}</span>
                              </span>
                              <span className="text-[10px] uppercase font-mono px-2 py-0.5 bg-emerald-500/20 rounded text-emerald-300 font-bold">READY</span>
                            </div>
                          ) : (
                            <span className={`${log.type === 'cmd' ? 'text-zinc-200 font-medium' : 'text-zinc-300'}`}>
                              {log.text}
                            </span>
                          )}
                        </div>
                      ))}
                      
                      {logIndex < buildLogs.length && (
                        <div className="flex items-center gap-1 text-zinc-500 text-[11px] animate-pulse">
                          <span className="w-1.5 h-3 bg-zinc-400 animate-bounce inline-block" /> processing next pipeline step...
                        </div>
                      )}
                    </div>
                  </div>
               

                <div className="pt-2 border-t border-zinc-900/80 flex items-center justify-between text-[11px] text-zinc-500 font-sans">
                  <span>Git integration active</span>
                  <span>Press <kbd className="px-1.5 py-0.5 bg-zinc-800 rounded text-zinc-300 font-mono">⌘ + K</kbd> for command palette</span>
                </div>
              </div>

            </div>

          </div>

          <div className="lg:col-span-5 flex flex-col justify-center">
            
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-zinc-700 via-zinc-800 to-zinc-700 rounded-3xl blur-md opacity-40 group-hover:opacity-60 transition duration-1000 group-hover:duration-200" />
              
              <div className="relative bg-zinc-950/90 backdrop-blur-2xl border border-zinc-800/80 rounded-2xl p-7 sm:p-9 shadow-[0_0_50px_-12px_rgba(0,0,0,0.8)]">
                
                <div className="flex flex-col items-center text-center space-y-3 mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-zinc-900 to-black border border-zinc-800 flex items-center justify-center shadow-lg relative overflow-hidden group-hover:border-zinc-700 transition-colors">
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <TriangleLogo className="w-8 h-8 text-white transition-transform group-hover:scale-105" />
                  </div>
                  
                  <div className="space-y-1">
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                      Log in to Deploy
                    </h2>
                    <p className="text-zinc-400 text-xs sm:text-sm">
                      Continue with your GitHub account to manage cloud deployments and serverless configurations.
                    </p>
                  </div>
                </div>

                <div className="space-y-5">
                  
                  {authStatus === 'idle' && (
                    <button
                      onClick={handleGithubLogin}
                      className="w-full flex items-center justify-center gap-3 py-4 px-6 bg-white hover:bg-zinc-200 active:scale-[0.99] text-black font-bold text-sm sm:text-base rounded-xl transition-all duration-200 shadow-[0_0_30px_-5px_rgba(255,255,255,0.25)] hover:shadow-[0_0_40px_-5px_rgba(255,255,255,0.4)] cursor-pointer group/btn"
                    >
                      <GithubIcon className="w-6 h-6 text-black transition-transform group-hover/btn:scale-110 duration-200" />
                      <span>Continue with GitHub</span>
                    </button>
                  )}

                  {authStatus === 'loading' && (
                    <div className="w-full py-4 px-6 bg-zinc-900 border border-zinc-700 rounded-xl flex items-center justify-center gap-3 text-zinc-200 font-semibold text-sm shadow-inner cursor-wait animate-pulse">
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Connecting to GitHub OAuth...</span>
                    </div>
                  )}

                  {authStatus === 'success' && (
                    <div className="space-y-3">
                      <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-center space-y-2 animate-fadeIn">
                        <div className="inline-flex p-2 rounded-full bg-emerald-500/20 text-emerald-400 mb-1">
                          <CheckCircleIcon className="w-6 h-6" />
                        </div>
                        <h4 className="font-bold text-sm text-white">OAuth Authentication Initialized</h4>
                        <p className="text-xs text-zinc-300">
                          GitHub permissions verified for repositories & pre-commit webhooks.
                        </p>
                      </div>
                      <button
                        onClick={resetDemo}
                        className="w-full py-2 px-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-xs font-medium rounded-lg transition-colors"
                      >
                        Reset Frontend Test Demo
                      </button>
                    </div>
                  )}

                  <div className="flex items-center justify-center gap-2 text-[12px] text-zinc-400 py-1">
                    <ShieldCheckIcon className="w-4 h-4 text-emerald-400" />
                    <span>Strict Read/Write Repo Permissions & OIDC Protected</span>
                  </div>

                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-zinc-900" />
                    </div>
                    <div className="relative flex justify-center text-[10px] uppercase font-semibold tracking-widest text-zinc-400">
                      <span className="bg-zinc-950 px-3">GitHub Integration Benefits</span>
                    </div>
                  </div>

                  <div className="space-y-3 text-xs text-zinc-400">
                    <div className="flex items-center gap-3 p-2.5 rounded-lg bg-zinc-900/30 border border-zinc-900 hover:border-zinc-800/80 transition-colors">
                      <CheckCircleIcon className="w-4 h-4 flex-shrink-0" />
                      <div>
                        <span className="font-semibold text-zinc-200">Automatic Git CI/CD</span> — Push to main instantly launches edge bundles.
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-2.5 rounded-lg bg-zinc-900/30 border border-zinc-900 hover:border-zinc-800/80 transition-colors">
                      <CheckCircleIcon className="w-4 h-4 flex-shrink-0" />
                      <div>
                        <span className="font-semibold text-zinc-200">Instant Preview URLs</span> — Every pull request gets a unique live test deployment.
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-2.5 rounded-lg bg-zinc-900/30 border border-zinc-900 hover:border-zinc-800/80 transition-colors">
                      <CheckCircleIcon className="w-4 h-4 flex-shrink-0" />
                      <div>
                        <span className="font-semibold text-zinc-200">Zero-Config Frameworks</span> — Natively recognizes Next.js, Vite, Remix & Vue.
                      </div>
                    </div>
                  </div>

                </div>

                <div className="mt-8 pt-6 border-t border-zinc-900/80 text-center text-zinc-400 text-xs leading-relaxed">
                  By clicking continue, you agree to Nexel&apos;s{' '}
                  <a href="#terms" className="text-zinc-400 underline hover:text-white transition-colors">Terms of Service</a>{' '}
                  and{' '}
                  <a href="#privacy" className="text-zinc-400 underline hover:text-white transition-colors">Privacy Policy</a>.
                  <div className="mt-2 text-zinc-500">
                    New account? A complimentary developer workspace will be created automatically.
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </main>

      <footer className="relative z-10 border-t border-zinc-900/60 bg-black py-6 px-6 text-center text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <TriangleLogo className="w-4 h-4 text-zinc-600" />
            <span>© 2026 Nexel Inc. All rights reserved. Vercel Cloud Architecture Demo.</span>
          </div>
          <div className="flex items-center gap-6 font-medium">
            <a href="#status" className="hover:text-zinc-400 transition-colors">System Status</a>
            <a href="#security" className="hover:text-zinc-400 transition-colors">Security & Compliance</a>
            <a href="#github" className="hover:text-zinc-400 transition-colors">GitHub App Specs</a>
          </div>
        </div>
      </footer>

    </div>
  );
}