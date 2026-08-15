"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";


const NAV = [
  { label: "Deployments", href: "/dashboard" },
  { label: "Import", href: "/dashboard/import" },
];

function isActive(pathname, href) {
  return href === "/dashboard" ? pathname === href : pathname.startsWith(href);
}

export default function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav className="mt-8 inline-flex items-center gap-1 rounded-pill border border-charcoal bg-graphite/60 p-1">
      {NAV.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`rounded-pill px-4 py-1.5 text-sm font-medium transition-colors duration-200 ${
              active ? "bg-white/10 text-vellum" : "text-smoke hover:text-vellum"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
