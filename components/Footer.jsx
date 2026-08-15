"use client";

import { useState } from "react";
import Link from "next/link";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && email.includes("@")) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const footerSections = [
    {
      title: "Frameworks",
      links: [
        { name: "Next.js", href: "https://nextjs.org" },
        { name: "React", href: "https://react.dev" },
        { name: "Svelte", href: "https://svelte.dev" },
        { name: "Nuxt", href: "https://nuxt.com" },
        { name: "Remix", href: "https://remix.run" },
        { name: "Vue.js", href: "https://vuejs.org" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Documentation", href: "#docs" },
        { name: "Guides & Tutorials", href: "#guides" },
        { name: "API Reference", href: "#api" },
        { name: "Community Forum", href: "#community" },
        { name: "Changelog", href: "#changelog" },
        { name: "System Status", href: "#status" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "#about" },
        { name: "Blog", href: "#blog" },
        { name: "Careers", href: "#careers" },
        { name: "Press Kit", href: "#press" },
        { name: "Partners", href: "#partners" },
        { name: "Contact Sales", href: "#contact" },
      ],
    },
    {
      title: "Legal & Security",
      links: [
        { name: "Privacy Policy", href: "#privacy" },
        { name: "Terms of Service", href: "#terms" },
        { name: "Cookie Policy", href: "#cookies" },
        { name: "Security & Compliance", href: "#security" },
        { name: "DPA & GDPR", href: "#gdpr" },
      ],
    },
  ];

  return (
    <footer className="border-t border-white/10 bg-void text-ash font-sans relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-twilight/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between pb-12 border-b border-white/5 gap-8">
          <div className="max-w-md">
            <p className="eyebrow">Newsletter</p>
            <h3 className="mt-4 text-2xl font-normal tracking-[-0.02em] text-vellum">
              Subscribe to developer updates
            </h3>
            <p className="mt-3 text-[15px] leading-relaxed text-ash">
              Get the latest releases, product updates, and developer workshops
              directly to your inbox.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full sm:w-auto flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-grow sm:w-72">
              <input
                type="email"
                required
                placeholder="developer@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-pill bg-white/[0.03] border border-charcoal px-4 py-2.5 text-sm text-vellum placeholder-smoke focus:outline-none focus:border-iris/60 focus:ring-2 focus:ring-iris/20 transition-all duration-200"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-pill bg-vellum hover:bg-white text-obsidian font-medium text-sm transition-colors duration-200 cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Subscribe</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </form>
        </div>
        {subscribed && (
          <div className="mt-4 p-3 rounded-card bg-iris/10 border border-iris/30 text-iris text-sm text-center font-medium animate-in fade-in duration-300">
            Thanks for subscribing — we've sent a verification link to your inbox.
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12">
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h4 className="font-medium text-xs tracking-[0.14em] uppercase font-mono text-smoke">
                {section.title}
              </h4>
              <ul className="space-y-2.5 text-sm">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : "_self"}
                      rel={link.href.startsWith("http") ? "noopener noreferrer" : ""}
                      className="text-ash hover:text-vellum transition-colors duration-150 inline-block py-0.5 hover:translate-x-0.5 transform"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-7 h-7 rounded-full bg-graphite border border-white/10">
              <svg viewBox="0 0 76 65" fill="none" className="w-3.5 h-3.5 fill-vellum">
                <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
              </svg>
            </div>
            <span className="text-vellum font-medium tracking-tight">Nexel</span>
            <span className="text-charcoal">|</span>
            <p className="text-xs text-smoke">
              © {new Date().getFullYear()} Nexel Inc. All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-4 text-ash">
            <a
              href="https://github.com/vercel"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-2 rounded-pill bg-white/[0.03] border border-charcoal text-ash hover:text-vellum hover:border-smoke hover:bg-white/[0.06] transition-all duration-200"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </a>
            <a
              href="https://x.com/vercel"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (formerly Twitter)"
              className="p-2 rounded-pill bg-white/[0.03] border border-charcoal text-ash hover:text-vellum hover:border-smoke hover:bg-white/[0.06] transition-all duration-200"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a
              href="https://discord.gg/vercel"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Discord"
              className="p-2 rounded-pill bg-white/[0.03] border border-charcoal text-ash hover:text-vellum hover:border-smoke hover:bg-white/[0.06] transition-all duration-200"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
            </a>
            <a
              href="https://youtube.com/vercel"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="p-2 rounded-pill bg-white/[0.03] border border-charcoal text-ash hover:text-vellum hover:border-smoke hover:bg-white/[0.06] transition-all duration-200"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
