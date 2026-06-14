import { logoutAccount } from "@/lib/actions/user.actions";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Footer = ({ user, type = "desktop" }: FooterProps) => {
  const router = useRouter();

  const handleLogOut = async () => {
    await logoutAccount();
    router.push("/sign-in");
  };

  return (
    <footer className="footer">
      {/* Avatar */}
      <div className={type === "mobile" ? "footer_name-mobile" : "footer_name"}>
        <span className="text-14 font-bold text-white">
          {user?.firstName?.[0]}{user?.lastName?.[0]}
        </span>
      </div>

      {/* Name + email */}
      <div className={type === "mobile" ? "footer_email-mobile" : "footer_email"}>
        <p className="text-13 font-semibold text-ist-text truncate">
          {user?.firstName} {user?.lastName}
        </p>
        <p className="text-11 text-ist-subtext truncate">{user?.email}</p>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogOut}
        className="flex-center size-8 rounded-lg border border-ist-border hover:border-red-400 hover:text-red-400 text-ist-muted transition-all"
        title="Log out"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
      </button>
    </footer>
  );
};

export default Footer;
