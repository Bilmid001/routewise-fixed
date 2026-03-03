"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Zap } from "lucide-react";

export default function Navbar() {
  const path = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-indigo-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
            <Zap size={18} className="text-white" />
          </div>
          <span className="font-display font-bold text-xl text-indigo-900">
            Route<span className="text-indigo-500">Wise</span>
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/"
            className={`text-sm font-medium px-3 py-1.5 rounded-lg transition-colors ${
              path === "/"
                ? "text-indigo-700 bg-indigo-50"
                : "text-slate-600 hover:text-indigo-700"
            }`}
          >
            Home
          </Link>
          <Link
            href="/simulate"
            className={`text-sm font-medium px-3 py-1.5 rounded-lg transition-colors ${
              path === "/simulate"
                ? "text-indigo-700 bg-indigo-50"
                : "text-slate-600 hover:text-indigo-700"
            }`}
          >
            Simulate
          </Link>
          <Link
            href="/dashboard"
            className={`text-sm font-medium px-3 py-1.5 rounded-lg transition-colors ${
              path === "/dashboard"
                ? "text-indigo-700 bg-indigo-50"
                : "text-slate-600 hover:text-indigo-700"
            }`}
          >
            Dashboard
          </Link>
          <Link href="/simulate" className="btn-primary py-2 px-4 text-sm hidden sm:inline-flex">
            Try Free →
          </Link>
        </div>
      </div>
    </nav>
  );
}
