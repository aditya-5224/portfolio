import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { Activity, CalendarDays, Code2, Trophy, Flame, ExternalLink } from 'lucide-react';

/* ─────────────────────────────────────────────────────────────────
   PLATFORM LINKS — real URLs + inline SVG logos
───────────────────────────────────────────────────────────────── */
const PLATFORM_LINKS = [
  {
    key: 'leetcode',
    label: 'LeetCode',
    url: 'https://leetcode.com/u/aditya-5224/',
    logo: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H19.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
      </svg>
    ),
  },
  {
    key: 'geeksforgeeks',
    label: 'GeeksForGeeks',
    url: 'https://www.geeksforgeeks.org/profile/vegeta5224?tab=activity',
    logo: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M21.45 14.315c-.143.28-.334.532-.565.745a3.691 3.691 0 0 1-1.104.695 4.51 4.51 0 0 1-3.116-.016 3.79 3.79 0 0 1-1.106-.705 3.565 3.565 0 0 1-.96-1.999H12.6a3.557 3.557 0 0 1-.96 2.001 3.79 3.79 0 0 1-1.106.705 4.51 4.51 0 0 1-3.116.016 3.691 3.691 0 0 1-1.104-.695 3.43 3.43 0 0 1-.565-.745A3.36 3.36 0 0 1 5.4 12.9H2.962a5.573 5.573 0 0 0 .49 2.175 5.668 5.668 0 0 0 1.322 1.782 6.084 6.084 0 0 0 1.99 1.184 6.888 6.888 0 0 0 2.448.432 6.891 6.891 0 0 0 2.717-.537 5.931 5.931 0 0 0 2.07-1.453A5.931 5.931 0 0 0 16.07 17.936a6.891 6.891 0 0 0 2.717.537 6.888 6.888 0 0 0 2.448-.432 6.084 6.084 0 0 0 1.99-1.184 5.668 5.668 0 0 0 1.322-1.782 5.573 5.573 0 0 0 .49-2.175H21.6a3.36 3.36 0 0 1-.15 1.415zM11.997 3a9.42 9.42 0 0 0-3.062.487 7.93 7.93 0 0 0-2.456 1.37 6.3 6.3 0 0 0-1.62 2.086A6.194 6.194 0 0 0 4.287 9.6h2.438c.085-.668.298-1.308.627-1.878a4.198 4.198 0 0 1 1.157-1.32 5.07 5.07 0 0 1 1.594-.78A6.55 6.55 0 0 1 12 5.368a6.55 6.55 0 0 1 1.897.254 5.07 5.07 0 0 1 1.594.78 4.198 4.198 0 0 1 1.157 1.32c.33.57.542 1.21.627 1.878h2.438a6.194 6.194 0 0 0-.572-2.657 6.3 6.3 0 0 0-1.62-2.086 7.93 7.93 0 0 0-2.456-1.37A9.42 9.42 0 0 0 11.997 3z" />
      </svg>
    ),
  },
  {
    key: 'codeforces',
    label: 'CodeForces',
    url: 'https://codeforces.com/profile/yadi.tya5224',
    logo: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M4.5 7.5C5.328 7.5 6 8.172 6 9v10.5c0 .828-.672 1.5-1.5 1.5h-3C.672 21 0 20.328 0 19.5V9c0-.828.672-1.5 1.5-1.5h3zm9-4.5c.828 0 1.5.672 1.5 1.5V19.5c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5V4.5C9 3.672 9.672 3 10.5 3h3zm9 7.5c.828 0 1.5.672 1.5 1.5v9c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5v-9c0-.828.672-1.5 1.5-1.5h3z" />
      </svg>
    ),
  },
  {
    key: 'hackerrank',
    label: 'HackerRank',
    url: 'https://www.hackerrank.com/profile/csai1A_2511177',
    logo: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M12 0c1.285 0 9.75 4.886 10.392 6 .645 1.114.645 10.886 0 12-.642 1.114-9.107 6-10.392 6-1.284 0-9.75-4.886-10.392-6C.963 16.886.963 7.114 1.608 6 2.25 4.886 10.715 0 12 0zm2.295 7.158H9.705c-.151 0-.245.097-.245.254v1.486c0 .157.094.254.245.254h.906v5.588h-.906c-.151 0-.245.097-.245.253v1.487c0 .157.094.254.245.254h4.59c.151 0 .245-.097.245-.254v-1.487c0-.156-.094-.253-.245-.253h-.906V7.412c0-.157-.094-.254-.245-.254h-.855v.001z" />
      </svg>
    ),
  },
];

