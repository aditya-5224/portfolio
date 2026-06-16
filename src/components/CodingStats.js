import React, { useMemo, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  MapPin, 
  GraduationCap, 
  Github, 
  Linkedin, 
  Eye, 
  CheckSquare, 
  MessageSquare, 
  Trophy, 
  Flame, 
  CalendarDays, 
  ChevronRight, 
  ExternalLink,
  ChevronDown,
  Activity,
  Award,

  Mail,
  Globe,
  FileText,
  UserCheck
} from 'lucide-react';
import staticData from './statiData/staticData.json';

/* ─────────────────────────────────────────────────────────────────
   PLATFORMS STATUS (LEFT PANEL)
   ───────────────────────────────────────────────────────────────── */
const SIDEBAR_PLATFORMS = [
  { key: 'leetcode', label: 'LeetCode', logo: 'L', url: 'https://leetcode.com/u/aditya-5224/' },
  { key: 'geeksforgeeks', label: 'GeeksForGeeks', logo: 'G', url: 'https://www.geeksforgeeks.org/profile/vegeta5224?tab=activity' },
  { key: 'codeforces', label: 'CodeForces', logo: 'C', url: 'https://codeforces.com/profile/yadi.tya5224' },
  { key: 'hackerrank', label: 'HackerRank', logo: 'H', url: 'https://www.hackerrank.com/profile/vegetaa' },
];

/* ─────────────────────────────────────────────────────────────────
   CIRCULAR PROGRESS GAUGE COMPONENT
   ───────────────────────────────────────────────────────────────── */
