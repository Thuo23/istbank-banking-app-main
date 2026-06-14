"use client";

import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Footer from "./Footer";
import { ThemeToggle } from "./ThemeToggle";

const Sidebar = ({ user }: SiderbarProps) => {
  const pathname = usePathname();

  return (
    <section className="sidebar">
      <nav className="flex flex-col gap-1">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 mb-6 px-1">
          <div
            className="flex-center size-8 rounded-xl text-white font-bold text-12 shrink-0"
            style={{ backgroundColor: "#377DFF" }}
          >
            IST
          </div>
          <span className="sidebar-logo">ISTBANK</span>
        </Link>

        {/* Nav links */}
        {sidebarLinks.map((link) => {
          const isActive =
            pathname === link.route || pathname.startsWith(`${link.route}/`);

          return (
            <Link
              href={link.route}
              key={link.label}
              className={cn("sidebar-link", { "bg-bank-gradient": isActive })}
            >
              <div className="relative size-5 shrink-0">
                <Image
                  src={link.imgURL}
                  alt={link.label}
                  fill
                  className={cn(
                    "transition-all",
                    isActive ? "opacity-100 brightness-[0] saturate-100 invert-[35%] sepia-[80%] saturate-[600%] hue-rotate-[200deg]" : "opacity-40"
                  )}
                />
              </div>
              <p className={cn("sidebar-label", { "!text-brand-blue font-semibold": isActive })}>
                {link.label}
              </p>
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="flex flex-col gap-3 mt-auto">
        {/* Theme toggle */}
        <div className="flex items-center justify-center xl:justify-start px-1">
          <ThemeToggle />
        </div>
        <Footer user={user} />
      </div>
    </section>
  );
};

export default Sidebar;