/* ─────────────────────────────────────────────────────────────────
   BADGES — fallback visuals used when API badges are missing
───────────────────────────────────────────────────────────────── */
const FALLBACK_BADGES = [
  { id: 'problem-solving', label: 'Problem Solving', sub: '3 Stars', color: '#e63946', icon: '🧩' },
  { id: '50-days',         label: '50 Days',         sub: 'Streak',   color: '#22c55e', icon: '🔥' },
  { id: '100-days',        label: '100 Days',        sub: 'Streak',   color: '#3b82f6', icon: '💎' },
  { id: '150-days',        label: '150 Days',        sub: 'Streak',   color: '#a3e635', icon: '🏆' },
];

/* ─────────────────────────────────────────────────────────────────
   HELPER FUNCTIONS (unchanged from original)
───────────────────────────────────────────────────────────────── */
function pick(source, paths, fallback = null) {
  for (const path of paths) {
    const value = path.split('.').reduce((acc, key) => {
      if (acc && typeof acc === 'object' && key in acc) return acc[key];
      return undefined;
    }, source);
    if (value !== undefined && value !== null && value !== '') return value;
  }
  return fallback;
}
function toNumber(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}
function toLabel(value) {
  return typeof value === 'string' && value.trim() ? value : 'N/A';
}
function unwrapCodolioPayload(payload) {
  if (payload?.data && typeof payload.data === 'object') return payload.data;
  return payload && typeof payload === 'object' ? payload : {};
}
function getPlatformProfiles(payload) {
  const root = unwrapCodolioPayload(payload);
  const p = root.platformProfiles?.platformProfiles;
  return Array.isArray(p) ? p : [];
}
function getPlatformSolved(profile) {
  return toNumber(profile?.totalQuestionStats?.totalQuestionCounts);
}
function getActiveDays(profile) {
  return toNumber(profile?.dailyActivityStatsResponse?.totalActiveDays);
}
function getCurrentRating(profile) {
  return toNumber(profile?.userStats?.currentRating);
}
function getRank(profile) {
  return toLabel(profile?.userStats?.rank);
}
function getMaxStreak(profile) {
  return toNumber(profile?.dailyActivityStatsResponse?.maxStreak);
}
function getDSADifficulty(profile) {
  const qs = profile?.totalQuestionStats;
  return {
    easy:   toNumber(qs?.easyQuestionCounts   ?? qs?.easyCount   ?? qs?.easy   ?? 0),
    medium: toNumber(qs?.mediumQuestionCounts ?? qs?.mediumCount ?? qs?.medium ?? 0),
    hard:   toNumber(qs?.hardQuestionCounts   ?? qs?.hardCount   ?? qs?.hard   ?? 0),
  };
}
function getProfileBadges(profile, platformKey = '') {
  const badgeList = profile?.badgeStats?.badgeList;
  if (!Array.isArray(badgeList)) return [];
  const resolvedPlatform = (platformKey || profile?.platform || '').toLowerCase();

  const colors = ['#e63946', '#22c55e', '#3b82f6', '#f59e0b', '#a855f7'];
  const symbols = ['🏅', '🔥', '💎', '⭐', '🏆'];

  return badgeList
    .map((badge, index) => ({
      id: String(badge?.shortName ?? badge?.name ?? `badge-${index}`),
      label: toLabel(badge?.shortName ?? badge?.displayName ?? badge?.name),
      sub: badge?.stars ? `${badge.stars} Stars` : toLabel(badge?.category),
      color: colors[index % colors.length],
      platform: resolvedPlatform,
      icon: symbols[index % symbols.length],
      stars: toNumber(badge?.stars),
      iconUrl: typeof badge?.icon === 'string' && badge.icon.trim() ? badge.icon : null,
    }))
    .filter((badge) => badge.label !== 'N/A');
}
function getCombinedBadges(leetcodeProfile, hackerRankProfile) {
  const leetcodeBadges = getProfileBadges(leetcodeProfile, 'leetcode');
  const hackerRankBadges = getProfileBadges(hackerRankProfile, 'hackerrank');

  const hasHackerRankBadge = hackerRankBadges.length > 0;
  const hasHackerRankProfile = Boolean(hackerRankProfile);

  if (hasHackerRankProfile && !hasHackerRankBadge) {
    hackerRankBadges.push({
      id: 'hackerrank-platform',
      label: 'HackerRank',
      sub: 'Platform',
      color: '#16a34a',
      platform: 'hackerrank',
      icon: 'H',
      iconUrl: null,
    });
  }

  return [...leetcodeBadges, ...hackerRankBadges];
}