function CircularGauge({ size = 76, total, segments, centerText }) {
  const r = 32;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;

  // Calculate start and end offsets for segments
  let accumulatedPercent = 0;

  return (
    <div className="relative flex items-center justify-center flex-shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
        {/* Background Track */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#f3f4f6" strokeWidth="5.5" />
        
        {/* Colored Segments */}
        {segments.map((seg, idx) => {
          const percent = seg.value / total;
          const strokeLength = percent * circumference;
          const offset = circumference - strokeLength;
          const rotateOffset = accumulatedPercent * 360;
          accumulatedPercent += percent;

          return (
            <circle
              key={idx}
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={seg.color}
              strokeWidth="5.5"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              transform={`rotate(${rotateOffset} ${cx} ${cy})`}
              strokeLinecap="round"
            />
          );
        })}
      </svg>
      {/* Center Label */}
      <div className="absolute flex flex-col items-center justify-center select-none">
        <span className="text-sm font-black text-gray-800 leading-none">{centerText}</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   HEXAGONAL BADGE COMPONENT
   ───────────────────────────────────────────────────────────────── */
function HexBadge({ badge }) {
  return (
    <div className="flex flex-col items-center gap-2 group cursor-pointer">
      <div className="relative w-16 h-16 transition-transform group-hover:scale-110">
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          <polygon
            points="50,3 93,25 93,75 50,97 7,75 7,25"
            fill={badge.color}
            opacity="0.15"
            stroke={badge.color}
            strokeWidth="2.5"
          />
          <polygon
            points="50,12 83,29 83,71 50,88 17,71 17,29"
            fill={badge.color}
            opacity="0.25"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          {badge.icon}
        </div>
      </div>
      <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider text-center leading-tight max-w-[70px]">
        {badge.label}
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   SUBMISSIONS CALENDAR COMPONENT
   ───────────────────────────────────────────────────────────────── */
function SubmissionsCalendar({ submissions, maxStreak, currentStreak }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex flex-col gap-3 h-[130px] justify-between relative overflow-hidden">
      <div className="flex justify-between items-center text-[10px] text-gray-400 font-bold select-none border-b border-gray-50 pb-1.5">
        <div className="flex gap-4">
          <span>Submissions: <strong className="text-gray-700">{submissions}</strong></span>
          <span>Max Streak: <strong className="text-gray-700">{maxStreak}</strong></span>
          <span>Current Streak: <strong className="text-gray-700">{currentStreak}</strong></span>
        </div>
        <div className="flex items-center gap-1">
          <span>Live Data</span>
          <ChevronDown className="w-3 h-3" />
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50/60 px-4 text-center">
        <div>
          <p className="text-xs font-bold text-gray-700">Daily heatmap not exposed by the current Codolio payload</p>
          <p className="mt-1 text-[11px] leading-snug text-gray-500">
            This card shows the live aggregate submission and streak metrics only, so no synthetic daily cells are rendered.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   MAIN COMPONENT
   ───────────────────────────────────────────────────────────────── */
export default function CodingStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAllTopics, setShowAllTopics] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function fetchStats() {
      try {
        setLoading(true);
        setError('');
        const res = await fetch('/api/codolio/stats', { cache: 'no-store' });
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body.error || 'Failed to load live Codolio stats');
        }

        const data = await res.json();
        if (mounted) setStats(data);
      } catch (err) {
        console.error('Failed to load live Codolio stats:', err);
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to load live Codolio stats');
          setStats(null);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }

    // Initial fetch
    fetchStats();

    // Poll for updates every 60 seconds (adjust as needed)
    const interval = setInterval(fetchStats, 60 * 1000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);


  const vm = useMemo(() => {
    if (!stats) return null;

    const codolio = stats.codolioStats || null;
    if (!codolio) return null;

    const profiles = stats.platformProfiles?.platformProfiles || [];
    const leetcode = profiles.find((p) => p?.platform === 'leetcode') || {};
    const codeforces = profiles.find((p) => p?.platform === 'codeforces') || {};

    return {
      personal: stats.personalInfo || null,
      codolio,
      leetcode,
      codeforces
    };
  }, [stats]);

  if (loading) {
    return (
      <section
        id="coding-stats"
        className="w-full min-h-screen md:h-screen flex items-center justify-center bg-[#f9fafb] font-sans"
      >
        <div className="text-center">
          <p className="text-[10px] uppercase tracking-[4px] text-gray-400 font-bold">Loading live coding stats</p>
          <p className="mt-3 text-sm text-gray-600">Fetching Codolio data from your live account.</p>
        </div>
      </section>
    );
  }

  if (error || !vm || !vm.personal) {
    return (
      <section
        id="coding-stats"
        className="w-full min-h-screen md:h-screen flex items-center justify-center bg-[#f9fafb] font-sans"
      >
        <div className="max-w-md text-center px-6">
          <p className="text-[10px] uppercase tracking-[4px] text-gray-400 font-bold">Coding stats unavailable</p>
          <p className="mt-3 text-sm text-gray-600">{error || 'Live Codolio stats could not be loaded.'}</p>
        </div>
      </section>
    );
  }

  const profilePicBase64 = staticData.profilePic || '';
  const avatarUrl = profilePicBase64 
    ? `data:image/png;base64,${profilePicBase64}` 
    : "https://picsum.photos/seed/dev/800/1000";

  return (
    <section
      id="coding-stats"
      className="w-full min-h-screen md:h-screen flex flex-col md:flex-row bg-[#f9fafb] overflow-y-auto md:overflow-hidden font-sans select-none"
    >
      {/* ════════════════════ LEFT SIDEBAR ════════════════════ */}
      <div className="w-full md:w-[32%] xl:w-[28%] bg-gradient-to-b from-[#ff5252] to-[#e63946] text-white flex flex-col p-6 md:p-8 gap-5 justify-between relative overflow-y-auto flex-shrink-0 md:h-full">
        {/* Diagonal texture & circle */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.06]"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)',
            backgroundSize: '20px 20px',
          }}
        />
        <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full border-[28px] border-white/10 pointer-events-none" />

        <div className="flex flex-col gap-5 relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between">
            <p className="text-white/60 text-[9px] tracking-[4px] uppercase font-bold">Public Profile</p>
            <div className="w-8 h-4.5 bg-white/35 rounded-full p-0.5 flex justify-end cursor-pointer">
              <div className="w-3.5 h-3.5 bg-white rounded-full" />
            </div>
          </div>

          {/* Profile Details */}
          <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4.5 flex flex-col items-center text-center shadow-xl">
            <div className="relative w-20 h-20 rounded-full border-2 border-white/35 overflow-hidden flex-shrink-0">
              <img
                src={avatarUrl}
                alt={vm.personal.name}
                className="w-full h-full object-cover object-top grayscale contrast-125"
                onError={(e) => { e.currentTarget.src = "https://picsum.photos/seed/dev/800/1000"; }}
              />
            </div>
            
            <h3 className="text-xl font-bold font-serif italic text-white mt-3 leading-none">
              {vm.personal.name}
            </h3>
            <p className="text-white/70 text-xs mt-1">@{vm.personal.username}</p>

            <button className="mt-4 px-6 py-2.5 bg-white text-brand-red font-bold text-[10px] tracking-wider uppercase rounded-xl shadow-lg hover:shadow-xl hover:bg-white/95 transition-all">
              Get your Codolio Card 🔒
            </button>

            {/* Social Icons row */}
            <div className="flex gap-4.5 mt-5 text-white/75 border-t border-white/10 pt-4 w-full justify-center">
              <a href={`mailto:${staticData.personalInfo.email}`} className="hover:text-white transition-colors"><Mail className="w-4.5 h-4.5" /></a>
              <a href={staticData.personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Linkedin className="w-4.5 h-4.5" /></a>
              <a href={staticData.personalInfo.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Github className="w-4.5 h-4.5" /></a>
              <a href="https://codolio.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Globe className="w-4.5 h-4.5" /></a>
              <a href="#resume" className="hover:text-white transition-colors"><FileText className="w-4.5 h-4.5" /></a>
            </div>
          </div>

          {/* Details & Location */}
          <div className="flex flex-col gap-2.5 text-xs text-white/80 px-2.5">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 opacity-75" />
              <span>{vm.personal.location}</span>
            </div>
            <div className="flex items-start gap-2">
              <GraduationCap className="w-4 h-4 opacity-75 mt-0.5 flex-shrink-0" />
              <span className="leading-snug text-[11px] text-left">{vm.personal.institution}</span>
            </div>
          </div>

          {/* Platform Profiles Status dropdown/list */}
          <div className="flex flex-col gap-2">
            <p className="text-[9px] uppercase tracking-[3px] text-white/50 font-bold mb-0.5">Problem Solving Stats</p>
            <div className="flex flex-col gap-1.5">
              {SIDEBAR_PLATFORMS.map((p) => (
                <a
                  key={p.key}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-3.5 py-2.5 bg-white/10 border border-white/10 rounded-xl hover:bg-white/20 hover:border-white/25 transition-all duration-200 cursor-pointer no-underline"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-lg bg-white/15 flex items-center justify-center font-bold text-xs">{p.logo}</span>
                    <span className="text-xs font-bold text-white/90">{p.label}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/60">
                    <ExternalLink className="w-3.5 h-3.5 hover:text-white transition-colors" />
                  </div>
                </a>
              ))}
            </div>
            <button className="flex items-center justify-center gap-1.5 py-2.5 border border-white/25 hover:bg-white/10 rounded-xl text-xs font-bold text-white/90 transition-colors mt-1">
              <span>+ Add Platform</span>
            </button>
          </div>
        </div>

        {/* Global Rank Card */}
        <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 flex flex-col gap-3 relative z-10 shadow-lg mt-4">
          <p className="text-[9px] uppercase tracking-[3px] text-white/50 font-bold">Leaderboard</p>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-white/70">Global Rank</p>
              <p className="text-[10px] text-white/50 mt-0.5">Based on C-Score</p>
            </div>
            <ChevronRight className="w-4 h-4 text-white/40" />
          </div>
          <button className="w-full py-2 bg-white/15 hover:bg-white/25 border border-white/20 hover:border-white/30 rounded-xl text-xs font-bold uppercase transition-all">
            View Leaderboard
          </button>
          
          <div className="flex justify-between items-center text-[10px] text-white/50 pt-2 border-t border-white/10 mt-1">
            <span>Views: 4</span>
            <span>Refreshed: 1m ago</span>
          </div>
        </div>
      </div>

      {/* ════════════════════ RIGHT DASHBOARD PANEL ════════════════════ */}
      <div className="flex-1 p-6 md:p-8 overflow-y-auto md:h-full bg-[#f9fafb] flex flex-col gap-6">
        
        {/* TOP ROW: QUESTIONS, ACTIVE DAYS, SUBMISSIONS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          {/* Card 1: Total Questions */}
          <div className="bg-white border border-gray-100 rounded-2xl p-4.5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-center items-center text-center h-[130px] relative">
            <p className="text-[9px] uppercase tracking-[2px] text-gray-400 font-bold">Total Questions</p>
            <h2 className="text-3xl font-black text-gray-800 tracking-tight mt-2">{vm.codolio.totalQuestions}</h2>
            <div className="absolute top-3 right-3 text-gray-300">
              <Trophy className="w-4 h-4" />
            </div>
          </div>

          {/* Card 2: Total Active Days */}
          <div className="bg-white border border-gray-100 rounded-2xl p-4.5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-center items-center text-center h-[130px] relative">
            <p className="text-[9px] uppercase tracking-[2px] text-gray-400 font-bold">Total Active Days</p>
            <h2 className="text-3xl font-black text-gray-800 tracking-tight mt-2">{vm.codolio.totalActiveDays}</h2>
            <div className="absolute top-3 right-3 text-gray-300">
              <Flame className="w-4 h-4" />
            </div>
          </div>

          {/* Card 3: Submissions Calendar */}
          <div className="md:col-span-2">
            <SubmissionsCalendar 
              submissions={vm.codolio.submissions} 
              maxStreak={vm.codolio.maxStreak} 
              currentStreak={vm.codolio.currentStreak} 
            />
          </div>

        </div>

        {/* MIDDLE ROW: RATINGS CHART, CONTESTS, PROBLEMS SOLVED BREAKDOWN */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          
          {/* Left/Center Column (Contests & Rating curve) */}
          <div className="xl:col-span-2 flex flex-col gap-6">
            
            {/* Contest Stats: Live rating summary */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-[230px] relative overflow-hidden">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[9px] uppercase tracking-[2px] text-gray-400 font-bold">Rating</p>
                  <h3 className="text-3xl font-black text-gray-800 tracking-tight mt-1">{vm.codolio.ratingHistory.rating}</h3>
                </div>
                <div className="text-right text-xs text-gray-400 leading-snug">
                  <p className="font-bold text-gray-700">{vm.codolio.ratingHistory.date}</p>
                  <p>{vm.codolio.ratingHistory.contest}</p>
                  <p>Rank: {vm.codolio.ratingHistory.rank}</p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4">
                  <p className="text-[9px] uppercase tracking-[2px] text-gray-400 font-bold">Current rating</p>
                  <p className="mt-2 text-2xl font-black text-gray-800">{vm.codolio.ratingHistory.rating}</p>
                </div>
                <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4">
                  <p className="text-[9px] uppercase tracking-[2px] text-gray-400 font-bold">LeetCode max</p>
                  <p className="mt-2 text-2xl font-black text-gray-800">{vm.leetcode?.userStats?.maxRating ?? 'N/A'}</p>
                </div>
                <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4">
                  <p className="text-[9px] uppercase tracking-[2px] text-gray-400 font-bold">Latest contest rank</p>
                  <p className="mt-2 text-2xl font-black text-gray-800">{vm.codolio.ratingHistory.rank}</p>
                </div>
                <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4">
                  <p className="text-[9px] uppercase tracking-[2px] text-gray-400 font-bold">Latest contest</p>
                  <p className="mt-2 text-sm font-bold text-gray-700 leading-snug">{vm.codolio.ratingHistory.contest}</p>
                </div>
              </div>
            </div>

            {/* Total Contests and platform counts */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between h-[90px]">
              <div>
                <p className="text-[9px] uppercase tracking-[2px] text-gray-400 font-bold">Total Contests</p>
                <h3 className="text-3xl font-black text-gray-800 mt-1">{vm.codolio.totalContests}</h3>
              </div>
              <div className="flex gap-8 text-xs select-none">
                <div className="flex items-center gap-2 border-r border-gray-100 pr-8">
                  <span className="font-extrabold text-amber-500">L</span>
                  <div>
                    <p className="text-gray-400 text-[9px] font-bold uppercase">LeetCode</p>
                    <p className="font-black text-gray-700">{vm.codolio.contestsBreakdown.leetcode}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-blue-500">C</span>
                  <div>
                    <p className="text-gray-400 text-[9px] font-bold uppercase">CodeForces</p>
                    <p className="font-black text-gray-700">{vm.codolio.contestsBreakdown.codeforces}</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column (Problems Solved) */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-4">
            <p className="text-[10px] uppercase tracking-[2px] text-gray-400 font-bold">Problems Solved</p>
            
            <div className="flex flex-col gap-5.5 justify-center flex-1">
              
              {/* Fundamentals Gauge */}
              <div className="flex items-center gap-4.5">
                <CircularGauge 
                  total={10} 
                  centerText={vm.codolio.problemsSolved.fundamentals.value} 
                  segments={[{ value: vm.codolio.problemsSolved.fundamentals.value, color: '#22c55e' }]} 
                />
                <div>
                  <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Fundamentals</h4>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
                    <span className="text-[11px] text-gray-400 font-bold">{vm.codolio.problemsSolved.fundamentals.label} <strong className="text-gray-600">{vm.codolio.problemsSolved.fundamentals.value}</strong></span>
                  </div>
                </div>
              </div>

              {/* DSA Gauge */}
              <div className="flex items-center gap-4.5">
                <CircularGauge 
                  total={vm.codolio.problemsSolved.dsa.total} 
                  centerText={vm.codolio.problemsSolved.dsa.total} 
                  segments={[
                    { value: vm.codolio.problemsSolved.dsa.easy, color: '#22c55e' },
                    { value: vm.codolio.problemsSolved.dsa.medium, color: '#f59e0b' },
                    { value: vm.codolio.problemsSolved.dsa.hard, color: '#ef4444' }
                  ]} 
                />
                <div className="flex-1">
                  <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider">DSA</h4>
                  <div className="grid grid-cols-3 gap-2 mt-1 text-[10px] text-gray-400 font-bold">
                    <div>
                      <p className="text-[#22c55e]">Easy</p>
                      <p className="text-gray-700 text-xs mt-0.5">{vm.codolio.problemsSolved.dsa.easy}</p>
                    </div>
                    <div>
                      <p className="text-[#f59e0b]">Medium</p>
                      <p className="text-gray-700 text-xs mt-0.5">{vm.codolio.problemsSolved.dsa.medium}</p>
                    </div>
                    <div>
                      <p className="text-[#ef4444]">Hard</p>
                      <p className="text-gray-700 text-xs mt-0.5">{vm.codolio.problemsSolved.dsa.hard}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Competitive Programming Gauge */}
              <div className="flex items-center gap-4.5">
                <CircularGauge 
                  total={100} 
                  centerText={vm.codolio.problemsSolved.competitiveProgramming.value} 
                  segments={[{ value: vm.codolio.problemsSolved.competitiveProgramming.value, color: '#f59e0b' }]} 
                />
                <div>
                  <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Competitive Programming</h4>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]" />
                    <span className="text-[11px] text-gray-400 font-bold">{vm.codolio.problemsSolved.competitiveProgramming.label} <strong className="text-gray-600">{vm.codolio.problemsSolved.competitiveProgramming.value}</strong></span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* LOWER ROW: AWARDS, TOPIC ANALYSIS, CONTEST RANKINGS */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          
          {/* Card: Awards & Badges */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between min-h-[220px]">
            <p className="text-[10px] uppercase tracking-[2px] text-gray-400 font-bold">Awards</p>
            <div className="flex justify-around items-center gap-2 mt-4">
              {vm.codolio.awards.map((b, idx) => (
                <HexBadge 
                  key={idx} 
                  badge={{
                    id: `badge-${idx}`,
                    label: b.label,
                    color: b.color,
                    icon: (
                      <span className="text-white text-base">
                        {b.type === 'streak' ? '🔥' : '🏆'}
                      </span>
                    )
                  }} 
                />
              ))}
            </div>
            <div className="text-[9px] text-gray-300 font-bold border-t border-gray-50 pt-3 text-center uppercase tracking-wider mt-4">
              show more
            </div>
          </div>

          {/* Card: Topic Analysis */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between min-h-[220px]">
            <p className="text-[10px] uppercase tracking-[2px] text-gray-400 font-bold">DSA Topic Analysis</p>
            
            <div className="flex flex-col gap-2 mt-3 flex-1 overflow-y-auto max-h-[140px] pr-1.5 scrollbar-thin">
              {vm.codolio.topicAnalysis
                .slice(0, showAllTopics ? undefined : 4)
                .map((topic, idx) => {
                  const maxCount = 228;
                  const pct = (topic.count / maxCount) * 100;
                  return (
                    <div key={idx} className="flex flex-col gap-0.5">
                      <div className="flex justify-between items-center text-[10px] text-gray-600 font-bold">
                        <span>{topic.name}</span>
                        <span className="text-gray-800">{topic.count}</span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-50 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
            </div>

            <button 
              onClick={() => setShowAllTopics(!showAllTopics)}
              className="text-[9px] text-gray-400 hover:text-gray-600 font-extrabold border-t border-gray-50 pt-2.5 text-center uppercase tracking-wider cursor-pointer mt-3"
            >
              {showAllTopics ? 'show less' : 'show more'}
            </button>
          </div>

          {/* Card: Contest Rankings details */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between min-h-[220px]">
            <p className="text-[10px] uppercase tracking-[2px] text-gray-400 font-bold">Contest Rankings</p>
            
            <div className="flex flex-col gap-5 mt-4 flex-1 justify-center">
              {/* LeetCode platform */}
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest">LEETCODE</h4>
                  <p className="text-[10px] text-gray-500 font-bold mt-1">Rating: {vm.leetcode.userStats?.currentRating || 1584} <span className="text-gray-400 font-normal">(max: {vm.leetcode.userStats?.maxRating || 1599})</span></p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-500 font-black text-xl select-none">
                  L
                </div>
              </div>

              {/* Codeforces platform */}
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest">CODEFORCES</h4>
                  <p className="text-sm font-extrabold text-gray-700 mt-0.5">{vm.codeforces.userStats?.rank || "Newbie"}</p>
                  <p className="text-[10px] text-gray-500 font-bold mt-1">Rating: {vm.codeforces.userStats?.currentRating || 867} <span className="text-gray-400 font-normal">(max: {vm.codeforces.userStats?.maxRating || 942})</span></p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-500 font-black text-xl select-none">
                  C
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}