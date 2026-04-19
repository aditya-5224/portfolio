import React, { useEffect, useMemo, useState } from 'react';
import { Activity, CalendarDays, Code2, Gauge, Trophy } from 'lucide-react';

/**
 * @typedef {Object} TopicRow
 * @property {string} name
 * @property {number} value
 */

/**
 * Safely resolve nested values from dynamic API payloads.
 * @param {unknown} source
 * @param {string[]} paths
 * @param {unknown} fallback
 * @returns {unknown}
 */
function pick(source, paths, fallback = null) {
  for (const path of paths) {
    const value = path.split('.').reduce((acc, key) => {
      if (acc && typeof acc === 'object' && key in acc) {
        return acc[key];
      }
      return undefined;
    }, source);

    if (value !== undefined && value !== null && value !== '') {
      return value;
    }
  }
  return fallback;
}

/**
 * @param {unknown} value
 * @returns {number}
 */
function toNumber(value) {
  const next = Number(value);
  return Number.isFinite(next) ? next : 0;
}

/**
 * @param {unknown} value
 * @returns {string}
 */
function toLabel(value) {
  if (typeof value === 'string' && value.trim()) {
    return value;
  }
  return 'N/A';
}

/**
 * @param {unknown} raw
 * @returns {TopicRow[]}
 */
function normalizeTopics(raw) {
  if (Array.isArray(raw)) {
    return raw
      .map((item) => ({
        name: toLabel(pick(item, ['topic', 'name', 'label'], 'Unknown')),
        value: toNumber(pick(item, ['count', 'solved', 'value', 'questions'], 0)),
      }))
      .filter((item) => item.value > 0);
  }

  if (raw && typeof raw === 'object') {
    return Object.entries(raw)
      .map(([name, value]) => ({ name, value: toNumber(value) }))
      .filter((item) => item.value > 0);
  }

  return [];
}

/**
 * @param {unknown} payload
 * @returns {Record<string, any>}
 */
function unwrapCodolioPayload(payload) {
  if (payload && typeof payload === 'object') {
    if ('data' in payload && payload.data && typeof payload.data === 'object') {
      return payload.data;
    }
  }

  return payload && typeof payload === 'object' ? payload : {};
}

/**
 * @param {unknown} payload
 * @returns {Array<Record<string, any>>}
 */
function getPlatformProfiles(payload) {
  const root = unwrapCodolioPayload(payload);
  const profiles = root.platformProfiles?.platformProfiles;

  return Array.isArray(profiles) ? profiles : [];
}

/**
 * @param {Record<string, any>} profile
 * @returns {number}
 */
function getPlatformSolved(profile) {
  return toNumber(profile?.totalQuestionStats?.totalQuestionCounts);
}

/**
 * @param {Record<string, any>} profile
 * @returns {number}
 */
function getActiveDays(profile) {
  return toNumber(profile?.dailyActivityStatsResponse?.totalActiveDays);
}

/**
 * @param {Record<string, any>} profile
 * @returns {number}
 */
function getCurrentRating(profile) {
  return toNumber(profile?.userStats?.currentRating);
}

/**
 * @param {Record<string, any>} profile
 * @returns {string}
 */
function getRank(profile) {
  return toLabel(profile?.userStats?.rank);
}

/**
 * @param {unknown} payload
 * @returns {Record<string, number>}
 */
function getTopicDistribution(payload) {
  const profiles = getPlatformProfiles(payload);
  const leetcodeProfile = profiles.find((profile) => profile?.platform === 'leetcode');
  const gfgProfile = profiles.find((profile) => profile?.platform === 'geeksforgeeks');
  const codeforcesProfile = profiles.find((profile) => profile?.platform === 'codeforces');

  const distributions = [
    leetcodeProfile?.topicAnalysisStats?.topicWiseDistribution,
    gfgProfile?.topicAnalysisStats?.topicWiseDistribution,
    codeforcesProfile?.dailyActivityStatsResponse?.topicWiseDistribution,
  ].filter((value) => value && typeof value === 'object');

  const merged = {};

  for (const distribution of distributions) {
    for (const [topic, count] of Object.entries(distribution)) {
      merged[topic] = (merged[topic] || 0) + toNumber(count);
    }
  }

  return merged;
}

/**
 * Coding stats card for Codolio synced data.
 * The layout remains stable while loading by rendering fixed-height placeholders.
 */
