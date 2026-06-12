import syncStats from './sync-stats.js';

async function main() {
	if (!process.env.CODOLIO_TOKEN) {
		console.warn('Skipping Codolio stats sync during build: CODOLIO_TOKEN is not set');
		return;
	}

	await syncStats();
}

main().catch((error) => {
	console.error('Failed to sync Codolio stats before build:', error);
	process.exit(1);
});