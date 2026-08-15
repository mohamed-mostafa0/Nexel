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
    { name: "Templates", href: "#templates", badge: null },
    { name: "Customers", href: "#customers", badge: null }
  ];

  return (
    <header className="sticky top-0 z-50 w-full flex flex-col font-sans animate-fade-down">
      <div
        className={`px-6 py-2 text-center text-xs font-medium flex items-center justify-center gap-2 cursor-pointer transition-colors duration-300 hover:text-lilac ${
          isScrolled
            ? "bg-void/85 backdrop-blur-md text-ash border-b border-white/5"
            : "bg-transparent text-ash"
        }`}
      >
        <span className="flex h-1.5 w-1.5 rounded-full bg-iris animate-pulse motion-reduce:animate-none"></span>
        <span>Introducing Nexel AI Platform 4.0 — supercharge your Next.js workflows</span>
        <span className="font-mono uppercase tracking-wider text-iris ml-1">Learn more →</span>
      </div>

      <nav
        className={`w-full border-b transition-all duration-300 ${
          isScrolled
            ? "border-white/10 bg-void/85 backdrop-blur-md py-2.5"
            : "border-transparent bg-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="group flex items-center gap-2.5 outline-none">
              <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-graphite border border-white/10 group-hover:border-iris/50 transition-all duration-300">
                <svg
                  viewBox="0 0 76 65"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 fill-vellum transition-all duration-300"
                >
                  <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
                </svg>
              </div>
              <span className="text-vellum font-medium tracking-tight text-lg group-hover:text-lilac transition-colors">
                Nexel
              </span>

            </Link>

            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="relative px-3.5 py-2 text-sm text-ash hover:text-vellum transition-colors duration-200 rounded-pill hover:bg-white/5 flex items-center gap-2 group"
                >
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="text-[10px] font-medium tracking-wide uppercase px-1.5 py-0.5 rounded bg-iris/10 border border-iris/30 text-iris transition-all">
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
                  className="px-4 py-2 text-sm font-medium text-vellum bg-white/[0.03] hover:bg-white/[0.06] border border-charcoal hover:border-smoke rounded-pill transition-all duration-200 flex items-center gap-2"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 text-smoke hover:text-vellum hover:bg-white/5 rounded-pill transition-colors duration-200"
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
                  className="px-4 py-2 text-sm font-medium text-ash hover:text-vellum bg-transparent hover:bg-white/5 border border-transparent hover:border-charcoal rounded-pill transition-all duration-200 cursor-pointer flex items-center gap-2"
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
                  className="relative group px-4 py-2 text-sm font-medium text-obsidian bg-vellum hover:bg-white rounded-pill transition-colors duration-200 cursor-pointer overflow-hidden flex items-center gap-2"
                >
                  <span className="relative z-10 font-medium">Deploy Now</span>
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
              className="p-2 text-ash hover:text-vellum hover:bg-white/5 rounded-pill transition-colors focus:outline-none"
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
          <div className="md:hidden border-t border-white/10 bg-void/95 backdrop-blur-xl px-6 pt-3 pb-6 mt-3 space-y-3 animate-fade-down-sm">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-base font-medium text-ash hover:text-vellum hover:bg-white/5 rounded-pill transition-colors flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="text-xs font-medium px-2 py-0.5 rounded bg-iris/15 text-iris">
                      {link.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10 space-y-2">
              {isLoggedIn ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-2.5 px-4 text-center font-medium text-vellum bg-white/[0.03] hover:bg-white/[0.06] rounded-pill border border-charcoal block transition-all"
                  >
                    Go to Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full py-2 px-4 text-center font-medium text-ash hover:text-vellum hover:bg-white/5 rounded-pill block transition-colors"
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleLogin}
                    className="w-full py-2.5 px-4 text-center font-medium text-vellum bg-white/[0.03] hover:bg-white/[0.06] rounded-pill border border-charcoal block transition-all mb-2 flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                    Log in with GitHub
                  </button>
                  <button
                    onClick={handleLogin}
                    className="w-full py-2.5 px-4 text-center font-medium text-obsidian bg-vellum hover:bg-white rounded-pill block transition-all"
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
