"use client";

import { Screen } from "@/lib/state";
import { User } from "@supabase/supabase-js";

interface SidebarProps {
  currentScreen: Screen;
  navigate: (screen: Screen) => void;
  user: User | null;
  userRole?: string;
}

const NAV_ITEMS: { id: Screen; label: string; icon: string }[] = [
  { id: "course-select", label: "Courses", icon: "📚" },
  { id: "learn-new", label: "AI Learn", icon: "🧠" },
  { id: "arena", label: "Arena", icon: "⚔️" },
  { id: "battle-lobby", label: "Battle", icon: "🎯" },
  { id: "friends", label: "Friends", icon: "👥" },
  { id: "chat", label: "Chat", icon: "💬" },
  { id: "leaderboard", label: "Leaderboard", icon: "🏆" },
  { id: "profile", label: "Profile", icon: "👤" },
];

const ADMIN_ITEMS: { id: Screen; label: string; icon: string; minRole: "mod" | "developer" }[] = [
  { id: "admin-users", label: "Users", icon: "👥", minRole: "mod" },
  { id: "admin-console", label: "Console", icon: "🖥️", minRole: "developer" },
];

export default function Sidebar({ currentScreen, navigate, user, userRole }: SidebarProps) {
  const visibleAdminItems = ADMIN_ITEMS.filter((item) => {
    if (!userRole) return false;
    if (item.minRole === "developer") return userRole === "developer";
    if (item.minRole === "mod") return userRole === "developer" || userRole === "mod";
    return false;
  });
  return (
    <aside className="w-16 md:w-56 shrink-0 h-full bg-bg-secondary/50 border-r border-border flex flex-col relative z-10">
      {/* Logo */}
      <div className="p-3 md:px-5 md:py-5 border-b border-border">
        <div className="flex items-center gap-2">
          <img src="/logo.svg" alt="CodeLapse" className="w-7 h-7 md:w-8 md:h-8" />
          <h1
            className="hidden md:block text-lg font-bold text-text-primary truncate"
            style={{ fontFamily: "var(--font-display)" }}
          >
            CodeLapse
          </h1>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-3 md:py-4 space-y-1 px-2 md:px-3">
        {NAV_ITEMS.map((item) => {
          const isActive = currentScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all cursor-pointer ${
                isActive
                  ? "bg-accent-blue/10 text-accent-blue border border-accent-blue/20"
                  : "text-text-secondary hover:text-text-primary hover:bg-bg-elevated border border-transparent"
              }`}
              title={item.label}
            >
              <span className="text-base">{item.icon}</span>
              <span className="hidden md:inline font-medium">{item.label}</span>
            </button>
          );
        })}

        {/* Admin section */}
        {visibleAdminItems.length > 0 && (
          <>
            <div className="my-3 border-t border-border" />
            <p className="text-[9px] text-text-muted px-3 mb-1 hidden md:block">ADMIN</p>
            {visibleAdminItems.map((item) => {
              const isActive = currentScreen === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => navigate(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all cursor-pointer ${
                    isActive
                      ? "bg-accent-green/10 text-accent-green border border-accent-green/20"
                      : "text-text-secondary hover:text-text-primary hover:bg-bg-elevated border border-transparent"
                  }`}
                  title={item.label}
                >
                  <span className="text-base">{item.icon}</span>
                  <span className="hidden md:inline font-medium">{item.label}</span>
                </button>
              );
            })}
          </>
        )}
      </nav>

      {/* User info at bottom */}
      {user && (
        <div className="p-2 md:p-3 border-t border-border">
          <div className="flex items-center gap-2 px-2 py-2">
            {user.user_metadata?.avatar_url ? (
              <img
                src={user.user_metadata.avatar_url}
                alt=""
                className="w-7 h-7 rounded-full shrink-0"
              />
            ) : (
              <div className="w-7 h-7 rounded-full bg-bg-elevated flex items-center justify-center text-xs text-text-secondary shrink-0">
                {(user.user_metadata?.name || user.email || "U").charAt(0).toUpperCase()}
              </div>
            )}
            <span className="hidden md:inline text-xs text-text-secondary truncate">
              {user.user_metadata?.name || user.email?.split("@")[0] || "User"}
            </span>
          </div>
        </div>
      )}
    </aside>
  );
}