/* ─────────────────────────────────────────────────────────────────
   PURE-SVG DONUT CHART
───────────────────────────────────────────────────────────────── */
function DonutChart({ segments, total, size = 96 }) {
  const R  = 36;
  const cx = size / 2;
  const cy = size / 2;
  const GAP_DEG = 4;

  const polarXY = (angleDeg) => {
    const rad = ((angleDeg - 90) * Math.PI) / 180;
    return { x: cx + R * Math.cos(rad), y: cy + R * Math.sin(rad) };
  };

  const arcPath = (startDeg, endDeg) => {
    const s = polarXY(startDeg);
    const e = polarXY(endDeg);
    const large = endDeg - startDeg > 180 ? 1 : 0;
    return `M ${s.x} ${s.y} A ${R} ${R} 0 ${large} 1 ${e.x} ${e.y}`;
  };

  let cursor = 0;
  const arcs = segments.map((seg) => {
    const pct  = total > 0 ? seg.value / total : 0;
    const span = pct * 360 - GAP_DEG;
    const from = cursor + GAP_DEG / 2;
    const to   = cursor + pct * 360 - GAP_DEG / 2;
    cursor    += pct * 360;
    return { ...seg, from, to, span };
  });

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* grey track */}
      <circle cx={cx} cy={cy} r={R} fill="none" stroke="#f3f4f6" strokeWidth="9" />
      {/* coloured arcs */}
      {arcs.map((arc) =>
        arc.span > 0 ? (
          <motion.path
            key={arc.label}
            d={arcPath(arc.from, arc.to)}
            fill="none"
            stroke={arc.color}
            strokeWidth="9"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          />
        ) : null
      )}
      {/* centre total */}
      <text
        x={cx} y={cy - 5}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#111827"
        fontWeight="700"
        fontSize={size * 0.2}
      >
        {total > 0 ? total : '—'}
      </text>
      <text
        x={cx} y={cy + 9}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#9ca3af"
        fontSize={size * 0.1}
      >
        solved
      </text>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────
   HEXAGON BADGE
