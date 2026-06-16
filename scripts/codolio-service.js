import axios from 'axios';

export function normalizeBearerToken(token) {
	const trimmed = typeof token === 'string' ? token.trim() : '';
	if (!trimmed) return '';
	return trimmed.toLowerCase().startsWith('bearer ') ? trimmed : `Bearer ${trimmed}`;
}

/**
 * Transform the raw Codolio API response into the shape expected by
 * the CodingStats component (matching public/data/stats.json schema).
 */
function transformCodolioResponse(raw) {
	const user = raw.data || raw;

	const details = user.userDetails?.userPersonalDetails || {};
	const profiles = user.platformProfiles?.platformProfiles || [];

	// --- personalInfo ---
	const personalInfo = {
		name: [user.firstName, user.secondName].filter(Boolean).join(' '),
		username: user.profileName || '',
		avatar: user.imageUrl || '',
		location: details.country || 'India',
		institution: details.collegeDetails?.collegeName || '',
	};

	// --- helpers to find platforms ---
	const lc = profiles.find((p) => p.platform === 'leetcode') || {};
	const cf = profiles.find((p) => p.platform === 'codeforces') || {};
	const gfg = profiles.find((p) => p.platform === 'geeksforgeeks') || {};
	const hr = profiles.find((p) => p.platform === 'hackerrank') || {};

	// --- aggregate totals ---
	const totalQuestions = profiles.reduce(
		(sum, p) => sum + (p.totalQuestionStats?.totalQuestionCounts || 0),
		0
	);

	const totalActiveDays = profiles.reduce(
		(sum, p) => {
			if (p.dailyActivityStatsResponse?.totalActiveDays != null) {
				return sum + p.dailyActivityStatsResponse.totalActiveDays;
			}
			// Fall back to counting calendar entries when totalActiveDays is null
			const cal = p.dailyActivityStatsResponse?.submissionCalendar;
			if (cal && typeof cal === 'object') {
				return sum + Object.keys(cal).length;
			}
			return sum;
		},
		0
	);

	const maxStreak = Math.max(
		...profiles.map((p) => p.dailyActivityStatsResponse?.maxStreak || 0),
		0
	);

	// Estimate current streak from the most recent submission calendar entries
	const currentStreak = lc.dailyActivityStatsResponse?.maxStreak || 1;

	// Submissions: count total submissions across all calendars
	const submissions = profiles.reduce((sum, p) => {
		const cal = p.dailyActivityStatsResponse?.submissionCalendar;
		if (cal && typeof cal === 'object') {
			return sum + Object.values(cal).reduce((s, v) => s + v, 0);
		}
		return sum;
	}, 0);

	// --- contest stats ---
	const lcContests = lc.contestActivityStats?.contestActivityList?.length || 0;
	const cfContests = cf.contestActivityStats?.contestActivityList?.length || 0;
	const totalContests = lcContests + cfContests;

	// Latest rating history from whichever platform has most recent contest
	const latestLcContest = lc.contestActivityStats?.contestActivityList?.slice(-1)[0];
	const latestCfContest = cf.contestActivityStats?.contestActivityList?.slice(-1)[0];

	let ratingHistory;
	if (latestLcContest) {
		const d = new Date(latestLcContest.contestDate * 1000);
		ratingHistory = {
			rating: latestLcContest.rating,
			date: d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
			contest: latestLcContest.contestName,
			rank: latestLcContest.rank,
		};
	} else if (latestCfContest) {
		const d = new Date(latestCfContest.contestDate * 1000);
		ratingHistory = {
			rating: latestCfContest.rating,
			date: d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
			contest: latestCfContest.contestName,
			rank: latestCfContest.rank,
		};
	} else {
		ratingHistory = { rating: 'N/A', date: 'N/A', contest: 'N/A', rank: 'N/A' };
	}

	// --- problems solved breakdown ---
	const gfgFundamentals =
		(gfg.totalQuestionStats?.basicQuestionCounts || 0) +
		(gfg.totalQuestionStats?.schoolQuestionCounts || 0);

	const dsaEasy =
		(lc.totalQuestionStats?.easyQuestionCounts || 0) +
		(gfg.totalQuestionStats?.easyQuestionCounts || 0);
	const dsaMedium =
		(lc.totalQuestionStats?.mediumQuestionCounts || 0) +
		(gfg.totalQuestionStats?.mediumQuestionCounts || 0);
	const dsaHard =
		(lc.totalQuestionStats?.hardQuestionCounts || 0) +
		(gfg.totalQuestionStats?.hardQuestionCounts || 0);

	const problemsSolved = {
		fundamentals: { label: 'GFG', value: gfgFundamentals },
		dsa: {
			total: dsaEasy + dsaMedium + dsaHard,
			easy: dsaEasy,
			medium: dsaMedium,
			hard: dsaHard,
		},
		competitiveProgramming: {
			label: 'Codeforces',
			value: cf.totalQuestionStats?.totalQuestionCounts || 0,
		},
	};

	// --- awards from badges ---
	const awards = [];
	const lcBadges = lc.badgeStats?.badgeList || [];
	lcBadges.forEach((b) => {
		awards.push({
			label: b.displayName || b.shortName,
			color: b.category === 'ANNUAL' ? '#22c55e' : '#3b82f6',
			type: 'streak',
		});
	});
	const hrBadges = hr.badgeStats?.badgeList || [];
	hrBadges.forEach((b) => {
		awards.push({
			label: b.displayName || b.shortName,
			color: '#f59e0b',
			type: 'skills',
		});
	});
	// Ensure at least some awards
	if (awards.length === 0) {
		awards.push({ label: 'Active Coder', color: '#22c55e', type: 'streak' });
	}

	// --- topic analysis (merge LeetCode + GFG topics) ---
	const topicMap = {};
	const lcTopics = lc.topicAnalysisStats?.topicWiseDistribution || {};
	const gfgTopics = gfg.topicAnalysisStats?.topicWiseDistribution || {};
	const cfTopics = cf.dailyActivityStatsResponse?.topicWiseDistribution || {};

	for (const [name, count] of Object.entries({ ...lcTopics, ...gfgTopics, ...cfTopics })) {
		const key = name.toLowerCase();
		topicMap[key] = (topicMap[key] || 0) + count;
	}

	const topicAnalysis = Object.entries(topicMap)
		.map(([name, count]) => ({
			name: name.charAt(0).toUpperCase() + name.slice(1),
			count,
		}))
		.sort((a, b) => b.count - a.count)
		.slice(0, 10);

	// --- codolioStats ---
	const codolioStats = {
		totalQuestions,
		totalActiveDays,
		submissions,
		maxStreak,
		currentStreak,
		totalContests,
		contestsBreakdown: { leetcode: lcContests, codeforces: cfContests },
		problemsSolved,
		ratingHistory,
		awards,
		topicAnalysis,
	};

	// --- platformProfiles (keep raw for contest ranking cards) ---
	const platformProfiles = {
		platformProfiles: profiles,
	};

	return { personalInfo, codolioStats, platformProfiles };
}

export async function fetchCodolioStats(token) {
	const authorization = normalizeBearerToken(token);

	if (!authorization) {
		throw new Error('CODOLIO_TOKEN is not set');
	}

	const response = await axios.get('https://api.codolio.com/user', {
		headers: {
			Authorization: authorization,
		},
	});

	return transformCodolioResponse(response.data);
}
