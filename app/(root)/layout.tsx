import MobileNav from "@/components/MobileNav";
import Sidebar from "@/components/Sidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedIn = await getLoggedInUser();
  if (!loggedIn) redirect("/sign-in");

  return (
    <main className="flex h-screen w-full font-inter overflow-hidden">
      <Sidebar user={loggedIn} />

      <div className="flex size-full flex-col overflow-hidden">

        {/* ── Mobile top bar ──────────────────────────── */}
        <div className="root-layout">
          <div className="flex items-center gap-2">
            <div
              className="flex-center size-7 rounded-lg text-white font-bold text-12"
              style={{ backgroundColor: "#377DFF" }}
            >
              IST
            </div>
            <span className="font-bold text-ist-text text-16">ISTBANK</span>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <MobileNav user={loggedIn} />
          </div>
        </div>

        {/* ── Desktop top header bar ───────────────────── */}
        <header
          className="hidden md:flex items-center justify-between px-6 py-3 border-b border-ist-border shrink-0"
          style={{ backgroundColor: "var(--ist-surface)" }}
        >
          {/* Left — avatar + greeting */}
          <div className="flex items-center gap-3">
            <div
              className="flex-center size-9 rounded-full text-white font-bold text-14"
              style={{ backgroundColor: "#377DFF" }}
            >
              {loggedIn?.firstName?.[0]}{loggedIn?.lastName?.[0]}
            </div>
            <p className="text-15 font-semibold text-ist-text">
              Welcome Back,{" "}
              <span style={{ color: "#377DFF" }}>{loggedIn?.firstName}!</span>
            </p>
          </div>

          {/* Right — search + bell + theme */}
          <div className="flex items-center gap-3">
            {/* Search bar */}
            <div
              className="flex items-center gap-2 rounded-xl border border-ist-border px-3 py-2 w-[180px]"
              style={{ backgroundColor: "var(--ist-bg)" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" className="text-ist-muted shrink-0">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <span className="text-13 text-ist-muted">Search...</span>
            </div>

            {/* Bell */}
            <button
              className="relative flex-center size-9 rounded-xl border border-ist-border hover:border-brand-blue transition-all"
              style={{ backgroundColor: "var(--ist-bg)" }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" className="text-ist-subtext">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              {/* Notification dot */}
              <span
                className="absolute top-1.5 right-1.5 size-2 rounded-full"
                style={{ backgroundColor: "#ED8835" }}
              />
            </button>

            <ThemeToggle />
          </div>
        </header>

        {/* ── Page content ────────────────────────────── */}
        <div className="flex-1 overflow-hidden">
          {children}
        </div>

      </div>
    </main>
  );
}
