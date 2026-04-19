import cron from 'node-cron';
import syncStats from './sync-stats.js';

const timezone = process.env.CRON_TIMEZONE || 'UTC';

async function main() {
	cron.schedule(
		'0 0 * * *',
		async () => {
			try {
				await syncStats();
			} catch (error) {
				console.error('Scheduled Codolio sync failed:', error);
			}
		},
		{ timezone }
	);

	console.log(`Codolio sync scheduler active. Next run: midnight (${timezone}).`);
}

main().catch((error) => {
	console.error('Failed to start Codolio cron sync:', error);
	process.exit(1);
});