───────────────────────────────────────────────────────────────── */
function HexBadge({ badge, index }) {
  const [hovered, setHovered] = useState(false);
  const isHackerRankBadge =
    badge?.platform === 'hackerrank' ||
    /hackerrank/i.test(String(badge?.label ?? '')) ||
    (/problem solving/i.test(String(badge?.label ?? '')) && toNumber(badge?.stars) > 0);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.55 + index * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="flex flex-col items-center gap-1 cursor-default select-none"
    >
      <motion.div
        animate={{ scale: hovered ? 1.15 : 1, y: hovered ? -4 : 0 }}
        transition={{ type: 'spring', stiffness: 380, damping: 18 }}
        className="relative w-12 h-12 flex items-center justify-center"
        style={{
          clipPath: 'polygon(50% 0%,93% 25%,93% 75%,50% 100%,7% 75%,7% 25%)',
          background: `linear-gradient(135deg,${badge.color}25,${badge.color}10)`,
        }}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            clipPath: 'polygon(50% 0%,93% 25%,93% 75%,50% 100%,7% 75%,7% 25%)',
            background: badge.color,
          }}
          animate={{ opacity: hovered ? 0.2 : 0.08 }}
          transition={{ duration: 0.2 }}
        />
        {/* hex border */}
        <svg
          viewBox="0 0 48 48"
          className="absolute inset-0 w-full h-full"
          style={{ opacity: hovered ? 0.6 : 0.3 }}
        >
          <polygon
            points="24,2 44,13 44,35 24,46 4,35 4,13"
            fill="none"
            stroke={badge.color}
            strokeWidth="1.5"
          />
        </svg>
        {badge.iconUrl ? (
          <img
            src={badge.iconUrl}
            alt={badge.label}
            className="relative z-10 h-6 w-6 object-contain"
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
          />
        ) : isHackerRankBadge ? (
          <svg viewBox="0 0 24 24" className="relative z-10 h-5 w-5" fill="currentColor" style={{ color: '#16a34a' }}>
            <path d="M12 0c1.285 0 9.75 4.886 10.392 6 .645 1.114.645 10.886 0 12-.642 1.114-9.107 6-10.392 6-1.284 0-9.75-4.886-10.392-6C.963 16.886.963 7.114 1.608 6 2.25 4.886 10.715 0 12 0zm2.295 7.158H9.705c-.151 0-.245.097-.245.254v1.486c0 .157.094.254.245.254h.906v5.588h-.906c-.151 0-.245.097-.245.253v1.487c0 .157.094.254.245.254h4.59c.151 0 .245-.097.245-.254v-1.487c0-.156-.094-.253-.245-.253h-.906V7.412c0-.157-.094-.254-.245-.254h-.855v.001z" />
          </svg>
        ) : (
          <span className="relative z-10 text-lg">{badge.icon}</span>
        )}
      </motion.div>
      <p className="text-[9px] text-gray-500 font-semibold text-center leading-tight max-w-[52px]">
        {badge.label}
      </p>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────────────────────────── */
