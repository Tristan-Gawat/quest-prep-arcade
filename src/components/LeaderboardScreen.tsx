"use client";

import { useEffect, useState } from "react";
import { GameState, Screen } from "@/lib/state";
import { getGlobalLeaderboard, getLanguageLeaderboard } from "@/lib/auth";
import { DBProfile } from "@/lib/supabase";
import { getRankDisplay, getRankColor, getRankBadgeEmoji } from "@/lib/ranking";
import { courses } from "@/data/courses";
import { RankTier } from "@/lib/ranking";

interface LeaderboardScreenProps {
  state: GameState;
  navigate: (screen: Screen) => void;
  userId: string | null;
}

interface LanguageEntry {
  user_id: string;
  language_id: string;
  xp: number;
  rank_tier: string;
  rank_division: number;
  modules_completed: string[];
  profiles: { username: string; avatar_url: string | null } | null;
}

// Common countries for the filter dropdown
const COUNTRIES = [
  { code: "", label: "All Countries" },
  { code: "PH", label: "Philippines" },
  { code: "US", label: "United States" },
  { code: "GB", label: "United Kingdom" },
  { code: "CA", label: "Canada" },
  { code: "AU", label: "Australia" },
  { code: "IN", label: "India" },
  { code: "DE", label: "Germany" },
  { code: "FR", label: "France" },
  { code: "JP", label: "Japan" },
  { code: "KR", label: "South Korea" },
  { code: "BR", label: "Brazil" },
  { code: "MX", label: "Mexico" },
  { code: "ID", label: "Indonesia" },
  { code: "NG", label: "Nigeria" },
  { code: "SG", label: "Singapore" },
  { code: "MY", label: "Malaysia" },
  { code: "NZ", label: "New Zealand" },
  { code: "ZA", label: "South Africa" },
  { code: "AE", label: "UAE" },
  { code: "SE", label: "Sweden" },
  { code: "NL", label: "Netherlands" },
  { code: "IT", label: "Italy" },
  { code: "ES", label: "Spain" },
  { code: "PK", label: "Pakistan" },
  { code: "BD", label: "Bangladesh" },
  { code: "VN", label: "Vietnam" },
  { code: "TH", label: "Thailand" },
  { code: "PL", label: "Poland" },
  { code: "RO", label: "Romania" },
  { code: "UA", label: "Ukraine" },
];