export default function CodingStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadStats() {
      try {
        const response = await fetch('/data/stats.json', { cache: 'no-store' });
        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }

        const payload = await response.json();
        if (isMounted) {
          setStats(payload);
          setError('');
        }
      } catch (fetchError) {
        if (isMounted) {
          setError('Unable to load coding stats right now.');
          setStats(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadStats();

    return () => {
      isMounted = false;
    };
  }, []);

  const viewModel = useMemo(() => {
    const profiles = getPlatformProfiles(stats);
    const totalSolved = profiles.reduce((sum, profile) => sum + getPlatformSolved(profile), 0);
    const activeDays = profiles.reduce((sum, profile) => sum + getActiveDays(profile), 0);

    const leetcodeProfile = profiles.find((profile) => profile?.platform === 'leetcode');
    const gfgProfile = profiles.find((profile) => profile?.platform === 'geeksforgeeks');
    const codeforcesProfile = profiles.find((profile) => profile?.platform === 'codeforces');
    const hackerRankProfile = profiles.find((profile) => profile?.platform === 'hackerrank');

    const leetCodeRating = getCurrentRating(leetcodeProfile);
    const codeforcesRank = getRank(codeforcesProfile);
    const codeforcesRating = getCurrentRating(codeforcesProfile);

    const topicRows = normalizeTopics(getTopicDistribution(stats))
      .sort((a, b) => b.value - a.value)
      .slice(0, 2);

    const maxTopicValue = Math.max(...topicRows.map((item) => item.value), 1);

    return {
      totalSolved,
      activeDays,
      platformRows: [
        { label: 'LeetCode', solved: getPlatformSolved(leetcodeProfile), active: getPlatformSolved(leetcodeProfile) > 0 },
        { label: 'GeeksforGeeks', solved: getPlatformSolved(gfgProfile), active: getPlatformSolved(gfgProfile) > 0 },
        { label: 'CodeForces', solved: getPlatformSolved(codeforcesProfile), active: getPlatformSolved(codeforcesProfile) > 0 },
        { label: 'HackerRank', solved: getPlatformSolved(hackerRankProfile), active: getPlatformSolved(hackerRankProfile) > 0 },
      ],
      leetCodeRating,
      codeforcesRank,
      codeforcesRating,
      topicRows,
      maxTopicValue,
    };
  }, [stats]);

  const shellBlockClass = 'h-[448px] rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur-xl';

  return (
    <section id="coding-stats" className="h-full w-full overflow-y-auto bg-black px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-full w-full max-w-4xl items-center">
        <div className={shellBlockClass}>
          <div className="flex h-full flex-col">
            <header className="mb-8 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-3xl font-semibold leading-tight text-white sm:text-4xl">Aditya Yadav</h2>
                <p className="mt-1 text-base font-medium text-[#ff5252]">@vegeta</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-black/30 p-3">
                <Code2 className="h-6 w-6 text-[#ff5252]" aria-hidden="true" />
              </div>
            </header>

            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              <div className="rounded-2xl border border-white/10 bg-black/30 p-4 sm:p-5">
                <div className="mb-3 flex items-center gap-2 text-gray-400">
                  <Trophy className="h-4 w-4 text-[#ff5252]" aria-hidden="true" />
                  <span className="text-xs uppercase tracking-[0.2em]">Total Questions</span>
                </div>
                <p className="text-3xl font-bold text-white sm:text-4xl">
                  {loading ? '0000' : String(viewModel.totalSolved).padStart(4, '0')}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/30 p-4 sm:p-5">
                <div className="mb-3 flex items-center gap-2 text-gray-400">
                  <CalendarDays className="h-4 w-4 text-[#ff5252]" aria-hidden="true" />
                  <span className="text-xs uppercase tracking-[0.2em]">Total Active Days</span>
                </div>
                <p className="text-3xl font-bold text-white sm:text-4xl">
                  {loading ? '000' : String(viewModel.activeDays).padStart(3, '0')}
                </p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-black/30 p-4 sm:p-5">
                <h3 className="mb-4 text-xs uppercase tracking-[0.2em] text-gray-400">Platform Breakdown</h3>
                <ul className="space-y-3">
                  {(loading
                    ? [
                        { label: 'LeetCode', solved: 0, active: false },
                        { label: 'GeeksforGeeks', solved: 0, active: false },
                        { label: 'CodeForces', solved: 0, active: false },
                        { label: 'HackerRank', solved: 0, active: false },
                      ]
                    : viewModel.platformRows
                  ).map((platform) => (
                    <li key={platform.label} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span
                          className={`h-2 w-2 rounded-full ${
                            platform.active ? 'bg-[#ff5252]' : 'bg-white/20'
                          }`}
                          aria-hidden="true"
                        />
                        <span className="text-gray-200">{platform.label}</span>
                      </div>
                      <span className="font-semibold text-white">{platform.solved}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/30 p-4 sm:p-5">
                <h3 className="mb-4 text-xs uppercase tracking-[0.2em] text-gray-400">Rankings and Ratings</h3>
                <div className="space-y-4">
                  <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                    <p className="text-xs uppercase tracking-[0.2em] text-gray-400">LeetCode Rating</p>
                    <p className="mt-1 text-2xl font-bold text-white">
                      {loading ? '----' : viewModel.leetCodeRating || 'N/A'}
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                    <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Codeforces Rank</p>
                    <p className="mt-1 flex items-center gap-2 text-lg font-semibold text-white">
                      <Gauge className="h-4 w-4 text-[#ff5252]" aria-hidden="true" />
                      {loading
                        ? '--- / ---'
                        : `${viewModel.codeforcesRank}${
                            viewModel.codeforcesRating > 0 ? ` / ${viewModel.codeforcesRating}` : ''
                          }`}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-4 sm:p-5">
              <h3 className="mb-4 text-xs uppercase tracking-[0.2em] text-gray-400">Topic Analysis</h3>
              <div className="space-y-4">
                {(loading
                  ? [
                      { name: 'Arrays', value: 0 },
                      { name: 'Strings', value: 0 },
                    ]
                  : viewModel.topicRows.length
                    ? viewModel.topicRows
                    : [
                        { name: 'Arrays', value: 0 },
                        { name: 'Strings', value: 0 },
                      ]
                ).map((topic) => {
                  const widthPct =
                    loading || viewModel.maxTopicValue <= 0
                      ? 0
                      : Math.max(8, Math.round((topic.value / viewModel.maxTopicValue) * 100));

                  return (
                    <div key={topic.name} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <p className="text-gray-200">{topic.name}</p>
                        <p className="text-white">{loading ? 0 : topic.value}</p>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full bg-[#ff5252]"
                          style={{ width: `${widthPct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {error ? (
              <div className="mt-5 rounded-xl border border-[#ff5252]/30 bg-[#ff5252]/10 px-3 py-2 text-sm text-[#ffb4b4]">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-[#ff5252]" aria-hidden="true" />
                  <span>{error}</span>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}