export default function CodingStats() {
  const [stats,   setStats]   = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState('');

  useEffect(() => {
    let isMounted = true;
    async function loadStats() {
      try {
        const res = await fetch('/data/stats.json', { cache: 'no-store' });
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        const payload = await res.json();
        if (isMounted) { setStats(payload); setError(''); }
      } catch {
        if (isMounted) { setError('Unable to load coding stats.'); setStats(null); }
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadStats();
    return () => { isMounted = false; };
  }, []);

  const vm = useMemo(() => {
    const profiles = getPlatformProfiles(stats);
    const leetcode = profiles.find((p) => p?.platform === 'leetcode');
    const gfg      = profiles.find((p) => p?.platform === 'geeksforgeeks');
    const cf       = profiles.find((p) => p?.platform === 'codeforces');
    const hr       = profiles.find((p) => p?.platform === 'hackerrank');

    const totalSolved = profiles.reduce((s, p) => s + getPlatformSolved(p), 0);
    const activeDays  = profiles.reduce((s, p) => s + getActiveDays(p), 0);
    const maxStreak   = Math.max(getMaxStreak(leetcode), getMaxStreak(gfg), getMaxStreak(cf));

    const dsa      = getDSADifficulty(leetcode);
    const dsaTotal = dsa.easy + dsa.medium + dsa.hard;
    const badges   = getCombinedBadges(leetcode, hr);

    return {
      totalSolved, activeDays, maxStreak,
      platformRows: [
        { key: 'leetcode',      solved: getPlatformSolved(leetcode) },
        { key: 'geeksforgeeks', solved: getPlatformSolved(gfg)      },
        { key: 'codeforces',    solved: getPlatformSolved(cf)       },
        { key: 'hackerrank',    solved: getPlatformSolved(hr)       },
      ],
      leetCodeRating:   getCurrentRating(leetcode),
      codeforcesRank:   getRank(cf),
      codeforcesRating: getCurrentRating(cf),
      dsa,
      dsaTotal,
      badges: badges.length ? badges : FALLBACK_BADGES,
    };
  }, [stats]);

  /* ── compact stat row (left panel) ── */
  const StatRow = ({ icon: Icon, label, value }) => (
    <div className="flex items-center gap-2.5 rounded-xl bg-white/10 border border-white/15 px-3 py-2">
      <div className="rounded-lg bg-white/15 p-1.5 flex-shrink-0">
        <Icon className="h-3 w-3 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[8px] uppercase tracking-[0.2em] text-white/50 leading-none mb-0.5">{label}</p>
        <p className="text-base font-bold text-white leading-none font-mono">{value}</p>
      </div>
    </div>
  );

  return (
    <section
      id="coding-stats"
      className="w-full h-full flex flex-col md:flex-row overflow-hidden"
    >

      {/* ══════════ LEFT — RED ══════════ */}
      <div className="md:w-[40%] bg-brand-red flex flex-col justify-between px-8 md:px-12 py-9 relative overflow-hidden">

        {/* diagonal texture */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.06]"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 0,transparent 50%)',
            backgroundSize: '20px 20px',
          }}
        />
        {/* decorative circle */}
        <div className="absolute -bottom-16 -left-16 w-52 h-52 rounded-full border-[28px] border-white/10 pointer-events-none" />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <div className="flex items-center justify-between mb-1">
            <p className="text-white/50 text-[9px] tracking-[4px] uppercase font-medium">Coding Profile</p>
            <div className="rounded-lg border border-white/20 bg-white/10 p-1.5">
              <Code2 className="h-4 w-4 text-white" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif italic text-white leading-tight mt-2">
            Coding<br />Stats
          </h2>
          <p className="mt-1 text-white/60 text-xs font-medium tracking-wide">@vegeta</p>
        </motion.div>

        {/* Stat rows */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="relative z-10 flex flex-col gap-2 mt-4"
        >
          <StatRow icon={Trophy}       label="Total Solved" value={loading ? '—' : String(vm.totalSolved).padStart(4, '0')} />
          <StatRow icon={CalendarDays} label="Active Days"  value={loading ? '—' : String(vm.activeDays).padStart(3, '0')} />
          <StatRow icon={Flame}        label="Max Streak"   value={loading ? '—' : vm.maxStreak > 0 ? `${vm.maxStreak}d` : 'N/A'} />
        </motion.div>

        {/* Platform links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="relative z-10 mt-4"
        >
          <p className="text-[9px] uppercase tracking-[3px] text-white/40 mb-2 font-medium">Profiles</p>
          <div className="flex flex-col gap-1.5">
            {PLATFORM_LINKS.map((platform, i) => {
              const row    = vm.platformRows?.find((r) => r.key === platform.key);
              const solved = loading ? null : row?.solved;
              return (
                <motion.a
                  key={platform.key}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.45 + i * 0.07, duration: 0.4 }}
                  whileHover={{ x: 5, backgroundColor: 'rgba(255,255,255,0.2)' }}
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2 bg-white/10 border border-white/15
                             group transition-colors duration-150 cursor-pointer"
                >
                  <span className="flex-shrink-0 text-white/75 group-hover:text-white transition-colors duration-150">
                    {platform.logo}
                  </span>
                  <span className="flex-1 text-white/85 text-xs font-semibold">{platform.label}</span>
                  {solved !== null && (
                    <span className="text-white/50 text-[10px] font-mono tabular-nums">{solved}</span>
                  )}
                  <ExternalLink className="h-3 w-3 text-white/25 group-hover:text-white/60 transition-colors flex-shrink-0" />
                </motion.a>
              );
            })}
          </div>
        </motion.div>

        {error && (
          <div className="relative z-10 mt-3 rounded-xl border border-white/20 bg-white/10 px-3 py-2
                          text-[10px] text-white/70 flex items-center gap-2">
            <Activity className="h-3 w-3 text-white/50 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* ══════════ RIGHT — WHITE ══════════ */}
      <div className="flex-1 bg-white flex flex-col justify-center px-8 md:px-12 py-9 relative overflow-hidden">

        {/* soft glow */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/3
                        w-72 h-72 bg-brand-red/5 rounded-full blur-2xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 flex flex-col gap-5 h-full justify-center"
        >

          {/* ── Rankings ── */}
          <div>
            <p className="text-[9px] uppercase tracking-[3px] text-gray-400 mb-2.5 font-medium">
              Rankings & Ratings
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-3.5">
                <p className="text-[9px] uppercase tracking-[0.18em] text-gray-400 mb-1">LeetCode</p>
                <p className="text-2xl font-bold text-gray-900 leading-none">
                  {loading ? '—' : vm.leetCodeRating || 'N/A'}
                </p>
                <p className="text-[9px] text-gray-400 mt-1">Rating</p>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-3.5">
                <p className="text-[9px] uppercase tracking-[0.18em] text-gray-400 mb-1">Codeforces</p>
                <p className="text-lg font-bold text-gray-900 leading-none capitalize">
                  {loading ? '—' : vm.codeforcesRank}
                </p>
                <p className="text-[9px] text-gray-400 mt-1">
                  {!loading && vm.codeforcesRating > 0 ? `Rating ${vm.codeforcesRating}` : 'Rank'}
                </p>
              </div>
            </div>
          </div>

          {/* ── DSA Donut Chart ── */}
          <div>
            <p className="text-[9px] uppercase tracking-[3px] text-gray-400 mb-3 font-medium">
              Problems Solved — DSA
            </p>
            <div className="flex items-center gap-6">
              <div className="flex-shrink-0">
                <DonutChart
                  size={96}
                  total={loading ? 0 : vm.dsaTotal}
                  segments={[
                    { label: 'Easy',   value: loading ? 0 : vm.dsa.easy,   color: '#22c55e' },
                    { label: 'Medium', value: loading ? 0 : vm.dsa.medium, color: '#f59e0b' },
                    { label: 'Hard',   value: loading ? 0 : vm.dsa.hard,   color: '#e63946' },
                  ]}
                />
              </div>
              <div className="flex flex-col gap-2.5 flex-1">
                {[
                  { label: 'Easy',   value: loading ? 0 : vm.dsa.easy,   color: '#22c55e' },
                  { label: 'Medium', value: loading ? 0 : vm.dsa.medium, color: '#f59e0b' },
                  { label: 'Hard',   value: loading ? 0 : vm.dsa.hard,   color: '#e63946' },
                ].map((seg, i) => (
                  <motion.div
                    key={seg.label}
                    initial={{ opacity: 0, x: 14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: seg.color }} />
                      <span className="text-xs text-gray-600 font-medium">{seg.label}</span>
                    </div>
                    <span className="text-xs font-bold tabular-nums" style={{ color: seg.color }}>
                      {seg.value}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Badges ── */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-[9px] uppercase tracking-[3px] text-gray-400 font-medium">
                Awards & Badges
              </p>
              <span className="text-[9px] text-gray-300 tabular-nums">{vm.badges.length}</span>
            </div>
            <div className="flex gap-5 flex-wrap">
              {vm.badges.map((badge, i) => (
                <HexBadge key={badge.id} badge={badge} index={i} />
              ))}
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}