export default function LeaderboardScreen({ state, navigate, userId }: LeaderboardScreenProps) {
  const [tab, setTab] = useState<"global" | string>("global");
  const [globalData, setGlobalData] = useState<DBProfile[]>([]);
  const [langData, setLangData] = useState<LanguageEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, selectedCountry]);

  async function loadData() {
    setLoading(true);
    if (tab === "global") {
      const data = await getGlobalLeaderboard(50, selectedCountry || null);
      setGlobalData(data.filter(p => p.total_xp > 0));
    } else {
      const data = await getLanguageLeaderboard(tab, 50);
      setLangData(data as unknown as LanguageEntry[]);
    }
    setLoading(false);
  }

  const selectedCountryLabel = COUNTRIES.find(c => c.code === selectedCountry)?.label || "All Countries";

  return (
    <div className="flex-1 p-4 md:p-8 overflow-y-auto">
      <div className="max-w-2xl mx-auto fade-in">
        <h2 className="text-xl md:text-2xl font-semibold text-text-primary text-center mb-2">
          Leaderboard
        </h2>
        <p className="text-sm text-text-secondary text-center mb-6">
          See how you rank against other learners
        </p>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-4">
          <button
            onClick={() => setTab("global")}
            className={`shrink-0 px-4 py-2 text-xs rounded-full border transition-all cursor-pointer ${
              tab === "global"
                ? "bg-accent-blue/10 border-accent-blue text-accent-blue"
                : "bg-bg-card border-border text-text-secondary hover:border-border-focus"
            }`}
          >
            🌍 Global
          </button>
          {courses.map((course) => (
            <button
              key={course.id}
              onClick={() => setTab(course.id)}
              className={`shrink-0 px-4 py-2 text-xs rounded-full border transition-all cursor-pointer ${
                tab === course.id
                  ? "bg-accent-blue/10 border-accent-blue text-accent-blue"
                  : "bg-bg-card border-border text-text-secondary hover:border-border-focus"
              }`}
            >
              {course.icon} {course.name}
            </button>
          ))}
        </div>

        {/* Country filter - only visible on Global tab */}
        {tab === "global" && (
          <div className="relative mb-6">
            <button
              onClick={() => setShowCountryDropdown(!showCountryDropdown)}
              className="flex items-center gap-2 px-4 py-2 text-xs rounded-lg border border-border bg-bg-card text-text-secondary hover:border-border-focus transition-all cursor-pointer"
            >
              <span>🌐</span>
              <span>{selectedCountryLabel}</span>
              <svg className={`w-3 h-3 transition-transform ${showCountryDropdown ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showCountryDropdown && (
              <div className="absolute z-20 top-full mt-1 left-0 w-64 max-h-64 overflow-y-auto bg-bg-card border border-border rounded-xl shadow-xl">
                {COUNTRIES.map((country) => (
                  <button
                    key={country.code}
                    onClick={() => {
                      setSelectedCountry(country.code);
                      setShowCountryDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-xs hover:bg-bg-elevated transition-colors cursor-pointer ${
                      selectedCountry === country.code ? "text-accent-blue bg-accent-blue/5" : "text-text-secondary"
                    }`}
                  >
                    {country.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="text-center py-12">
            <p className="text-sm text-accent-blue pulse-soft">Loading leaderboard...</p>
          </div>
        )}

        {/* Global Leaderboard */}
        {!loading && tab === "global" && (
          <div className="card overflow-hidden">
            {globalData.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-sm text-text-muted">
                  {selectedCountry ? `No players from ${selectedCountryLabel} yet.` : "No players yet. Be the first!"}
                </p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {globalData.map((player, index) => {
                  const isYou = player.id === userId;
                  const rank = { tier: player.rank_tier as RankTier, division: player.rank_division };
                  return (
                    <div
                      key={player.id}
                      className={`flex items-center gap-4 px-5 py-4 ${isYou ? "bg-accent-blue/5" : ""}`}
                    >
                      <span className={`w-8 text-center text-sm font-semibold ${
                        index === 0 ? "text-accent-yellow" : index === 1 ? "text-text-secondary" : index === 2 ? "text-accent-orange" : "text-text-muted"
                      }`}>
                        {index + 1}
                      </span>
                      {player.avatar_url ? (
                        <img src={player.avatar_url} alt="" className="w-9 h-9 rounded-full" />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-bg-elevated flex items-center justify-center text-sm text-text-secondary">
                          {player.username.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium truncate ${isYou ? "text-accent-blue" : "text-text-primary"}`}>
                          {player.username} {isYou && "(You)"}
                        </p>
                        <p className="text-xs" style={{ color: getRankColor(rank.tier) }}>
                          {getRankBadgeEmoji(rank.tier)} {getRankDisplay(rank)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-accent-yellow">{player.total_xp.toLocaleString()}</p>
                        <p className="text-xs text-text-muted">XP</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Language Leaderboard */}
        {!loading && tab !== "global" && (
          <div className="card overflow-hidden">
            {langData.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-sm text-text-muted">No players in this language yet.</p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {langData.map((entry, index) => {
                  const isYou = entry.user_id === userId;
                  const rank = { tier: entry.rank_tier as RankTier, division: entry.rank_division };
                  const username = entry.profiles?.username || "Unknown";
                  const avatar = entry.profiles?.avatar_url;
                  return (
                    <div
                      key={entry.user_id}
                      className={`flex items-center gap-4 px-5 py-4 ${isYou ? "bg-accent-blue/5" : ""}`}
                    >
                      <span className={`w-8 text-center text-sm font-semibold ${
                        index === 0 ? "text-accent-yellow" : index === 1 ? "text-text-secondary" : index === 2 ? "text-accent-orange" : "text-text-muted"
                      }`}>
                        {index + 1}
                      </span>
                      {avatar ? (
                        <img src={avatar} alt="" className="w-9 h-9 rounded-full" />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-bg-elevated flex items-center justify-center text-sm text-text-secondary">
                          {username.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium truncate ${isYou ? "text-accent-blue" : "text-text-primary"}`}>
                          {username} {isYou && "(You)"}
                        </p>
                        <p className="text-xs" style={{ color: getRankColor(rank.tier) }}>
                          {getRankBadgeEmoji(rank.tier)} {getRankDisplay(rank)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-accent-yellow">{entry.xp.toLocaleString()}</p>
                        <p className="text-xs text-text-muted">{entry.modules_completed?.length || 0} modules</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Back */}
        <div className="text-center mt-6">
          <button onClick={() => navigate("course-select")} className="btn-secondary text-sm">
            ← Back to Courses
          </button>
        </div>
      </div>
    </div>
  );
}
