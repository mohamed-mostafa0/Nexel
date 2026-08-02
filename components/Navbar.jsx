"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { login } from "../app/API/authServices/authService";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("storage", checkAuth);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  const handleLogin = async () => {
    try {
      const res = await login();
      if (res && res.data && res.data.url) {
        window.location.href = res.data.url;
      } else {
        window.location.href = "https://vercel-production-d3aa.up.railway.app/api/auth/github/authorize";
      }
    } catch (error) {
      window.location.href = "https://vercel-production-d3aa.up.railway.app/api/auth/github/authorize";
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/");
  };

  const navLinks = [
    { name: "Features", href: "#features", badge: null },
    { name: "Docs", href: "#docs", badge: null },
    { name: "Templates", href: "#templates", badge: "New" },
    { name: "Customers", href: "#customers", badge: null },
    { name: "Enterprise", href: "#enterprise", badge: null },
    { name: "Pricing", href: "#pricing", badge: null },
  ];

  return (
    <header className="sticky top-0 z-50 w-full flex flex-col font-sans">
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-4 py-1.5 text-center text-xs font-medium text-white transition-opacity hover:opacity-95 flex items-center justify-center gap-2 cursor-pointer">
        <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
        <span>✨ Introducing Vercel AI Platform 4.0: Supercharge your Next.js workflows</span>
        <span className="underline font-semibold ml-1">Learn more →</span>
      </div>

      <nav
        className={`w-full border-b transition-all duration-300 ${
          isScrolled
            ? "border-zinc-800/90 bg-black/85 backdrop-blur-md shadow-lg shadow-black/40 py-2.5"
            : "border-zinc-800/40 bg-black/60 backdrop-blur-sm py-3.5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="group flex items-center gap-2.5 outline-none">
              <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 group-hover:border-zinc-600 transition-all duration-300">
                <svg
                  viewBox="0 0 76 65"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 fill-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all duration-300"
                >
                  <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
                </svg>
              </div>
              <span className="text-white font-semibold tracking-tight text-lg group-hover:text-zinc-200 transition-colors">
                Vercel
              </span>
              <span className="hidden sm:inline-block text-xs uppercase px-2 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 font-mono">
                Platform
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="relative px-3.5 py-2 text-sm text-zinc-400 hover:text-white transition-colors duration-200 rounded-full hover:bg-zinc-900/60 flex items-center gap-2 group"
                >
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="text-[10px] font-semibold tracking-wide uppercase px-1.5 py-0.5 rounded bg-blue-500/10 border border-blue-500/30 text-blue-400 group-hover:bg-blue-500/20 transition-all">
                      {link.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-3">
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/dashboard"
                  className="px-4 py-2 text-sm font-medium text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 rounded-full transition-all duration-200 shadow-sm hover:shadow-zinc-900/50 flex items-center gap-2"
                >
                  <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 text-zinc-400 hover:text-rose-400 hover:bg-zinc-900/80 rounded-full transition-colors duration-200"
                  title="Log out"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2.5">
                <button
                  onClick={handleLogin}
                  className="px-4 py-2 text-sm font-medium text-zinc-300 hover:text-white bg-transparent hover:bg-zinc-900/70 border border-transparent hover:border-zinc-800 rounded-full transition-all duration-200 cursor-pointer flex items-center gap-2"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  Log in
                </button>
                <Link
                  href="/#deploy"
                  onClick={(e) => {
                    if (!isLoggedIn) {
                      e.preventDefault();
                      handleLogin();
                    }
                  }}
                  className="relative group px-4 py-2 text-sm font-medium text-black bg-white hover:bg-zinc-100 rounded-full transition-all duration-200 shadow-[0_0_15px_rgba(255,255,255,0.15)] hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] cursor-pointer overflow-hidden flex items-center gap-2"
                >
                  <span className="relative z-10 font-semibold">Deploy Now</span>
                  <svg className="w-3.5 h-3.5 relative z-10 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            )}
          </div>

          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-zinc-800/80 bg-black/95 backdrop-blur-xl px-4 pt-3 pb-6 mt-3 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-base font-medium text-zinc-300 hover:text-white hover:bg-zinc-900/80 rounded-lg transition-colors flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-500/20 text-blue-400">
                      {link.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>

            <div className="pt-4 border-t border-zinc-800/80 space-y-2">
              {isLoggedIn ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-2.5 px-4 text-center font-medium text-white bg-zinc-900 hover:bg-zinc-800 rounded-lg border border-zinc-700 block transition-all"
                  >
                    Go to Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full py-2 px-4 text-center font-medium text-rose-400 hover:bg-zinc-900/50 rounded-lg block transition-colors"
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleLogin}
                    className="w-full py-2.5 px-4 text-center font-medium text-white bg-zinc-900 hover:bg-zinc-800 rounded-lg border border-zinc-700 block transition-all mb-2 flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                    Log in with GitHub
                  </button>
                  <button
                    onClick={handleLogin}
                    className="w-full py-2.5 px-4 text-center font-semibold text-black bg-white hover:bg-zinc-200 rounded-lg block transition-all shadow-md"
                  >
                    Deploy Now
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
